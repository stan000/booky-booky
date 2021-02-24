import React, { useRef, useState } from "react";
import { Button, Card, Form, FormControl, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { bookNumber } from "../store/actions/bookNumber";
import { useDispatch, useSelector } from "react-redux";
import { isLoaded } from "react-redux-firebase";
import { Redirect, useHistory } from "react-router-dom";

function BookAppointment() {
  const idRef = useRef();
  const reasonRef = useRef();
  const inquiryRef = useRef();
  const dispach = useDispatch();
  const [loading, setLoading] = useState(false);
  const auth = useSelector((state) => state.firebase.auth);
  const history = useHistory();

  if (isLoaded(auth)) if (!auth.uid) return <Redirect to="/login" />;

  function handleSubmit() {
    setLoading(true);

    const bookingDetails = {
      idNumber: idRef.current.value,
      inquiry: inquiryRef.current.value,
      reason: reasonRef.current.value,
      userId: auth.uid,
    };
    console.log(bookingDetails);
    dispach(bookNumber(bookingDetails));
    setLoading(false);
    history.push("/");
  }

  return (
    <Card>
      <Card.Body>
        <h2 className="text-center mb-4">Book Appointment</h2>

        <Form onSubmit={handleSubmit}>
          <Form.Group id="idNuber">
            <Form.Label>Id Number</Form.Label>
            <FormControl
              placeholder="ID Number"
              aria-label="ID number"
              aria-describedby="get-id-number"
              ref={idRef}
              required
            />
          </Form.Group>
          <Form.Group id="reason">
            <Form.Label>Reason for Appointment :</Form.Label>
            <InputGroup>
              <Form.Control
                as="select"
                custom
                name="reason-for-appointment"
                ref={inquiryRef}
                required
              >
                <option value="" defaultValue>
                  Select Reason
                </option>
                <option value="withdrawal">Money Withdrawal</option>
                <option value="deposit">Bank Deposit</option>
                <option value="customer-service">Customer Service</option>
                <option value="other">Other</option>
              </Form.Control>
            </InputGroup>
          </Form.Group>
          {/* {"other" === inquiryRef.current.value && ( */}
          {true && (
            <Form.Group id="reasonInput">
              <Form.Label>Reason</Form.Label>
              <FormControl
                placeholder="Please state your reason"
                aria-label="reason"
                aria-describedby="reasonInput"
                ref={reasonRef}
                required
              />
            </Form.Group>
          )}
          <Button disabled={loading} onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
    //   {/* </div> */}
    // {/* </Container> */}
  );
}

// function mapDispatchToProps(dispach) {
//   return {
//     bookNumber: (bookingDetails) => dispach(bookNumber(bookingDetails)),
//   };
// }

// export default connect(null, mapDispatchToProps)(BookAppointment);
export default BookAppointment;
