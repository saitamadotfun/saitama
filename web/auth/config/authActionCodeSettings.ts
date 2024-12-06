export const actionCodeSettings = () =>
  ({
    url: window.location.origin + "/finishSignUp",
    handleCodeInApp: true,
    iOS: {
      bundleId: "com.saitama.ios",
    },
    android: {
      packageName: "com.saitama.android",
      installApp: true,
      minimumVersion: "12",
    },
    dynamicLinkDomain: "saitamafun.page.link",
  } as const);
