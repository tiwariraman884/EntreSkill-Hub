"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import type { Area, Point } from "react-easy-crop";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Upload,
  X,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Check,
  Loader2,
  AlertCircle,
  Crop,
  SlidersHorizontal,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import {
  compressImage,
  getCroppedImg,
  validateAvatarFile,
  ALLOWED_FORMATS,
  MAX_SIZE_MB,
} from "@/lib/avatar-utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CropperComponent = React.ComponentType<any>;

// Dynamic import for the cropper to reduce bundle size
const Cropper = dynamic(
  () => import("react-easy-crop").then((mod) => mod.default) as Promise<CropperComponent>,
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-80 bg-muted/50 animate-pulse flex items-center justify-center rounded-lg">
        <Loader2 className="size-6 text-muted-foreground animate-spin" />
      </div>
    ),
  }
);

type CropShape = "round" | "rect";
type UploadStatus = "idle" | "selecting" | "cropping" | "uploading" | "success" | "error";

interface AvatarUploadProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: "sm" | "default" | "lg" | "xl";
  onUpload?: (file: File) => Promise<{ success: boolean; avatar?: string; error?: string }>;
  onRemove?: () => Promise<{ success: boolean; error?: string }>;
  editable?: boolean;
  maxSizeMB?: number;
  allowedFormats?: string[];
}

export function AvatarUpload({
  src,
  alt = "Profile",
  name = "User",
  size = "default",
  onUpload,
  onRemove,
  editable = false,
  maxSizeMB = MAX_SIZE_MB,
  allowedFormats = ALLOWED_FORMATS,
}: AvatarUploadProps) {
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [preview, setPreview] = useState<string | undefined>(src);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [cropShape, setCropShape] = useState<CropShape>("round");
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cropDialogRef = useRef<HTMLDivElement>(null);
  useFocusTrap(cropDialogRef, status === "cropping");

  useEffect(() => {
    setPreview(src);
  }, [src]);

  const displaySize = {
    sm: "h-10 w-10",
    default: "h-16 w-16",
    lg: "h-24 w-24",
    xl: "h-32 w-32",
  };

  const handleFileSelect = useCallback(
    async (file: File) => {
      setValidationError(null);
      const error = validateAvatarFile(file, allowedFormats, maxSizeMB);
      if (error) {
        setValidationError(error);
        toast.error(error);
        return;
      }

      try {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImageSrc(e.target?.result as string);
          setCrop({ x: 0, y: 0 });
          setZoom(1);
          setRotation(0);
          setStatus("cropping");
        };
        reader.readAsDataURL(file);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to read file";
        setValidationError(message);
        toast.error(message);
      }
    },
    [allowedFormats, maxSizeMB]
  );

  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFileSelect(file);
      }
      e.target.value = "";
    },
    [handleFileSelect]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files?.[0];
      if (file) {
        handleFileSelect(file);
      }
    },
    [handleFileSelect]
  );

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleRotate = useCallback(() => {
    setRotation((prev) => (prev + 90) % 360);
  }, []);

  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev + 0.2, 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => Math.max(prev - 0.2, 0.5));
  }, []);

  const handleCancel = useCallback(() => {
    setImageSrc(null);
    setStatus("idle");
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setUploadProgress(0);
  }, []);

  const handleApplyCrop = useCallback(async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    setStatus("uploading");
    setUploadProgress(0);

    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        const next = prev + Math.random() * 20;
        return Math.min(next, 90);
      });
    }, 200);

    try {
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
      const file = new File([croppedBlob], "avatar.jpg", { type: "image/jpeg" });

      let finalFile = file;
      if (file.size > maxSizeMB * 1024 * 1024 * 0.8) {
        finalFile = await compressImage(file, maxSizeMB);
      }

      setUploadProgress(100);

      const previewUrl = URL.createObjectURL(finalFile);
      setPreview(previewUrl);

      if (onUpload) {
        const result = await onUpload(finalFile);
        if (!result.success) {
          throw new Error(result.error || "Upload failed");
        }
      }

      clearInterval(progressInterval);
      setStatus("success");
      setImageSrc(null);
      toast.success("Avatar updated successfully");

      setTimeout(() => {
        setStatus("idle");
        setUploadProgress(0);
      }, 2000);
    } catch (err) {
      clearInterval(progressInterval);
      const message = err instanceof Error ? err.message : "Failed to upload";
      setValidationError(message);
      setStatus("error");
      toast.error(message);
    }
  }, [imageSrc, croppedAreaPixels, rotation, maxSizeMB, onUpload]);

  const handleRemove = useCallback(async () => {
    if (onRemove) {
      const result = await onRemove();
      if (result.success) {
        setPreview(undefined);
        setStatus("idle");
        toast.success("Avatar removed");
      } else {
        toast.error(result.error || "Failed to remove avatar");
      }
    } else {
      setPreview(undefined);
      setStatus("idle");
    }
  }, [onRemove]);

  const handleRetry = useCallback(() => {
    setStatus("idle");
    setImageSrc(null);
    setValidationError(null);
    setUploadProgress(0);
  }, []);

  const handleCropShapeToggle = useCallback(() => {
    setCropShape((prev) => (prev === "round" ? "rect" : "round"));
  }, []);

  if (!editable) {
    return (
      <Avatar className={cn(displaySize[size], "ring-4 ring-white shadow-xl")}>
        <AvatarImage src={preview} alt={alt} />
        <AvatarFallback className="bg-gradient-to-br from-primary to-primary-light text-white font-bold text-lg">
          {name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
        </AvatarFallback>
      </Avatar>
    );
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept={allowedFormats.join(",")}
        className="hidden"
        onChange={onFileChange}
      />

      {/* Skeleton while uploading */}
      {status === "uploading" && (
        <div className="relative inline-block">
          <Skeleton className={cn(displaySize[size], "rounded-full")} />
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-5 text-primary animate-spin" />
          </div>
        </div>
      )}

      {/* Success state */}
      {status === "success" && (
        <div className="relative inline-block">
          <Avatar className={cn(displaySize[size], "ring-4 ring-success/30 shadow-xl")}>
            <AvatarImage src={preview} alt={alt} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-primary-light text-white font-bold text-lg">
              {name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-success text-white flex items-center justify-center">
            <Check className="size-3" />
          </div>
        </div>
      )}

      {/* Error state - show retry */}
      {status === "error" && (
        <div className="relative inline-block">
          <Avatar className={cn(displaySize[size], "ring-4 ring-danger/30 shadow-xl")}>
            <AvatarImage src={preview} alt={alt} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-primary-light text-white font-bold text-lg">
              {name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center cursor-pointer" onClick={handleRetry}>
            <div className="flex flex-col items-center gap-1">
              <AlertCircle className="size-5 text-danger" />
              <span className="text-[10px] text-white font-medium">Retry</span>
            </div>
          </div>
        </div>
      )}

      {/* Idle state - show avatar with upload overlay */}
      {status === "idle" && (
        <div
          className="relative inline-block"
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
        >
          <Avatar className={cn(displaySize[size], "ring-4 ring-white shadow-xl")}>
            <AvatarImage src={preview} alt={alt} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-primary-light text-white font-bold text-lg">
              {name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </AvatarFallback>
          </Avatar>

          {/* Drag overlay */}
          <AnimatePresence>
            {dragOver && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 rounded-full bg-primary/90 flex items-center justify-center cursor-copy z-10"
              >
                <div className="text-center text-white">
                  <Upload className="size-6 mx-auto mb-1" />
                  <span className="text-xs font-medium">Drop here</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hover overlay */}
          <div
            className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center cursor-pointer opacity-0 hover:opacity-100 transition-opacity duration-200"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="size-5 text-white" />
          </div>

          {/* Remove button */}
          {preview && (
            <button
              onClick={handleRemove}
              className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-danger text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              aria-label="Remove avatar"
            >
              <X className="size-3" />
            </button>
          )}

          {/* Validation error */}
          <AnimatePresence>
            {validationError && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-danger font-medium whitespace-nowrap"
              >
                {validationError}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Cropping Dialog */}
      <AnimatePresence>
        {status === "cropping" && imageSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) handleCancel();
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <Card className="w-full max-w-lg bg-white dark:bg-surface shadow-premium overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                  <div className="flex items-center gap-2">
                    <Crop className="size-5 text-primary" />
                    <h3 className="text-lg font-heading font-semibold">Crop Avatar</h3>
                  </div>
                  <button
                    onClick={handleCancel}
                    className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                    aria-label="Cancel crop"
                  >
                    <X className="size-5 text-thread" />
                  </button>
                </div>

                {/* Crop area */}
                <div className="relative w-full h-80 bg-muted/50">
                  <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    rotation={rotation}
                    aspect={1}
                    cropShape={cropShape}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                    showGrid={true}
                  />
                </div>

                {/* Controls */}
                <div className="px-5 py-4 space-y-4">
                  {/* Zoom slider */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleZoomOut}
                      className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                      aria-label="Zoom out"
                    >
                      <ZoomOut className="size-4 text-thread" />
                    </button>
                    <div className="flex-1">
                      <input
                        type="range"
                        min={0.5}
                        max={3}
                        step={0.1}
                        value={zoom}
                        onChange={(e) => setZoom(Number(e.target.value))}
                        className="w-full accent-primary"
                        aria-label="Zoom level"
                      />
                    </div>
                    <button
                      onClick={handleZoomIn}
                      className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                      aria-label="Zoom in"
                    >
                      <ZoomIn className="size-4 text-thread" />
                    </button>
                  </div>

                  {/* Toolbar */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleRotate}
                        className="rounded-xl"
                        aria-label="Rotate 90 degrees"
                      >
                        <RotateCw className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleCropShapeToggle}
                        className="rounded-xl"
                        aria-label={`Switch to ${cropShape === "round" ? "square" : "circle"} crop`}
                      >
                        <SlidersHorizontal className="size-4" />
                      </Button>
                      <span className="text-xs text-muted-foreground ml-1">
                        {cropShape === "round" ? "Circle" : "Square"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" onClick={handleCancel} className="rounded-xl">
                        Cancel
                      </Button>
                      <Button
                        onClick={handleApplyCrop}
                        className="rounded-xl"
                        disabled={!croppedAreaPixels}
                      >
                        <Check className="size-4 mr-1.5" />
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Progress Overlay */}
      <AnimatePresence>
        {status === "uploading" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-3 w-full max-w-[200px]"
          >
            <div className="flex items-center gap-2 mb-1">
              <Loader2 className="size-3 animate-spin text-primary" />
              <span className="text-xs text-muted-foreground font-medium">
                {uploadProgress < 100 ? "Uploading..." : "Processing..."}
              </span>
            </div>
            <Progress value={uploadProgress} className="h-1.5" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
