import React from "react";
// TODO: ts ignore 제거
//@ts-ignore
// export default function Button({ text, className }) {
//     return <button className={className}>{text}</button>;
// }
export default function Button({ ...props }) {
    return <button {...props}></button>;
}