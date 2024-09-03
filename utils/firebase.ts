import { DecodedIdToken, getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

export const authenticateUser = async (token?: string) => {
  if (!token) return;
  try {
    return await getAuth().verifyIdToken(token);
  } catch (error) {
    console.error("Error authenticating user", error);
  }
  return;
};

export const fetchUser = async (authInfo?: DecodedIdToken) => {
  try {
    if (authInfo?.user_id) {
      return (
        await getFirestore().doc(`users/${authInfo.user_id}`).get()
      ).data();
    }
  } catch (error) {
    console.error("Error fetching user", error);
  }
  return;
};
