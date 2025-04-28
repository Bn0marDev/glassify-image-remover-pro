
import { supabase } from "@/integrations/supabase/client";

export interface RemoveBgResult {
  resultUrl: string;
  originalUrl: string;
}

export async function removeBackground(imageFile: File): Promise<RemoveBgResult> {
  try {
    const formData = new FormData();
    formData.append('image_file', imageFile);
    
    // Call our Supabase Edge Function instead of directly calling remove.bg API
    const { data, error } = await supabase.functions.invoke('remove-bg', {
      body: { image: formData }
    });
    
    if (error) throw error;
    
    const originalUrl = URL.createObjectURL(imageFile);
    return { 
      resultUrl: data.resultUrl, 
      originalUrl 
    };
  } catch (error) {
    console.error('Error removing background:', error);
    throw error;
  }
}
