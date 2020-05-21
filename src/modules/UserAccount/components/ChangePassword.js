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
  const onFinish = (values) => {
  };

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
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="new_password"
          label="Mật khẩu mới"
          hasFeedback
          rules={[
            () => ({
              validator(rule, value) {
                if (value) {
                  if (value.length > 8) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject("Mật khẩu phải dài hơn 8 ký tự");
                  }
								}
								return Promise.reject("Vui lòng nhập mật khẩu mới");
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Xác nhận mật khẩu mới"
          dependencies={["new_password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Vui lòng xác nhận lại mật khẩu mới",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("new_password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "Mật khẩu mới và mật khẩu xác nhận không khớp"
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button className="button" htmlType="submit">
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;
