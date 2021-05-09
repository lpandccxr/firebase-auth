import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [recaptcha, setRecaptcha] = useState(false);
  const [refs, setRefs] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!recaptcha) {
      setError("Please complete the reCaptcha");
    } else {
      try {
        setError("");
        setLoading(true);
        await login(emailRef.current.value, passwordRef.current.value);
        history.push("/");
      } catch (error) {
        setError("account name/password is wrong/" + error);
      } finally {
        setLoading(false);
        setRecaptcha(false);
        refs.reset();
      }
    }
  }

  const onChange = (value) => {
    console.log("captcha value: " + value);
    setRecaptcha(true);
    setError("");
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                ref={emailRef}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                ref={passwordRef}
                required
              />
            </Form.Group>

            <div className="align-items-center ml-4">
              <ReCAPTCHA
                sitekey={process.env.REACT_APP_PUBLIC_RECAPTCHA_SITE_KEY}
                onChange={onChange}
                ref={(e) => setRefs(e)}
              />
            </div>

            <Button className="w-100 mt-3" type="submit" disabled={loading}>
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            Forget your password? <Link to="/forgotPassword">Reset</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign up</Link>
      </div>
    </>
  );
}
