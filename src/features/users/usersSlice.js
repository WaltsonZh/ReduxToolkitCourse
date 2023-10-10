import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { apiSlice } from '../api/apiSlice'

const usersAdapter = createEntityAdapter()

const initialState = usersAdapter.getInitialState()

const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
      transformResponse: (responseData) => {
        return usersAdapter.setAll(initialState, responseData)
      },
      providesTags: (result, error, arg) => [{ type: 'User', id: 'List' }, ...result.ids.map((id) => ({ type: 'User', id }))],
    }),
  }),
})

export const { useGetUsersQuery } = usersApiSlice

export const selectUsersResult = usersApiSlice.endpoints.getUsers.select()

const selectUserData = createSelector(selectUsersResult, (usersResult) => usersResult.data)

export const { selectAll: selectAllUsers, selectById: selectUserById, selectIds: selectUserIds } = usersAdapter.getSelectors((state) => selectUserData(state) ?? initialState)
