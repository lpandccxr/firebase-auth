import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const repasswordRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function changeEmail(e) {
    e.preventDefault();
    setLoading(true);
    if (emailRef.current.value !== currentUser.email) {
      updateEmail(emailRef.current.value)
        .then(() => {
          history.push("/");
        })
        .catch((error) => {
          setError("Fail to update email: " + error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
      return setError("new Email is same to old Email");
    }
  }

  function changePassword(e) {
    e.preventDefault();
    setLoading(true);
    if (passwordRef.current.value !== repasswordRef.current.value) {
      setLoading(false);
      return setError("Passwords do not match");
    }

      if (passwordRef.current.value !== currentUser.password) {
        updatePassword(passwordRef.current.value)
          .then(() => {
            history.push("/");
          })
          .catch((error) => {
            setError("Fail to update account: " + error);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setLoading(false);
        setError("New password is same to old password");
      }
    
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={changeEmail}>
            <Form.Group>
              <Form.Label>New Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                ref={emailRef}
                defaultValue={currentUser.emailRef}
              />
            </Form.Group>
            <Button className="w-100 mb-2" type="submit" disabled={loading}>
              Update Email
            </Button>
          </Form>

          <Form onSubmit={changePassword}>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                ref={passwordRef}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Re-enter password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password again"
                ref={repasswordRef}
                required
              />
            </Form.Group>
            <Button className="w-100" type="submit" disabled={loading}>
              Update Password
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/login">Cancel</Link>
      </div>
    </>
  );
}
