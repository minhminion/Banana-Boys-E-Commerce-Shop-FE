import React from "react";
import { Descriptions, Typography, Button, Space, Card } from "antd";
import { CloseOutlined, EditOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";
const { Text } = Typography;
const AddressSingleItem = ({ address, onChoice, handleDeleteAddress }) => {
  const history = useHistory();

  return (
    <div style={{ width: "100%" }}>
      <Card
        title={`Địa chỉ - ${address.id}`}
        extra={
          <Space style={{ float: "right" }}>
            <Button
              type="danger"
              onClick={() => handleDeleteAddress(address.id)}
            >
              <CloseOutlined /> Xóa
            </Button>
            <Button
              type="ghost"
              onClick={() => history.push("/user/address/" + address.id)}
            >
              <EditOutlined /> Chỉnh Sửa
            </Button>
            {onChoice && (
              <Button type="primary" onClick={() => onChoice(address.id)}>
                <CheckCircleOutlined /> Chọn
              </Button>
            )}
          </Space>
        }
        bordered={false}
      >
        <Descriptions column={{ xs: 1, sm: 2, md: 4 }}>
          <Descriptions.Item label={<Text strong>Tên người nhận</Text>} span={2}>
            {address.name}
          </Descriptions.Item>
          <Descriptions.Item label={<Text strong>Số điện thoại liên lạc</Text>} span={2}>
            {address.phone}
          </Descriptions.Item>
          <Descriptions.Item label={<Text strong>Thành phố</Text>} span={2}>
            {address.city}
          </Descriptions.Item>
          <Descriptions.Item label={<Text strong>Quận/Huyện</Text>} span={1}>
            {address.district}
          </Descriptions.Item>
          <Descriptions.Item label={<Text strong>Phường/Xã</Text>} span={1}>
            {address.ward}
          </Descriptions.Item>
          <Descriptions.Item label={<Text strong>Địa chỉ</Text>} span={4}>
            {address.streetLocation}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default AddressSingleItem;
