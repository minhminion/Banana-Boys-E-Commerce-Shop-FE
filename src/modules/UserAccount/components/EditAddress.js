import React, { useEffect, useState } from "react";
import { PageHeader, Modal } from "antd";
import { useHistory, useParams } from "react-router";
import { ENUMS } from "../../../constant";
import { notify } from "../../../libraries/Notify";
import { ExclamationCircleOutlined } from '@ant-design/icons'
import AddressForm from "./subComponents/AddressForm";

const EditAddress = ({ getSingleUserAddress, editSingleUserAddress }) => {
  const history = useHistory();
  const { addressId } = useParams();
  const [dataForm, setDataForm] = useState({});
  const fetchSingleAddress = async (addressId) => {
    const result = await getSingleUserAddress(addressId);
    if (result && result.status === ENUMS.httpStatus.OK) {
      setDataForm(result.data.data);
    }
  };

  const handleEditAddress = async (values) => {
    const result = await editSingleUserAddress( addressId, {
      name: values.name,
      phone: values.phone,
      streetLocation: values.streetLocation,
      city: values.city.label,
      district: values.district.label,
      ward: "Phường 4",
    });
    if (result && result.status === ENUMS.httpStatus.OK) {
      notify({ message: "Lưu thành công địa chỉ mới", type: "success" });
      history.goBack(-1);
    }
  }

  useEffect(() => {
    fetchSingleAddress(addressId);
  }, [addressId]);

  const onFinish = async (values) => {
    Modal.confirm({
      title: 'Bạn có muốn lưu lại địa chỉ này?',
      icon: <ExclamationCircleOutlined />,
      content: 'Hãy suy nghĩ kĩ khi bạn xác nhận',
      async onOk() {
        await handleEditAddress(values)
      },
      onCancel() {},
    });
  };

  return (
    <div>
      <PageHeader
        className="site-page-header"
        onBack={() => history.goBack(-1)}
        title="Danh sách địa chỉ"
        subTitle="Chỉnh sửa địa chỉ giao hàng"
      />
      <AddressForm onFinish={onFinish} data={dataForm} />
    </div>
  );
};

export default EditAddress;
