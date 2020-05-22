import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Input,
  Col,
  Row,
  Select,
  Button,
  Typography,
  Divider,
} from "antd";
import { cities, allDistricts } from "./../../../constant/address";
const { Option } = Select;
const { Title, Text } = Typography;
const tailLayout = {
  wrapperCol: { offset: 4, span: 20 },
};
const AddressList = ({ cartItems, user, goNext }) => {
  const [districts, setDistricts] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const cityCode = cities.find((city) => city.name === "Hồ Chí Minh").code;
    setDistricts(
      allDistricts.filter((district) => district.parent_code === cityCode)
    );
  }, []);

  const handleCityChange = (value) => {
    const districts = allDistricts.filter(
      (district) => district.parent_code === value.key
    );
    setDistricts(districts);
    form.setFieldsValue({ district: { label: districts[0].name } });
  };

  const onDistrictChange = (value) => {};

  const onFinish = (values) => {
    goNext();
  };

  return (
    <div className="billing-info-wrap">
      <Title level={3}>Thêm địa chỉ</Title>
      <Text>Để bảo đảm các đơn hàng được giao đến đúng địa chỉ của bạn.</Text>
      <Divider />
      <Form
        size="middle"
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          city: { label: "Hồ Chí Minh" },
          district: { label: "Quận 1" },
        }}
      >
        <Row gutter={25}>
          <Col span={12}>
            <Form.Item
              label="Thành phố"
              name="city"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                labelInValue
                showSearch
                placeholder="Select a city"
                optionFilterProp="children"
                onSelect={handleCityChange}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {cities &&
                  cities.map((cities) => (
                    <Option key={cities.code}>{cities.name}</Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Quận/ Huyện"
              name="district"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                labelInValue
                placeholder="Select a district"
                disabled={!districts}
                onChange={onDistrictChange}
              >
                {districts &&
                  districts.map((district) => (
                    <Option
                      key={district.code}
                    >{`Quận ${district.name}`}</Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Địa chỉ nhà"
          name="streetAddress"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập địa chỉ nhà của bạn!",
            },
          ]}
        >
          <Input placeholder="Nhập địa chỉ nhà" />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button style={{ width: "70%" }} type="primary" htmlType="submit">
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default AddressList;
