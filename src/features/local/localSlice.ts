import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface LocalState {
  menuOpen: boolean;
}

const initialState: LocalState = {
  menuOpen: false,
};

export const localSlice = createSlice({
  name: 'local',
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.menuOpen = !state.menuOpen;
    },
  },
});

export const { toggleMenu } = localSlice.actions;

export const selectMenuOpen = (state: RootState) => state.local.menuOpen;

export default localSlice.reducer;
