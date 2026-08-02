"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AvatarUploaderProps {
  currentAvatar: string | null;
  name: string;
  onUpload: (file: File) => Promise<{ success: boolean; avatar?: string }>;
  onRemove: () => Promise<{ success: boolean }>;
}

export function AvatarUploader({
  currentAvatar,
  name,
  onUpload,
  onRemove,
}: AvatarUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (file: File) => {
    if (!file) return;
    setIsUploading(true);
    setUploadProgress(10);
    
    // Simulate upload progress interval
    const interval = setInterval(() => {
      setUploadProgress((prev) => (prev >= 90 ? 90 : prev + 15));
    }, 100);

    await onUpload(file);
    clearInterval(interval);
    setUploadProgress(100);
    setTimeout(() => {
      setIsUploading(false);
      setUploadProgress(0);
    }, 300);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      handleFileChange(file);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "flex flex-col md:flex-row items-center gap-6 p-6 rounded-2xl border-2 border-dashed transition-all duration-300 relative overflow-hidden",
        isDragging ? "border-primary bg-primary/5" : "border-border bg-muted/5"
      )}
    >
      {/* Upload Overlay — CSS fade-in */}
      {isUploading && (
        <div className="absolute inset-0 bg-white/80 dark:bg-black/80 z-20 flex flex-col items-center justify-center gap-2 animate-in fade-in duration-200">
          <Loader2 className="size-8 animate-spin text-primary" />
          <p className="text-sm font-semibold text-foreground">Uploading avatar... {uploadProgress}%</p>
          <div className="w-48 h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-150"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      <div className="relative group shrink-0">
        {/* Avatar ring & hover scale — CSS only */}
        <div className="relative rounded-full p-1 hover:scale-105 transition-transform duration-300">
          <div className="absolute inset-0 rounded-full bg-linear-to-r from-primary to-primary-light animate-pulse opacity-60 blur-[2px]" />
          <div className="w-30 h-30 rounded-full overflow-hidden relative border-2 border-white dark:border-surface">
            <Avatar className="w-full h-full">
              <AvatarImage src={currentAvatar || "/placeholder-avatar.png"} alt={name} className="object-cover" />
              <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                {name?.charAt(0)?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          aria-label="Upload profile photo"
          className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-primary to-primary-light text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Upload className="size-4" />
        </button>
      </div>

      <div className="flex-1 text-center md:text-left space-y-1">
        <p className="font-semibold text-foreground text-lg">Profile Photo</p>
        <p className="text-sm text-muted-foreground">
          Drag and drop your image, or click upload.
        </p>
        <p className="text-xs text-muted-foreground/80">
          Supports PNG, JPG, WEBP formats up to 5MB.
        </p>
        <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileChange(file);
            }}
            className="hidden"
          />
          <Button
            size="sm"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-xl border-2 border-primary/20 hover:bg-primary/5 transition-all duration-200"
          >
            <Upload className="size-3.5 mr-1.5" />
            Upload Photo
          </Button>
          {currentAvatar && (
            <Button
              size="sm"
              variant="ghost"
              onClick={onRemove}
              className="rounded-xl text-destructive hover:text-destructive hover:bg-destructive/5 transition-all duration-200"
            >
              <X className="size-3.5 mr-1.5" />
              Remove
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
