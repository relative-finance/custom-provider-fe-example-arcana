import { AuthProvider } from "@arcana/auth";

let auth: AuthProvider | null = null;

const getAuth = async () => {
  if (!auth) {
    auth = new AuthProvider("xar_test_cf84bfa3a1a27a625344370376a45a49b08594f7");
  }
  await auth.init();
  return auth;
};

export { getAuth };
