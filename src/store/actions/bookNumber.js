export const bookNumber = (bookDetails) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // Make firebase call
    const firestore = getFirestore();
    const increment = firestore.FieldValue.increment(1);
    firestore
      .collection("samples")
      .doc("nextAvailableNumber")
      .get()
      .then((doc) => {
        console.log(doc.data().nextAvailableNumber);
        return firestore
          .collection("queries")
          .doc(bookDetails.userId)
          .set({
            ...bookDetails,
            userName: "Placeholder",
            timestamp: new Date(),
            bookingNumber: doc.data().nextAvailableNumber,
          });
      })
      .then(() =>
        firestore
          .collection("samples")
          .doc("nextAvailableNumber")
          .update({ nextAvailableNumber: increment })
      )
      .then(() => {
        dispatch({ type: "BOOK_NUMBER", bookDetails });
      })
      .catch((e) => dispatch({ type: "BOOKING_ERROR", e }));
  };
};
