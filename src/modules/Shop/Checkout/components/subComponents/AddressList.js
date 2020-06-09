import React, { useEffect, useState } from "react";
import {
  Input,
  Col,
  Row,
  List,
  Empty,
  Pagination,
  Button,
  Space,
  Typography,
  DatePicker,
  Radio,
  Form,
} from "antd";
import { SendOutlined } from "@ant-design/icons";
import { ENUMS } from "../../../../../constant";
import AddressSingleItem from "../../../../UserAccount/components/subComponents/AddressSingleItem";
import TextArea from "antd/lib/input/TextArea";
import { notify } from "../../../../../libraries/Notify";
import { getNodeText } from "@testing-library/react";

const { Title, Text } = Typography;
const { Search } = Input;

const AddressList = ({ getAllUserAddress, onSubmit, goNext }) => {
  const [addresses, setAddresses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalAddress, setTotalAddress] = useState(1);
  const [selectedAddressId, setSelectedAddressId] = useState("");
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

  const handleDeleteAddress = (addressId) => {
    setCurrentPage(1);
  };

  const handleChoiceAddress = (addressId) => {
    setSelectedAddressId(addressId);
  };

  const handleComfirmChoiceAddress = (values) => {
    if( !selectedAddressId) {
      notify({
        message: 'Vui lòng chọn địa chỉ',
        type: 'warning'
      })
    } else {
      const data = {
        ...values,
        addressId: selectedAddressId
      }
      onSubmit(data)
      goNext()
    }
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
      <Row gutter={20}>
        <Col lg={14} md={24}>
          {addresses && addresses.length ? (
            <List
              itemLayout="horizontal"
              dataSource={addresses}
              renderItem={(address) => (
                <List.Item
                  className={`address-item ${
                    address.id === selectedAddressId ? "active" : ""
                  }`}
                  style={{
                    border: "1px solid #d9d9d9",
                    borderRadius: 10,
                    padding: "20px 30px",
                    marginBottom: 20,
                  }}
                >
                  <AddressSingleItem
                    address={address}
                    onDelete={handleDeleteAddress}
                    onChoice={handleChoiceAddress}
                  />
                </List.Item>
              )}
            />
          ) : (
            <Empty style={{ margin: "150px auto" }} description={false} />
          )}
          <Pagination
            style={{ marginBottom: 20 }}
            defaultCurrent={currentPage}
            pageSize={pageSize}
            total={totalAddress}
            onChange={handleOnPagination}
          />
        </Col>
        <Col lg={10} md={24}>
          <Title level={3}>Yêu cầu của khách hàng</Title>
          <Text>
            Banana Boys cam đoan sẽ thực hiện mọi yêu cầu của khách hàng
          </Text>
          <Form style={{ marginTop: 20 }} layout="vertical" onFinish={handleComfirmChoiceAddress}>
            <Form.Item label="Ngày giao hàng :" name="idealShipTime">
              <DatePicker />
            </Form.Item>
            <Form.Item label="Đây có phải là quà tặng không ?" name="isGift">
              <Radio.Group
                options={[
                  { label: "Không", value: false },
                  { label: "Phải", value: true },
                ]}
              />
            </Form.Item>
            <Form.Item label="Yêu cầu khác :" name="notes">
              <TextArea rows={7} />
            </Form.Item>
            <Form.Item>
              <Button
                className="button"
                style={{
                  width: "80%",
                  margin: "auto",
                  justifyContent: "center",
                }}
                htmlType="submit"
              >
                <Space>
                  <span>Xác nhận thông tin</span>
                  <SendOutlined />
                </Space>
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
export default AddressList;
