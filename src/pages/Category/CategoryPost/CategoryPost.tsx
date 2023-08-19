import ConfirmModal from "@/components/ConfirmModal/ConfirmModal";

export default function CategoryPost() {
    return (
        <>
            <ConfirmModal texts={["이것은 A입니다.", "이것은 B입니다."]} />
            <div>Category</div>
        </>
    );
}
