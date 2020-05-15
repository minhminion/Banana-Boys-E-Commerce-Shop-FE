import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import checkError from "../../../libraries/CheckError";
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 16 },
};

// const onFinish = (values) => {
//   console.log("Success:", values);
// };

// const onFinishFailed = (errorInfo) => {
//   console.log("Failed:", errorInfo);
// };

function Login(props) {
  async function handleSubmit(values) {
    const { loginAccount, history } = props;
    console.log(values);
    const { email, password } = values;
    const result = await loginAccount({ email, password });
    if (result) {
      const error = result.error;
      console.log(result.error);
      checkError(error.error);
    } else {
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
          rules={[{ required: true, message: "Vui lòng nhập email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password />
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
