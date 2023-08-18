import ranking from '@/assets/images/ranking.svg'
import inventory from '@/assets/images/inventory.svg';
import { PageArea, MainFooter, MainArea, PetImg, MainHeader, StatusInfo, MainBody, LevelInfo, MainFooterButton, AchModalBackdrop, AchModal } from './PetArea.styles';
import CircleButton from '@/components/CircleButton/CircleButton';
import Exp from '@/components/pages/Pet/Exp/Exp';
import Status from '@/components/pages/Pet/Status/Status';
import Stars from '@/components/pages/Pet/Stars/Stars';
import { useState } from 'react';
import { Modal, ModalBackdrop } from "@/components/pages/MyPage/UserInfo/UserInfo.styles";
import { on } from 'events';

export function PetArea() {
	const [state, setState] = useState(false);
	const clickHandler = () => {
		setState(!state);
	}
	return (
		<PageArea>
			<Exp></Exp>
			<MainArea>
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
					{
						state && 
						<AchModalBackdrop onClick={clickHandler}>
							<AchModal></AchModal>
						</AchModalBackdrop>
					}
				</MainFooter>
			</MainArea>
		</PageArea>
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
	return <ModalBackdrop className={className} onClick={onClick}><AchModal /></ModalBackdrop>
}

// @ts-ignore
// export function MainModal( { className }: classtype) {
// 	return <Modal className={className}></Modal>
// }