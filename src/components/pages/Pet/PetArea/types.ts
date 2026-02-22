export interface HungerInfo {
  curHunger: number;
  maxHunger: number;
}

export interface AffectionInfo {
  curAffection: number;
  maxAffection: number;
}

export interface ConditionInfo {
  curCondition: number;
  maxCondition: number;
}

export interface CleanlinessInfo {
  curCleanliness: number;
  maxCleanliness: number;
}

export interface ExpInfo {
  curExperience: number;
  maxExperience: number;
}

export interface PetAreaProps {
  hungerInfo: HungerInfo;
  affectionInfo: AffectionInfo;
  conditionInfo: ConditionInfo;
  cleanlinessInfo: CleanlinessInfo;
  expInfo: ExpInfo;
  levelInfo: number | null;
  petName: string;
}

export type PetEmotion = "joy" | "sad" | "normal";
