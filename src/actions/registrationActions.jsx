import { REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS } from "../types";
import { db } from "../firebase";
import { hideModal, showModal, setError, addStudent, addTeacher } from "./";

const userCollections = db.collection("users");

export const registerUser = (values) => async (dispatch) => {
  const { email, type } = values;
  dispatch(hideModal());
  dispatch(showModal("LOADING_MODAL"));
  dispatch(registerUserRequest());
  try {
    // Check if document is existing
    const userDocument = await userCollections.doc(email).get();
    if (userDocument.exists) {
      throw new Error("User Already Exists!!");
    }
    await userCollections.doc(email).set({
      type,
    });
    if (type === "teacher") {
      dispatch(addTeacher(values));
    } else if (type === "student") {
      dispatch(addStudent(values));
    }
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const registerUserRequest = () => {
  return {
    type: REGISTER_USER_REQUEST,
  };
};
export const registerUserSuccess = () => {
  return {
    type: REGISTER_USER_SUCCESS,
  };
};
