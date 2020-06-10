import React, { useState, useEffect } from "react";
import {
  Divider,
  Typography,
  Input,
  Empty,
  Skeleton,
  Avatar,
  List,
  Pagination,
} from "antd";
import UserOrderSingleItem from "./subComponents/UserOrderSingleItem";
import { ENUMS } from "../../../constant";

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

const UserOrderList = ({ getAllOrderDetails }) => {
  const initialParams = {
    pageNumber: 1,
    pageSize: 5,
    isGift: 1,
  };

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useState(initialParams);
  const [pagination, setPagination] = useState({
    current: 1,
    total: 1,
    pageSize: 5,
  });

  useEffect(() => {
    const fetchAllProducts = async (params) => {
      setLoading(true);
      const response = await getAllOrderDetails(params);
      if (response && response.data) {
        setData(response.data);
        setPagination({
          current: response.pageNumber,
          pageSize: response.pageSize,
          total: response.pageSize * response.totalPage,
        });
      }
      setLoading(false);
    };
    fetchAllProducts(searchParams);
  }, [searchParams, getAllOrderDetails]);

  const handleOnPagination = (pagination, filters, sorter, extra) => {
    const params = {
      pageNumber: pagination,
    };
    window.scrollTo(0, 150);
    setSearchParams((prev) => ({ ...prev, ...params }));
  };

  const handleOnSearch = (value) => {
    setSearchParams((prev) => ({ ...prev, code: value }));
  }

  return (
    <div>
      <Title level={3}>Đơn hàng của tôi</Title>
      <Divider />
      <Search
        style={{ marginBottom: 30 }}
        size="large"
        placeholder="Tìm kiếm theo mã đơn hàng..."
        onSearch={handleOnSearch}
      />
      {data && data.length ? (
        <>
          <List
            itemLayout="horizontal"
            dataSource={data}
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
          <Pagination
            defaultCurrent={pagination.current}
            pageSize={pagination.pageSize}
            total={pagination.total}
            onChange={handleOnPagination}
          />
        </>
      ) : (
        <Empty style={{ margin: "150px auto" }} description={false} />
      )}
    </div>
  );
};

export default UserOrderList;
