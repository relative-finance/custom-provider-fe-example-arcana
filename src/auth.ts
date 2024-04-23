import { AuthProvider } from "@arcana/auth";

let auth: AuthProvider | null = null;

const getAuth = async () => {
  if (!auth) {
    auth = new AuthProvider("xar_dev_ecc6292e414c8228ae69ce5ff6a1b3eca59984e9");
  }
  await auth.init();
  return auth;
};

export { getAuth };
