export interface PetImageSizeConfig {
  petImgWidth: number;
  petImgHeight: number;
  petImgLeft: number;
  petImgBottom: number;
}

export interface PetEmotionPositionConfig {
  emotionPositionWidth: number;
  emotionPositionHeight: number;
  emotionPositionTop: number;
  emotionPositionLeft: number;
}

export const PET_IMAGE_SIZE_CONFIG: Record<number, PetImageSizeConfig> = {
  0: { petImgWidth: 25, petImgHeight: 15, petImgLeft: 36.5, petImgBottom: 9 },
  1: { petImgWidth: 43, petImgHeight: 20, petImgLeft: 27.2, petImgBottom: 7.7 },
  2: { petImgWidth: 50, petImgHeight: 25, petImgLeft: 22, petImgBottom: 4.7 },
  3: { petImgWidth: 42, petImgHeight: 20, petImgLeft: 18, petImgBottom: 25 },
  4: { petImgWidth: 53, petImgHeight: 30, petImgLeft: 26, petImgBottom: 6 },
  5: { petImgWidth: 65, petImgHeight: 45, petImgLeft: 23, petImgBottom: 25 },
};

export const PET_EMOTION_POSITION_CONFIG: Record<number, PetEmotionPositionConfig> = {
  0: {
    emotionPositionWidth: 50,
    emotionPositionHeight: 60,
    emotionPositionTop: -50,
    emotionPositionLeft: 75,
  },
  1: {
    emotionPositionWidth: 35,
    emotionPositionHeight: 45,
    emotionPositionTop: -3,
    emotionPositionLeft: 65,
  },
  2: {
    emotionPositionWidth: 30,
    emotionPositionHeight: 40,
    emotionPositionTop: 2,
    emotionPositionLeft: 70,
  },
  3: {
    emotionPositionWidth: 35,
    emotionPositionHeight: 48,
    emotionPositionTop: -26,
    emotionPositionLeft: 73,
  },
  4: {
    emotionPositionWidth: 38,
    emotionPositionHeight: 30,
    emotionPositionTop: -9,
    emotionPositionLeft: 53,
  },
  5: {
    emotionPositionWidth: 30,
    emotionPositionHeight: 20,
    emotionPositionTop: 9,
    emotionPositionLeft: 49,
  },
};

export const EMOTION_THRESHOLDS = {
  JOY: 80,
  SAD: 30,
} as const;
