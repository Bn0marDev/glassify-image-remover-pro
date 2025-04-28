
import React from 'react';
import { Download, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageCompareProps {
  originalImage: string;
  processedImage: string;
  isProcessing: boolean;
}

const ImageCompare: React.FC<ImageCompareProps> = ({ 
  processedImage, 
  isProcessing 
}) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = 'removed-background.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full flex flex-col items-center animate-scale-in">
      <div className="w-full max-w-xl mb-6 relative h-[400px] md:h-[500px] overflow-hidden rounded-2xl glass-panel">
        {isProcessing ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          </div>
        ) : (
          <div className="relative w-full h-full">
            <img 
              src={processedImage} 
              alt="Processed" 
              className="w-full h-full object-contain"
            />
          </div>
        )}
      </div>
      
      <Button 
        className="glass-button text-white flex items-center gap-2 px-6 py-6 text-lg"
        onClick={handleDownload}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <Loader className="w-5 h-5 animate-spin" />
        ) : (
          <Download className="w-5 h-5" />
        )}
        تحميل الصورة
      </Button>
    </div>
  );
};

export default ImageCompare;

