import { z } from "zod";

export const todoSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "할 일을 입력해 주세요.")
    .max(100, "할 일은 100자 이하여야 합니다."),
});

export type TodoFormValues = z.infer<typeof todoSchema>;
