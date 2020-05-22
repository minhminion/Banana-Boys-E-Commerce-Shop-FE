import React from "react";
import { Divider, Typography, Form, Input, Button } from "antd";

const { Title, Text } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const ChangePassword = () => {
  const onFinish = (values) => {};

  return (
    <div>
      <Title level={3}>Đổi mật khẩu</Title>
      <Text>
        Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
      </Text>
      <Divider />
      <Form {...layout} style={{ marginRight: 200 }} onFinish={onFinish}>
        <Form.Item
          name="old_password"
          label="Mật khẩu cũ"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu cũ",
            },
          ]}
        >
          <Input.Password placeholder="Nhập mật khẩu củ của bạn" />
        </Form.Item>
        <Form.Item
          name="new_password"
          label="Mật khẩu mới"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu!",
            },
            {
              min: 8,
              message: "Mật khẩu từ 8 ký tự trở lên",
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Nhập mật khẩu mới của bạn" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Xác nhận mật khẩu"
          dependencies={["new_password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Vui lòng xác nhận mật khẩu của bạn!",
            },

            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("new_password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  "Hai mật khẩu mà bạn đã nhập không khớp!"
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Xác nhận lại mật khẩu mới" />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button style={{ width: "95%" }} type="primary" htmlType="submit">
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;
