import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  fetchCategories,
  fetchPosts,
  updatePost,
} from "../store/action/actionCreator";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addPost } from "../store/action/actionCreator";
import Loading from "./Loading";

const CreateEditPost = ({ show, onClose, isEdit, post, setIsEdit }) => {
  const { categories, categoriesLoading } = useSelector(
    (state) => state.category
  );

  const dispatch = useDispatch();
  const [tags, setTags] = useState(["", "", ""]);
  const [form, setForm] = useState({
    title: "",
    content: "",
    imgUrl: "",
    categoryId: "",
  });

  useEffect(() => {
    dispatch(fetchCategories());
    if (isEdit) {
      setForm({
        title: post.title,
        content: post.content,
        imgUrl: post.imgUrl,
        categoryId: post.categoryId,
      });
      let temp = post.Tags.map((el) => el.name);
      // console.log(temp);
      setTags(temp);
    }
  }, [post]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const changeValueTags = (e) => {
    console.log(e.target);
    let newArray = [];

    for (let i = 0; i < tags.length; i++) {
      if (i == e.target.name) {
        newArray.push(e.target.value);
      } else {
        newArray.push(tags[i]);
      }
    }
    setTags(newArray);
  };

  const onClicknewTags = (e) => {
    e.preventDefault();
    const newArray = [...tags];
    newArray.push("");
    setTags(newArray);
  };

  const onClickdeleteTags = (e) => {
    e.preventDefault();
    const newArray = [...tags];
    newArray.pop();
    setTags(newArray);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let filtered = tags.filter((el) => el !== "");
    console.log(filtered);
    let data = {
      tags: filtered,
      title: form.title,
      content: form.content,
      imgUrl: form.imgUrl,
      categoryId: form.categoryId,
    };

    if (!isEdit) {
      try {
        onClose();
        await dispatch(addPost(data));
        toast(`Successfully add posts`);
        setForm({
          title: "",
          content: "",
          imgUrl: "",
          categoryId: "",
        });
        setTags(["", "", ""]);
      } catch (error) {
        console.log(error);
        toast.error(error.join(", ") || "Internal Server Error");
      }
    }

    if (isEdit) {
      try {
        onClose();
        await dispatch(updatePost(data, post.id));
        toast(`Successfully edit post`);
        setForm({
          title: "",
          content: "",
          imgUrl: "",
          categoryId: "",
        });
        setTags(["", "", ""]);
      } catch (error) {
        toast.error(error.join(", ") || "Internal Server Error");
      }
      setIsEdit(false);
    }
  };

  return (
    <>
      {categoriesLoading && <Loading />}

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
            {!isEdit ? "Add Post" : "Edit Post"}
          </h2>
          <Form.Group as={Row} className="mb-1" controlId="formBasicTitle">
            <Form.Label column sm={3}>
              Post Title
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                value={form.title}
                type="text"
                onChange={handleChange}
                name="title"
                placeholder="Enter Post title"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-1" controlId="formBasicImgUrl">
            <Form.Label column sm={3}>
              Post ImgUrl
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                value={form.imgUrl}
                type="text"
                onChange={handleChange}
                name="imgUrl"
                placeholder="Enter Post ImgUrl"
              />
            </Col>
          </Form.Group>
          <Form.Group className="mb-1" controlId="formBasicContent">
            <Form.Label>Post Content</Form.Label>
            <Form.Control
              as="textarea"
              value={form.content}
              onChange={handleChange}
              name="content"
              placeholder="Enter Post Content"
              style={{ height: "100px" }}
            />
          </Form.Group>
          <Form.Group className="mb-1" controlId="formBasicContent">
            <Form.Label>Post Category</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={handleChange}
              value={form.categoryId}
              name="categoryId"
            >
              <option value="">Open this select menu</option>
              {categories?.map((el, index) => {
                return (
                  <option key={index} value={el.id}>
                    {el.name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <Form.Label>Tags</Form.Label>
          {tags.map((el, index) => (
            <Form.Control
              key={index}
              type="text"
              name={index}
              onChange={changeValueTags}
              value={el}
              className="mb-1"
            />
          ))}

          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
            className="mt-3 "
          >
            <Button
              variant="secondary"
              onClick={(e) => {
                onClicknewTags(e);
              }}
              className="bg-gray-500 mr-4 text-xs font-bold"
            >
              Add new tag
            </Button>
            <Button
              variant="secondary"
              onClick={(e) => {
                onClickdeleteTags(e);
              }}
              className="bg-gray-500 mr-4 text-xs font-bold"
            >
              Remove Tag
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                onClose();
                setForm({
                  title: "",
                  content: "",
                  imgUrl: "",
                  categoryId: "",
                });
                setIsEdit();
                dispatch(fetchPosts());
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
    </>
  );
};

export default CreateEditPost;
