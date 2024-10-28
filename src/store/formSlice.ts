import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { countryType, DataTypes, FormTypes } from '../Types/types.ts';
import { countryList, default_image } from '../Types/consts.ts';

type StateTypes = {
  value: number;
  arrayData: DataTypes[];
  newState: boolean;
  countries: countryType[];
};

const initialState: StateTypes = {
  value: 0,
  arrayData: [
    {
      name: 'Lorian',
      age: 15,
      country: { value: 'FR', label: 'France', code: 'FR' },
      agreeToTerms: true,
      sex: 'male',
      password: 'aqwwe1!sqQ',
      confirmPassword: 'aqwwe1!sqQ',
      email: 'estuni@gmail.com',
      picture: default_image,
    },
  ],
  newState: false,
  countries: countryList,
};

export const formSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    setData(state, action: PayloadAction<DataTypes>) {
      state.arrayData.push(action.payload);
    },
    setNewState(state, action) {
      state.newState = action.payload;
    },
  },
});

export const { setData, setNewState } = formSlice.actions;

export default formSlice.reducer;
