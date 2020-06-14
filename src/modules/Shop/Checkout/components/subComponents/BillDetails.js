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

const BillDetails = ({
  cartItems,
  user,
  goNext,
  getAllUserAddress,
  createUserAddress,
  onSubmit,
  deleteSingleUserAddress,
}) => {
  const [isNewAddress, setIsNewAddress] = useState(false);

  const onAddNewAddress = async (values) => {
    const result = await createUserAddress({
      name: values.name,
      phone: values.phone,
      streetLocation: values.streetLocation,
      city: values.city.label,
      district: values.district.label,
      ward: values.ward,
    });
    if (result && result.status === ENUMS.httpStatus.CREATED) {
      notify({ message: "Lưu thành công địa chỉ mới", type: "success" });
      setIsNewAddress(false);
    }
  };

  const handleToggleChoiceAddress = () => {
    setIsNewAddress((prev) => !prev);
  };

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
          <AddressList
            deleteSingleUserAddress={deleteSingleUserAddress}
            getAllUserAddress={getAllUserAddress}
            onSubmit={onSubmit}
            goNext={goNext}
          />
        ) : (
          <AddressForm onFinish={onAddNewAddress} />
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
            Không có sản phẩm trong giỏ hàng <br />{" "}
            <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillDetails;
