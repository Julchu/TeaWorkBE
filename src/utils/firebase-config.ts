import { ServiceAccount } from "firebase-admin";

const getFirebaseConfig: ServiceAccount = {
  // type: process.env.TYPE,
  projectId: process.env.PROJECT_ID,
  // private_key_id: process.env.PRIVATE_KEY_ID,
  privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, "\n"),
  clientEmail: process.env.CLIENT_EMAIL,
  // client_id: process.env.CLIENT_ID,
  // auth_uri: process.env.AUTH_URI,
  // token_uri: process.env.TOKEN_URI,
  // auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
  // client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
  // universe_domain: process.env.UNIVERSE_DOMAIN,
};

export default getFirebaseConfig;
