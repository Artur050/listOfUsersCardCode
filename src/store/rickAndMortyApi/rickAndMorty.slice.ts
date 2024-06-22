import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const KEY_LS = 'kls'

interface FavouritesState {
  users: string[]; 
}

const initialState: FavouritesState = {
  users: JSON.parse(localStorage.getItem(KEY_LS) ?? '[]'),
};

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addFavourite(state, action: PayloadAction<string>) {
      state.users.push(action.payload); 
      localStorage.setItem(KEY_LS, JSON.stringify(state.users))

    },
    removeFavourite(state, action: PayloadAction<string>) {
      state.users = state.users.filter((userId) => userId !== action.payload);
      localStorage.setItem(KEY_LS, JSON.stringify(state.users))
    },
  },
});

export const favouritesActions = favouritesSlice.actions;
export const favouritesReducer = favouritesSlice.reducer;
