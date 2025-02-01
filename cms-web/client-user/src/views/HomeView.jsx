import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchPosts } from "../store/action/actionCreator";
import Terbaru from "../components/Terbaru";
import Landing from "../components/Landing";

const HomeView = () => {
  const { posts, postsLoading } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);
  return (
    <>
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          whiteSpace: "pre-wrap",
        }}
      >
        <div className="mt-10"></div>
        {posts.length !== 0 && (
          <div className="mb-20">
            <Landing post={posts[posts.length - 1]} />
            <p className="font-semibold text-xl">Terbaru</p>
            {posts.map((el, index) => {
              return (
                <>
                  <Terbaru post={el} index={index} key={index} />
                </>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default HomeView;
