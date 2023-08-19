import React from "react";
import styled from "styled-components";

import Star from "@/components/Star/Star";

interface StarsProps {
    level: number;
}

export default function Stars({ level }: StarsProps) {
    const starStatus: ("empty" | "full")[] = [
        "empty",
        "empty",
        "empty",
        "empty",
        "empty"
    ];
    for (let i = 0; i < level; i++) {
        starStatus[i] = "full";
    }

    return (
        <StarWrap>
            {starStatus.map((status) => {
                return <Star status={status} />;
            })}
        </StarWrap>
    );
}

const StarWrap = styled.div`
    display: flex;
    gap: 6px;
`;
