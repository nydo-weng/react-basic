import "./App.scss";
import avatar from "./images/bozai.png";
import { useState } from "react";
import _ from "lodash";
import classNames from "classnames";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import { useRef, useEffect } from "react";
import axios from "axios";
/**
 * 评论列表的渲染和操作
 *
 * 1. 根据状态渲染评论列表
 * 2. 删除评论
 */

// 评论列表数据
// const defaultList = [
//   {
//     // 评论id
//     rpid: 3,
//     // 用户信息
//     user: {
//       uid: "13258165",
//       avatar:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIqDqIqdyQxnYeRa-L5muAwwUNb_iGAzNVTw&s",
//       uname: "周杰伦",
//     },
//     // 评论内容
//     content: "哎哟，不错哦",
//     // 评论时间
//     ctime: "10-18 08:15",
//     like: 88,
//   },
//   {
//     rpid: 2,
//     user: {
//       uid: "36080105",
//       avatar:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIqDqIqdyQxnYeRa-L5muAwwUNb_iGAzNVTw&s",
//       uname: "许嵩",
//     },
//     content: "我寻你千百度 日出到迟暮",
//     ctime: "11-13 11:29",
//     like: 126,
//   },
//   {
//     rpid: 1,
//     user: {
//       uid: "30009257",
//       avatar,
//       uname: "黑马前端",
//     },
//     content: "学前端就来黑马",
//     ctime: "10-19 09:00",
//     like: 66,
//   },
// ];

// 当前登录用户信息
const user = {
  // 用户id
  uid: "30009257",
  // 用户头像
  avatar,
  // 用户昵称
  uname: "黑马前端",
};

/**
 * 导航 Tab 的渲染和操作
 *
 * 1. 渲染导航 Tab 和高亮
 * 2. 评论列表排序
 *  最热 => 喜欢数量降序
 *  最新 => 创建时间降序
 */

// 导航 Tab 数组
const tabs = [
  { type: "hot", text: "最热" },
  { type: "time", text: "最新" },
];

// 封装请求数据 的 hook
function useGetList() {
  // 通过接口, 获取数据, 渲染评论列表
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    // 请求数据
    async function getList() {
      // axios 请求数据
      const res = await axios.get("http://localhost:3004/list");
      setCommentList(res.data);
    }
    getList();
  }, []);

  return {
    commentList,
    setCommentList,
  };
}

// 封装 item 组件
function Item({ item, onDel }) {
  return (
    <div className="reply-item">
      {/* 头像 */}
      <div className="root-reply-avatar">
        <div className="bili-avatar">
          <img className="bili-avatar-img" src={item.user.avatar} alt="" />
        </div>
      </div>

      <div className="content-wrap">
        {/* 用户名 */}
        <div className="user-info">
          <div className="user-name">{item.user.uname}</div>
        </div>
        {/* 评论内容 */}
        <div className="root-reply">
          <span className="reply-content">{item.content}</span>
          <div className="reply-info">
            {/* 评论时间 */}
            <span className="reply-time">{item.ctime}</span>
            {/* 评论数量 */}
            <span className="reply-time">点赞数:{item.like}</span>
            {user.uid === item.user.uid && (
              <span className="delete-btn" onClick={() => onDel(item.rpid)}>
                删除
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
const App = () => {
  // 渲染评论列表
  // const [commentList, setCommentList] = useState(
  //   _.orderBy(defaultList, "like", "desc")
  // );

  // 通过接口, 获取数据, 渲染评论列表
  // const [commentList, setCommentList] = useState([]);

  // useEffect(() => {
  //   // 请求数据
  //   async function getList() {
  //     // axios 请求数据
  //     const res = await axios.get("http://localhost:3004/list");
  //     setCommentList(res.data);
  //   }
  //   getList();
  // }, []);

  const { commentList, setCommentList } = useGetList();

  const handleDelete = (rpid) => {
    setCommentList(commentList.filter((item) => item.rpid !== rpid));
  };

  // tab 切换功能
  // 1. 点击谁 记录他的 type
  // 2. 通过记录的 type 和每一项遍历是的 type 做匹配, 控制类名的显示
  const [type, setType] = useState("hot");
  const handleTabChange = (type) => {
    setType(type);

    // 基于列表的排序
    if (type === "hot") {
      // 根据点赞数排序
      // lodash 是一个封装好的工具库, 借助他快速给数据做排序, 并且生成一个新的数组
      setCommentList(_.orderBy(commentList, "like", "desc"));
    } else {
      // 根据创建时间排序
      setCommentList(_.orderBy(commentList, "ctime", "desc"));
    }
  };

  const [content, setContent] = useState("");

  const textareaRef = useRef(null);

  const handlePublish = () => {
    setCommentList([
      ...commentList,
      {
        rpid: uuidv4(), // 随机 id 独一无二
        user: user,
        content: content,
        ctime: dayjs(new Date()).format("MM-DD HH:mm"), // 格式化 月-日 时:分
        like: 0,
      },
    ]);
    // 发表后清空评论框
    setContent("");
    // 重新聚焦 dom - focus
    textareaRef.current.focus();
  };

  return (
    <div className="app">
      {/* 导航 Tab */}
      <div className="reply-navigation">
        <ul className="nav-bar">
          <li className="nav-title">
            <span className="nav-title-text">评论</span>
            {/* 评论数量 */}
            <span className="total-reply">{10}</span>
          </li>
          <li className="nav-sort">
            {/* 高亮类名： active */}
            {tabs.map((item) => (
              <span
                // 使用 classNames 动态控制类名, 第二个类名就是 active, 当 type === item.type 时, 添加 active 类名
                className={classNames("nav-item", {
                  active: type === item.type,
                })}
                key={item.type}
                onClick={() => handleTabChange(item.type)}
              >
                {item.text}
              </span>
            ))}
          </li>
        </ul>
      </div>

      <div className="reply-wrap">
        {/* 发表评论 */}
        <div className="box-normal">
          {/* 当前用户头像 */}
          <div className="reply-box-avatar">
            <div className="bili-avatar">
              <img className="bili-avatar-img" src={avatar} alt="用户头像" />
            </div>
          </div>
          <div className="reply-box-wrap">
            {/* 评论框 */}
            <textarea
              className="reply-box-textarea"
              placeholder="发一条友善的评论"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              ref={textareaRef}
            />
            {/* 发布按钮 */}
            <div className="reply-box-send">
              <div className="send-text" onClick={handlePublish}>
                发布
              </div>
            </div>
          </div>
        </div>

        {/* 评论列表 */}
        <div className="reply-list">
          {/* 遍历数组, 渲染评论项 */}
          {commentList.map((item) => (
            <Item key={item.rpid} item={item} onDel={handleDelete} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
