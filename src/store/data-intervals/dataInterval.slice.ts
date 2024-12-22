import { createSlice } from '@reduxjs/toolkit';

const initialState = {
};

export const dataInterval = createSlice({
  name: 'dataInterval',
  initialState,
  reducers: {
    addColorInterval: (state, { payload }) => {
      return {...state, payload}
    },
  },
});

export const { actions, reducer } = dataInterval;