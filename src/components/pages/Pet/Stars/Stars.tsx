import Star from "@/components/Star/Star";

interface StarsProps {
    level: number | null;
}

export default function Stars({ level }: StarsProps) {
    const starStatus: ("empty" | "full")[] = [
        "empty",
        "empty",
        "empty",
        "empty",
        "empty"
    ];
    if (level !== null) {
        for (let i = 0; i < level; i++) {
            starStatus[i] = "full";
        }
    }

    return (
        <div className="flex gap-[6px]">
            {starStatus.map((status, idx) => (
                <Star key={idx} status={status} />
            ))}
        </div>
    );
}
