export const getLatestData = () => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    // Make firebase call
    const firestore = getFirestore();
    const increment = firestore.FieldValue.increment(1);
    const doc = await firestore
      .collection("samples")
      .doc("currentServingNumber")
      .get()
      .then((doc) => {
        console.log("doc got" + doc.data());
        console.log(doc);
      });

    console.log(doc);
    const servingNumArray = await firestore
      .collection("queries")
      .where("bookingNumber", "==", doc.currentServingNumber + 1)
      .get();
    // console.log(servingNumArray);

    try {
      dispatch({ type: "GET_DATA_SUCCESS", servingNumArray });

      firestore
        .collection("samples")
        .doc("currentServingNumber")
        .update({ currentServingNumber: increment });
    } catch (e) {
      dispatch({ type: "GETTING_DATA_ERROR", e });
    }
  };
};
