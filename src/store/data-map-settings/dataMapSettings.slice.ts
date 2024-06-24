import { createSlice } from '@reduxjs/toolkit';


const initialState:any = {
  data: {}
};

export const dataMapSettings = createSlice({
	name: 'dataMapSettings',
	initialState,
	reducers: {
    addDataMapSettings: (state, {payload}) => {
      state.data = payload
    },
    editDataMapSettings: (state, {payload}) => {
      // state.data = {...state.data, ...payload}
      const keys = Object.keys(payload);

      // Перебираем ключи и обновляем состояние
      keys.forEach((key) => {
        state.data[key] = payload[key];
      });
    },

  }
})

export const { actions, reducer } = dataMapSettings;