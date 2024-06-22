import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Character, ApiResponse } from '../../models/models'

export const rickAndMortyApi = createApi({
    reducerPath: 'rickAndMortyApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://rickandmortyapi.com/api/'
    }),
    refetchOnFocus: true,
    endpoints: (build) => ({
        getCharacters: build.query<Character[], { page?: number }>({
            query: ({ page = 1 }) => ({
                url: 'character',
                params: {
                    page
                }
            }),
            transformResponse: (response: ApiResponse<Character>) => response.results
        }),
        getCharacterById: build.query<Character, number | string>({
            query: (id) => `character/${id}`
        })
    })
});

export const { useGetCharactersQuery, useGetCharacterByIdQuery } = rickAndMortyApi;
