import React from "react";
import { PageHeader } from "antd";
import { useHistory } from "react-router";
import { ENUMS } from "../../../constant";
import { notify } from "../../../libraries/Notify";
import AddressForm from "./subComponents/AddressForm";;

const AddAddress = ({ createUserAddress }) => {
  const history = useHistory();

  const onFinish = async (values) => {
    const result = await createUserAddress({
      name: values.name,
      phone: values.phone,
      streetLocation: values.streetLocation,
      city: values.city.label,
      district: values.district.label,
      ward: 'Phường 4'
    });
    if (result && result.status === ENUMS.httpStatus.CREATED) {
      notify({ message: "Lưu thành công địa chỉ mới", type: 'success' })
      history.goBack(-1)
    }
  };

  return (
    <div>
      <PageHeader
        className="site-page-header"
        onBack={() => history.goBack(-1)}
        title="Danh sách địa chỉ"
        subTitle="Tạo thêm địa chỉ mới"
      />
      <AddressForm onFinish={onFinish}/>
    </div>
  );
};

export default AddAddress;
