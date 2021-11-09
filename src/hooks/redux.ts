import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../index";
import { RootState } from "../store/root-reducer";

export const OrderAppDispatch = () => {
  return useDispatch<AppDispatch>();
};

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
