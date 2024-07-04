import { createSlice } from '@reduxjs/toolkit';


const initialState:any = {
  data: {},
  dataIdGroups:''
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
    addDataIdGroups: (state, {payload}) => {
      state.dataIdGroups = payload;
    }
  }
})

export const { actions, reducer } = dataMapSettings;