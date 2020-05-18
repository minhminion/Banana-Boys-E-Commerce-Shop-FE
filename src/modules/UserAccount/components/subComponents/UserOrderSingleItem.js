import React, { useState } from "react";
import {
  Typography,
  Space,
  Divider,
  Statistic,
  Progress,
  Row,
  Col,
} from "antd";
import { ENUMS } from "../../../../constant";
import { useEffect } from "react";
import moment from "moment";
import { defaultCurrency } from "../../../../common/helpers/product";
import { OrderStatus } from "../../../../constant/enums";

const { Text } = Typography;

const UserOrderSingleItem = ({ order }) => {
  const [status, setStatus] = useState({});

  const getOrderStatus = (status) => {
    switch (status) {
      case ENUMS.OrderStatus.New:
        return {
          content: "Chờ xác nhận",
          color: "#52c41a",
        };
      case ENUMS.OrderStatus.Processing:
        return {
          content: "Đang xử lý",
          color: "#1890ff",
        };
      case ENUMS.OrderStatus.Delivering:
        return {
          content: "Đang giao hàng",
          color: "#1890ff",
        };
      case ENUMS.OrderStatus.Succeeded:
        return {
          content: "Đã giao",
          color: "#ff4d4f",
        };
      case ENUMS.OrderStatus.Boom:
        return {
          content: "Hàng bị boom",
          color: "#ff4d4f",
        };
      case ENUMS.OrderStatus.Canceled:
        return {
          content: "Đã bị hủy",
          color: "#ff4d4f",
        };
      default:
        return {
          content: "Đã giao",
          color: "#ff4d4f",
        };
    }
  };

  useEffect(() => {
    setStatus(getOrderStatus(order.status));
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <Space>
        <Text>ID Đơn hàng : {order.id}</Text>
        <Divider type="vertical" />
        <Text
          style={{
            color: status.color,
            display: "block",
            width: 80,
            textAlign: "center",
          }}
        >
          {status.content}
        </Text>
        <Divider type="vertical" />
        <Text>Ngày đặt : {moment().format("HH:mm DD-MM-YYYY")}</Text>
      </Space>
      <Divider />
      <Row gutter={[20, 20]}>
        <Col lg={{span:6}} md={{ span: 12 }}>
          <Statistic title="Số lượng sản phẩm" value={10} />
        </Col>
        <Col lg={{span: 6}} md={{ span: 12 }}>
          <Statistic
            title="Tổng hóa đơn"
            value={new Intl.NumberFormat().format(200000)}
            prefix={<span>&#8363;</span>}
          />
        </Col>
        <Col lg={{span: 6}} md={{ span: 12 }}>
          <Statistic title="Phương thức thanh toán" value="COD" precision={2} />
        </Col>
        <Col lg={{span: 6}} md={{ span: 12 }}>
          <Progress
            className="order-progress"
            showInfo={false}
            percent={(order.status * 100) / 5}
            steps={5}
            strokeColor="#1890ff"
          />
        </Col>
      </Row>
    </div>
  );
};

export default UserOrderSingleItem;
