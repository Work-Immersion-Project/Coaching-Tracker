import {
  ADD_USER,
  UPDATE_USER,
  REMOVE_USER,
  GET_USER,
  CHECK_USER,
} from "../types";
import app from "../firebase";
const db = app.firestore();
const userCollection = db.collection("users");

// User Actions
export const getUser = (email, uid, userToken) => async (dispatch) => {
  const document = await userCollection.doc(uid).get();
  dispatch({
    type: GET_USER,
    payload: { currentUser: { ...document.data() }, userToken },
  });
};

export const addUser = (userId, email, name, type, userToken) => async (
  dispatch
) => {
  await userCollection.doc(userId).set({
    userId: userId,
    email: email,
    name: name,
    type: type,
  });
  dispatch({
    type: ADD_USER,
    payload: {
      currentUser: { userId, email, name, type },
      userToken,
    },
  });
};
