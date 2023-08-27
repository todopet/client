import ranking from '@/assets/icons/ranking.svg'
import inventory from '@/assets/icons/inventory.svg';
import { MainFooter, MainArea, PetImg, EmotionImg, MainHeader, StatusInfo, MainBody, LevelInfo, MainFooterButton, AchModalBackdrop, AchModal, AchModalTitle, AchArea, AchWrapper } from './PetArea.styles';
import CircleButton from '@/components/CircleButton/CircleButton';
import Exp from '@/components/pages/Pet/Exp/Exp';
import Status from '@/components/pages/Pet/Status/Status';
import Stars from '@/components/pages/Pet/Stars/Stars';
import { useEffect, useState } from 'react';
import { ModalBackdrop } from "@/components/pages/MyPage/UserInfo/UserInfo.styles";
import Achievement from "@/components/pages/Pet/Achievement/Achievement";
import InventoryModal from "@/components/pages/Pet/Inventory/Inventory";
import { ModalBg } from '../Inventory/Inventory.styles';

interface petAreaProps {
	hungerInfo: object;
	affectionInfo: object;
	conditionInfo: object;
	cleanlinessInfo: object;
	expInfo: object;
	levelInfo: number;
	receivePetData(): void;
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

export function PetArea({ hungerInfo, affectionInfo, conditionInfo, cleanlinessInfo, expInfo, levelInfo, receivePetData }: petAreaProps) {
	const [achState, setAchState] = useState(false);
	const [invState, setInvState] = useState(false);
	const toggleAchState = () => {
		setAchState(!achState);
	}
	const toggleInvState = () => {
		setInvState(!invState);
	}

	const {curHunger, maxHunger}: PetHungerProps = hungerInfo;
	const {curAffection, maxAffection}: PetAffectionProps = affectionInfo;
	const {curCondition, maxCondition}: PetConditionProps = conditionInfo;
	const {curCleanliness, maxCleanliness}: PetCleanlinessProps = cleanlinessInfo;
	const {curExperience, maxExperience}: PetExperienceProps = expInfo;
	const level: number = levelInfo;
	// const level: number = 0;

	let petImgSize = {};
	let emotionPosition = {};

	// 펫이 레벨별로 사이즈가 달라서 이미지 영역 크기와 위치를 레벨별로 지정해줘야 할듯.. 감정표현 이미지도
	switch (level) {
		case 0:
			petImgSize = {petImgWidth: 20, petImgHeight: 10, petImgLeft: 30, petImgBottom: 25}
			emotionPosition = {emotionPositionWidth: 50, emotionPositionHeight: 60, emotionPositionTop: -50, emotionPositionLeft: 75}
			break;
		case 1:
			petImgSize = {petImgWidth: 30, petImgHeight: 10, petImgLeft: 28, petImgBottom: 25}
			emotionPosition = {emotionPositionWidth: 50, emotionPositionHeight: 60, emotionPositionTop: -25, emotionPositionLeft: 64}
			break;
		case 2:
			petImgSize = {petImgWidth: 31, petImgHeight: 11, petImgLeft: 26, petImgBottom: 24.5}
			emotionPosition = {emotionPositionWidth: 50, emotionPositionHeight: 60, emotionPositionTop: -35, emotionPositionLeft: 65}
			break;
		case 3:
			petImgSize = {petImgWidth: 35, petImgHeight: 15, petImgLeft: 24, petImgBottom: 25}
			emotionPosition = {emotionPositionWidth: 40, emotionPositionHeight: 48, emotionPositionTop: -35, emotionPositionLeft: 67}
			break;
		case 4:
			petImgSize = {petImgWidth: 50, petImgHeight: 30, petImgLeft: 20, petImgBottom: 21}
			emotionPosition = {emotionPositionWidth: 40, emotionPositionHeight: 25, emotionPositionTop: 5, emotionPositionLeft: 55}
			break;
		case 5:
			petImgSize = {petImgWidth: 65, petImgHeight: 45, petImgLeft: 18, petImgBottom: 25}
			emotionPosition = {emotionPositionWidth: 30, emotionPositionHeight: 20, emotionPositionTop: 15, emotionPositionLeft: 54}
			break;
	}

	const { petImgWidth, petImgHeight, petImgLeft, petImgBottom } = petImgSize as {
		petImgWidth: number;
		petImgHeight: number;
		petImgLeft: number;
		petImgBottom: number;
	};

	const { emotionPositionWidth, emotionPositionHeight, emotionPositionTop, emotionPositionLeft } = emotionPosition as {
		emotionPositionWidth: number; 
		emotionPositionHeight: number; 
		emotionPositionTop: number; 
		emotionPositionLeft: number;
	}

	const hungerPercent = (curHunger !== undefined && maxHunger !== undefined) ? Math.round((curHunger / maxHunger) * 100) : 0;
	const affectionPercent = (curHunger !== undefined && maxHunger !== undefined) ? Math.round((curHunger / maxHunger) * 100) : 0;
	const conditionPercent = (curHunger !== undefined && maxHunger !== undefined) ? Math.round((curHunger / maxHunger) * 100) : 0;
	const cleanlinessPercent = (curHunger !== undefined && maxHunger !== undefined) ? Math.round((curHunger / maxHunger) * 100) : 0;

	const findPetEmotion = () => {
		if (hungerPercent >= 80 && affectionPercent >= 80 && conditionPercent >= 80 && cleanlinessPercent >= 80) return "joy";
		else if (hungerPercent < 30 || affectionPercent < 30 || conditionPercent < 30 || cleanlinessPercent < 30) return "sad";
		else return "normal";
	}

	useEffect(() => {
		receivePetData();
	}, [invState]);

	return (
		<MainArea>
			<Exp totalCount={maxExperience} currentCount={curExperience}></Exp>
			<MainHeader>
				<StatusInfo>
					<Status name="포만감" color="#FF5156" totalCount={maxHunger} currentCount={curHunger}></Status>
					<Status name="친밀도" color="#FFE210" totalCount={maxAffection} currentCount={curAffection}></Status>
					<Status name="컨디션" color="#45E397" totalCount={maxCondition} currentCount={curCondition}></Status>
					<Status name="청결도" color="#0190FE" totalCount={maxCleanliness} currentCount={curCleanliness}></Status>
				</StatusInfo>
				<LevelInfo><Stars level={level}></Stars></LevelInfo>
			</MainHeader>
			<MainBody>
				<PetImg level={level} width={petImgWidth} height={petImgHeight} left={petImgLeft} bottom={petImgBottom}>
					<EmotionImg on={findPetEmotion() !== "normal"} status={findPetEmotion()}
						width={emotionPositionWidth} height={emotionPositionHeight} top={emotionPositionTop} left={emotionPositionLeft} />
				</PetImg>
			</MainBody>
			<MainFooter>
				<MainFooterButton className="" url={ranking} color="#56ABF9" border="1px" onClick={toggleAchState} />
				<MainFooterButton className="" url={inventory} color="#F7CF68" border="1px" onClick={toggleInvState} />
				<AchModal on={achState}>
					{ achState && <AchModalTitle>업적</AchModalTitle> }  {/* 모달창 크기가 0인 상태에서도 '업적' 텍스트가 화면에 나와서 모달창 꺼져있을땐 아예 안나오게 처리 */}
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
				</AchModal>
				{
					achState && 
					<AchModalBackdrop className="" onClick={toggleAchState} />
				}

				<InventoryModal on={invState} />
				{
					invState &&
					<ModalBg onClick={toggleInvState} />
				}
			</MainFooter>
		</MainArea>
	)
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

export function FooterButton({ className, url, color, border, onClick }: footerButton) {
	return <CircleButton className={className} url={url} color={color} border={border} onClick={onClick}></CircleButton>
}

export function MainModalBackdrop( { className, onClick }: modalBackdrop) {
	return <ModalBackdrop className={className} onClick={onClick}></ModalBackdrop>
}