
import React, { useRef, useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageCompareProps {
  originalImage: string;
  processedImage: string;
  isProcessing: boolean;
}

const ImageCompare: React.FC<ImageCompareProps> = ({ 
  originalImage, 
  processedImage, 
  isProcessing 
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = 'removed-background.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const onMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const newPosition = ((e.clientX - containerRect.left) / containerRect.width) * 100;
      setSliderPosition(Math.max(0, Math.min(100, newPosition)));
    };
    
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    
    // Prevent text selection during dragging
    e.preventDefault();
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    
    const onTouchMove = (e: TouchEvent) => {
      if (!containerRef.current || !e.touches[0]) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const newPosition = ((e.touches[0].clientX - containerRect.left) / containerRect.width) * 100;
      setSliderPosition(Math.max(0, Math.min(100, newPosition)));
    };
    
    const onTouchEnd = () => {
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };
    
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);
  };

  useEffect(() => {
    // Reset slider position when new images are loaded
    setSliderPosition(50);
  }, [originalImage, processedImage]);

  return (
    <div className="w-full flex flex-col items-center animate-scale-in">
      <div className="w-full max-w-xl mb-6 relative h-[400px] md:h-[500px] overflow-hidden rounded-2xl glass-panel">
        {isProcessing ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          </div>
        ) : (
          <>
            <div
              ref={containerRef}
              className="relative w-full h-full overflow-hidden"
            >
              {/* Original Image */}
              <div className="absolute inset-0">
                <img 
                  src={originalImage} 
                  alt="Original" 
                  className="w-full h-full object-contain"
                />
              </div>
              
              {/* Processed Image */}
              <div 
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img 
                  src={processedImage} 
                  alt="Processed" 
                  className="w-full h-full object-contain"
                  style={{ 
                    width: `${100 / (sliderPosition / 100)}%`,
                    maxWidth: 'unset',
                  }}
                />
              </div>
              
              {/* Slider */}
              <div
                ref={sliderRef}
                className="absolute top-0 bottom-0 w-1 bg-primary cursor-ew-resize"
                style={{ left: `${sliderPosition}%` }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
              >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <div className="w-1 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      
      <Button 
        className="glass-button text-white flex items-center gap-2 px-6 py-6 text-lg"
        onClick={handleDownload}
        disabled={isProcessing}
      >
        <Download className="w-5 h-5" />
        تحميل الصورة
      </Button>
    </div>
  );
};

export default ImageCompare;
