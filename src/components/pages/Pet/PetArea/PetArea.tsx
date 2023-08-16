import React from 'react';
import ranking from '@/assets/images/ranking.svg'
import inventory from '@/assets/images/inventory.svg';
import { PageArea, MainFooter, MainArea, MainHeader, StatusInfo, MainBody } from './PetArea.styles';
import CircleButton from '@/components/CircleButton/CircleButton';
import Exp from '@/components/pages/Pet/Exp/Exp';
import Status from '@/components/pages/Pet/Status/Status';

export default function PetArea() {
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
					{/* <Star></Star> */}
				</MainHeader>
				<MainBody></MainBody>
				<MainFooter>
					<CircleButton url={ranking} color="#56ABF9" border="1px"></CircleButton>
					<CircleButton url={inventory} color="#F7CF68" border="1px"></CircleButton>
				</MainFooter>
			</MainArea>
		</PageArea>
	)
}