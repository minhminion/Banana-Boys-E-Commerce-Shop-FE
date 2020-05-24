import React, { useState, useEffect } from "react";
import { Form, Row, Col, Input, Select, Button, Space } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { cities, allDistricts } from "./../../../../constant/address";
const { Option } = Select;

const AddressForm = ({ data, onFinish }) => {
  const initialValues = {
    city: { label: "Hồ Chí Minh" },
    district: { label: "Quận 1" },
  };

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

  if (data && !data.id) {
    return <h2>Loading ...</h2>;
  }

  return (
    <Form
      size="middle"
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={
        data
          ? {
              city: { label: data.district },
              district: { label: data.district },
              ward: "Phưởng 4",
              streetLocation: data.streetLocation,
              name: data.name,
              phone: data.phone,
            }
          : initialValues
      }
    >
      <Row gutter={25}>
        <Col span={12}>
          <Form.Item
            label="Tên người nhận"
            name="name"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên người nhận",
              },
            ]}
          >
            <Input placeholder="Nhập tên người nhận" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Số điện thoại liên lạc"
            name="phone"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số điện thoại liên lạc",
              },
              {
                pattern: new RegExp(/(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/),
                message: "Số điện thoại không hợp lệ",
              },
            ]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>
        </Col>
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
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
                  <Option key={district.code}>{`Quận ${district.name}`}</Option>
                ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        label="Địa chỉ nhà"
        name="streetLocation"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập địa chỉ nhà của bạn!",
          },
        ]}
      >
        <Input placeholder="Nhập địa chỉ nhà" />
      </Form.Item>
      <Form.Item>
        <Button
          className="button"
          style={{ width: "80%", margin: "auto", justifyContent: "center" }}
          htmlType="submit"
        >
          <Space>
            <span>Lưu địa chỉ mới</span>
            <SendOutlined />
          </Space>
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddressForm;
