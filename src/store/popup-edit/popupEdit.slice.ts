import { AllowedDataKey } from '@/types/slice.types';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: 'd',
  data: {
    address: 0,
    id: 0,
    name: '',
    namefield: 0,
    nameonmap: 0,
    type: '',
    type_name: '',
    color: 0,
    icon: 0,
    mode: 0,
    visible: 0,
  },
  deleteId: 0
};

export const popupEdit = createSlice({
  name: 'popupEdit',
  initialState,
  reducers: {
    addTitle: (state, {payload}) => {
      state.title = payload
    },
    addData: (state, {payload}) => {
      state.data = payload
    },
    changeCheckbox: (state, {payload}: {payload: {key: AllowedDataKey, value: number}}) => {
      const {key, value} = payload;

      state.data[key] = value
    },
    addName:(state, {payload}) => {
      state.data.name = payload
    },
    addId:(state, {payload}) => {
      state.deleteId = payload
    },
  },
})

export const {actions, reducer} = popupEdit;