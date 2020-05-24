import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  Input,
  Col,
  Row,
  Select,
  Button,
  Typography,
  Divider,
  List,
  Empty,
  Pagination,
} from "antd";
import AddressSingleItem from "./subComponents/AddressSingleItem";
import { ENUMS } from "../../../constant";
const { Title, Text } = Typography;
const { Search } = Input;

const AddressList = ({ cartItems, user, getAllUserAddress }) => {
  const history = useHistory();
  const location = useLocation();

  const [addresses, setAddresses] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalAddress, setTotalAddress] = useState(1)

  const pageSize = 4

  const fetchUserAddresses =  async (pageNumber, params) => {
    const result = await getAllUserAddress(pageNumber, {...params, pageSize})
    if(result && result.status === ENUMS.httpStatus.OK) {
      setAddresses(result.data.data)
      setTotalAddress(result.data.totalPage * pageSize)
    }
  }

  useEffect(() =>{
    fetchUserAddresses(currentPage)
  },[currentPage])

  const handleOnPagination = (value) => {
    setCurrentPage(value)
  }

  return (
    <div className="billing-info-wrap">
      <Title level={3}>Thêm địa chỉ</Title>
      <Text>Để bảo đảm các đơn hàng được giao đến đúng địa chỉ của bạn.</Text>
      <Divider />
      <Row style={{ marginBottom: 30 }} gutter={20}>
        <Col span={20}>
          <Search
            size="large"
            placeholder="Tìm kiếm theo ID đơn hàng hoặc Tên Sản phẩm"
            onSearch={(value) => console.log(value)}
          />
        </Col>
        <Col span={4}>
          <Button
            size="large"
            type="primary"
            onClick={() => history.push(location.pathname + "/add")}
          >
            Thêm địa chỉ
          </Button>
        </Col>
      </Row>
      {addresses && addresses.length ? (
        <List
          itemLayout="horizontal"
          dataSource={addresses}
          renderItem={(address) => (
            <List.Item
              style={{
                border: "1px solid #d9d9d9",
                borderRadius: 10,
                padding: "20px 30px",
                marginBottom: 20,
              }}
            >
              <AddressSingleItem address={address} />
            </List.Item>
          )}
        />
      ) : (
        <Empty style={{ margin: "150px auto" }} description={false} />
      )}
      <Pagination defaultCurrent={currentPage} pageSize={pageSize} total={totalAddress} onChange={handleOnPagination}/>
    </div>
  );
};
export default AddressList;
