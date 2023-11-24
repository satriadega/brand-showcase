import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/action/actionCreator";
import { toast } from "react-toastify";

const RegisterView = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addUser(form));
      toast(`Successfully add users`);
      setForm({
        username: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
      });
    } catch (error) {
      console.log(error);
      toast.error(error.join(", ") || "Internal Server Error");
    }
  };
  return (
    <>
      <h2 className="text-3xl mt-10 mb-8 text-center">Register Admin</h2>
      <Form
        className=""
        onSubmit={handleSubmit}
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "36px",
          borderRadius: "9px",
        }}
      >
        <Form.Group as={Row} className="mb-3" controlId="formBasicUsername">
          <Form.Label column sm={3}>
            Username
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
          <Form.Label column sm={3}>
            Email
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter Email"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
          <Form.Label column sm={3}>
            Password
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter Password"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formBasicPhoneNumber">
          <Form.Label column sm={3}>
            Phone Number
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              placeholder="Enter PhoneNumber"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formBasicAddress">
          <Form.Label column sm={3}>
            Address
          </Form.Label>
          <Form.Control
            as="textarea"
            name="address"
            onChange={handleChange}
            value={form.address}
            placeholder="Enter Address"
            style={{ height: "100px" }}
          />
        </Form.Group>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
          }}
          className="mt-3"
        >
          <Button
            variant="primary"
            style={{ textAlign: "center", padding: "10px 20px" }}
            className="bg-black"
            onClick={() => {
              setForm({
                username: "",
                email: "",
                password: "",
                phoneNumber: "",
                address: "",
              });
            }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            style={{ textAlign: "center", padding: "10px 20px" }}
            className="bg-blue-500"
          >
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
};

export default RegisterView;
