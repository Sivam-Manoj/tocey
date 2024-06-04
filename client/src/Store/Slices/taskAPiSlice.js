import { apiSlice } from "./apiSlice";

const USER_ENDPOINTS = "/task";

export const taskSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTaskApi: builder.mutation({
      query: (data) => ({
        url: `${USER_ENDPOINTS}/create-task`,
        method: "POST",
        body: data,
      }),
    }),
    updateTaskApi: builder.mutation({
      query: ({ id, data }) => ({
        url: `${USER_ENDPOINTS}/edit-task/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteTaskApi: builder.mutation({
      query: (id) => ({
        url: `${USER_ENDPOINTS}/delete-task/${id}`,
        method: "DELETE",
      }),
    }),
    getTaskAPi: builder.query({
      query: () => ({
        url: `${USER_ENDPOINTS}/get-tasks`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateTaskApiMutation,
  useDeleteTaskApiMutation,
  useGetTaskAPiQuery,
  useUpdateTaskApiMutation,
} = taskSlice;
