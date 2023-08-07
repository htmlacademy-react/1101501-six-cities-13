import index from '../store';

export type TAppState = ReturnType<typeof index.getState>
export type TAppDispatch = typeof index.dispatch
