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
import { GiftTwoTone, ArrowRightOutlined } from "@ant-design/icons";
import { useHistory, useLocation } from "react-router";

const { Text } = Typography;

const UserOrderSingleItem = ({ order }) => {
  const [status, setStatus] = useState({});

  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
    setStatus(ENUMS.getOrderStatus(order.orderStatus));
  }, []);

  return (
    <div style={{ width: "100%" }}>
      {order.isGift ? (
        <GiftTwoTone
          twoToneColor="#FA3C5A"
          style={{ fontSize: 18, position: "absolute" }}
        />
      ) : null}
      <Row gutter={[0, 20]} style={{ textAlign: "center" }}>
        <Col lg={8} md={24} sm={24}>
          <Text strong>ID Đơn hàng : </Text>
          {order.code}
        </Col>
        <Col lg={8} md={12} sm={12}>
          <Text strong>Tình trạng : </Text>
          <Text
            style={{
              color: status.color,
            }}
          >
            {status.content}
          </Text>
        </Col>
        <Col lg={8} md={12} sm={12}>
          <Text strong>Ngày đặt : </Text>
          {moment(moment.utc(order.createdAt))
            .local()
            .format("HH:mm DD-MM-YYYY")}
        </Col>
      </Row>
      <Divider />
      <Row gutter={[0, 20]}>
        <Col lg={{ span: 6 }} md={{ span: 12 }}>
          <Statistic
            style={{ textAlign: "center", borderRight: "1px solid #d9d9d9" }}
            title="Số lượng sản phẩm"
            value={order.orderItems ? order.orderItems.length : 0}
          />
        </Col>
        <Col lg={{ span: 6 }} md={{ span: 12 }}>
          <Statistic
            style={{ textAlign: "center", borderRight: "1px solid #d9d9d9" }}
            title="Tổng hóa đơn"
            value={new Intl.NumberFormat().format(order.totalAmount || 0)}
            prefix={<span>&#8363;</span>}
          />
        </Col>
        <Col lg={{ span: 6 }} md={{ span: 12 }}>
          <Statistic
            style={{ textAlign: "center", borderRight: "1px solid #d9d9d9" }}
            title="Phương thức thanh toán"
            value={ENUMS.getMethodOfPayment(order.paymentMethodId).content}
            precision={2}
          />
        </Col>
        <Col lg={{ span: 6 }} md={{ span: 12 }} style={{ display: 'flex' , justifyContent: 'center', alignItems: 'center'}}>
          <div className="iconButton activated primary" onClick={() => history.push(`${location.pathname}/${order.id}`)}>
            <ArrowRightOutlined
              style={{ fontSize: 40 }}
              className="iconFont level-3"
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default UserOrderSingleItem;
