import { useNavigate } from "react-router-dom";
const Landing = ({ post }) => {
  const navigate = useNavigate();
  return (
    <div
      className="mb-20 bg-red-400 rounded-md cursor-pointer "
      onClick={() => {
        navigate(`/${post.slug}T${post.id}`);
      }}
      style={{ width: "800px", margin: "40px auto" }}
    >
      <p
        className="text-center font-bold text-5xl text-blue-900 mb-8"
        style={{ paddingTop: "40px" }}
      >
        HEADLINE
      </p>
      <h1 className="text-center font-bold text-3xl">{post.title}</h1>
      <p className="text-center font-bold text-2xl mb-8">
        {post.Category.name}
      </p>
      <img
        src={post.imgUrl}
        alt={post.title}
        style={{ width: "100%", height: "500px" }}
      ></img>
    </div>
  );
};

export default Landing;
