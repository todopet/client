import ranking from "@/assets/icons/ranking.svg";
import inventory from "@/assets/icons/inventory.svg";
import {
    MainFooter,
    MainArea,
    PetImg,
    EmotionImg,
    MainHeader,
    StatusInfo,
    MainBody,
    LevelInfo,
    PetLevelNameArea,
    LevelStar,
    Level,
    StarWrapper,
    PetNameBox,
    PetName,
    MainFooterButton,
    InventoryFullImg,
    AchModalBackdrop,
    AchModal,
    AchModalTitle,
    AchArea,
    AchWrapper
} from "./PetArea.styles";
import CircleButton from "@/components/CircleButton/CircleButton";
import Exp from "@/components/pages/Pet/Exp/Exp";
import Status from "@/components/pages/Pet/Status/Status";
import Stars from "@/components/pages/Pet/Stars/Stars";
import { useState, useEffect } from "react";
import { ModalBackdrop } from "@/components/pages/MyPage/UserInfo/UserInfo.styles";
import Achievement from "@/components/pages/Pet/Achievement/Achievement";
import InventoryModal from "@/components/pages/Pet/Inventory/Inventory";
import { ModalBg } from "../Inventory/Inventory.styles";
import { itemsCount, res } from "@/@types";
import axiosRequest from "@/api";
import { maxVolume } from "@/libs/constants";

interface petAreaProps {
    hungerInfo: object;
    affectionInfo: object;
    conditionInfo: object;
    cleanlinessInfo: object;
    expInfo: object;
    levelInfo: number | null;
    petName: string;
}

interface PetHungerProps {
    curHunger?: number;
    maxHunger?: number;
}

interface PetAffectionProps {
    curAffection?: number;
    maxAffection?: number;
}

interface PetConditionProps {
    curCondition?: number;
    maxCondition?: number;
}

interface PetCleanlinessProps {
    curCleanliness?: number;
    maxCleanliness?: number;
}

interface PetExperienceProps {
    curExperience?: number;
    maxExperience?: number;
}

export function PetArea({
    hungerInfo,
    affectionInfo,
    conditionInfo,
    cleanlinessInfo,
    expInfo,
    levelInfo,
    petName
}: petAreaProps) {
    const [achState, setAchState] = useState(false);
    const [invState, setInvState] = useState(false);
    const toggleAchState = () => {
        setAchState(!achState);
    };
    const toggleInvState = () => {
        setInvState(!invState);
    };

    const { curHunger, maxHunger }: PetHungerProps = hungerInfo;
    const { curAffection, maxAffection }: PetAffectionProps = affectionInfo;
    const { curCondition, maxCondition }: PetConditionProps = conditionInfo;
    const { curCleanliness, maxCleanliness }: PetCleanlinessProps =
        cleanlinessInfo;
    const { curExperience, maxExperience }: PetExperienceProps = expInfo;
    const level: number | null = levelInfo;
    // const level: number = 4;

    const [isFull, setIsFull] = useState(false);

    let petImgSize = {};
    let emotionPosition = {};

    // 펫이 레벨별로 사이즈가 달라서 이미지 영역 크기와 위치를 레벨별로 지정해줘야 할듯.. 감정표현 이미지도
    switch (level) {
        case 0:
            petImgSize = {
                petImgWidth: 25,
                petImgHeight: 15,
                petImgLeft: 36.5,
                petImgBottom: 9
            };
            emotionPosition = {
                emotionPositionWidth: 50,
                emotionPositionHeight: 60,
                emotionPositionTop: -50,
                emotionPositionLeft: 75
            };
            break;
        case 1:
            petImgSize = {
                petImgWidth: 43,
                petImgHeight: 20,
                petImgLeft: 27.2,
                petImgBottom: 7.7
            };
            emotionPosition = {
                emotionPositionWidth: 35,
                emotionPositionHeight: 45,
                emotionPositionTop: -3,
                emotionPositionLeft: 65
            };
            break;
        case 2:
            petImgSize = {
                petImgWidth: 50,
                petImgHeight: 25,
                petImgLeft: 22,
                petImgBottom: 4.7
            };
            emotionPosition = {
                emotionPositionWidth: 30,
                emotionPositionHeight: 40,
                emotionPositionTop: 2,
                emotionPositionLeft: 70
            };
            break;
        case 3:
            petImgSize = {
                petImgWidth: 42,
                petImgHeight: 20,
                petImgLeft: 18,
                petImgBottom: 25
            };
            emotionPosition = {
                emotionPositionWidth: 35,
                emotionPositionHeight: 48,
                emotionPositionTop: -26,
                emotionPositionLeft: 73
            };
            break;
        case 4:
            petImgSize = {
                petImgWidth: 53,
                petImgHeight: 30,
                petImgLeft: 26,
                petImgBottom: 6
            };
            emotionPosition = {
                emotionPositionWidth: 38,
                emotionPositionHeight: 30,
                emotionPositionTop: -9,
                emotionPositionLeft: 53
            };
            break;
        case 5:
            petImgSize = {
                petImgWidth: 65,
                petImgHeight: 45,
                petImgLeft: 23,
                petImgBottom: 25
            };
            emotionPosition = {
                emotionPositionWidth: 30,
                emotionPositionHeight: 20,
                emotionPositionTop: 9,
                emotionPositionLeft: 49
            };
            break;
    }

    const { petImgWidth, petImgHeight, petImgLeft, petImgBottom } =
        petImgSize as {
            petImgWidth: number;
            petImgHeight: number;
            petImgLeft: number;
            petImgBottom: number;
        };

    const {
        emotionPositionWidth,
        emotionPositionHeight,
        emotionPositionTop,
        emotionPositionLeft
    } = emotionPosition as {
        emotionPositionWidth: number;
        emotionPositionHeight: number;
        emotionPositionTop: number;
        emotionPositionLeft: number;
    };

    const hungerPercent =
        curHunger !== undefined && maxHunger !== undefined
            ? Math.round((curHunger / maxHunger) * 100)
            : 0;
    const affectionPercent =
        curAffection !== undefined && maxAffection !== undefined
            ? Math.round((curAffection / maxAffection) * 100)
            : 0;
    const conditionPercent =
        curCondition !== undefined && maxCondition !== undefined
            ? Math.round((curCondition / maxCondition) * 100)
            : 0;
    const cleanlinessPercent =
        curCleanliness !== undefined && maxCleanliness !== undefined
            ? Math.round((curCleanliness / maxCleanliness) * 100)
            : 0;

    const findPetEmotion = () => {
        if (
            hungerPercent >= 80 &&
            affectionPercent >= 80 &&
            conditionPercent >= 80 &&
            cleanlinessPercent >= 80
        )
            return "joy";
        else if (
            hungerPercent < 30 ||
            affectionPercent < 30 ||
            conditionPercent < 30 ||
            cleanlinessPercent < 30
        )
            return "sad";
        else return "normal";
    };

    const isInventoryFull = async () => {
        try {
            const response: res<itemsCount> = await axiosRequest.requestAxios<
                res<itemsCount>
            >("get", "inventories/itemsCount", {});
            setIsFull(response.data.count >= maxVolume);
        } catch (error) {
            alert(
                "아이템 개수 정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요."
            );
            console.error("Error fetching pet data: ", error);
        }
    };

    // 펫화면 처음 들어갔을때 뿐만 아니라 인벤토리창을 닫았을 때에도 아이템 개수가 50개 이상인지 아닌지 체크해야되니까 invState가 변할때를 기준으로 isInventoryFull 함수 실행.
    // deps에 invState하면 인벤토리를 열었을때도 실행되는데 인벤토리 열때는 실행할 필요 없으므로 invState가 바뀌었을때 얘가 false일때(=> 인벤토리창을 닫았을때)만 함수 실행
    useEffect(() => {
        if (!invState) isInventoryFull();
    }, [invState]);

    return (
        <MainArea>
            <Exp totalcount={maxExperience} currentcount={curExperience}></Exp>
            <MainHeader>
                <StatusInfo>
                    <Status
                        name="포만감"
                        color="#FF5156"
                        totalcount={maxHunger}
                        currentcount={curHunger}
                    ></Status>
                    <Status
                        name="친밀도"
                        color="#FFE210"
                        totalcount={maxAffection}
                        currentcount={curAffection}
                    ></Status>
                    <Status
                        name="컨디션"
                        color="#45E397"
                        totalcount={maxCondition}
                        currentcount={curCondition}
                    ></Status>
                    <Status
                        name="청결도"
                        color="#0190FE"
                        totalcount={maxCleanliness}
                        currentcount={curCleanliness}
                    ></Status>
                </StatusInfo>
                <LevelInfo>
                    <Stars level={level} />
                    <PetLevelNameArea>
                        <StarWrapper>
                            <LevelStar>
                                <Level>{level}</Level>
                            </LevelStar>
                        </StarWrapper>
                        <PetNameBox>
                            <PetName>{petName}</PetName>
                        </PetNameBox>
                    </PetLevelNameArea>
                </LevelInfo>
            </MainHeader>
            <MainBody>
                <PetImg
                    level={level}
                    width={petImgWidth}
                    height={petImgHeight}
                    left={petImgLeft}
                    bottom={petImgBottom}
                >
                    {findPetEmotion() !== "normal" && (
                        <EmotionImg
                            status={findPetEmotion()}
                            width={emotionPositionWidth}
                            height={emotionPositionHeight}
                            top={emotionPositionTop}
                            left={emotionPositionLeft}
                        />
                    )}
                </PetImg>
            </MainBody>
            <MainFooter>
                {/* <MainFooterButton className="" url={ranking} color="#56ABF9" border="1px" onClick={toggleAchState} /> */}
                <MainFooterButton
                    className=""
                    url={inventory}
                    color="#F7CF68"
                    border="1px"
                    onClick={toggleInvState}
                />
                {isFull && <InventoryFullImg />}
                {/* <AchModal on={achState}>
					{ achState && <AchModalTitle>업적</AchModalTitle> }  모달창 크기가 0인 상태에서도 '업적' 텍스트가 화면에 나와서 모달창 꺼져있을땐 아예 안나오게 처리
					<AchArea>
						<AchWrapper>
							<Achievement achName="첫 Todo 완료하기" isRewarded={false} achDone={false} totalCount={3} currentCount={2} />
							<Achievement achName="첫 Todo 완료하기" isRewarded={false} achDone={true} totalCount={1} currentCount={1} />
							<Achievement achName="첫 Todo 완료하기" isRewarded={true} achDone={true} totalCount={2} currentCount={2} />
							<Achievement achName="첫 Todo 완료하기" isRewarded={false} achDone={true} totalCount={2} currentCount={2} />
							<Achievement achName="첫 Todo 완료하기" isRewarded={true} achDone={true} totalCount={2} currentCount={2} />
							<Achievement achName="첫 Todo 완료하기" isRewarded={true} achDone={true} totalCount={5} currentCount={5} />
							<Achievement achName="첫 Todo 완료하기" isRewarded={false} achDone={true} totalCount={3} currentCount={3} />
							<Achievement achName="첫 Todo 완료하기" isRewarded={false} achDone={false} totalCount={5} currentCount={2} />
						</AchWrapper>
					</AchArea>
				</AchModal> */}
                {achState && (
                    <AchModalBackdrop className="" onClick={toggleAchState} />
                )}

                <InventoryModal on={invState} />
                {invState && <ModalBg onClick={toggleInvState} />}
            </MainFooter>
        </MainArea>
    );
}

interface footerButton {
    className: string;
    url: string;
    color: string;
    border: string;
    onClick(): void;
}

interface modalBackdrop {
    className: string;
    onClick(): void;
}

export function FooterButton({
    className,
    url,
    color,
    border,
    onClick
}: footerButton) {
    return (
        <CircleButton
            className={className}
            url={url}
            color={color}
            border={border}
            onClick={onClick}
        ></CircleButton>
    );
}

export function MainModalBackdrop({ className, onClick }: modalBackdrop) {
    return (
        <ModalBackdrop className={className} onClick={onClick}></ModalBackdrop>
    );
}
