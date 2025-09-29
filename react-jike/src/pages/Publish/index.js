import { Card, Breadcrumb, Form, Button, Radio, Input, Upload, Space, Select, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link, useSearchParams } from "react-router-dom";
import "./index.scss";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { useEffect, useState } from "react";
import { createArticleAPI, getArticleByIdAPI, updateArticleAPI } from "@/apis/article";

import { useChannel } from "@/hooks/useChannel";

const { Option } = Select;

const Publish = () => {
  // 控制封面类型 -1: 自动, 0:无图, 1: 1 张, 3: 3 张
  const [coverType, setCoverType] = useState(1);

  // 获取频道列表
  const { channelList } = useChannel();

  const onFinish = (formValue) => {
    const { title, content, channel_id } = formValue;
    // 校验封面类型 imageType 是否和实际的图片列表 imageList 数量是相等的
    if (imageList.length !== coverType) return message.warning("封面类型和图片数量不匹配");

    // 1. 按照接口文档, 处理收集到的表单数据
    const reqData = {
      title,
      content,
      cover: {
        type: coverType, // 封面类型
        // 这里的 url 处理逻辑只是在新增时候的逻辑
        // 在编辑的时候也需要处理
        images: imageList.map((item) => {
          if (item.response) {
            return item.response.data.url;
          } else {
            return item.url;
          }
        }), // 图片列表
      },
      channel_id,
    };
    // 2. 调用接口提交
    // 处理调用不同的接口
    if (articleId) {
      // updateArticleAPI(reqData, articleId);
      // 或者展开, 加到 data 里
      updateArticleAPI({ ...reqData, id: articleId });
    } else {
      createArticleAPI(reqData);
    }
  };

  const [imageList, setImageList] = useState([]);
  // 上传回调
  const onChange = (value) => {
    // console.log("正在上传", value.fileList);
    setImageList(value.fileList);
  };

  // 切换图片封面类型
  const onTypeChange = (e) => {
    setCoverType(e.target.value);
  };

  // 回填数据
  const [searchParams] = useSearchParams();
  const articleId = searchParams.get("id");
  // 获取实例
  const [form] = Form.useForm();
  // console.log(articleId);
  useEffect(() => {
    // 1. 通过 id 获取数据
    async function getArticleDetail() {
      // 直接到调用函数前面去判断
      // if (!articleId) return;
      const res = await getArticleByIdAPI(articleId);
      const data = res.data;
      const { cover } = data;
      // form.setFieldsValue(res.data);
      // 本质上 封面 type 也被 form 接管, 应该也能回填
      // 这里不能回填是因为数据结构的问题
      // set方法 -> {type:3}, 但目前 {cover: {type:3}}
      form.setFieldsValue({ ...data, type: cover.type });

      // 回填图片
      setCoverType(cover.type);
      // 显示图片({url: url})
      setImageList(
        cover.images.map((url) => {
          return { url };
        }),
      );
    }
    // 只有有 id 时才回填
    if (!articleId) return;
    getArticleDetail();
    // 2. 调用实例方法 完成回填
  }, [articleId, form]);
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            separator="/"
            items={[
              { title: <Link to="/">首页</Link> },
              { title: `${articleId ? "编辑" : "发布"}文章` },
            ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: coverType }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: "请选择文章频道" }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {/* value 属性用户选中之后会自动收集起来, 作为接口的提交字段 */}
              {channelList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {/* 
            listType: 决定选择文件筐的外观样式
            showUploadList: 控制显示上传列表
            */}
            {coverType > 0 && (
              <Upload
                listType="picture-card"
                showUploadList
                action={"http://geek.itheima.net/v1_0/upload"}
                name="image"
                onChange={onChange}
                maxCount={coverType}
                fileList={imageList}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: "请输入文章内容" }]}
          >
            {/* 放一个富文本编辑器 */}
            <ReactQuill className="publish-quill" theme="snow" placeholder="请输入文章内容" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
