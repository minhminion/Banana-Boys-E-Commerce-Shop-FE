
import React from 'react'
import { Modal } from 'antd'
import { useModal } from '../../hooks/useModal'

const Modal1 = () => {

  const {hide, isShow, params, component, title} = useModal()

  return (
      <Modal
        title={title || "Notification"}
        visible={isShow}
        closable
        onCancel={hide}
        footer={null}
        bodyStyle={{
          ...(params.bodyStyle || {})
        }}
        {...params}
      >
        {component}
      </Modal>
  )
}

export default Modal1
