import { inventory } from "@/modules/icons";
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
} from "@/components/pages/Pet/PetArea/PetArea.styles";
import { CircleButton } from "@/components/CircleButton";
import { Exp } from "@/components/pages/Pet/Exp";
import { Status } from "@/components/pages/Pet/Status";
import { Stars } from "@/components/pages/Pet/Stars";
import { useState, useEffect } from "react";
import { InventoryModal } from "@/components/pages/Pet/Inventory";
import { ModalBg } from "@/components/pages/Pet/Inventory/Inventory.styles";
import { itemsCount, res } from "@/@types";
import { axiosRequest } from "@/api";
import { notifyApiError } from "@/libs/utils/notifyApiError";
import { maxVolume } from "@/libs/constants";
import {
  PET_EMOTION_POSITION_CONFIG,
  PET_IMAGE_SIZE_CONFIG,
} from "@/libs/constants/petConfig";
import { usePetEmotion } from "@/components/pages/Pet/PetArea/hooks/usePetEmotion";
import { PetAreaProps } from "@/components/pages/Pet/PetArea/types";
import { API_ENDPOINTS } from "@/api/endpoints";

export const PetArea = ({
  hungerInfo,
  affectionInfo,
  conditionInfo,
  cleanlinessInfo,
  expInfo,
  levelInfo,
  petName,
}: PetAreaProps) => {
  const [achState, setAchState] = useState(false);
  const [invState, setInvState] = useState(false);
  const [isFull, setIsFull] = useState(false);

  const toggleAchState = () => {
    setAchState(!achState);
  };
  const toggleInvState = () => {
    setInvState(!invState);
  };

  const { curHunger, maxHunger } = hungerInfo;
  const { curAffection, maxAffection } = affectionInfo;
  const { curCondition, maxCondition } = conditionInfo;
  const { curCleanliness, maxCleanliness } = cleanlinessInfo;
  const { curExperience, maxExperience } = expInfo;

  const level = levelInfo ?? 0;
  const petImgSize = PET_IMAGE_SIZE_CONFIG[level] ?? PET_IMAGE_SIZE_CONFIG[0];
  const emotionPosition = PET_EMOTION_POSITION_CONFIG[level] ?? PET_EMOTION_POSITION_CONFIG[0];

  const calculatePercent = (current: number, max: number) => {
    if (max <= 0) {
      return 0;
    }
    return Math.round((current / max) * 100);
  };

  const hungerPercent = calculatePercent(curHunger, maxHunger);
  const affectionPercent = calculatePercent(curAffection, maxAffection);
  const conditionPercent = calculatePercent(curCondition, maxCondition);
  const cleanlinessPercent = calculatePercent(curCleanliness, maxCleanliness);
  const petEmotion = usePetEmotion(
    hungerPercent,
    affectionPercent,
    conditionPercent,
    cleanlinessPercent
  );

  const isInventoryFull = async () => {
    try {
      const response: res<itemsCount> = await axiosRequest.requestAxios<res<itemsCount>>(
        "get",
        API_ENDPOINTS.INVENTORY.ITEMS_COUNT,
        {}
      );
      setIsFull(response.data.count >= maxVolume);
    } catch (error) {
      notifyApiError(
        error,
        "아이템 개수 정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요."
      );
    }
  };

  // 펫화면 처음 들어갔을때 뿐만 아니라 인벤토리창을 닫았을 때에도 아이템 개수가 50개 이상인지 아닌지 체크해야되니까 invState가 변할때를 기준으로 isInventoryFull 함수 실행.
  // deps에 invState하면 인벤토리를 열었을때도 실행되는데 인벤토리 열때는 실행할 필요 없으므로 invState가 바뀌었을때 얘가 false일때(=> 인벤토리창을 닫았을때)만 함수 실행
  useEffect(() => {
    if (!invState) isInventoryFull();
  }, [invState]);

  return (
    <MainArea>
      <Exp totalCount={maxExperience} currentCount={curExperience}></Exp>
      <MainHeader>
        <StatusInfo>
          <Status
            name="포만감"
            color="#FF5156"
            totalCount={maxHunger}
            currentCount={curHunger}
          ></Status>
          <Status
            name="친밀도"
            color="#FFE210"
            totalCount={maxAffection}
            currentCount={curAffection}
          ></Status>
          <Status
            name="컨디션"
            color="#45E397"
            totalCount={maxCondition}
            currentCount={curCondition}
          ></Status>
          <Status
            name="청결도"
            color="#0190FE"
            totalCount={maxCleanliness}
            currentCount={curCleanliness}
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
          width={petImgSize.petImgWidth}
          height={petImgSize.petImgHeight}
          left={petImgSize.petImgLeft}
          bottom={petImgSize.petImgBottom}
        >
          {petEmotion !== "normal" && (
            <EmotionImg
              status={petEmotion}
              width={emotionPosition.emotionPositionWidth}
              height={emotionPosition.emotionPositionHeight}
              top={emotionPosition.emotionPositionTop}
              left={emotionPosition.emotionPositionLeft}
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
        {achState && <AchModalBackdrop className="" onClick={toggleAchState} />}

        <InventoryModal on={invState} />
        {invState && <ModalBg onClick={toggleInvState} />}
      </MainFooter>
    </MainArea>
  );
};

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

export const FooterButton = ({ className, url, color, border, onClick }: footerButton) => {
  return (
    <CircleButton
      className={className}
      url={url}
      color={color}
      border={border}
      onClick={onClick}
    ></CircleButton>
  );
};

export const MainModalBackdrop = ({ className, onClick }: modalBackdrop) => {
  return (
    <div
      className={[
        "fixed inset-0 z-[1000] flex items-center justify-center bg-[rgba(0,0,0,0.58)] backdrop-blur-sm w-full h-screen left-1/2 -translate-x-1/2",
        className,
      ].join(" ")}
      onClick={onClick}
    />
  );
};
