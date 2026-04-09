const { createSlice, nanoid, current, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
    users: JSON.parse(localStorage.getItem("userData")) || [],
};
export const fetchUsersApi = createAsyncThunk("fetchUsersApi", async ()=>{
   const result = await fetch("/api/users");
   return result.json();
});
const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.users.push({ ...action.payload, id: nanoid() });
            let userData = JSON.stringify(current(state.users)) || [];
            localStorage.setItem("userData", userData);
        },
        removeUser: (state, action) => {
            state.users = state.users.filter(user => user.id !== action.payload);
            localStorage.setItem("userData", JSON.stringify(state.users));
        },
    },
    extraReducers: (builder) => {
        // Handle async actions here if needed
        builder.addCase(fetchUsersApi.fulfilled, (state, action) => {
            state.userApiData = action.payload.result || [];
          //  localStorage.setItem("userData", JSON.stringify(state.users));
        });
    }
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;