import React, { useState } from 'react'
import Login from './Login'
import Register from './Register'
import { Button, Row, Col } from 'antd'

const RegisterModal = (props) => {
  const [isLogingActive, setIsLogingActive] = useState(true)

  const { registerAccount, loginAccount, history } = props

  const changeForm = () => {
    setIsLogingActive(!isLogingActive)
  }

  return (
    <Row justify='center' align="middle" >
      <Col span={8}>
        {
          isLogingActive
          ? <Login
              style={{ marginTop: 300}}
              history={history}
              loginAccount={loginAccount}
            />
          : <Register
              style={{ marginTop: 200}}
              history={history}
              registerAccount={registerAccount}
            />
        }
        <Button onClick={changeForm}>Login | Sigin</Button>
      </Col>
    </Row>
  )
}

export default RegisterModal



