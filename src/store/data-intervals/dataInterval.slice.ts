import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  сolor_interval: {},
  color_map: [],
};

export const dataInterval = createSlice({
  name: 'dataInterval',
  initialState,
  reducers: {
    addColorInterval: (state, { payload }) => {
      // return {...state, payload}
      state.сolor_interval = payload;
    },
    addColor_map: (state, {payload}) => {
      state.color_map = payload;
    }
  },
});

export const { actions, reducer } = dataInterval;