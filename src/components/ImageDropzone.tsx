
import React, { useState, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Upload, ImageIcon } from 'lucide-react';

interface ImageDropzoneProps {
  onImageSelect: (file: File) => void;
  isProcessing?: boolean;
}

const ImageDropzone: React.FC<ImageDropzoneProps> = ({ onImageSelect, isProcessing = false }) => {
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      validateAndProcessFile(file);
    }
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      validateAndProcessFile(file);
    }
  }, []);

  const validateAndProcessFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file (JPEG, PNG, etc.)",
        variant: "destructive",
      });
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image under 10MB",
        variant: "destructive",
      });
      return;
    }
    
    onImageSelect(file);
  };

  return (
    <div 
      className={`drag-area ${isDragging ? 'active' : ''} ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
        <Upload size={28} className="text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">أفلت صورتك هنا</h3>
      <p className="text-white/70 mb-6 text-center max-w-md">
        أو انقر لاختيار ملف (.jpg, .png) حتى 10 ميجابايت
      </p>
      
      <label className="glass-button px-6 py-3 flex items-center gap-2 cursor-pointer">
        <ImageIcon className="w-5 h-5" />
        <span>اختر صورة</span>
        <input 
          type="file" 
          className="hidden" 
          accept="image/*" 
          onChange={handleFileChange}
          disabled={isProcessing}
        />
      </label>
    </div>
  );
};

export default ImageDropzone;
