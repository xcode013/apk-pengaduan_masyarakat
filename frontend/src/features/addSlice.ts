import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

type User = {
  name: string;
  phone: string;
  username: string;
  nik?: string;
  id?: string;
  level?: 'Admin' | 'Petugas';
};

interface Init {
  user: User | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  massage?: string | unknown;
}

const initialState: Init = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  massage: '',
};

type ReqUser = {
  email: string;
  password: string;
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user: ReqUser, thunkAPI) => {
    try {
      const response = await axios.post(`http://localhost:5000/login`, {
        identifier: user.email,
        password: user.password,
      });
      return response.data;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const {response}: any = error;
      if (response) {
        const massage = response.data.msg;
        return thunkAPI.rejectWithValue(massage);
      }
    }
  }
);

export const getMe = createAsyncThunk('user/getMe', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`http://localhost:5000/me`);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      const massage = error.response.data.msg;
      return thunkAPI.rejectWithValue(massage);
    }
  }
});

export const logout = createAsyncThunk('user/logout', async () => {
  await axios.delete(`http://localhost:5000/logout`);
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.massage = action.payload;
    });

    // get/chect User Login
    builder.addCase(getMe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(getMe.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.massage = action.payload;
    });
  },
});

export const {reset} = authSlice.actions;
export default authSlice.reducer;
