import ranking from '@/assets/images/ranking.svg'
import inventory from '@/assets/images/inventory.svg';
import { MainFooter, MainArea, PetImg, MainHeader, StatusInfo, MainBody, LevelInfo, MainFooterButton, AchModalBackdrop, AchModal, AchModalTitle, AchArea, AchWrapper } from './PetArea.styles';
import CircleButton from '@/components/CircleButton/CircleButton';
import Exp from '@/components/pages/Pet/Exp/Exp';
import Status from '@/components/pages/Pet/Status/Status';
import Stars from '@/components/pages/Pet/Stars/Stars';
import { useState } from 'react';
import { ModalBackdrop } from "@/components/pages/MyPage/UserInfo/UserInfo.styles";
import Achievement from "@/components/pages/Pet/Achievement/Achievement";

export function PetArea() {
	const [state, setState] = useState(false);
	const clickHandler = () => {
		setState(!state);
	}
	return (
		<MainArea>
			<Exp></Exp>
			<MainHeader>
				<StatusInfo>
					<Status name="포만감" color="#FF5156"></Status>
					<Status name="친밀도" color="#FFE210"></Status>
					<Status name="컨디션" color="#45E397"></Status>
					<Status name="청결도" color="#0190FE"></Status>
				</StatusInfo>
				<LevelInfo><Stars level={2}></Stars></LevelInfo>
			</MainHeader>
			<MainBody><PetImg></PetImg></MainBody>
			<MainFooter>
				<MainFooterButton url={ranking} color="#56ABF9" border="1px" onClick={clickHandler} />
				<MainFooterButton url={inventory} color="#F7CF68" border="1px" onClick={clickHandler} />
				<AchModal on={state}>
					{ state && <AchModalTitle>업적</AchModalTitle> }
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
					state && 
					<AchModalBackdrop onClick={clickHandler} />
				}
			</MainFooter>
		</MainArea>
	)
}

// interface classtype {
//     className: string;
//     onClick: () => void;
// }

// @ts-ignore
export function FooterButton({ className, url, color, border, onClick }: classtype) {
	return <CircleButton className={className} url={url} color={color} border={border} onClick={onClick}></CircleButton>
}

// @ts-ignore
export function MainModalBackdrop( { className, onClick, children }: classtype) {
	return <ModalBackdrop className={className} onClick={onClick}>{children}</ModalBackdrop>
}

// @ts-ignore
// export function MainModal( { className }: classtype) {
// 	return <Modal className={className}></Modal>
// }