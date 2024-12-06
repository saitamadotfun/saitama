import type { User } from "firebase/auth";

export default defineNuxtRouteMiddleware(async () => {
  const { signInWithIdToken } = useUser();
  const firebaseUser: User = await getCurrentUser();

  if (firebaseUser) {
    const idToken = await firebaseUser.getIdToken();
    return signInWithIdToken(idToken);
  }
});
