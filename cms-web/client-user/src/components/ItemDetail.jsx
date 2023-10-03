import { useState, useEffect } from "react";

const ItemDetail = ({ post }) => {
  const [tags, setTags] = useState("");

  useEffect(() => {
    setTags(post.Tags.map((el) => "#" + el.name).join(", "));
  }, [post]);
  return (
    <>
      <div className="break-words mb-40">
        <h1 className="font-semibold text-4xl  mb-10 ">{post.title}</h1>
        <p className="font-semibold text-2xl">{post.Category.name}</p>
        <p className="font-medium text-lg text-gray-400 mb-4">
          Dibuat pada : {post.createdAt.slice(0, 10)}
        </p>
        <img
          className="rounded-sm w-full"
          src={post.imgUrl}
          alt={post.title}
        ></img>
        <p className="text-lg mt-8">{post.content}</p>
        <p className=" font-semibold text-lg text-blue-700 mt-8">
          tags : {tags}
        </p>
      </div>
    </>
  );
};

export default ItemDetail;
