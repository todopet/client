import styled from "styled-components";

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
        <StarWrap>
            {starStatus.map((status, idx) => {
                return <Star key={idx} status={status} />;
            })}
        </StarWrap>
    );
}

const StarWrap = styled.div`
    display: flex;
    gap: 6px;
`;
