import { ID, Role, Permission } from "appwrite";
import { appwriteConfig, storage } from "./config";

// Upload a file to Appwrite Storage with public read permission
export async function uploadFile(file) {
  try {
    console.log("Upload config", {
      storageId: appwriteConfig.storageId,
      projectId: appwriteConfig.projectId,
      url: appwriteConfig.url,
      file,
    });

    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,    // Bucket ID
      ID.unique(),                 // Unique file ID
      file,
      [Permission.read(Role.any())] // Public read permission
    );

    console.log("Uploaded file response:", uploadedFile);
    return uploadedFile;
  } catch (error) {
    console.error("Upload error:", error);
    return null;
  }
}

// Get a stable file URL to view/download the uploaded file
export async function getFileURL(fileId) {
  try {
    const file = await storage.getFileView(appwriteConfig.storageId, fileId);
    return file?.href;
  } catch (error) {
    console.error("Error getting file URL:", error);
    return null;
  }
}