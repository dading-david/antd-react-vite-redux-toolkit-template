import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { queryMessage } from '@/services/user';
import { ResponseData } from '@/utils/request';
import { RootState } from "..";

export interface CurrentUser {
  id: number;
  name: string;
  avatar: string;
  msg: number;
  roles: string[];
}

export const initialState: CurrentUser = {
  id: 0,
  name: '',
  avatar: '',
  msg: 0,
  roles: [],
};

// 创建一个处理异步操作的thunk
export const fetchUserMessage = createAsyncThunk(
  'user/fetchUserMessage',
  async (userId, thunkAPI) => {
    try {
      const response: ResponseData<number> = await queryMessage();
      const { data, code } = response;
      if (code !== 0) {
        // 根据实际情况，可以选择抛出错误或者返回一个默认值
        return thunkAPI.rejectWithValue(data || 0);
      }
      return data || 0;
    } catch (error) {
      // 处理错误情况，例如返回一个默认值
      return thunkAPI.rejectWithValue(0);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state: CurrentUser, action: PayloadAction<Partial<CurrentUser>>) => {
      const { payload } = action;
      if (typeof payload === 'object') {
        Object.keys(payload).forEach((key: string) => {
          // @ts-ignore
          state[key] = payload[key];
        });
      }
    }
  },
  extraReducers: (builder) => {
    // 使用字符串类型的action type
    builder.addCase(fetchUserMessage.fulfilled, (state: CurrentUser, action: PayloadAction<number>) => {
      state.msg = action.payload;
    });
  }
});

export const { setUser } = userSlice.actions;

export const userSelector = (state: RootState) => state.user;

// 导出reducer
export default userSlice.reducer;