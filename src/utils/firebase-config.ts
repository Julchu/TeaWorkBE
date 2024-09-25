import { ServiceAccount } from "firebase-admin";

const getFirebaseConfig = (): ServiceAccount => {
  if (
    !process.env.TYPE ||
    !process.env.PROJECT_ID ||
    !process.env.PRIVATE_KEY_ID ||
    !process.env.PRIVATE_KEY ||
    !process.env.CLIENT_EMAIL ||
    !process.env.CLIENT_ID ||
    !process.env.AUTH_URI ||
    !process.env.TOKEN_URI ||
    !process.env.AUTH_PROVIDER_X509_CERT_URL ||
    !process.env.CLIENT_X509_CERT_URL ||
    !process.env.UNIVERSE_DOMAIN
  )
    return undefined;
  return {
    type: process.env.TYPE,
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY?.replace(/\\n/g, "\n"),
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
    universe_domain: process.env.UNIVERSE_DOMAIN,
  };
};

export default getFirebaseConfig;
