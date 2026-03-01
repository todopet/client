import { formatDate, formatDateKST } from "@/libs/utils/dateUtils";

const formatDateToString = (date: Date | string): string => formatDate(date);

const setKoreaTime = (date: Date): string => formatDateKST(date);

export { formatDateToString, setKoreaTime };
