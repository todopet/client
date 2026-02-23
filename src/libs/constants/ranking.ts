export const RANKING_CONFIG = {
  // 백엔드 users/rank/:count API에 전달하는 초기 count 값
  INITIAL_FETCH_COUNT: 2,
  TOP_THREE_ORDER: [2, 1, 3] as const,
  TOP_THREE_COUNT: 3,
} as const;
