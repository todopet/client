import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Tailwind CSS 클래스를 병합하는 유틸리티 함수
 *
 * clsx와 tailwind-merge를 결합하여 조건부 클래스와 충돌하는 Tailwind 클래스를 올바르게 처리합니다.
 *
 * @param inputs - 병합할 클래스 값들
 * @returns 병합된 클래스 문자열
 *
 * @example
 * ```tsx
 * // 기본 사용
 * cn('px-2 py-1', 'bg-blue-500')
 * // => 'px-2 py-1 bg-blue-500'
 *
 * // 조건부 클래스
 * cn('px-2', isActive && 'bg-blue-500')
 * // => 'px-2 bg-blue-500' (isActive가 true일 때)
 *
 * // Tailwind 충돌 해결
 * cn('px-2 py-1', 'px-4')
 * // => 'py-1 px-4' (나중 값이 우선)
 *
 * // 객체 형태
 * cn('px-2', {
 *   'bg-blue-500': isActive,
 *   'bg-gray-500': !isActive
 * })
 *
 * // 배열 형태
 * cn(['px-2', 'py-1'], isActive && 'bg-blue-500')
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
