import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { URL } from "../constants/global";

const PostListProv = () => {
  const [posts, setPosts] = useState([]);
  const { authTokens, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    getPosts();
  }, []);

  const sendId = (id) => {
    navigate("/provider/posts/" + id);
  };

  const getPosts = async () => {
    try {
      const response = await axios.get(`${URL}/affiliate/posts-list/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authTokens.access,
        },
      });

      setPosts(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        logoutUser();
      }
    }
  };

  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      axios
        .delete(`${URL}/affiliate/posts-delete/${id}/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
        })
        .then(() => {
          getData();
        });
    }
  };

  const getData = () => {
    axios
      .get(`${URL}/affiliate/posts-list/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
      })
      .then((response) => {
        setPosts(response.data);
      });
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
                  className="btn btn--light mr-5"
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    onDelete(item.id);
                  }}
                  className="btn btn--danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
    </div> */
    <div>
      <div className="mb-15">
        <Link to="/provider/posts" className="btn btn--secondary">
          Create
        </Link>
      </div>
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
                      className="btn btn--light mr-5"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => {
                        onDelete(item.id);
                      }}
                      className="btn btn--danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostListProv;
