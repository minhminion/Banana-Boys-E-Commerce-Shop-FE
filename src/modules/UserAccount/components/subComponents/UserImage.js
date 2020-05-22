import React from 'react'
import { Avatar, Space, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'

const UserImage = ({ user }) => {
    return (
        <Space style={{ alignItems: 'baseline' }}>
            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} size={45}/>
            <Typography.Title level={4}>{user.customer.name || 'UserName'}</Typography.Title>
        </Space>
    )
}

export default UserImage
