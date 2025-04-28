
import { toast } from "sonner";

const API_KEY = "YOUR_API_KEY"; // Users will need to replace this with their actual API key

export interface RemoveBgResult {
  resultUrl: string;
  originalUrl: string;
}

export async function removeBackground(imageFile: File): Promise<RemoveBgResult> {
  try {
    const formData = new FormData();
    formData.append('image_file', imageFile);
    
    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': API_KEY,
      },
      body: formData,
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.errors?.[0]?.title || 'Failed to remove background');
    }
    
    const blob = await response.blob();
    const resultUrl = URL.createObjectURL(blob);
    const originalUrl = URL.createObjectURL(imageFile);
    
    return { resultUrl, originalUrl };
  } catch (error) {
    console.error('Error removing background:', error);
    toast.error(error instanceof Error ? error.message : 'Failed to process image');
    throw error;
  }
}
