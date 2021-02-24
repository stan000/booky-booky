import React, { useRef, useState } from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { signIn } from "../store/actions/signin";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.authError);

  function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      // await login(emailRef.current.value, passwordRef.current.value);
      const creds = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      dispatch(signIn(creds));
      !authError.code && history.push("/");
    } catch (e) {
      setError("Failed to signin: " + e.message);
      history.push("/login");
    }
    setLoading(false);
  }

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Log In</h2>
              {authError && <Alert variant="danger">{authError.code}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Button className="w-100" disabled={loading} type="submit">
                  Log In
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </Container>
    </>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    authError: state.auth.authError,
  };
};

export default connect(mapStateToProps)(Login);
