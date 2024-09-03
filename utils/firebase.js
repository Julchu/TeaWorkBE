import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const fetchUser = async (token) => {
  try {
    const auth = await getAuth().verifyIdToken(token);
    const userInfo = (
      await getFirestore().doc(`users/${auth.user_id}`).get()
    ).data();
    // .collection("users").
    // .get() // const userInfo = (
    //   await getFirestore().collection("users").get(auth.user_id)
    // ).docs.map((doc) => console.log(doc)); //.listDocuments(auth.user_id)

    // console.log("auth", auth.user_id);
    // console.log("userInfo", userInfo);

    return userInfo;
  } catch (error) {
    console.log("error authorization", error);
    return null;
  }
};

export default fetchUser;
