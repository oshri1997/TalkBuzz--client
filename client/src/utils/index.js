import axios from "axios";
import { getPosts } from "../redux/postSlice";

const API = axios.create({
  baseURL: "https://talkbuzz-server.onrender.com",
  responseType: "json",
});
export const apiRequest = async ({ url, token, data, method }) => {
  try {
    const response = await API(url, {
      method,
      data,
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return response?.data;
  } catch (error) {
    console.log(error.response?.data);
    return { status: error.response?.data.success, message: error.response.data.message };
  }
};

export const handleFileUpload = async (file) => {
  try {
    const reader = new FileReader();
    const imageDataPromise = new Promise((resolve) => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });

    reader.readAsDataURL(file);
    const imageData = await imageDataPromise;
    return imageData;
  } catch (error) {
    console.log(error);
  }
};
export const fetchPosts = async (token, dispatch, url, data) => {
  try {
    const res = await apiRequest({
      url: url || "/posts",
      token,
      method: "POST",
      data,
    });
    dispatch(getPosts(res?.data));
  } catch (error) {
    console.log(error);
  }
};
export const likePost = async (token, url) => {
  try {
    const res = await apiRequest({
      url,
      token,
      method: "POST",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const deletePost = async (token, id) => {
  try {
    const res = await apiRequest({
      url: `/posts/${id}`,
      token,
      method: "DELETE",
    });
    return;
  } catch (error) {
    console.log(error);
  }
};
export const getUserInfo = async (token, id) => {
  try {
    const url = id === undefined ? "/users/getuser" : `/users/getuser/${id}`;
    const res = await apiRequest({
      url,
      token,
      method: "GET",
    });
    if (res?.message === "Authentication Failed") {
      localStorage.removeItem("user");
      alert("User sesstion expired, please login again");
      window.location.replace("/login");
    }
    return res.user;
  } catch (error) {
    console.log(error);
  }
};
export const sendFriendRequest = async (token, id) => {
  try {
    const res = await apiRequest({
      url: `/users/friendrequest`,
      token,
      method: "POST",
      data: { requestTo: id },
    });
    return;
  } catch (error) {
    console.log(error);
  }
};
export const viewUserProfile = async (token, id) => {
  try {
    const res = await apiRequest({
      url: `/users/profileviews`,
      token,
      method: "POST",
      data: { id },
    });
    return;
  } catch (error) {
    console.log(error);
  }
};

export const getPostComments = async (id, token) => {
  try {
    const res = await apiRequest({
      url: `/posts/comments/${id}/`,
      method: "GET",
      token,
    });
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};
