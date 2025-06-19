// src/app/services/firebaseStorage.ts
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject, 
  listAll,
  uploadBytesResumable,
  UploadTaskSnapshot,
  StorageError 
} from 'firebase/storage';
import { storage } from '../config/firebase';
import { message } from 'antd';

export interface UploadProgress {
  progress: number;
  snapshot: UploadTaskSnapshot;
}

export interface UploadResult {
  url: string;
  filename: string;
  fullPath: string;
}

interface FileValidationOptions {
  maxSize?: number; // in MB
  allowedTypes?: string[];
}

interface TestConnectionResult {
  success: boolean;
  filesCount?: number;
  foldersCount?: number;
  error?: string;
}

class FirebaseStorageService {
  
  /**
   * Upload file to Firebase Storage with progress tracking
   */
  async uploadFile(
    file: File, 
    folder: string = 'images',
    onProgress?: (progress: UploadProgress) => void
  ): Promise<UploadResult> {
    try {
      console.log('🚀 Starting upload:', file.name, 'to folder:', folder);
      
      // Generate unique filename
      const timestamp = Date.now();
      const filename = `${timestamp}_${file.name}`;
      const filePath = `${folder}/${filename}`;
      
      // Create storage reference
      const storageRef = ref(storage, filePath);
      
      // Upload with progress tracking
      const uploadTask = uploadBytesResumable(storageRef, file);
      
      return new Promise<UploadResult>((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot: UploadTaskSnapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`📊 Upload progress: ${progress.toFixed(2)}%`);
            if (onProgress) {
              onProgress({ progress, snapshot });
            }
          },
          (error: StorageError) => {
            console.error('❌ Upload error:', error);
            message.error('Upload failed: ' + error.message);
            reject(error);
          },
          async () => {
            try {
              const url = await getDownloadURL(uploadTask.snapshot.ref);
              const result: UploadResult = {
                url,
                filename,
                fullPath: filePath
              };
              console.log('✅ Upload successful:', url);
              message.success('File uploaded successfully!');
              resolve(result);
            } catch (error) {
              console.error('❌ Error getting download URL:', error);
              reject(error);
            }
          }
        );
      });
    } catch (error) {
      console.error('❌ Upload error:', error);
      message.error('Failed to upload file');
      throw error;
    }
  }

  /**
   * Upload multiple files
   */
  async uploadMultipleFiles(
    files: File[],
    folder: string = 'images',
    onProgress?: (index: number, progress: UploadProgress) => void
  ): Promise<UploadResult[]> {
    try {
      console.log('🚀 Starting multiple upload:', files.length, 'files');
      
      const uploadPromises = files.map((file, index) => 
        this.uploadFile(file, folder, (progress) => {
          if (onProgress) {
            onProgress(index, progress);
          }
        })
      );
      
      const results = await Promise.all(uploadPromises);
      console.log('✅ All files uploaded successfully');
      return results;
    } catch (error) {
      console.error('❌ Multiple upload error:', error);
      throw error;
    }
  }

  /**
   * Delete file from Firebase Storage
   */
  async deleteFile(fullPath: string): Promise<void> {
    try {
      console.log('🗑️ Deleting file:', fullPath);
      const fileRef = ref(storage, fullPath);
      await deleteObject(fileRef);
      console.log('✅ File deleted successfully');
      message.success('File deleted successfully!');
    } catch (error) {
      console.error('❌ Delete error:', error);
      message.error('Failed to delete file');
      throw error;
    }
  }

  /**
   * Get all files in a folder
   */
  async getFilesInFolder(folder: string): Promise<string[]> {
    try {
      console.log('📁 Getting files in folder:', folder);
      const folderRef = ref(storage, folder);
      const result = await listAll(folderRef);
      
      const urls = await Promise.all(
        result.items.map(itemRef => getDownloadURL(itemRef))
      );
      
      console.log('✅ Found', urls.length, 'files in folder:', folder);
      return urls;
    } catch (error) {
      console.error('❌ List files error:', error);
      throw error;
    }
  }

  /**
   * Validate file before upload
   */
  validateFile(file: File, options: FileValidationOptions = {}): boolean {
    const { 
      maxSize = 10, 
      allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'] 
    } = options;
    
    // Check file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSize) {
      message.error(`File size must be less than ${maxSize}MB (current: ${fileSizeMB.toFixed(2)}MB)`);
      return false;
    }
    
    // Check file type
    if (!allowedTypes.includes(file.type)) {
      message.error(`File type not allowed. Allowed types: ${allowedTypes.join(', ')}`);
      return false;
    }
    
    console.log('✅ File validation passed:', file.name, fileSizeMB.toFixed(2) + 'MB');
    return true;
  }

  /**
   * Compress image before upload
   */
  async compressImage(file: File, quality: number = 0.8): Promise<File> {
    return new Promise<File>((resolve) => {
      console.log('🗜️ Compressing image:', file.name);
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Calculate new dimensions (max 1920px width)
        const maxWidth = 1920;
        const maxHeight = 1080;
        let { width, height } = img;
        
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
        }
        
        canvas.toBlob((blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now()
            });
            
            const originalSizeMB = file.size / (1024 * 1024);
            const compressedSizeMB = compressedFile.size / (1024 * 1024);
            console.log(`✅ Image compressed: ${originalSizeMB.toFixed(2)}MB → ${compressedSizeMB.toFixed(2)}MB`);
            
            resolve(compressedFile);
          } else {
            console.log('⚠️ Compression failed, using original file');
            resolve(file);
          }
        }, file.type, quality);
      };
      
      img.onerror = () => {
        console.log('⚠️ Image load failed, using original file');
        resolve(file);
      };
      
      img.src = URL.createObjectURL(file);
    });
  }

  /**
   * Test Firebase connection
   */
  async testConnection(): Promise<TestConnectionResult> {
    try {
      console.log('🧪 Testing Firebase Storage connection...');
      
      // Try to list root directory
      const rootRef = ref(storage, '/');
      const result = await listAll(rootRef);
      
      console.log('✅ Firebase Storage connection successful!');
      console.log(`📁 Found ${result.items.length} files and ${result.prefixes.length} folders`);
      
      return {
        success: true,
        filesCount: result.items.length,
        foldersCount: result.prefixes.length
      };
    } catch (error) {
      console.error('❌ Firebase connection test failed:', error);
      
      const storageError = error as StorageError;
      
      if (storageError.code === 'storage/unauthorized') {
        console.error('🔒 Storage rules may be too restrictive');
        return {
          success: false,
          error: 'Storage unauthorized. Please check Firebase Storage rules.'
        };
      }
      
      return {
        success: false,
        error: storageError.message || 'Unknown error occurred'
      };
    }
  }
}

export const firebaseStorageService = new FirebaseStorageService();
export default firebaseStorageService;