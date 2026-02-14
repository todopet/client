/**
 * API 엔드포인트 상수 정의
 *
 * 모든 API 경로를 중앙에서 관리하여 타입 안전성과 유지보수성을 향상시킵니다.
 */

export const API_ENDPOINTS = {
  // 인증 관련
  AUTH: {
    CHECK: 'users/auth',
    LOGIN: 'login',
    LOGOUT: 'logout',
    WITHDRAW: 'withdraw',
  },

  // 사용자 관련
  USER: {
    INFO: 'users',
    RANK: (count: number) => `users/rank/${count}`,
  },

  // Todo 관련
  TODO: {
    CONTENTS: 'todoContents',
    CONTENT: (id: string) => `todoContents/${id}`,
    CONTENTS_BY_DATE: (start: string, end: string) =>
      `todoContents?start=${start}&end=${end}`,
  },

  // 카테고리 관련
  CATEGORY: {
    LIST: 'todoCategories',
    ITEM: (id: string) => `todoCategories/${id}`,
  },

  // 펫 관련
  PET: {
    INFO: 'myPets',
  },

  // 인벤토리 관련
  INVENTORY: {
    ITEMS_COUNT: 'inventories/itemsCount',
    ITEMS: 'inventories',
  },
} as const;

// 타입 추론을 위한 헬퍼
export type ApiEndpoint = typeof API_ENDPOINTS;
