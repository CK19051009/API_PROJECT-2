import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import streamifier from "streamifier";
import { Request, Response, NextFunction } from "express";

import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const streamUpload = (
  buffer: Buffer,
  resource_type: "image" | "video" = "image" // mặc định là image
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type,
      },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

const uploadToCloudinary = async (
  buffer: Buffer,
  resource_type: "image" | "video" = "image"
): Promise<string> => {
  const result = await streamUpload(buffer, resource_type);
  return result.secure_url;
};

// upload single
export const cloudImage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (req.file) {
      req.body[req.file.fieldname] = await uploadToCloudinary(req.file.buffer);
    }
    next();
  } catch (error) {
    console.error("Error uploading single image:", error);
    res.status(500).json({
      message: "Error uploading image",
      code: 500,
    });
  }
};

// upload arrayImages
export const cloudFileds = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (req.files) {
      const files = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };

      console.log("1 ", files);
      for (const key in files) {
        req.body[key] = [];
        console.log("Key ", key);
        for (const file of files[key]) {
          try {
            console.log("2", file);
            const result = await uploadToCloudinary(
              file.buffer,
              file.mimetype.startsWith("audio/") ? "video" : "image"
            );
            req.body[key].push(result);
          } catch (error) {
            console.error("Error uploading image:", error);
          }
        }
      }
    }
    next();
  } catch (error) {
    console.error("Error uploading images:", error);
    res.status(500).json({
      message: "Error uploading images",
      code: 500,
    });
  }
};
