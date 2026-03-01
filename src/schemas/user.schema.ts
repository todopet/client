import { z } from "zod";

const nicknameRegex = /^[가-힣a-zA-Z0-9]+$/;

export const nicknameSchema = z.object({
  nickname: z
    .string()
    .trim()
    .min(1, "닉네임을 입력하세요.")
    .max(8, "닉네임은 8글자 이하여야 합니다.")
    .regex(nicknameRegex, "닉네임은 한글/영어/숫자만 입력할 수 있습니다."),
});

export type NicknameFormValues = z.infer<typeof nicknameSchema>;
