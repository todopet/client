export interface dumpItemRes {
    createdAt: string;
    updatedAt: string;
    userId: string;
    _id: string;
    items: item[];
}

interface item {
    item: string;
    quantity: number;
    _id: string;
}
