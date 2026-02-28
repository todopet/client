import joyEmotion from "@/assets/images/joyEmotion.png";
import sadEmotion from "@/assets/images/sadEmotion.png";
import spinner from "@/assets/images/spinner.gif";

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to preload image: ${src}`));
    img.src = src;
  });
};

export const preloadImages = async (sources: string[]): Promise<void> => {
  try {
    await Promise.all(sources.map((src) => preloadImage(src)));
  } catch (error) {
    console.error("Failed to preload images", error);
  }
};

export const preloadPetImages = async (): Promise<void> => {
  const petImages = Array.from({ length: 6 }, (_, level) => `/petImages/pet-${level}.gif`);
  const emotionImages = [joyEmotion, sadEmotion, spinner];
  await preloadImages([...petImages, ...emotionImages]);
};
