// 펫이 레벨별로 이미지 사이즈 지정
const getPetSize = (
    petlevel: number | null
): {
    petImgWidth: number;
    petImgHeight: number;
} => {
    let petImgSize;
    switch (petlevel) {
        case 0:
            petImgSize = { petImgWidth: 31, petImgHeight: 37.4 };
            break;
        case 1:
            petImgSize = { petImgWidth: 53, petImgHeight: 37.4 };
            break;
        case 2:
            petImgSize = { petImgWidth: 59.2, petImgHeight: 34.4 };
            break;
        case 3:
            petImgSize = { petImgWidth: 59.2, petImgHeight: 50 };
            break;
        case 4:
            petImgSize = { petImgWidth: 71.8, petImgHeight: 56.2 };
            break;
        case 5:
            petImgSize = { petImgWidth: 93.6, petImgHeight: 62.4 };
            break;
        default:
            petImgSize = { petImgWidth: 50, petImgHeight: 50 };
    }
    return petImgSize;
};

export default getPetSize;
