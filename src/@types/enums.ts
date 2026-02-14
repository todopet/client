/**
 * 프로젝트 전반에 사용되는 Enum 정의
 */

/**
 * Todo 상태
 */
export enum TodoStatus {
  UNCHECKED = 'unchecked',
  COMPLETED = 'completed',
  REVERTED = 'reverted',
}

/**
 * 펫 감정 상태
 */
export enum PetEmotion {
  JOY = 'joy',
  SAD = 'sad',
  NORMAL = 'normal',
}

/**
 * 펫 레벨 (0-5)
 */
export enum PetLevel {
  LEVEL_0 = 0,
  LEVEL_1 = 1,
  LEVEL_2 = 2,
  LEVEL_3 = 3,
  LEVEL_4 = 4,
  LEVEL_5 = 5,
}

/**
 * 펫 상태 타입
 */
export enum PetStatusType {
  HUNGER = 'hunger',
  AFFECTION = 'affection',
  CONDITION = 'condition',
  CLEANLINESS = 'cleanliness',
}

/**
 * Toast 메시지 타입
 */
export enum ToastType {
  SPECIAL = "SPECIAL",
  NORMAL = "NORMAL",
  RECEIVED = "RECEIVED",
  ALL_RECEIVED = "ALL_RECEIVED",
  FULL = "FULL",
}

/**
 * 사용자 상태
 */
export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}
