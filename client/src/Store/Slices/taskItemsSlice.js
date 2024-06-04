import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const taskItemsSlice = createSlice({
  name: "taskItems",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const { setTasks } = taskItemsSlice.actions;
export default taskItemsSlice.reducer;
