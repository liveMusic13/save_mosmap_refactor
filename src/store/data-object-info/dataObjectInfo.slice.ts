import { createSlice } from '@reduxjs/toolkit';

import { IDataObjectInfo } from '@/types/slice.types';

const initialState: IDataObjectInfo | any = {};

export const dataObjectInfo = createSlice({
	name: 'dataObjectInfo',
	initialState,
	reducers: {
		addObjectInfo: (state, { payload }) => {
			return payload;
		},
		deleteObjectInfo: (state, { payload }) => {
			return {};
		},
		updateField: (state, { payload }) => {
			const { name, value, id } = payload;
			const fieldIndex = state.values.findIndex((field: any) => field.name === name);
			if (fieldIndex !== -1) {
				state.values[fieldIndex].value = value;
				state.values[fieldIndex].id = String(id)
			}
		},
		addCrd: (state, {payload})=> {
			state.crd = payload
		},
		deleteCrd: (state, {payload})=> {
			state.crd = null
			state.area = []
		}
	},
});

export const { actions, reducer } = dataObjectInfo;
