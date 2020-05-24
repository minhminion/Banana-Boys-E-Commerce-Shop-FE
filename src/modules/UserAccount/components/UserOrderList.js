import React, { useState, useEffect } from "react";
import {
  Divider,
  Typography,
  Input,
  Empty,
  Skeleton,
  Avatar,
  List,
} from "antd";
import UserOrderSingleItem from "./subComponents/UserOrderSingleItem";

const { Title, Text } = Typography;
const { Search } = Input;

const mockData = [
  {
    id: 1,
    name: "ABC",
    status: 2,
  },
  {
    id: 2,
    name: "BCD ",
    status: 1,
  },
  {
    id: 3,
    name: "BCD ",
    status: 3,
  },
  {
    id: 4,
    name: "BCD ",
    status: 5,
  },
];

const UserOrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(mockData);
  }, []);

  return (
    <div>
      <Title level={3}>Đơn hàng của tôi</Title>
      <Divider />
      <Search
        style={{ marginBottom: 30 }}
        size="large"
        placeholder="Tìm kiếm theo ID đơn hàng hoặc Tên Sản phẩm"
        onSearch={(value) => console.log(value)}
      />
      {orders && orders.length ? (
        <List
          itemLayout="horizontal"
          dataSource={orders}
          renderItem={(order) => (
            <List.Item
              style={{
                border: "1px solid #d9d9d9",
                borderRadius: 10,
                padding: "20px 30px",
                marginBottom: 20,
              }}
            >
              <UserOrderSingleItem order={order} />
            </List.Item>
          )}
        />
      ) : (
        <Empty style={{ margin: "150px auto" }} description={false} />
      )}
    </div>
  );
};

export default UserOrderList;
