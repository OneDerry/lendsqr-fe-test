import {
  configureStore,
  type ConfigureStoreOptions,
  createSlice,
} from "@reduxjs/toolkit";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";

const appSlice = createSlice({
  name: "app",
  initialState: {
    user: null,
    isLoading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, setLoading } = appSlice.actions;

export const createStore = (
  options?: ConfigureStoreOptions["preloadedState"],
) => {
  const store = configureStore({
    reducer: {
      app: appSlice.reducer,
    },
    ...options,
  });

  return store;
};

const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
