import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_URL } from "../config/api";
import ItemDetail from "../components/ItemDetail";

const DetailView = () => {
  const [post, setPost] = useState(false);
  const [tags, setTags] = useState("");
  const { slug } = useParams();

  // console.log(slug);
  let id = slug.split("T");
  id = id[1];
  // console.log(id);

  const fetchPostById = async () => {
    try {
      const response = await fetch(`${API_URL}/posts/` + id, {
        method: "GET",
      });
      const result = await response.json();
      setPost(result);

      console.log(post);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchPostById();
    // console.log(post);
  }, []);

  return (
    <>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          whiteSpace: "pre-wrap",
        }}
      >
        <div className="mt-10"></div>
        {post && <ItemDetail post={post} />}
      </div>
    </>
  );
};

export default DetailView;
