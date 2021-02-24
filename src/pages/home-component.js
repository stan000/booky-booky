import { isLoaded, useFirestoreConnect } from "react-redux-firebase";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Container } from "react-bootstrap";

export default function Home() {
  const bankName = "StanBank";
  useFirestoreConnect("samples");
  useFirestoreConnect("queries");

  const auth = useSelector((state) => state.firebase.auth);
  const firestore = useSelector((state) => state.firestore.data);
  // const numberToServe
  if (isLoaded(firestore.samples) && isLoaded(firestore.queries)) {
    console.log(isLoaded(firestore.queries));
    if (typeof firestore.queries !== "undefined") {
      if (firestore.queries && firestore.queries[auth.uid]) {
        console.log(firestore.queries[auth.uid]);
        return (
          <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
          >
            <Container className="w-100" style={{ maxWidth: "500px" }}>
              <h1>Welcome to {bankName}</h1>
              <h5>
                Currently serving:{" "}
                {firestore.samples.currentServingNumber.currentServingNumber}
              </h5>

              <h2>Your Number: {firestore.queries[auth.uid]?.bookingNumber}</h2>
            </Container>
          </Container>
        );
      } else {
        return (
          <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
          >
            <Container className="w-100" style={{ maxWidth: "500px" }}>
              <h1>Welcome to {bankName}</h1>
              <h3>
                Currently serving:{" "}
                {firestore.samples.currentServingNumber.currentServingNumber}
              </h3>

              <div>
                <p>
                  Next available number:{" "}
                  {firestore.samples.nextAvailableNumber.nextAvailableNumber}
                </p>
                <Link to="/book">
                  <Button variant="primary" size="lg">
                    Book
                  </Button>
                </Link>
              </div>
            </Container>
          </Container>
        );
      }
    }
  }
  return <div>isLoading...</div>;
}
