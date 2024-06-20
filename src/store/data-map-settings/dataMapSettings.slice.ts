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
    }
  }
})

export const { actions, reducer } = dataMapSettings;