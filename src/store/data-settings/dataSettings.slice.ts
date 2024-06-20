import { CheckboxPayload, ISettingsData } from '@/types/slice.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState: ISettingsData = {
	maps: [],
  lists: [],
  fields: [],
  getIcons: []
};

export const dataSettings = createSlice({
	name: 'dataSettings',
	initialState,
	reducers: {
    addMaps: (state, {payload}) => {
      state.maps = payload
    },
    addLists: (state, {payload}) => {
      state.lists = payload
    },
    addFields: (state, {payload}) => {
      state.fields = payload
    },
    addGetIcons: (state, {payload}) => {
      state.getIcons = payload
    },
    updateCheckbox(state, action: PayloadAction<CheckboxPayload>) {
      const { id, field, value } = action.payload;
      const updateField = (item: any) => {
        if (item.id === id) {
          item[field] = value;
        }
        return item;
      };

      state.fields = state.fields.map(updateField);
      state.lists = state.lists.map(updateField);
      state.maps = state.maps.map(updateField);
    },
    removeFieldById: (state, action: PayloadAction<{ id: any }>) => {
      const { id } = action.payload;
      console.log(typeof id, id)
      // Фильтруем массивы, удаляя объект с соответствующим id
      state.maps = state.maps.filter(item => item.id !== id);
      state.lists = state.lists.filter(item => item.id !== id);
      state.fields = state.fields.filter(item => item.id !== id);
    },
	},
});

export const { actions, reducer } = dataSettings;