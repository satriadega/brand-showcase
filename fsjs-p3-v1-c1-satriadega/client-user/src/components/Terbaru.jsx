import { useNavigate } from "react-router-dom";
const Terbaru = ({ post, index }) => {
  const navigate = useNavigate();
  return (
    <div
      key={index}
      className="mt-8 flex cursor-pointer bg-gray-100 rounded-sm"
      style={{ gap: "40px" }}
      onClick={() => {
        navigate(`/${post.slug}T${post.id}`);
      }}
    >
      <img
        src={post.imgUrl}
        className="rounded-sm"
        width="400px"
        style={{ height: "240px" }}
      ></img>
      <div className="flex justify-center flex-col break-words mr-8">
        <p className="font-semibold text-2xl">{post.title}</p>
        <p className="font-semibold text-lg text-gray-500">
          {post.Category.name}
        </p>
      </div>
    </div>
  );
};

export default Terbaru;
