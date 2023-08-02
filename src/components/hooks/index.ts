import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {TAppDispatch, TAppState} from '../../types/state';

export const useAppDispatch: () => TAppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<TAppState> = useSelector;
