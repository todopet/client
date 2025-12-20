import { AchBox, AchStatus, AchInfo, AchName, TotalBar, CurrentBar, AchIcon, AchModalBackdrop } from '@/components/pages/Pet/Achievement/Achievement.styles';

interface parameterType {
    achName: string;
    isRewarded: boolean;
    achDone: boolean;
    totalCount: number;
    currentCount: number;
}

export const Achievement = ({
  achName, isRewarded, achDone, totalCount, currentCount
}: parameterType) => {
    return (
        <AchBox achDone={achDone}>
            <AchStatus achDone={achDone}></AchStatus>
            <AchInfo>
                <AchName>{achName}</AchName>
                <TotalBar>
                    <CurrentBar totalCount={totalCount} currentCount={currentCount} color={"#1AAB17"}></CurrentBar>
                    <p>{currentCount}/{totalCount}</p>
                </TotalBar>
            </AchInfo>
            <AchIcon achDone={achDone} isRewarded={isRewarded}></AchIcon>
            { (achDone === true && isRewarded === true ) &&
                <AchModalBackdrop></AchModalBackdrop>
            }
        </AchBox>
    );
}