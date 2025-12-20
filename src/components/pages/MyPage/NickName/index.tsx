interface nameType {
    name: string;
}

export const NickName = ({ name }: nameType) => {
  return (
    <div className="flex justify-center items-center gap-[0.2rem] w-[80%]">
      <p className="text-black font-bold w-[85%] flex justify-end items-center m-0">{name}</p>
      <p className="text-black w-[15%] m-0">님</p>
    </div>
  );
}