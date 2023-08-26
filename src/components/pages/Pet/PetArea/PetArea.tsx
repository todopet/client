import ranking from '@/assets/icons/ranking.svg'
import inventory from '@/assets/icons/inventory.svg';
import { MainFooter, MainArea, PetImg, MainHeader, StatusInfo, MainBody, LevelInfo, MainFooterButton, AchModalBackdrop, AchModal, AchModalTitle, AchArea, AchWrapper } from './PetArea.styles';
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

interface petInfoProps {
	curHunger?: number;
	maxHunger?: number;
	curAffection?: number;
	maxAffection?: number;
	curCondition?: number;
	maxCondition?: number;
	curCleanliness?: number;
	maxCleanliness?: number;
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

	const {curHunger, maxHunger}: petInfoProps = hungerInfo;
	const {curAffection, maxAffection}: petInfoProps = affectionInfo;
	const {curCondition, maxCondition}: petInfoProps = conditionInfo;
	const {curCleanliness, maxCleanliness}: petInfoProps = cleanlinessInfo;
	const {curExperience, maxExperience}: petInfoProps = expInfo;
	const level: number = levelInfo;
	// const level: number = 5;

	let petImgSize = {};

	// 펫이 레벨별로 사이즈가 달라서 이미지 영역 크기와 위치를 레벨별로 지정해줘야 할듯..
	switch (level) {
		case 0:
			petImgSize = {width: 20, height: 10, left: 30, bottom: 25}
			break;
		case 1:
			petImgSize = {width: 30, height: 10, left: 28, bottom: 25}
			break;
		case 2:
			petImgSize = {width: 31, height: 11, left: 26, bottom: 24}
			break;
		case 3:
			petImgSize = {width: 35, height: 15, left: 24, bottom: 25}
			break;
		case 4:
			petImgSize = {width: 50, height: 30, left: 20, bottom: 21}
			break;
		case 5:
			petImgSize = {width: 65, height: 45, left: 18, bottom: 25}
			break;
	}

	const { width, height, left, bottom } = petImgSize as {
		width: number;
		height: number;
		left: number;
		bottom: number;
	};

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
			<MainBody><PetImg level={level} width={width} height={height} left={left} bottom={bottom}></PetImg></MainBody>
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