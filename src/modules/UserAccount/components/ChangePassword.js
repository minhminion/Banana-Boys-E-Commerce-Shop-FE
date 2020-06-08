import React from "react";
import { Divider, Typography, Form, Input, Button, notification } from "antd";

const { Title, Text } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const openNotificationWithIcon = (type) => {
  notification[type]({
    message: "Thay đổi thành công",
  });
};

const notificationError = (type) => {
  notification[type]({
    message: "Thay đổi không thành công",
  });
};

const ChangePassword = ({ user, changePassword, history }) => {
  const onFinish = async (values) => {
    const result = await changePassword(user.id, values);
    if (result) {
      openNotificationWithIcon("success");
      history.push("/user/profile");
    } else {
      notificationError("error");
    }
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
          name="oldPassword"
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
          name="newPassword"
          label="Mật khẩu mới"
          dependencies={["oldPassword"]}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu!",
            },
            {
              min: 8,
              message: "Mật khẩu từ 8 ký tự trở lên",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("oldPassword") !== value) {
                  return Promise.resolve();
                }

                return Promise.reject("Mật khẩu mới phải khác mật khẩu cũ!");
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Nhập mật khẩu mới của bạn" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Xác nhận mật khẩu"
          dependencies={["newPassword"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Vui lòng xác nhận mật khẩu của bạn!",
            },

            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("newPassword") === value) {
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
