import type { Area } from "react-easy-crop";

export function compressImage(file: File, maxSizeMB: number): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        const MAX_DIM = 2048;
        if (width > MAX_DIM || height > MAX_DIM) {
          const ratio = Math.min(MAX_DIM / width, MAX_DIM / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Failed to get canvas context"));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);

        let quality = 0.85;
        const maxBytes = maxSizeMB * 1024 * 1024;
        const compress = () => {
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error("Compression failed"));
                return;
              }
              if (blob.size > maxBytes && quality > 0.1) {
                quality -= 0.1;
                compress();
              } else {
                const compressedFile = new File([blob], file.name, {
                  type: file.type,
                  lastModified: Date.now(),
                });
                resolve(compressedFile);
              }
            },
            file.type,
            quality
          );
        };
        compress();
      };
      img.onerror = () => reject(new Error("Failed to load image"));
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
  });
}

export function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area,
  rotation: number,
  flip = { horizontal: false, vertical: false }
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;

      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;

      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
      ctx.translate(-image.width / 2, -image.height / 2);

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Failed to create blob"));
            return;
          }
          resolve(blob);
        },
        "image/jpeg",
        0.9
      );
    };
    image.onerror = () => reject(new Error("Failed to load image for crop"));
  });
}

export const ALLOWED_FORMATS = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
export const MAX_SIZE_MB = 5;

export function validateAvatarFile(
  file: File,
  allowedFormats: string[] = ALLOWED_FORMATS,
  maxSizeMB: number = MAX_SIZE_MB
): string | null {
  if (!allowedFormats.includes(file.type)) {
    return `Invalid format. Allowed: ${allowedFormats.map((f) => f.split("/")[1]).join(", ")}`;
  }
  if (file.size > maxSizeMB * 1024 * 1024) {
    return `File too large. Maximum size: ${maxSizeMB}MB`;
  }
  return null;
}
