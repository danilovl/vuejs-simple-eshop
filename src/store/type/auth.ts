export type AuthState = {
  verifyToken: boolean;
  authenticated: boolean;
  jwt: string | null;
}
