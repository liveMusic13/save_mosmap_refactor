import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Polygon {
  id: number;
  latLngs: number[][];
}

interface MapLayersState {
  arrayPolygons: Polygon[];
  indexTargetPolygon: number;
}

const initialState: MapLayersState = {
  arrayPolygons: [],
  indexTargetPolygon: 0,
};

export const mapLayers = createSlice({
  name: 'mapLayers',
  initialState,
  reducers: {
    addPolygon: (state, action: PayloadAction<Polygon>) => {
      state.arrayPolygons.push(action.payload);
    },
    // editPolygon: (state, action: PayloadAction<Polygon>) => {
    //   const index = state.arrayPolygons.findIndex(polygon => polygon.id === action.payload.id);
    //   if (index !== -1) {
    //     state.arrayPolygons[index] = action.payload;
    //   }
    // },
    deletePolygon: (state, action: PayloadAction<number>) => {
      state.arrayPolygons = state.arrayPolygons.filter(polygon => polygon.id !== action.payload);
    },
    setTargetPolygonIndex: (state, action: PayloadAction<number>) => {
      const polygonId = action.payload;
      const index = state.arrayPolygons.findIndex(polygon => polygon.id === polygonId);
      if (index !== -1) {
        state.indexTargetPolygon = index;
      }
    },
    clearPolygon: (state, {payload}) => {
      state.arrayPolygons = [];
    }
  }
})

export const {actions, reducer} = mapLayers;