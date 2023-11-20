import { createSlice } from "@reduxjs/toolkit";
import { user } from "../assets/data";
const initialState = {
  userInfo: JSON.parse(localStorage.getItem("user")) ?? user,
  edit: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogin(state, action) {
      state.userInfo = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    userLogout(state) {
      state.userInfo = null;
      localStorage.removeItem("user");
    },
    updateProfile(state, action) {
      state.edit = action.payload;
    },
  },
});
export const { userLogin, userLogout, updateProfile } = userSlice.actions;
export default userSlice.reducer;

//Actions
// export function userLogin(payload) {
//   return (dispatch) => {
//     dispatch(userSlice.actions.login(payload));
//   };
// }
// export function userLogout() {
//   return (dispatch) => {
//     dispatch(userSlice.actions.logout());
//   };
// }

// export function userUpdateProfile(payload) {
//   return (dispatch) => {
//     dispatch(userSlice.actions.updateProfile(payload));
//   };
// }
