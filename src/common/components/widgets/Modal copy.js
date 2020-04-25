import React, { useState } from 'react'
import { Modal } from 'antd'

const ModalComponent = ({ global }) => {
  const [isShow, setIsShow] = useState(false)
  const [params, setParams] = useState({})
  const [component, setComponent] = useState(null)
  const [title, setTitle] = useState('Notification')

  const activateModal = (component, params) => {
    setIsShow(true)
    setComponent(component)
    setParams(params)

  }

  const deactivateModal = () => {
    const { deactiveCallback } = this.state
    deactiveCallback && deactiveCallback()
    setIsShow(false)
    setComponent(undefined)
    setTitle('')
  }

  const getApplicationNode = () => {
    return document.getElementById('application')
  }

  const renderItem = () => (
    <Modal
      title={title}
      visible
      closable
      onCancel={this.deactivateModal}
      footer={null}
      bodyStyle={{
        padding: 0,
        ...(params.bodyStyle || {})
      }}
      {...params}
    >
      {component}
    </Modal>
  )

  return {
    Component: !isShow || !component ? null : renderItem(),
      show: activateModal,
      hine: deactivateModal,
      getApplicationNode
    }
  }


export default ModalComponent