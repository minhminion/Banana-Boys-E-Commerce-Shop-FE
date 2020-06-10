import React from "react";
import { Table, Empty, Avatar } from "antd";
import { DEFAULT_IMG_URL } from "../../../../common/configs";
import { ENUMS } from "../../../../constant";

const OrderProductList = ({ orderItems }) => {
  const columns = [
    {
      title: "PID",
      align: "center",
      dataIndex: "productTier",
      key: "id",
      render: (item) => item.productId,
    },
    {
      title: "Hình ảnh",
      align: "center",
      dataIndex: "productTier",
      key: "productTier",
      render: (item) => {
        return (
          <Avatar
            shape="square"
            style={{ width: 64, height: 100 }}
            src={
              item.product.productImages && item.product.productImages.length
                ? DEFAULT_IMG_URL +
                  item.product.productImages[0].imgLocation.replace("\\", "/")
                : process.env.PUBLIC_URL + "/images/product/banana.jpg"
            }
          />
        );
      },
    },
    {
      title: "Tên sàn phẩm",
      align: "center",
      dataIndex: "productTier",
      key: "name",
      render: (item) => item.product.name,
    },
    {
      title: "Loại",
      align: "center",
      dataIndex: "productTier",
      key: "name",
      render: (item) => `Loại ${item.tierId}`,
    },
    {
      title: "Đơn giá (đ)",
      align: "center",
      dataIndex: "singlePrice",
      key: "singlePrice",
      render: (item, record) =>
        `${Intl.NumberFormat("vn").format(item)}/ ${
          ENUMS.ProductUnit.find(
            (item) => item.id === record.productTier.product.productUnit
          ).content
        }`,
    },
    {
      title: "Số lượng",
      align: "center",
      dataIndex: "quantity",
      key: "quantity",
      render: (item) => Intl.NumberFormat("vn").format(item),
    },
    {
      title: "Tổng giá",
      align: "center",
      key: "totalPrice",
      render: (item, record) =>
        Intl.NumberFormat("vn").format(record.singlePrice * record.quantity),
    },
  ];

  return (
    <div>
      <Table
        bordered
        pagination={{
          pageSize: 4,
        }}
        style={{ marginTop: 10 }}
        columns={columns}
        dataSource={orderItems}
        rowClassName={(record, index) => "table-row"}
        loading={!orderItems}
        rowKey="id"
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={"Không có sản phẩm"}
            />
          ),
        }}
      />
    </div>
  );
};

export default OrderProductList;
