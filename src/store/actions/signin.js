export const signIn = (credentials) => {
  return (dispach, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispach({ type: "LOGIN_SUCCESS" });
      })
      .catch((authError) => {
        dispach({ type: "LOGIN_ERROR", authError });
      });
  };
};

export const signOut = () => {
  console.log("handling signout");
  return (dispach, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispach({ type: "SIGN_OUT_SUCCESS" });
      });
  };
};
