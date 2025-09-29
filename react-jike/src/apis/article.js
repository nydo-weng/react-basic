// 封装和文章相关的接口函数
import { request } from "@/utils";

// 1. 获取频道列表
export function getChannelAPI() {
  return request({
    url: "/channels",
    method: "GET",
  });
}

// 2. 提交文章表单
export function createArticleAPI(data) {
  return request({
    url: "/mp/articles?draft=false",
    method: "POST",
    // body 参数
    data,
  });
}

// 3. 获取文章列表
export function getArticleListAPI(params) {
  return request({
    url: "mp/articles",
    method: "GET",
    params,
  });
}

// 4. 删除文章
export function delArticleAPI(id) {
  return request({
    url: `mp/articles/${id}`,
    method: "DELETE",
  });
}

// 5. 获取文章详情
export function getArticleByIdAPI(id) {
  return request({
    url: `mp/articles/${id}`,
    method: "GET",
  });
}

// 6. 编辑接口, 新增文章
// export function updateArticleAPI(data, articleId) {
// 或者写成
export function updateArticleAPI(data) {
  return request({
    // url: `/mp/articles/${articleId}?draft=false`,
    // 或者写成
    url: `/mp/articles/${data.id}?draft=false`,
    method: "PUT",
    // body 参数
    data,
  });
}
