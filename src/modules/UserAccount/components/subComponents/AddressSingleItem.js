import React from "react";
import { Descriptions, Typography, Button, Space } from "antd";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";
const { Text } = Typography;
const AddressSingleItem = ({ address, onChoice }) => {
  const history = useHistory();

  return (
    <div style={{ width: "100%" }}>
      <Descriptions
        title={
          <>
            <Text strong>Địa chỉ - {address.id}</Text>
            <Space style={{ float: "right" }}>
              <Button
                type="ghost"
                onClick={() => history.push("/user/address/" + address.id)}
              >
                <EditOutlined /> Chỉnh Sửa
              </Button>
              <Button type="ghost">
                <CloseOutlined /> Xóa
              </Button>
              {onChoice && (
                <Button type="ghost" onClick={() => onChoice(address.id)}>
                  <CloseOutlined /> Chọn
                </Button>
              )}
            </Space>
          </>
        }
        bordered
        column={{ xs: 1, sm: 2, md: 3 }}
      >
        <Descriptions.Item label="Tên người nhận" span={3}>
          {address.name}
        </Descriptions.Item>
        <Descriptions.Item label="Số điện thoại liên lạc" span={2}>
          {address.phone}
        </Descriptions.Item>
        <Descriptions.Item label="Thành phố" span={1}>
          {address.city}
        </Descriptions.Item>
        <Descriptions.Item label="Quận/Huyện" span={2}>
          {address.district}
        </Descriptions.Item>
        <Descriptions.Item label="Phường/Xã" span={1}>
          {address.ward}
        </Descriptions.Item>
        <Descriptions.Item label="Địa chỉ" span={3}>
          {address.streetLocation}
        </Descriptions.Item>
      </Descriptions>
      ,
    </div>
  );
};

export default AddressSingleItem;
