import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const deleteUsers = createAsyncThunk(
  "user/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/user/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        return "User deleted successfully";
      } else if (response.status === 202) {
        return "Nothing deleted";
      } else if (response.status === 401) {
        throw new Error("Unauthorized - Invalid or missing token");
      } else if (response.status === 403) {
        throw new Error("Forbidden - User does not have necessary roles");
      } else if (response.status === 404) {
        throw new Error("Not Found - Endpoint not found or invalid permissions");
      } else {
        throw new Error("Internal Server Error");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const DeleteUserSlice = createSlice({
  name: "DeleteUser",
  initialState: {
    isLoding: false,
    error: null
  },

  extraReducers: {
    [deleteUsers.pending]: (state, action) => {
      state.isLoding = true;
      state.error = null;
    },
    [deleteUsers.fulfilled]: (state, action) => {
      state.isLoding = false;
      state.users = state.users.filter((el) => el.id !== action.payload);
      console.log(state.users)
    },
    [deleteUsers.rejected]: (state, action) => {
      state.isLoding = false;
      state.error = action.payload;
    }
  }

});

export default DeleteUserSlice.reducer;
export const {  removeUser } = DeleteUserSlice.actions;
