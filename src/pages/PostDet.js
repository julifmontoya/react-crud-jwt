import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { URL } from "../constants/global";

const PostDet = () => {
  const [post, setPost] = useState(null);
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${URL}/posts/${postId}/`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          // Redirect to home page
          navigate("/");
        } else {
          console.log("An error occurred", error);
        }
      });
  }, [postId]);

  return (
    <div className="card">
      {post && (
        <div key={post.id}>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          <hr></hr>
          <p>{post.created}</p>
        </div>
      )}
      <div className="text-center mt-20">
        <Link to="/" className="btn btn--dark">
          Back
        </Link>
      </div>
    </div>
  );
};

export default PostDet;
