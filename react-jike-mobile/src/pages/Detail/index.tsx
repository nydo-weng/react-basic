import { fetchDetailAPI } from "@/apis/detail";
import type { DetailDataType } from "@/apis/detail";
import { NavBar } from "antd-mobile";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Detail = () => {
  const [detail, setDetail] = useState<DetailDataType | null>(null);
  // 获取路由参数
  const [params] = useSearchParams();
  const id = params.get("id");
  useEffect(() => {
    const getDetail = async () => {
      try {
        // ! 是非空断言操作符 non-null assertion
        const res = await fetchDetailAPI(id!);
        setDetail(res.data.data);
      } catch (error) {
        throw new Error("fetch detail error");
      }
    };
    getDetail();
  }, [id]);

  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };

  // 数据返回之前 用 loading 渲染占位
  if (!detail) {
    return <div> this is loading...</div>;
  }

  // 数据返回之后 正式渲染
  return (
    <div>
      <NavBar onBack={back}>{detail?.title}</NavBar>
      <div
        dangerouslySetInnerHTML={{
          __html: detail.content,
        }}
      ></div>
    </div>
  );
};

export default Detail;
