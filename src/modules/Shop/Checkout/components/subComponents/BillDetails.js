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
import { notify } from "../../../../../libraries/Notify";
import { ENUMS } from "../../../../../constant";
const { Title } = Typography;
const { Option } = Select;

const BillDetails = ({ cartItems, user, goNext, getAllUserAddress, createUserAddress, onSubmit }) => {
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

  const onAddNewAddress = async (values) => {
    const result = await createUserAddress({
      name: values.name,
      phone: values.phone,
      streetLocation: values.streetLocation,
      city: values.city.label,
      district: values.district.label,
      ward: values.ward
    });
    if (result && result.status === ENUMS.httpStatus.CREATED) {
      notify({ message: "Lưu thành công địa chỉ mới", type: 'success' })
      setIsNewAddress(false)
    }
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
      <div>
        <Title level={2} style={{ textAlign: "center" }}>
          Địa chỉ thanh toán
        </Title>
        <Button type="primary" size="large" onClick={handleToggleChoiceAddress}>
          {!isNewAddress ? "Sử dụng địa chỉ mới" : "Địa chỉ đã lưu"}
        </Button>
        <Divider />
        {!isNewAddress ? (
          <AddressList getAllUserAddress={getAllUserAddress} onSubmit={onSubmit} goNext={goNext}/>
        ) : (
          <AddressForm onFinish={onAddNewAddress}/>
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
