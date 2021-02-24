import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { connect } from "react-redux";
import { compose } from "redux";
import firebase from "firebase/app";
import { firestoreConnect, isLoaded } from "react-redux-firebase";

const bankName = "StanBank";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasBooked: false,
    };
    this.checkFirestore = this.checkFirestore.bind(this);
  }

  checkFirestore() {
    if (isLoaded(this.props.auth)) {
      firebase
        .firestore()
        .collection("queries")
        .doc(this.props.auth.uid)
        .get()
        .then((docSnapshot) => {
          if (docSnapshot.exists) {
            this.setState({ hasBooked: true });
          }
        });
    }
  }

  componentDidMount() {
    this.checkFirestore();
  }

  render() {
    console.log(this.state);
    const { auth, currentServingNumber, nextAvailableNumber } = this.props;
    if (isLoaded(auth)) if (!auth.uid) return <Redirect to="/login" />;

    return (
      <Container>
        <Container className="justify-content-md-center">
          <h1>Welcome to {bankName}</h1>
          <h3>Currently serving: {currentServingNumber}</h3>
          this.state.hasBooked ? <p>Your number is: {}</p> :{" "}
          <p>Next available number: {nextAvailableNumber}</p>
          <Link to="/book">
            <Button onClick={this.bookNumber} variant="primary" size="lg">
              Book
            </Button>
          </Link>
        </Container>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state);
  if (
    state.firestore.data.samples !== undefined &&
    state.firestore.data.samples !== null
  ) {
    console.log("running");
    const userId = state.auth.uid;
    return {
      currentServingNumber:
        state.firestore.data.samples.currentServingNumber.currentServingNumber,
      nextAvailableNumber:
        state.firestore.data.samples.nextAvailableNumber.nextAvailableNumber,
      auth: state.firebase.auth,
      // yourNumber: state.firestore.data.queries.userId.bookingNumber,
    };
  } else {
    return {
      currentServingNumber: null,
      nextAvailableNumber: null,
    };
  }
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    // if (props.firestore.data !== undefined && props.firestore.data !== null) {
    console.log(props);
    return [
      { collection: "samples" },
      {
        collection: "queries",
        // where: [["uid", "==", props.firebase.auth.uid]],
      },
    ];
    // }
  })
)(Home);
