import React from "react";
import { Button, Space } from "antd";
import { Link } from "react-router-dom";
import { DoubleLeftOutlined } from '@ant-design/icons'
import Lottie from "../libraries/Lottie";

const OrderSuccess = () => {
  return (
		<div style={{ width: '60%', margin: 'auto', textAlign: 'center' }}>
        <Lottie
          options={{
            loop: false,
            animationData: require("../assets/animations/success-animation.json"),
          }}
          style={{ width: "50%", minWidth: "400px" }}
        />
        <h1>Cám ơn bạn!</h1>
        <p style={{ width: "auto", margin: "auto", padding: 20 }}>
          Thông tin chi tiết đã được gửi đến mail của bạn, cám ơn bạn vì đã sử dụng dịch vụ của cúng tôi{" "}
        </p>
        <a href="/">
				<Button
          className="button"
          style={{ width: "80%", margin: "auto", justifyContent: "center" }}
          htmlType="submit"
        >
          <Space>
						<DoubleLeftOutlined />	
            <span>Tiếp tục mua sắm</span>
          </Space>
        </Button>
        </a>
    </div>
  );
};

export default OrderSuccess;
