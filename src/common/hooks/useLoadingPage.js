import { useContext } from "react";
import { LoadingContext } from "../context/LoadingContext";

export function useLoadingPage (){
  const loadingContext = useContext(LoadingContext)
  return loadingContext
};