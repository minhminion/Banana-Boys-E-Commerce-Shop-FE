import React from "react";
import {
  Divider,
  Typography,
  Form,
  Input,
  Row,
  Col,
  Avatar,
  Button,
  Upload,
  message,
  Space,
  Radio,
  DatePicker,
} from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import { ENUMS } from "../../../constant";

const { Title, Text } = Typography;

const layout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 15 },
};

const tailLayout = {
  wrapperCol: { offset: 5, span: 19 },
};

const UserProfile = ({ user }) => {
  console.log(user);
  console.log(user.customer.gender);
  const uploadProps = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div>
      <Title level={3}>Hồ sơ của tôi</Title>
      <Text>Quản lý thông tin hồ sơ để bảo mật tài khoản</Text>
      <Divider />
      <Row gutter={20}>
        <Col span={16}>
          <Form {...layout} style={{ marginRight: 50 }}>
            <Form.Item label="Email đăng nhập">
              {/* {user.email.replace(/(?!^).(?=[^@]+@)/g, "*")} */}
              <span style={{ fontSize: "17px" }}>{user.email}</span>
            </Form.Item>
            <Form.Item label="Họ tên ">
              <span style={{ fontSize: "17px" }}>{user.customer.name}</span>
            </Form.Item>
            <Form.Item
              name="name"
              label="Họ tên sửa đổi"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập họ tên của bạn!",
                },
              ]}
            >
              <Input
                style={{ width: "75%", fontSize: "15px" }}
                placeholder="Họ tên bạn muốn sửa đổi"
              />
            </Form.Item>

            <Form.Item label="Số điện thoại">
              <span style={{ fontSize: "17px" }}>{user.customer.phone}</span>
            </Form.Item>
            <Form.Item
              name="phone"
              label="Số điện thoại sửa đổi"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số điện thoại của bạn!",
                },
                {
                  pattern: new RegExp(/(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/),
                  message: "Số điện thoại không hợp lệ!",
                },
              ]}
            >
              <Input
                style={{ width: "75%", fontSize: "15px" }}
                placeholder="Số điện thoại bạn muốn sửa đổi"
              />
            </Form.Item>
            <Form.Item name="gender" label="Giới tính">
              <Radio.Group defaultValue={user.customer.gender}>
                <Radio value={0}>Nam</Radio>
                <Radio value={1}>Nữ</Radio>
                <Radio value={2}>Khác</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="birthDay" label="Ngày sinh">
              <DatePicker style={{ width: "75%" }} />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button style={{ width: "95%" }} type="primary" htmlType="submit">
                Lưu thông tin
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col
          span={8}
          style={{
            borderLeft: "1px solid #f0f0f0",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Space direction="vertical" size="large">
            <Avatar
              style={{
                backgroundColor: "#87d068",
                margin: "auto",
                display: "block",
              }}
              size={100}
              icon={<UserOutlined />}
            />
            <Upload {...uploadProps}>
              <Button style={{ width: "100%" }}>
                <UploadOutlined /> Chọn hình ảnh mới
              </Button>
            </Upload>
            <Text type="secondary">Dụng lượng file tối đa 1 MB</Text>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default UserProfile;
