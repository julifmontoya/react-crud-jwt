import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../constants/global";

const PostList = () => {
  const [posts, setPosts] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${URL}/posts-list/`).then((response) => {
      setPosts(response.data);
    });
  }, []);

  const sendId = (id) => {
    navigate("/posts/" + id);
  };

  return (
    /*     <div className="card-container">
      {posts &&
        posts.map((item) => (
          <div className="card-item" key={item.id}>
            <div className="card">
              <h2 className="card-title">{item.title}</h2>
              <div className="card-info">
                <p className="card-description">{item.description}</p>
                <span className="card-tag">{item.category}</span>
              </div>
              <div className="text-center">
                <button
                  onClick={() => {
                    sendId(item.id);
                  }}
                  className="btn btn--light"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
    </div> */
    <div className="table-scroll">
      <table className="wd-100p">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts &&
            posts.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>
                  <button
                    onClick={() => {
                      sendId(item.id);
                    }}
                    className="btn btn--light"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostList;
