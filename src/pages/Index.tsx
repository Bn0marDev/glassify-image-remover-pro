import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import ImageDropzone from '@/components/ImageDropzone';
import ImageCompare from '@/components/ImageCompare';
import { removeBackground } from '@/services/removeBgService';
import { toast } from "sonner";
import { WandSparkles, Check, Image as ImageIcon } from 'lucide-react';

const Index: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageSelect = async (file: File) => {
    try {
      setIsProcessing(true);
      setOriginalImage(URL.createObjectURL(file));
      
      // Show processing toast
      toast.loading('جاري إزالة الخلفية...', { duration: 10000, id: 'removing-bg' });
      
      // Process image with remove.bg API
      const result = await removeBackground(file);
      
      // Update UI with results
      setProcessedImage(result.resultUrl);
      
      // Show success toast
      toast.success('تم إزالة الخلفية بنجاح!', { id: 'removing-bg' });
    } catch (error) {
      console.error('Error processing image:', error);
      toast.error('حدث خطأ أثناء معالجة الصورة', { id: 'removing-bg' });
      // Keep the original image but clear processed
      setProcessedImage(null);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 flex flex-col items-center justify-center gap-10 py-12">
        {/* Hero glow effects */}
        <div className="hero-glow top-20 left-1/4"></div>
        <div className="hero-glow bottom-20 right-1/4"></div>
        
        {/* Hero section */}
        <div className="text-center max-w-3xl mx-auto animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            أزل خلفية صورتك <span className="text-primary">بسرعة وبسهولة</span>
          </h1>
          <p className="text-xl text-white/70 mb-8">
            تقنية الذكاء الاصطناعي التي تزيل خلفيات الصور باحترافية وبسرعة فائقة，
            احصل على صور بدون خلفية بنقرة واحدة فقط
          </p>
        </div>
        
        {/* Main content */}
        <div className="w-full max-w-4xl mx-auto mb-12">
          {!originalImage || !processedImage ? (
            <div className="glass-panel p-8 md:p-12 animate-slide-in-bottom">
              <ImageDropzone onImageSelect={handleImageSelect} isProcessing={isProcessing} />
            </div>
          ) : (
            <ImageCompare 
              originalImage={originalImage} 
              processedImage={processedImage} 
              isProcessing={isProcessing} 
            />
          )}
        </div>
        
        {/* Features */}
        <section id="features" className="w-full max-w-4xl mx-auto py-12">
          <h2 className="text-3xl font-bold mb-12 text-center">المميزات الرئيسية</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <WandSparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">تقنية ذكاء اصطناعي متطورة</h3>
              <p className="text-white/70">تقنية متطورة للتعرف على الصور وإزالة الخلفية باحترافية فائقة</p>
            </div>
            
            <div className="glass-panel p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Check className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">سرعة ودقة عالية</h3>
              <p className="text-white/70">معالجة سريعة للصور مع الحفاظ على جودة عالية ودقة في التفاصيل</p>
            </div>
            
            <div className="glass-panel p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <ImageIcon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">دعم لجميع أنواع الصور</h3>
              <p className="text-white/70">يعمل مع صور الأشخاص، المنتجات، الحيوانات وجميع أنواع الصور الأخرى</p>
            </div>
          </div>
        </section>
        
        {/* How it works */}
        <section id="how-it-works" className="w-full max-w-4xl mx-auto py-12">
          <h2 className="text-3xl font-bold mb-12 text-center">كيف يعمل؟</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4 relative">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">ارفع الصورة</h3>
              <p className="text-white/70">قم برفع الصورة التي تريد إزالة خلفيتها بالسحب والإفلات</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">انتظر المعالجة</h3>
              <p className="text-white/70">سيقوم النظام تلقائياً بمعالجة الصورة وإزالة الخلفية</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">تحميل النتيجة</h3>
              <p className="text-white/70">قم بتحميل الصورة النهائية بدون خلفية بصيغة PNG</p>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="mt-auto py-8 glass-panel border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} Glassify - جميع الحقوق محفوظة
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
