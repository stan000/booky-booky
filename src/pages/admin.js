import React, { useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import { compose } from "redux";
import { getFirestore } from "redux-firestore";

function Admin(props) {
  //   const currentlyServing = () => {
  //     if (isLoaded(firestoreData)) {
  //       return firestoreData.samples.currentlyServing + 1;
  //     }
  //   };
  //   useFirestoreConnect("samples");
  //   useFirestoreConnect([
  //     {
  //       collection: "queries",
  //       where: [["bookingNumber", "==", currentlyServing()]],
  //     },
  //   ]);
  // const firestoreData = useSelector((state) => state.firestore.data);

  //   if (isLoaded(firestoreData)) {
  //     console.log(firestoreData);
  // var currentlyServing = firestoreData.samples.currentlyServing + 1;
  //   var id = firestoreData.queries.
  var nextServingNumber = null;
  const [data, setData] = useState({
    idNumber: null,
    inquiry: null,
    reason: null,
  });
  const getNextCustomer = () => {
    const db = getFirestore();
    const increment = db.FieldValue.increment(1);
    db.collection("samples")
      .doc("currentServingNumber")
      .get()
      .then((snapshot) => {
        nextServingNumber = snapshot.data().currentServingNumber + 1;
        console.log("nextServingNumber", nextServingNumber);
        db.collection("queries")
          .where("bookingNumber", "==", nextServingNumber)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              console.log(doc.data());
              setData(() => doc.data());
            });
            console.log("data", data);
          });
      })
      .then(() => {
        const currentServingNumber = nextServingNumber - 1;
        db.collection("queries")
          .where("bookingNumber", "==", currentServingNumber)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => doc.ref.delete());
          });
      })
      .then(() =>
        db
          .collection("samples")
          .doc("currentServingNumber")
          .update({ currentServingNumber: increment })
      );
  };

  // const [ currentServingNumber, idNumber, inquiry, reason ] = data;
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Container className="m-4">
            <h2>Currently serving: {data.nextServingNumber}</h2>
            <h5>id Number: {data.idNumber}</h5>
            <p className="lead">inquiry: {data.inquiry}</p>
            <p>{data.reason}</p>
            <Button onClick={getNextCustomer}>Next Customer</Button>
          </Container>
        </Card>
      </div>
    </Container>
  );
}
// }

const mapStateToProps = (state) => {
  if (isLoaded(state.firestore.ordered.queries)) {
    return {
      currentServingNumber:
        state.firestore.ordered.queries[0]?.bookingNumber || null,
      idNumber: state.firestore.ordered.queries[0]?.idNumber || null,
      inquiry: state.firestore.ordered.queries[0]?.inquiry || null,
      reason: state.firestore.ordered.queries[0]?.reason || null,
    };
  }
};

const mapFirestoreStateToProps = (props) => {
  return [{ collection: "queries" }];
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(mapFirestoreStateToProps)
)(Admin);
