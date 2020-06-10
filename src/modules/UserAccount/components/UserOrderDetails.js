import React, { useState, useEffect } from "react";
import { Tabs, PageHeader, Typography } from "antd";
import { useParams, useHistory } from "react-router";
import OrderInformation from "./subComponents/OrderInformation";
import OrderProductList from "./subComponents/OrderProductList";

const { TabPane } = Tabs;
const { Title } = Typography

const UserOrderDetails = ({ getSingleOrderDetails }) => {
  const { orderId } = useParams();
	const [data, setData] = useState({})
	const history = useHistory()

  useEffect(() => {
    const fetchSingleOrderDetails = async (orderId) => {
      const result = await getSingleOrderDetails(orderId)
      if(result) {
        setData(result.data)
      }
    }
    fetchSingleOrderDetails(orderId)
  }, [orderId, getSingleOrderDetails])

  return (
    <div>
      <PageHeader
				title={<Title level={3}>Đơn hàng của tôi</Title>}
				subTitle='Chi tiết hóa đơn'
        onBack={() => history.push('/user/orders')}
      />
      <Tabs defaultActiveKey="1">
        <TabPane tab="Thông tin hóa đơn" key="1">
          <OrderInformation data={data} />
        </TabPane>
        <TabPane tab="Chi tiết hóa đơn" key="2">
          <OrderProductList orderItems={data.orderItems}/>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default UserOrderDetails;
