import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCategory, updateCategory } from "../store/action/actionCreator";
import { fetchCategories } from "../store/action/actionCreator";
import { toast } from "react-toastify";

const CreateEditCategory = ({ show, onClose, isEdit, setIsEdit, category }) => {
  const [form, setForm] = useState({
    name: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEdit) {
      setForm({
        name: category.name,
      });
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEdit) {
      try {
        onClose();
        await dispatch(addCategory(form));
        toast(`Successfully add categories`);
        setForm({
          name: "",
        });
      } catch (error) {
        console.log(error);
        toast.error(error.join(", ") || "Internal Server Error");
      }
    }

    if (isEdit) {
      try {
        onClose();
        await dispatch(updateCategory(form, category.id));
        toast(`Successfully edit category`);
        setForm({
          name: "",
        });
      } catch (error) {
        toast.error(error.join(", ") || "Internal Server Error");
      }
      setIsEdit(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Form
        className="font-bold"
        onSubmit={handleSubmit}
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "36px",
          borderRadius: "9px",
        }}
      >
        <h2
          className="mb-3 text-blue-500 font-bold text-2xl"
          style={{ textAlign: "center" }}
        >
          {!isEdit ? "Add Category" : "Edit Category"}
        </h2>
        <Form.Group as={Row} className="mb-3" controlId="formBasicName">
          <Form.Label column sm={3}>
            Name
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              value={form.name}
              type="text"
              onChange={handleChange}
              name="name"
              placeholder="Enter Name"
            />
          </Col>
        </Form.Group>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
          className="mt-3 "
        >
          <Button
            variant="secondary"
            onClick={() => {
              onClose();
              setForm({
                name: "",
              });
              setIsEdit(false);
              dispatch(fetchCategories());
            }}
            className="bg-blue-500 mr-4 font-bold"
          >
            Close
          </Button>
          <Button
            variant="primary"
            type="submit"
            style={{ textAlign: "center", padding: "10px 20px" }}
            className="bg-blue-500  font-bold "
          >
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateEditCategory;
