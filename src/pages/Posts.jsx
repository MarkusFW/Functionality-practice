import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Posts = () => {
// HOOKS
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchId, setSearchId] = useState(id);


// FUNCITONS
  function onSearch() {
    fetchPosts(searchId)
}

async function fetchPosts(userId) {
    setLoading(true)
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId || id}`
    );
    setPosts(data);
    setLoading(false);
  }


//   USEEFFECTS
  useEffect(() => {
    setTimeout(() => {
      fetchPosts();
    }, 600);
  }, []);

  return (
    <>
      <div className="post__search">
        <Link to="/" >
        <button>← Back</button>
        </Link>
        <div className="post__search--container">
          <label className="post__search--label">Search by Id</label>
          <input
            type="number"
            value={searchId}
            onChange={(event) => setSearchId(event.target.value)}
            onKeyPress={(event => event.key === "Enter" && onSearch())}
          />
          <button onClick={() => onSearch()}>Enter</button>
        </div>
      </div>

      {loading
        ? new Array(10).fill(0).map((_, index) => (
            <div className="post" key={index}>
              <div className="post__title" >
                <div className="post__title--skeleton"></div>
              </div>
              <div className="post__body">
                <p className="post__body--skeleton"></p>
              </div>
            </div>
          ))
        : posts.map((post) => (
            <div className="post" key={post.id}>
              <div className="post__title">{post.title}</div>
              <p className="post__body">{post.body}</p>
            </div>
          ))}
    </>
  );
};

export default Posts;
