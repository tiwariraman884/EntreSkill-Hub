"use client";

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Camera, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfileAvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: "sm" | "default" | "lg" | "xl";
  onUpload?: (file: File) => void;
  onRemove?: () => void;
  editable?: boolean;
}

export function ProfileAvatar({
  src,
  alt = "Profile",
  name = "User",
  size = "default",
  onUpload,
  onRemove,
  editable = false,
}: ProfileAvatarProps) {
  const [preview, setPreview] = useState<string | undefined>(src);
  const [isHovering, setIsHovering] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPreview(src);
  }, [src]);

  const sizeClasses = {
    sm: "h-10 w-10",
    default: "h-16 w-16",
    lg: "h-24 w-24",
    xl: "h-32 w-32",
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
      setIsUploading(false);
      onUpload?.(file);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setPreview(undefined);
    onRemove?.();
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Avatar className={cn(sizeClasses[size], "ring-4 ring-white shadow-xl")}>
        <AvatarImage src={preview} alt={alt} />
        <AvatarFallback className="bg-gradient-to-br from-indigo to-indigo-light text-white font-bold text-lg">
          {name.split(" ").map(n => n[0]).join("").slice(0, 2)}
        </AvatarFallback>
      </Avatar>

      {editable && (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Hover Overlay */}
          <div
            className={cn(
              "absolute inset-0 rounded-full bg-black/50 flex items-center justify-center cursor-pointer transition-opacity duration-200",
              isHovering ? "opacity-100" : "opacity-0"
            )}
            onClick={() => fileInputRef.current?.click()}
          >
            {isUploading ? (
              <Loader2 className="size-6 text-white animate-spin" />
            ) : (
              <Camera className="size-6 text-white" />
            )}
          </div>

          {/* Remove Button */}
          {preview && !isUploading && (
            <button
              onClick={handleRemove}
              className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-danger text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            >
              <X className="size-3" />
            </button>
          )}
        </>
      )}
    </div>
  );
}
