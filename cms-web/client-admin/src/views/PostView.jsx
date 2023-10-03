import { useState, useEffect } from "react";
import CreateEditPost from "../components/CreateEditPost";
import useToggle from "../hooks/useToggle";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, deletePost } from "../store/action/actionCreator";
import { Button } from "react-bootstrap";
import LoadingRow from "../components/LoadingRow";
import { API_URL } from "../config/api";

const PostView = () => {
  const { posts, postsLoading } = useSelector((state) => state.post);
  const [post, setPost] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const { show, handleClose, handleOpen } = useToggle();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const dataPosts = posts.map((el, index) => {
    // console.log(el);
    return (
      <tr key={el.id}>
        <td scope="row">#{index + 1}</td>
        <td className="fw-bold">
          <div style={{ width: "200px" }}>{el.title}</div>
        </td>
        <td>
          <img src={el.imgUrl} style={{ width: "380px" }} className="rounded" />
        </td>
        <td>
          <div
            className=" wrap"
            style={{ width: "300px", overflowY: "auto", height: "220px" }}
          >
            <p>{el.content}</p>
          </div>
        </td>

        <td>
          <div style={{ width: "100px" }}>{el.Category.name}</div>
        </td>
        <td>
          <div style={{ width: "100px" }}>{el.User.email}</div>
        </td>
        <td>
          {el.Tags.map((el, index) => (
            <p key={index} className="font-semibold">
              #{el.name}
            </p>
          ))}
        </td>
        <td>
          <a href="" className="ms-3">
            <button
              style={{ width: "60px" }}
              className="bg-blue-600 py-2 rounded-lg mb-3"
              onClick={async (e) => {
                e.preventDefault();
                setIsEdit(true);
                try {
                  const response = await fetch(`${API_URL}/posts/` + el.id, {
                    method: "GET",
                    headers: {
                      access_token: localStorage.access_token,
                    },
                  });
                  const result = await response.json();
                  setPost(result);
                  handleOpen();
                } catch (error) {
                  console.error("Error:", error);
                }
              }}
            >
              edit
            </button>
          </a>
          <a href="" className="ms-3">
            <button
              className="bg-red-600 py-2 rounded-lg"
              style={{ width: "60px" }}
              onClick={(e) => {
                e.preventDefault();
                dispatch(deletePost(el.id));
              }}
            >
              delete
            </button>
          </a>
        </td>
      </tr>
    );
  });

  return (
    <>
      <h2 style={{ textAlign: "center" }} className="font-bold text-2xl mt-10">
        Posts List
      </h2>

      <div
        className="table-responsive-lg"
        style={{
          width: "100%",
          marginTop: "40px",
        }}
      >
        <div className="d-flex justify-content-end mr-4">
          <Button
            variant="info"
            onClick={() => {
              setIsEdit(false);
              handleOpen();
            }}
            className="bg-blue-500 font-bold mr-4"
          >
            Create New Post
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="table mt-5 table-hover table-dark ">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Image</th>
                <th style={{ width: "30%" }}>Content</th>
                <th>Category</th>
                <th>Created By</th>
                <th>Tags</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{postsLoading ? <LoadingRow /> : dataPosts}</tbody>
          </table>
        </div>
      </div>
      <CreateEditPost
        show={show}
        onClose={handleClose}
        isEdit={isEdit}
        post={post}
        setIsEdit={setIsEdit}
      />
    </>
  );
};

export default PostView;
