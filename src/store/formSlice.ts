import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormData } from '../Types/types.ts';

type StateTypes = {
  value: number;
  data: FormData | undefined;
};

const initialState: StateTypes = {
  value: 0,
  data: undefined,
};

export const formSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    setData(state, action: PayloadAction<FormData>) {
      state.data = action.payload;
    },
  },
});

export const { setData } = formSlice.actions;

export default formSlice.reducer;
