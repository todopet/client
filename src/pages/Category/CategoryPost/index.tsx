import { CategoryHeader } from "@/components/pages/Category/CategoryHeader";
import {
  CategoryContentPost,
} from "@/components/pages/Category/CategoryContent/CategoryContentPost";
import { ApiResponse, Category } from "@/@types";
import { axiosRequest } from "@/api";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
    notifyApiError,
    notifySuccessMessage
} from "@/libs/utils/notifyApiError";
import { API_ENDPOINTS } from "@/api/endpoints";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema, type CategoryFormValues } from "@/schemas/category.schema";

const CategoryPost = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("categoryId");
    const subject = id ? "수정" : "등록";
    const navigate = useNavigate();
    const {
      handleSubmit,
      setValue,
      trigger,
      watch,
      formState: { errors, isSubmitting },
    } = useForm<CategoryFormValues>({
      resolver: zodResolver(categorySchema),
      mode: "onBlur",
      defaultValues: {
        category: "",
      },
    });

    const addCategories = async (category: string) => {
        try {
            const response: ApiResponse<Category> = await axiosRequest.requestAxios<
                ApiResponse<Category>
            >("post", API_ENDPOINTS.CATEGORY.LIST, { category: category.trim() });

            if (!response.error) {
                notifySuccessMessage("목표가 등록되었습니다.");
                navigate("/category/list");
            } else {
                throw new Error("목표 등록에 실패했습니다.");
            }
        } catch (error) {
            notifyApiError(error, "목표 등록에 실패했습니다. 다시 시도해 주세요.");
        }
    };

    const editCategories = async (category: string) => {
        try {
            const response: ApiResponse<Category> = await axiosRequest.requestAxios<
                ApiResponse<Category>
            >("patch", API_ENDPOINTS.CATEGORY.ITEM(id!), { category: category.trim() });

            if (!response.error) {
                notifySuccessMessage("목표가 수정되었습니다.");
                navigate("/category/list");
            } else {
                throw new Error("목표 수정에 실패했습니다.");
            }
        } catch (error) {
            notifyApiError(error, "목표 수정에 실패했습니다. 다시 시도해 주세요.");
        }
    };

    const handleInputText = (text: string) => {
        setValue("category", text, { shouldValidate: true });
    };

    const onSubmit = async ({ category }: CategoryFormValues) => {
        if (id) {
            await editCategories(category);
        } else {
            await addCategories(category);
        }
    };

    const handleConfirmClick = () => {
      void handleSubmit(onSubmit)();
    };

    return (
        <>
            <CategoryHeader
                subject={subject}
                handleClick={handleConfirmClick}
                isSubmitting={isSubmitting}
            ></CategoryHeader>
            <CategoryContentPost
                subject={subject}
                onTextSend={handleInputText}
                id={id}
                value={watch("category")}
                errorMessage={errors.category?.message}
                onInputBlur={() => {
                  void trigger("category");
                }}
            ></CategoryContentPost>
        </>
    );
};
export default CategoryPost;
