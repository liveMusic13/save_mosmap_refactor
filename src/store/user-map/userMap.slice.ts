import { createSlice } from '@reduxjs/toolkit';

import { IUserMap } from '@/types/slice.types';

const initialState: IUserMap = {
	map: '247',
	accessiblyMap: []
};

export const userMap = createSlice({
	name: 'userMap',
	initialState,
	reducers: {
		addNumMap: (state, { payload }) => {
			state.map = payload;
		},
		addAccessiblyMap: (state, {payload}) => {
			state.accessiblyMap.push(payload)
		},
		deleteAccessiblyMap: (state, {payload}) => {
			state.accessiblyMap = []
			state.map = ''
		}
	},
});

export const { actions, reducer } = userMap;
