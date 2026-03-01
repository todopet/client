import { z } from "zod";

export const categorySchema = z.object({
  category: z
    .string()
    .trim()
    .min(1, "목표를 입력해 주세요.")
    .max(50, "목표는 50자 이하여야 합니다."),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
