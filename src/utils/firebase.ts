import { getAuth } from "firebase-admin/auth";
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

export const fetchUser = async (userId?: string) => {
  if (!userId) return;
  try {
    return (await getFirestore().doc(`users/${userId}`).get()).data();
  } catch (error) {
    console.error("Error fetching user", error);
  }
  return;
};

export const fetchGeo = async (ip?: string) => {
  if (!ip || !process.env.IPINFO_GEOLOCATION_API_KEY) return;

  try {
    const url = `https://ipinfo.io/${ip.length > 5 ? ip : ""}?token=${
      process.env.IPINFO_GEOLOCATION_API_KEY
    }`;
    const res = await fetch(new URL(url).href);
    const geolocation = await res.json();
    if (geolocation["loc"] && geolocation["loc"].length > 1)
      return {
        lat: geolocation["loc"][0],
        lng: geolocation["loc"][1],
      };
  } catch (error) {
    console.error("Error fetching geolocation", error);
  }
  return;
};
