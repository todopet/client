import { useLoadingStore } from "@/store/loadingStore";

export const GlobalLoading = () => {
  const isLoading = useLoadingStore((state) => state.isLoading);

  if (!isLoading) {
    return null;
  }

  return (
    <div className="fixed left-0 top-0 z-50 h-1 w-full">
      <div className="h-full w-full animate-pulse bg-[#4195f5]" />
    </div>
  );
};
