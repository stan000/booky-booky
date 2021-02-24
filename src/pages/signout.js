import React from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { signOut } from "../store/actions/signin";

export default function Signout() {
  const dispatch = useDispatch();

  const handleSignout = () => {
    console.log("Handling signout");
    dispatch(signOut());
  };

  return (
    <div>
      <Container>
        <Button type="submit" onClick={handleSignout}>
          Sign Out
        </Button>
      </Container>
    </div>
  );
}
