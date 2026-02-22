import { useMemo } from "react";
import { EMOTION_THRESHOLDS } from "@/libs/constants/petConfig";
import { PetEmotion } from "@/components/pages/Pet/PetArea/types";

export const usePetEmotion = (
  hungerPercent: number,
  affectionPercent: number,
  conditionPercent: number,
  cleanlinessPercent: number
): PetEmotion => {
  return useMemo(() => {
    const isJoy =
      hungerPercent >= EMOTION_THRESHOLDS.JOY &&
      affectionPercent >= EMOTION_THRESHOLDS.JOY &&
      conditionPercent >= EMOTION_THRESHOLDS.JOY &&
      cleanlinessPercent >= EMOTION_THRESHOLDS.JOY;

    if (isJoy) {
      return "joy";
    }

    const isSad =
      hungerPercent < EMOTION_THRESHOLDS.SAD ||
      affectionPercent < EMOTION_THRESHOLDS.SAD ||
      conditionPercent < EMOTION_THRESHOLDS.SAD ||
      cleanlinessPercent < EMOTION_THRESHOLDS.SAD;

    if (isSad) {
      return "sad";
    }

    return "normal";
  }, [hungerPercent, affectionPercent, conditionPercent, cleanlinessPercent]);
};
