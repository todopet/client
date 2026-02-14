// 새로운 타입 (PascalCase)
export type { User, MyUser, InventoryItem } from './user';
export type { Category, TodoCategory } from './category';
export type { Todo, Message } from './todo';
export type { MyPet, PetInfo } from './myPet';
export type { MyItems, Items, ItemInfo } from './myItems';
export type { DumpItemRes, Item } from './dumpItemRes';
export type { RankInfo, UserInfo } from './ranking';
export type { UseItemRes, ItemUsed, UpdatedPet, Pet } from './useItemRes';
export type { ItemsCount } from './itemsCount';

// Enum
export * from './enums';

// 하위 호환성을 위한 타입 (추후 제거 예정)
export type { user, myUser } from './user';
export type { category, todoCategory } from './category';
export type { todo } from './todo';
export type { myPet } from './myPet';
export type { myItems, items, itemInfo } from './myItems';
export type { dumpItemRes } from './dumpItemRes';
export type { userInfo } from './ranking';
export type { useItemRes } from './useItemRes';
export type { itemsCount } from './itemsCount';

// 기존 ToastTypes enum도 export (하위 호환성)
export { ToastTypes } from './todo';

/**
 * API 응답 기본 타입
 */
export interface ApiResponse<T> {
  status: number;
  error: string | null;
  data: T;
}

/**
 * API 성공 응답
 */
export type ApiSuccessResponse<T> = ApiResponse<T> & {
  error: null;
};

/**
 * API 에러 응답
 */
export interface ApiErrorResponse {
  status: number;
  error: string;
  message?: string;
}

// 하위 호환성을 위한 타입 별칭 (추후 제거 예정)
/** @deprecated Use ApiResponse instead */
export type res<D> = ApiResponse<D>;