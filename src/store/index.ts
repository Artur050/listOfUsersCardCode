import { configureStore } from "@reduxjs/toolkit";
import { rickAndMortyApi } from "./rickAndMortyApi/rickAndMortyApi";
import { favouritesReducer } from "./rickAndMortyApi/rickAndMorty.slice";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
       [rickAndMortyApi.reducerPath]: rickAndMortyApi.reducer,
       favourites: favouritesReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(rickAndMortyApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>