import React, { useEffect, useState } from "react";
// const { Form, InputNumber } = window.antd || ;
import { Upload } from "../uplot";

import { Form, Input, Radio, message, Button, Modal, Row, Col } from 'antd'
import { InboxOutlined, DeleteOutlined } from '@ant-design/icons';
const { Dragger } = Upload;
const accept = "image/png, image/jpeg, image/jpg";
const baseURL = `${process.env.REACT_APP_API}/sdata/rest`;
function DesignConfiguration(props) {
  const [form] = Form.useForm();
  const [dataImage, setDataImage] = useState({ img: '' })
  const { changeCustomConfig, customConfig } = props;
  useEffect(() => {
    try {
      // form.setFieldsValue(JSON.parse(customConfig || '{}'));
      // setDataImage(JSON.parse(customConfig || '{}').img || {})
      form.setFieldsValue(customConfig || {});
      setDataImage(customConfig.img || {})
    } catch (error) {
      console.error("configuration解析错误", error);
    }
  }, []);
  //此处的customConfig已经封装完毕，可以直接使用

  //此处为最简单的样例
  // !customConfig.number && (customConfig.number = 1);
  // const handleClick = () => {
  //   customConfig.number++;
  //   changeCustomConfig(customConfig);
  // };
  const onFormLayoutChange = (changedValues, allValues) => {
    if (allValues) {
      let temp = JSON.parse(JSON.stringify(allValues))
      changeCustomConfig(temp);
    } else {
      let temp = JSON.parse(JSON.stringify(form.getFieldsValue()))
      changeCustomConfig(temp);
    }
  }
  //处理删除图片
  const handleDeleteIcon = (index) => {
    setDataImage({})
    form.setFieldsValue({
      img: { img: '' }
    })
    onFormLayoutChange()
  };
  //上传图片之前进行验证
  const beforeUpload = file => {
    let name = file.name;
    let suffix = name.substring(name.lastIndexOf('.') + 1);
    return new Promise((resolve, reject) => {
      if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type) || suffix === 'jfif') {
        message.error('请选择png、jpg、jpeg图片');
        reject(file);
      } else {
        resolve(file);
      }
    });
  };
  //上传图片之后
  const onUploadFinished = ({ file }) => {
    const { status, response } = file;
    if (status === 'done') {
      const { result } = response;
      // setImageArr(result);
      let dataType = JSON.parse(JSON.stringify(dataImage))
      dataType.img = result
      dataType.name = file.name
      form.setFieldsValue({
        img: dataType
      })
      setDataImage(dataType)
      onFormLayoutChange()
    } else if (status === 'error') {
      message.error('上传出错，请重试');
    }
  };

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
  };
  return (
    <Form
      {...formItemLayout}
      form={form}
      onValuesChange={onFormLayoutChange}
    >
      <Form.Item label="图标" name="img" initialValue={''}>
        <Dragger
          accept={accept}
          action={`${baseURL}/image/uploadPic?category=4`}
          onChange={e => onUploadFinished(e)}
          beforeUpload={beforeUpload}
          showUploadList={false}
        >
          <Button>上传</Button>
        </Dragger>
        {dataImage.img && <><span className="img_name">{dataImage.name} </span>   <span className="deleteImg" onClick={() => handleDeleteIcon()}> <DeleteOutlined></DeleteOutlined> </span></>}
      </Form.Item>
      <Form.Item label="距顶部高度" name="height" initialValue={''}>
        <Input style={{ width: '200px' }} />
      </Form.Item>
    </Form>);
}

export default DesignConfiguration;
