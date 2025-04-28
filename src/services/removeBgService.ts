
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface RemoveBgResult {
  resultUrl: string;
  originalUrl: string;
}

export async function removeBackground(imageFile: File): Promise<RemoveBgResult> {
  try {
    // Convert the image file to base64
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(imageFile);
    });
    
    // Call our Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('remove-bg', {
      body: { image: base64 }
    });
    
    if (error) throw error;
    
    const originalUrl = URL.createObjectURL(imageFile);
    return { 
      resultUrl: data.resultUrl, 
      originalUrl 
    };
  } catch (error) {
    console.error('Error removing background:', error);
    toast.error('حدث خطأ أثناء معالجة الصورة');
    throw error;
  }
}
