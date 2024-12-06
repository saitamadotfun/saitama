import { GoogleAuthProvider } from "firebase/auth";

export type SocialLogin = {
  icon: string;
  name: string;
  plugin: typeof GoogleAuthProvider;
};

export const socialLogins: SocialLogin[] = [
  {
    icon: "i-fa-brands:google",
    name: "Continue with google",
    plugin: GoogleAuthProvider,
  },
];
