import React,{ createContext, useState, useCallback } from "react"
import LoadingPage from "../components/widgets/LoadingPage"

export const LoadingContext = createContext()

export const LoadingContextProvider = ({children}) => {

  const [isShow, setIsShow] = useState(false)

  const activateModal = () => {
    setIsShow(true)
  }

  // const deactivateModal = () => {
  //   setIsShow(false)
  //   setComponent(undefined)
  //   setParams({})
  //   setTitle('')
  // }

  const show = useCallback(
    () => {
      activateModal()
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
    <LoadingContext.Provider value={{show, hide, isShow }}>
      <LoadingPage/>
      {children}
    </LoadingContext.Provider>
  )
}
