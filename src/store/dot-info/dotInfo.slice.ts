import { createSlice } from '@reduxjs/toolkit';

const initialState:any = {
	lat: 0,
  lng: 0,
};

export const dotInfo = createSlice({
	name: 'dotInfo',
	initialState,
	reducers: {
		addCoords: (state, { payload }) => {
			state.lat = payload.lat,
      state.lng = payload.lng
		},
	},
});

export const { actions, reducer } = dotInfo;