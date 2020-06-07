import React, { useEffect, useState } from "react";
import { Input, Col, Row, List, Empty, Pagination, Button, Space } from "antd";
import { ENUMS } from "../../../../../constant";
import AddressSingleItem from "../../../../UserAccount/components/subComponents/AddressSingleItem";
const { Search } = Input;

const AddressList = ({ getAllUserAddress }) => {
  const [addresses, setAddresses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalAddress, setTotalAddress] = useState(1);

  const pageSize = 2;

  const fetchUserAddresses = async (pageNumber, params) => {
    const result = await getAllUserAddress(pageNumber, { ...params, pageSize });
    if (result && result.status === ENUMS.httpStatus.OK) {
      setAddresses(result.data.data);
      setTotalAddress(result.data.totalPage * pageSize);
    }
  };

  useEffect(() => {
    fetchUserAddresses(currentPage);
  }, [currentPage]);

  const handleOnPagination = (value) => {
    setCurrentPage(value);
  };

  const handleChoiceAddress = (addressId) => {
  console.log('======== Bao Minh: handleChoiceAddress -> addressId', addressId)

  }

  return (
    <div className="billing-info-wrap">
      <Row style={{ marginBottom: 30 }}>
        <Col span={24}>
          <Search
            size="large"
            placeholder="Tìm kiếm theo ID đơn hàng hoặc Tên Sản phẩm"
            onSearch={(value) => console.log(value)}
          />
        </Col>
      </Row>
      <Space style={{ alignItems: 'baseline' }}>
        <Pagination
          style={{ marginBottom: 20 }}
          defaultCurrent={currentPage}
          pageSize={pageSize}
          total={totalAddress}
          onChange={handleOnPagination}
        />
        <Button type='primary'>Xác nhận địa chỉ</Button>
      </Space>

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
              <AddressSingleItem address={address} onChoice={handleChoiceAddress}/>
            </List.Item>
          )}
        />
      ) : (
        <Empty style={{ margin: "150px auto" }} description={false} />
      )}
    </div>
  );
};
export default AddressList;
