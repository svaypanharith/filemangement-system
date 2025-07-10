export const getLocalStorage = (key: string): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key);
  }
  return null;
};

export const setLocalStorage = (key: string, value: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, value);
  }
};

export const removeLocalStorage = (key: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
};

// User image storage utilities
export const setUserImage = (userId: string, imageData: {
  userId: string;
  imageDataUrl: string;
  fileName: string;
  fileType: string;
  timestamp: number;
}): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(`user_image_${userId}`, JSON.stringify(imageData));
  }
};

export const getUserImage = (userId: string): {
  userId: string;
  imageDataUrl: string;
  fileName: string;
  fileType: string;
  timestamp: number;
} | null => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(`user_image_${userId}`);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error('Error parsing user image data:', error);
        return null;
      }
    }
  }
  return null;
};

export const removeUserImage = (userId: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(`user_image_${userId}`);
  }
}; 