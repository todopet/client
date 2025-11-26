import Spinner from "@/assets/images/spinner.gif";

export default function Loading() {
    return (
        <div className="flex justify-center items-center relative w-full h-full">
            <img
                src={Spinner}
                alt="Loading"
                className="w-[280px] h-[280px] absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
        </div>
    );
}
