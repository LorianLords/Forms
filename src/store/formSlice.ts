import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { country_List } from '../Types/consts.ts';
import { FormData } from '../Types/types.ts';

type StateTypes = {
  value: number;
  countries: string[];
  data: FormData | undefined;
};

const initialState: StateTypes = {
  value: 0,
  countries: country_List,
  data: undefined,
};

export const formSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    setCountries(state, action: PayloadAction<string[]>) {
      state.countries = action.payload;
    },
    setData(state, action: PayloadAction<FormData>) {
      state.data = action.payload;
    },
  },
});

export const { setCountries, setData } = formSlice.actions;

export default formSlice.reducer;
