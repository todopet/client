import ConfirmModal from "@/components/ConfirmModal/ConfirmModal";

function CategoryPost() {
    const handleConfirm = () => {
        console.log("예를 클릭했습니다.");
    };

    const handleCancel = () => {
        console.log("아니오를 클릭했습니다.");
    };

    return (
        <>
            <ConfirmModal
                message="이것은 A입니다. 이것은 B입니다."
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
            <div>Category</div>
        </>
    );
}

export default CategoryPost;
