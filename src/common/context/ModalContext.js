import React,{ createContext, useState, useCallback } from "react"
import Modal from "../components/widgets/Modal"

export const ModalContext = createContext()

export const ModalContextProvider = ({ children}) => {

  const [isShow, setIsShow] = useState(false)
  const [params, setParams] = useState({})
  const [component, setComponent] = useState(undefined)
  const [title, setTitle] = useState('')

  const activateModal = (component, title = '', params = {}) => {
    setIsShow(true)
    setComponent(component)
    setParams(params)
    setTitle(title)
  }

  // const deactivateModal = () => {
  //   setIsShow(false)
  //   setComponent(undefined)
  //   setParams({})
  //   setTitle('')
  // }

  const show = useCallback(
    (component, title, params) => {
      activateModal(component, title, params )
    },
    [],
  )

  const hide = useCallback(
    () => {
      setIsShow(false)
    },
    [setIsShow],
  )

  return (
    <ModalContext.Provider value={{show, hide, isShow, params, component, title }}>
      <Modal/>
      {children}
    </ModalContext.Provider>
  )
}
