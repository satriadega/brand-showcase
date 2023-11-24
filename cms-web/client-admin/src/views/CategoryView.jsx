import { useState, useEffect } from "react";
import CreateEditCategory from "../components/CreateEditCategory";
import useToggle from "../hooks/useToggle";
import { fetchCategories, deleteCategory } from "../store/action/actionCreator";
import { useDispatch, useSelector } from "react-redux";
import LoadingRow2 from "../components/LoadingRow2";
import Button from "react-bootstrap/Button";
import { API_URL } from "../config/api";

const CategoryView = () => {
  const { categories, categoriesLoading } = useSelector(
    (state) => state.category
  );
  const { show, handleClose, handleOpen } = useToggle();
  const [isEdit, setIsEdit] = useState(false);
  const [category, setCategory] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    // console.log(categories);
  }, []);

  // console.log(categories);
  const dataCategories = categories?.map((el, index) => {
    const createdAt = el.createdAt.split("T");
    const updatedAt = el.updatedAt.split("T");
    return (
      <tr key={el.id} valign="middle">
        <td scope="row">#{index + 1}</td>
        <td className="fw-bold">
          <div style={{ width: "200px" }}>{el.name}</div>
        </td>
        <td>{createdAt[0]}</td>
        <td>{updatedAt[0]}</td>
        <td>
          <div className="flex gap-2">
            <a href="" className="">
              <button
                style={{ width: "60px" }}
                className="bg-blue-600 py-2 rounded-lg "
                onClick={async (e) => {
                  e.preventDefault();
                  setIsEdit(true);
                  try {
                    const response = await fetch(
                      `${API_URL}/categories/` + el.id,
                      {
                        method: "GET",
                        headers: {
                          access_token: localStorage.access_token,
                        },
                      }
                    );
                    const result = await response.json();
                    setCategory(result);
                    handleOpen();
                  } catch (error) {
                    console.error("Error:", error);
                  }
                }}
              >
                edit
              </button>
            </a>
            <a href="" className="">
              <button
                style={{ width: "60px" }}
                className="bg-red-600 py-2 rounded-lg "
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(deleteCategory(el.id));
                }}
              >
                delete
              </button>
            </a>
          </div>
        </td>
      </tr>
    );
  });

  return (
    <>
      <h2 style={{ textAlign: "center" }} className="text-3xl mt-10">
        Categories List
      </h2>
      <div
        className="table-responsive-lg"
        style={{
          width: "94%",
          marginTop: "40px",
          marginLeft: "3%",
          marginRight: "3%",
        }}
      >
        <div className="d-flex justify-content-end mr-4">
          <Button
            variant="info"
            onClick={() => {
              handleOpen();
            }}
            className="bg-blue-500 font-bold mr-4"
          >
            Create New Category
          </Button>
        </div>
        <table className="table mt-5 table-hover table-dark  ">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{categoriesLoading ? <LoadingRow2 /> : dataCategories}</tbody>
        </table>
      </div>
      <CreateEditCategory
        show={show}
        onClose={handleClose}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        category={category}
      />
    </>
  );
};

export default CategoryView;
