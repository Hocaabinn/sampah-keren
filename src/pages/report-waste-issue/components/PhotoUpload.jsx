import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const PhotoUpload = ({ photos, onPhotosChange, error }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFiles(e?.dataTransfer?.files);
    }
  };

  const handleChange = (e) => {
    e?.preventDefault();
    if (e?.target?.files && e?.target?.files?.[0]) {
      handleFiles(e?.target?.files);
    }
  };

  const handleFiles = (files) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray?.filter(file => {
      const isValidType = file?.type?.startsWith('image/');
      const isValidSize = file?.size <= 5 * 1024 * 1024; // 5MB limit
      return isValidType && isValidSize;
    });

    if (validFiles?.length > 0) {
      const newPhotos = validFiles?.map(file => ({
        id: Date.now() + Math.random(),
        file,
        url: URL.createObjectURL(file),
        name: file?.name,
        size: file?.size
      }));
      
      onPhotosChange([...photos, ...newPhotos]?.slice(0, 5)); // Max 5 photos
    }
  };

  const removePhoto = (photoId) => {
    const updatedPhotos = photos?.filter(photo => photo?.id !== photoId);
    onPhotosChange(updatedPhotos);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Foto</h3>
          <p className="text-sm text-muted-foreground">
          Tambahkan foto untuk membantu kami memahami masalah dengan lebih baik
          </p>
        </div>
        <span className="text-sm text-muted-foreground">
          {photos?.length}/5
        </span>
      </div>
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 transition-smooth ${
          dragActive 
            ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-muted rounded-lg mx-auto mb-3">
            <Icon name="Upload" size={24} className="text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-foreground mb-1">
            Drop Foto Disini or click to browse
          </p>
          <p className="text-xs text-muted-foreground">
            PNG, JPG, GIF up to 5MB each (max 5 photos)
          </p>
        </div>
      </div>
      {/* Photo Previews */}
      {photos?.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {photos?.map((photo) => (
            <div key={photo?.id} className="relative group">
              <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                <Image
                  src={photo?.url}
                  alt={`Upload preview ${photo?.name}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Remove Button */}
              <button
                type="button"
                onClick={() => removePhoto(photo?.id)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-error text-error-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth hover:scale-110"
              >
                <Icon name="X" size={14} />
              </button>
              
              {/* File Info */}
              <div className="mt-1 text-xs text-muted-foreground truncate">
                <p className="truncate">{photo?.name}</p>
                <p>{formatFileSize(photo?.size)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Add More Button */}
      {photos?.length > 0 && photos?.length < 5 && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          iconName="Plus"
          iconPosition="left"
          onClick={() => fileInputRef?.current?.click()}
        >
          Tambahkan Foto laiinnya
        </Button>
      )}
      {error && (
        <div className="flex items-center space-x-2 text-sm text-error">
          <Icon name="AlertCircle" size={16} />
          <span>{error}</span>
        </div>
      )}
      {/* Guidelines */}
      <div className="bg-muted/30 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <Icon name="Camera" size={16} className="text-primary mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-foreground mb-1">Photo Guidelines</p>
            <ul className="text-muted-foreground space-y-1">
              <li>• Ambil foto sampah yang jelas dan terang</li>
              <li>• Sertakan area sekitar untuk konteks</li>
              <li>• Hindari memotret wajah orang demi privasi</li>
              <li>• Foto dari beberapa sudut membantu tim kami menilai masalah dengan lebih akurat</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoUpload;