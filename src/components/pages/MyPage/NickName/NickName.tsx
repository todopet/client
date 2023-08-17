import { UserNameInfo, UserName, NimText } from './NickName.styles';

interface nametype {
    name: string;
}

export default function NickName({ name }: nametype) {
    return (
        <UserNameInfo>
            <UserName>{name}</UserName>
            <NimText>님</NimText>
        </UserNameInfo>
    );
}
