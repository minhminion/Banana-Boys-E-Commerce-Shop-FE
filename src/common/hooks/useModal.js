import { useContext } from "react";
import { ModalContext } from "../context/ModalContext";

export function useModal (){
  const modalContext = useContext(ModalContext)
  return modalContext
};