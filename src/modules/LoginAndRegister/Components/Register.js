import React, { useState } from "react";
import { Form, Input, Button, DatePicker, Radio, notification } from "antd";
import checkError from "../../../libraries/CheckError";

const tailLayout = {
  wrapperCol: { offset: 7, span: 15 },
};

const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 15 },
};

const config = {
  rules: [
    {
      type: "object",
      required: true,
      message: "Vui lòng chọn ngày sinh!",
    },
  ],
};

const openNotificationWithIcon = (type) => {
  notification[type]({
    message: "Đăng ký thành công",
    description: "Bạn hãy đăng nhập để thỏa sức mua sắm. ",
  });
};

const Register = (props) => {
  const [form] = Form.useForm();
  async function onFinish(values) {
    const { registerAccount, history } = props;
    const result = await registerAccount(values);
    if (!result || result.status !== 200) {
      const error = result.error;
      checkError(error.errors);
    } else {
      openNotificationWithIcon("success");
      history.push("/");
    }
  }

  return (
    <Form
      {...layout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item
        name="name"
        label={<span>Họ tên</span>}
        rules={[
          {
            required: true,
            message: "Vui lòng nhập họ tên!",
            whitespace: true,
          },
        ]}
      >
        <Input placeholder="Nhập họ tên" />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Số điện thoại"
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
        <Input placeholder="Nhập số điện thoại" />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
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
        name="password"
        label="Mật khẩu"
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
        <Input.Password placeholder="Mật khẩu từ 8 ký tự trở lên" />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        label="Xác nhận mật khẩu"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Vui lòng xác nhận mật khẩu của bạn!",
          },

          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject("Hai mật khẩu mà bạn đã nhập không khớp!");
            },
          }),
        ]}
      >
        <Input.Password placeholder="Xác nhận mật khẩu" />
      </Form.Item>

      {/* <Form.Item
        name="address"
        label={<span>Địa chỉ</span>}
        rules={[
          {
            required: true,
            message: "Vui lòng nhập địa chỉ!",
            whitespace: true,
          },
        ]}
      >
        <Input placeholder="Nhập địa chỉ" />
      </Form.Item> */}
      <Form.Item name="gender" label={<span>Giới tính</span>}>
        <Radio.Group>
          <Radio value={0}>Nam</Radio>
          <Radio value={1}>Nữ</Radio>
          <Radio value={2}>Khác</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item name="date-picker" label="Ngày sinh" {...config}>
        <DatePicker
          // onChange={handleSelectDate}
          placeholder="Chọn ngày sinh"
          style={{ width: "100%" }}
          // format={dateFormatList}
        />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button style={{ width: "100%" }} type="primary" htmlType="submit">
          Đăng ký
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Register;
