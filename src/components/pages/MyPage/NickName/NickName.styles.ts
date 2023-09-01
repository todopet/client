import styled from 'styled-components';

const UserNameInfo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: .2rem;
    width: 80%;
`

const UserName = styled.p`
    color: black;
    font-weight: bold;
    width: 85%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const NimText = styled.p`
    color: black;
    width: 15%;
`

export { UserNameInfo, UserName, NimText };