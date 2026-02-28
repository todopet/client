import { useContext, useState } from "react";
import { EditBtn } from "@/components/pages/Pet/Inventory/Item/Action/EditBtn";
import { ChangeQtyBtn } from "@/components/pages/Pet/Inventory/Item/Action/ChangeQtyBtn";
import { axiosRequest } from "@/api";
import { ApiResponse, UseItemRes } from "@/@types";
import { dumpItemRes } from "@/@types/dumpItemRes";
import { ItemDataContext } from "@/components/pages/Pet/Inventory";
import { MyContext } from "@/pages/Pet";
import { notifyApiError } from "@/libs/utils/notifyApiError";
import { API_ENDPOINTS } from "@/api/endpoints";

interface modalTypeProps {
  modalType: "useModal" | "discardModal";
  state: boolean;

  setState(state: boolean): void;

  itemId: string;
  name: string;
  quantity: number;
}

export const ActionModal = ({
  modalType,
  state,
  setState,
  itemId,
  name,
  quantity,
}: modalTypeProps) => {
  const receiveItemData = useContext(ItemDataContext);
  const [itemCount, setItemCount] = useState(1);
  const receivePetData = useContext(MyContext);

  const handleUseItem = async (itemId: string) => {
    try {
      const data = { quantity: itemCount };
      await axiosRequest.requestAxios<ApiResponse<UseItemRes>>(
        "post",
        API_ENDPOINTS.INVENTORY.USE_ITEM(itemId),
        data
      );
      await receiveItemData();
      await receivePetData();
    } catch (error) {
      notifyApiError(error, "아이템 사용중 에러가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleDumpItem = async (itemId: string) => {
    try {
      const data = { quantity: itemCount * -1 };
      await axiosRequest.requestAxios<ApiResponse<dumpItemRes>>(
        "patch",
        API_ENDPOINTS.INVENTORY.DUMP_ITEM(itemId),
        data
      );
      await receiveItemData();
    } catch (error) {
      notifyApiError(error, "아이템을 버리는중 에러가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <div
        className="fixed top-0 bottom-0 left-1/2 -translate-x-1/2 h-screen w-full bg-[rgba(0,0,0,0.58)] backdrop-blur-sm flex justify-center items-center z-[1000]"
        onClick={() => {
          setState(!state);
        }}
      >
        <div
          className="absolute w-[292px] h-[390px] rounded-[20px] bg-white flex flex-col justify-center items-center z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-[20px] font-normal flex flex-row">
            <div>{modalType === "useModal" ? "사용할" : "버리는"}</div>
            <div>도구: {name}</div>
          </div>
          <div className="flex flex-row items-center gap-[30px] my-[46px]">
            <ChangeQtyBtn
              modalType={modalType}
              operationType="decrease"
              onClick={() => (itemCount > 1 ? setItemCount(itemCount - 1) : false)}
              isCountPositiveNum={itemCount > 1}
            />
            <div className="text-[48px] font-normal">{itemCount}</div>
            <ChangeQtyBtn
              modalType={modalType}
              operationType="increase"
              onClick={() => (itemCount < quantity ? setItemCount(itemCount + 1) : false)}
              isCountPositiveNum={itemCount < quantity}
            />
          </div>
          <div className="flex flex-col gap-1">
            <EditBtn
              modalType={modalType}
              btnType="confirm"
              onClick={() => {
                if (modalType === "useModal") {
                  handleUseItem(itemId);
                  setState(!state);
                } else if (modalType === "discardModal") {
                  handleDumpItem(itemId);
                  setState(!state);
                }
              }}
            />
            <EditBtn
              modalType={modalType}
              btnType="cancel"
              onClick={() => {
                setState(!state);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
