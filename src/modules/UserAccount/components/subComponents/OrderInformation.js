import React from "react";
import {
  Descriptions,
  Badge,
  Space,
  Avatar,
  Typography,
} from "antd";
import moment from "moment";
import { UserOutlined } from "@ant-design/icons";
import { useModal } from "../../../../common/hooks/useModal";
import { getOrderStatus, getMethodOfPayment } from "../../../../constant/enums";

const { Text } = Typography;

const OrderInformation = ({ data }) => {
  const { show } = useModal();

  const handleShowShipperProfile = () => {
    show(null, "Thông tin Shipper");
  };

  const address = data.address || {};

  const status = getOrderStatus(data.orderStatus)

  return (
    <>
      <Descriptions bordered column={4}>
        <Descriptions.Item label="Mã hóa đơn" span={2}>
          {data.code}
        </Descriptions.Item>
        <Descriptions.Item label="Tình trạng" span={2}>
          <Badge color={status.color} text={status.content} />
        </Descriptions.Item>
        <Descriptions.Item label="Người nhận hàng" span={2}>
          {address.name}
        </Descriptions.Item>
        <Descriptions.Item label="Số điện thoại" span={2}>
          {address.phone}
        </Descriptions.Item>
        <Descriptions.Item label="Địa chỉ nhận hàng" span={2}>
          {address.streetLocation}
        </Descriptions.Item>
        <Descriptions.Item label="Phương thức thanh toán" span={2}>
          {getMethodOfPayment(data.paymentMethodId).content}
        </Descriptions.Item>
        <Descriptions.Item label="Yêu cầu của khách hàng" span={4}>
          {data.notes || "Không có yêu cầu"}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày đặt hàng đặt hàng" span={2}>
          {moment(moment.utc(data.createAt))
            .local()
            .format("DD/MM/YYYY HH:MM:SS")}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày giao hàng yêu cầu" span={2}>
          {data.idealShipTime
            ? moment(moment.utc(data.idealShipTime))
                .local()
                .format("DD/MM/YYYY HH:MM:SS")
            : "Không có yêu cầu"}
        </Descriptions.Item>
        <Descriptions.Item label="Shipper" span={4}>
          <Space className="Order-shipper">
            <Avatar
              icon={<UserOutlined />}
              onClick={handleShowShipperProfile}
              style={{ cursor: "pointer" }}
            />
            <Text strong>Nguyễn Văn Shipper</Text>
            <Text>(ID: 423324234)</Text>
          </Space>
        </Descriptions.Item>
        <Descriptions.Item label="Tổng hóa đơn" span={2}>
          {Intl.NumberFormat('vn').format(data.totalAmount)}
        </Descriptions.Item>
        <Descriptions.Item label="Vận chuyển" span={1}>
          Miễn phí
        </Descriptions.Item>
        <Descriptions.Item label="Official Receipts" span={1}>
          $60.00
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default OrderInformation;
