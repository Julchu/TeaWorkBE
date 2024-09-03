const { getAuth } = require("firebase-admin/auth");
const { getFirestore } = require("firebase-admin/firestore");

const authenticateUser = async (token) => {
  try {
    return await getAuth().verifyIdToken(token);
  } catch (error) {
    console.error("Error authenticating user", error);
  }
  return;
};

const fetchUser = async (authUser) => {
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

module.exports = { fetchUser, authenticateUser };
