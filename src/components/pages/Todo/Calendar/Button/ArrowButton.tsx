export default function ArrowButton({ className = "", style = undefined, ...props }) {
  return (
    <button
      className={[
        "w-[30px] h-[14px] bg-transparent border-0 flex items-center justify-center",
        className,
      ].join(" ")}
      style={style}
      {...props}
    />
  );
}
