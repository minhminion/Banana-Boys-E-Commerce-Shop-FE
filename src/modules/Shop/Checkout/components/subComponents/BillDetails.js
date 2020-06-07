import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Form,
  Input,
  Col,
  Row,
  Select,
  Button,
  DatePicker,
  Space,
  Divider,
} from "antd";
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { cities, allDistricts } from "../../../../../constant/address";
import AddressList from "./AddressList";
import AddressForm from "../../../../UserAccount/components/subComponents/AddressForm";
const { Title } = Typography;
const { Option } = Select;

const BillDetails = ({ cartItems, user, goNext, getAllUserAddress }) => {
  const [districts, setDistricts] = useState(null);
  const [showAdditional, setShowAdditional] = useState(false);
  const [isNewAddress, setIsNewAddress] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    // THIS FUNCTION TO GET CITY AND DISTRICT OF USER
    const cityCode = cities.find((city) => city.name === "Hồ Chí Minh").code;
    setDistricts(
      allDistricts.filter((district) => district.parent_code === cityCode)
    );
  }, []);

  // Toggle to show Addtional infomation
  const toggleAdditional = () => {
    setShowAdditional((prev) => !prev);
  };

  // ON SELECT CITY IN FORM
  const handleCityChange = (value) => {
    const districts = allDistricts.filter(
      (district) => district.parent_code === value.key
    );
    setDistricts(districts);
    form.setFieldsValue({ district: { label: districts[0].name } });
  };

  // ON SELECT DISTRICT IN FORM
  const onDistrictChange = (value) => {};

  const onFinish = (values) => {
    goNext();
  };

  // MESSAGE WHEN ERROR
  const validateMessages = {
    required: "${label} is required!",
    whitespace: "${label} can not be empty!",
    types: {
      email: "${label} is not validate email!",
      number: "${label} is not a validate number!",
    },
    pattern: {
      mismatch: "${label} does not match pattern",
    },
  };

  const handleToggleChoiceAddress = () => {
    setIsNewAddress((prev) => !prev);
  };

  const additionalForm = (
    <Fragment>
      <Form.Item label="Delivery in" style={{ marginBottom: 0 }}>
        <Form.Item name="startDelivery" style={{ display: "inline-block" }}>
          <DatePicker />
        </Form.Item>
        <span
          style={{
            display: "inline-block",
            width: "24px",
            lineHeight: "32px",
            textAlign: "center",
          }}
        >
          -
        </span>
        <Form.Item name="endDelivery" style={{ display: "inline-block" }}>
          <DatePicker />
        </Form.Item>
      </Form.Item>
      <Form.Item label="Note" name="note">
        <Input.TextArea />
      </Form.Item>
    </Fragment>
  );

  if (cartItems && cartItems.length >= 1) {
    return (
      <div className="billing-info-wrap">
        <Title level={2} style={{ textAlign: "center" }}>
          Địa chỉ thanh toán
        </Title>
        <Button type='primary' size='large' onClick={handleToggleChoiceAddress}>
          {!isNewAddress ? 'Sử dụng địa chỉ mới' : 'Địa chỉ đã lưu' }
        </Button>
        <Divider />
        {!isNewAddress ? (
          <AddressList getAllUserAddress={getAllUserAddress} />
        ) : (
          <AddressForm />
          // <Form
          //   size="middle"
          //   form={form}
          //   layout="vertical"
          //   validateMessages={validateMessages}
          //   onFinish={onFinish}
          //   initialValues={{
          //     email: user.email || "",
          //     phone: user.customer ? user.customer.phone : "",
          //     city: { label: "Hồ Chí Minh" },
          //     district: { label: "Quận 1" },
          //   }}
          // >
          //   <Row gutter={25}>
          //     <Col span={12}>
          //       <Form.Item
          //         label="First Name"
          //         name="firstName"
          //         rules={[
          //           {
          //             required: true,
          //             whitespace: true,
          //           },
          //         ]}
          //       >
          //         <Input placeholder="First name" />
          //       </Form.Item>
          //     </Col>
          //     <Col span={12}>
          //       <Form.Item
          //         label="Last Name"
          //         name="lastName"
          //         rules={[
          //           {
          //             required: true,
          //             whitespace: true,
          //           },
          //         ]}
          //       >
          //         <Input placeholder="Last name" />
          //       </Form.Item>
          //     </Col>
          //   </Row>
          //   <Row gutter={25}>
          //     <Col span={12}>
          //       <Form.Item
          //         label="Phone"
          //         name="phone"
          //         rules={[
          //           {
          //             required: true,
          //             pattern: new RegExp(/\d+/g),
          //           },
          //         ]}
          //       >
          //         <Input placeholder="Phone number" />
          //       </Form.Item>
          //     </Col>
          //     <Col span={12}>
          //       <Form.Item
          //         label="Email"
          //         name="email"
          //         rules={[
          //           {
          //             required: true,
          //             whitespace: true,
          //             type: "email",
          //           },
          //         ]}
          //       >
          //         <Input placeholder="Email" />
          //       </Form.Item>
          //     </Col>
          //   </Row>
          //   <Row gutter={25}>
          //     <Col span={12}>
          //       <Form.Item
          //         label="City"
          //         name="city"
          //         rules={[
          //           {
          //             required: true,
          //           },
          //         ]}
          //       >
          //         <Select
          //           labelInValue
          //           showSearch
          //           placeholder="Select a city"
          //           optionFilterProp="children"
          //           onSelect={handleCityChange}
          //           filterOption={(input, option) =>
          //             option.children
          //               .toLowerCase()
          //               .indexOf(input.toLowerCase()) >= 0
          //           }
          //         >
          //           {cities &&
          //             cities.map((cities) => (
          //               <Option key={cities.code}>{cities.name}</Option>
          //             ))}
          //         </Select>
          //       </Form.Item>
          //     </Col>
          //     <Col span={12}>
          //       <Form.Item
          //         label="District"
          //         name="district"
          //         rules={[
          //           {
          //             required: true,
          //           },
          //         ]}
          //       >
          //         <Select
          //           labelInValue
          //           placeholder="Select a district"
          //           disabled={!districts}
          //           onChange={onDistrictChange}
          //         >
          //           {districts &&
          //             districts.map((district) => (
          //               <Option
          //                 key={district.code}
          //               >{`Quận ${district.name}`}</Option>
          //             ))}
          //         </Select>
          //       </Form.Item>
          //     </Col>
          //   </Row>
          //   <Form.Item
          //     label="Street Address"
          //     name="streetAddress"
          //     rules={[
          //       {
          //         required: true,
          //         whitespace: true,
          //       },
          //     ]}
          //   >
          //     <Input placeholder="Street Address" />
          //   </Form.Item>
          //   <Title
          //     level={3}
          //     onClick={toggleAdditional}
          //     style={{ cursor: "pointer", width: "fit-content" }}
          //   >
          //     Additional information
          //     <span style={{ marginLeft: 10, verticalAlign: "text-top" }}>
          //       {showAdditional ? (
          //         <MinusCircleOutlined />
          //       ) : (
          //         <PlusCircleOutlined />
          //       )}
          //     </span>
          //   </Title>
          //   {showAdditional && additionalForm}
          //   <Button htmlType="submit" className="button">
          //     <Space style={{ alignItems: "flex-end" }}>
          //       <span>Next</span>
          //       <ArrowRightOutlined />
          //     </Space>
          //   </Button>
          // </Form>
        )}
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="item-empty-area text-center">
          <div className="item-empty-area__icon mb-30">
            <i className="pe-7s-cash"></i>
          </div>
          <div className="item-empty-area__text">
            No items found in cart to checkout <br />{" "}
            <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillDetails;
