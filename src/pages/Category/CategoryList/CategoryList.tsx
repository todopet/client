import CategoryHeader from "@/components/pages/Category/CategoryHeader/CategoryHeader";
import CategoryContent from "@/components/pages/Category/CategoryContent/CategoryContent";
import { res } from "@/@types/index";
import { useEffect, useState } from "react";
import axiosRequest from "@/api";

export default function CategoryList() {
    // 임시로 any 타입을 사용한다.
    // 타입은 해당 category에 필요한 데이터를 인터페이스로 정의한 뒤 가져온다.
    // @types폴더에서 파일을 만들고, index.ts로 export 한 다음, index.ts에서 그 데이터를 export 한다.
    // 그 뒤 현재 페이지에서 import를 하여 사용한다.
    const [categoryList, setCategoryList] = useState([]);
    //게시글 get요청
    async function getPostings() {
        try {
            const response: res<any> = await axiosRequest.requestAxios<
                res<any>
            >("get", "/todoCategories");
            // console.log("전체게시글", response.data);
            console.log(response);
            setCategoryList(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getPostings();
    }, []);

    return (
        <>
            <CategoryHeader />
            {/* <CategoryContent category={categoryList} /> */}
        </>
    );
}
