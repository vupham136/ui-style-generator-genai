export interface UIStyle {
  id: string;
  category: string;
  keywords: string;
  colors: string;
  effects: string;
  imageUrl?: string; // Optional URL for style preview image
}

export interface GeneratedImageResult {
  imageUrl: string | null;
  loading: boolean;
  error: string | null;
}