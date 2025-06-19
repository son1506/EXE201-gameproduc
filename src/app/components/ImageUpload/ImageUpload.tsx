// src/app/components/ImageUpload/ImageUpload.tsx
import React, { useState, useCallback } from 'react';
import { Upload, Button, Progress, Card, Modal, message } from 'antd';
import { 
  DeleteOutlined, 
  EyeOutlined,
  CloudUploadOutlined,
  PictureOutlined 
} from '@ant-design/icons';
import type { UploadProps } from 'antd/es/upload/interface';
import firebaseStorageService, { UploadResult, UploadProgress } from '../../Services/firebaseStorage';
import './ImageUpload.css';

interface ImageUploadProps {
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  multiple?: boolean;
  folder?: string;
  maxCount?: number;
  compress?: boolean;
  quality?: number;
  disabled?: boolean;
  className?: string;
}

interface UploadingFile {
  file: File;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  url?: string;
  error?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  multiple = false,
  folder = 'images',
  maxCount = 1,
  compress = true,
  quality = 0.8,
  disabled = false,
  className = ''
}) => {
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [previewTitle, setPreviewTitle] = useState<string>('');

  // Convert value to array for consistent handling
  const imageUrls = React.useMemo(() => {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  }, [value]);

  const handleUpload = useCallback(async (file: File): Promise<boolean> => {
    // Validate file
    if (!firebaseStorageService.validateFile(file)) {
      return false;
    }

    // Check max count
    if (imageUrls.length + uploadingFiles.filter(f => f.status !== 'error').length >= maxCount) {
      message.error(`Maximum ${maxCount} images allowed`);
      return false;
    }

    // Add to uploading files
    const uploadingFile: UploadingFile = {
      file,
      progress: 0,
      status: 'uploading'
    };

    setUploadingFiles(prev => [...prev, uploadingFile]);

    try {
      // Compress image if needed
      let fileToUpload = file;
      if (compress && file.type.startsWith('image/')) {
        fileToUpload = await firebaseStorageService.compressImage(file, quality);
      }

      // Upload with progress tracking
      const result: UploadResult = await firebaseStorageService.uploadFile(
        fileToUpload,
        folder,
        (progress: UploadProgress) => {
          setUploadingFiles(prev => 
            prev.map(uf => 
              uf.file === file 
                ? { ...uf, progress: progress.progress }
                : uf
            )
          );
        }
      );

      // Update uploading file status
      setUploadingFiles(prev => 
        prev.map(uf => 
          uf.file === file 
            ? { ...uf, status: 'success', url: result.url, progress: 100 }
            : uf
        )
      );

      // Update value
      const newUrls = multiple 
        ? [...imageUrls, result.url]
        : [result.url];
      
      if (onChange) {
        onChange(multiple ? newUrls : newUrls[0] || '');
      }

      // Remove from uploading files after delay
      setTimeout(() => {
        setUploadingFiles(prev => prev.filter(uf => uf.file !== file));
      }, 2000);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      console.error('Upload failed:', error);
      
      setUploadingFiles(prev => 
        prev.map(uf => 
          uf.file === file 
            ? { ...uf, status: 'error', error: errorMessage }
            : uf
        )
      );
    }

    return false; // Prevent default upload
  }, [imageUrls, uploadingFiles, maxCount, compress, quality, folder, multiple, onChange]);

  const handleRemove = useCallback(async (url: string): Promise<void> => {
    try {
      // Note: You might want to implement a way to track fullPath for deletion
      // For now, we'll just remove from the UI
      const newUrls = imageUrls.filter(u => u !== url);
      if (onChange) {
        onChange(multiple ? newUrls : (newUrls[0] || ''));
      }
      message.success('Image removed');
    } catch (error) {
      message.error('Failed to remove image');
    }
  }, [imageUrls, multiple, onChange]);

  const handlePreview = useCallback((url: string): void => {
    setPreviewImage(url);
    setPreviewVisible(true);
    setPreviewTitle('Image Preview');
  }, []);

  const uploadProps: UploadProps = {
    beforeUpload: handleUpload,
    showUploadList: false,
    multiple,
    disabled,
    accept: 'image/*'
  };

  return (
    <div className={`image-upload-container ${className}`}>
      {/* Existing Images */}
      {imageUrls.length > 0 && (
        <div className="uploaded-images">
          {imageUrls.map((url, index) => (
            <Card
              key={index}
              className="image-card"
              cover={
                <div className="image-wrapper">
                  <img src={url} alt={`Uploaded ${index + 1}`} />
                </div>
              }
              actions={[
                <Button
                  key="preview"
                  type="text"
                  icon={<EyeOutlined />}
                  onClick={() => handlePreview(url)}
                />,
                <Button
                  key="delete"
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleRemove(url)}
                  disabled={disabled}
                />
              ]}
            />
          ))}
        </div>
      )}

      {/* Uploading Files */}
      {uploadingFiles.map((uploadingFile, index) => (
        <Card
          key={index}
          className="uploading-card"
          cover={
            <div className="uploading-wrapper">
              <div className="uploading-content">
                <CloudUploadOutlined className="upload-icon" />
                <div className="upload-info">
                  <div className="filename">{uploadingFile.file.name}</div>
                  <Progress
                    percent={Math.round(uploadingFile.progress)}
                    status={uploadingFile.status === 'error' ? 'exception' : 'active'}
                    size="small"
                  />
                  {uploadingFile.status === 'error' && (
                    <div className="error-message">{uploadingFile.error}</div>
                  )}
                </div>
              </div>
            </div>
          }
        />
      ))}

      {/* Upload Button */}
      {(imageUrls.length + uploadingFiles.filter(f => f.status !== 'error').length < maxCount) && (
        <Upload {...uploadProps}>
          <Card className="upload-card" hoverable={!disabled}>
            <div className="upload-content">
              <PictureOutlined className="upload-placeholder-icon" />
              <div className="upload-text">
                <div className="upload-hint">Click or drag to upload</div>
                <div className="upload-subtext">
                  Support: JPG, PNG, GIF, WEBP (Max {maxCount} {maxCount > 1 ? 'files' : 'file'})
                </div>
              </div>
            </div>
          </Card>
        </Upload>
      )}

      {/* Preview Modal */}
      <Modal
        open={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
        width="80%"
        centered
      >
        <img alt="preview" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default ImageUpload;