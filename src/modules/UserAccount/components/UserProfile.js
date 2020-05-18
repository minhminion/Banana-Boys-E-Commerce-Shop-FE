import React from "react";
import { Divider, Typography, Form, Input, Row, Col, Avatar, Button, Upload, message, Space, Radio, DatePicker } from "antd";
import { UserOutlined, UploadOutlined } from '@ant-design/icons'
import { ENUMS } from "../../../constant";

const { Title, Text } = Typography;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const tailLayout = {
  wrapperCol: { offset: 6, span: 18 },
};


const UserProfile = ({ user }) => {

	const uploadProps = {
		name: 'file',
		action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
		headers: {
			authorization: 'authorization-text',
		},
		onChange(info) {
			if (info.file.status !== 'uploading') {
				console.log(info.file, info.fileList);
			}
			if (info.file.status === 'done') {
				message.success(`${info.file.name} file uploaded successfully`);
			} else if (info.file.status === 'error') {
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
            <Form.Item label="Tên đăng nhập">{user.email}</Form.Item>
            <Form.Item name="name" label="Tên">
              <Input />
            </Form.Item>
            <Form.Item label="Email">
              {user.email.replace(/(?!^).(?=[^@]+@)/g, "*")}
            </Form.Item>
            <Form.Item label="Số điện thoại">
              0934837765
            </Form.Item>
            <Form.Item name="gender" label="Giới tính">
							<Radio.Group>
								<Radio value={ENUMS.Gender.Male}>Nam</Radio>
								<Radio value={ENUMS.Gender.Female}>Nữ</Radio>
								<Radio value={ENUMS.Gender.Other}>Khác</Radio>
							</Radio.Group>
            </Form.Item>
            <Form.Item name="birthDay" label="Ngày sinh">
							<DatePicker />
            </Form.Item>
						<Form.Item {...tailLayout}>
							<Button className='button'>Lưu thông tin</Button>
						</Form.Item>
          </Form>
        </Col>
				<Col span={8} style={{ borderLeft: '1px solid #f0f0f0', display: 'flex', justifyContent: 'center'}}>
					<Space direction='vertical' size='large'>
						<Avatar  style={{ backgroundColor: '#87d068', margin: 'auto', display: "block"}} size={100} icon={<UserOutlined />}/>
						<Upload {...uploadProps}>
							<Button style={{ width: '100%'}}>
								<UploadOutlined /> Chọn hình ảnh mới
							</Button>
						</Upload>
						<Text type='secondary'>Dụng lượng file tối đa 1 MB</Text>
					</Space>
				</Col>
      </Row>
    </div>
  );
};

export default UserProfile;
