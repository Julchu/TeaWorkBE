import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

export const authenticateUser = async (token) => {
  try {
    return await getAuth().verifyIdToken(token);
  } catch (error) {
    console.error("Error authenticating user", error);
  }
  return;
};

export const fetchUser = async (authUser) => {
  try {
    if (authUser.user_id) {
      return (
        await getFirestore().doc(`users/${authUser.user_id}`).get()
      ).data();
    }
  } catch (error) {
    console.error("Error fetching user", error);
  }
  return;
};
