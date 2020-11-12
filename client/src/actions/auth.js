import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_PROFILE,
} from "./types";
import { setAlert } from "./alerts";
// import setAuthToken from '../utils/setAuthToken'

//Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/auth");
    
    if (res) {
      dispatch({
        type: USER_LOADED,
        payload: res.data, //returns the logged in user info based on token
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
        type: AUTH_ERROR
    })
  }
};

//Register User
export const register = ({ name, email, password }) => async (dispatch) => {
  console.log(name, email, password);
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post("/api/users", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

//Login User
export const login = (email, password) => async (dispatch) => {
  console.log(email, password);
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post("/api/auth", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//Logout
export const logout = () => (dispatch) => {
  try {
    dispatch({
      type: CLEAR_PROFILE,
    });
    dispatch({
      type: LOGOUT,
    });
  } catch (error) {
    console.log(error);
  }
};
