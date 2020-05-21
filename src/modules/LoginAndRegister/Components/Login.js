import React from "react";
import { Form, Input, Button, Checkbox, notification } from "antd";
import checkError from "../../../libraries/CheckError";
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 16 },
};

const openNotificationWithIcon = type => {
  notification[type]({
    message: 'Đăng nhập thành công',
  });
};

function Login(props) {
  async function handleSubmit(values) {
    const { loginAccount, history } = props;
    const { email, password } = values;
    const result = await loginAccount({ email, password });
    if (result) {
      const error = result.error;
      checkError(error.errors);
    } else {
      openNotificationWithIcon('success')
      history.push("/");
    }
  }

  return (
    <div className="login-form">
      <Form
        className="form"
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        // onFinishFailed={onFinishFailed}
        // onSubmit={handleSubmit}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              message: "E-mail không hợp lệ!",
            },
            {
              required: true,
              message: "Vui lòng nhập e-mail!",
            },
          ]}
        >
          <Input placeholder="Nhập e-mail" />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
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
        >
          <Input.Password placeholder="Mật khẩu từ 8 ký tự trở lên" />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Nhớ tài khoản</Checkbox>
          </Form.Item>

          <a style={{ float: "right" }} className="login-form-forgot" href="# ">
            Quên mật khẩu?
          </a>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button
            style={{ width: "100%" }}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
export default Login;
