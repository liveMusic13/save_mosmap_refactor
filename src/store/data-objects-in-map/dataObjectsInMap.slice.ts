import { createSlice } from '@reduxjs/toolkit';

import { IDataObjectsInMap } from '@/types/slice.types';

const initialState: IDataObjectsInMap = {
	points: {
		points: [],
	},
	centerMapObject: [55.7522, 37.6156],
};

export const dataObjectsInMap = createSlice({
	name: 'dataObjectsInMap',
	initialState,
	reducers: {
		addDataObjectsInMap: (state, { payload }) => {
			state.points = payload;
		},
		addNewCenter: (state, { payload }) => {
			state.centerMapObject = payload;
		},
		addNewObject: (state, {payload}) => {
			state.points.points.unshift(payload)
		},
		replacementNewObject: (state, {payload}) => {
      // Найдем индекс объекта с заданным id
      const index = state.points.points.findIndex((marker: any) => marker.id === payload.id);

      if (index !== -1) {
        // Если объект с таким id найден, заменим его на новый объект
        state.points.points[index] = payload;
      }
		},
		deleteNewObject: (state, {payload}) => {
			state.points.points.shift()
		},
		deleteObjectById: (state, {payload}) => {
			state.points.points = state.points.points.filter((marker:any) => marker.id !== payload)
		},
		updateCrdObjectById: (state, {payload}) => {
			// Преобразование id из строки в число
			const id = Number(payload.id);
		
			// Поиск индекса объекта с заданным id
			const index = state.points.points.findIndex((marker: any) => marker.id === id);
		
			// Если объект найден, обновление его координат
			if (index !== -1) {
				state.points.points[index].crd = payload.crd;
			}
		}
		
	},
});

export const { actions, reducer } = dataObjectsInMap;
