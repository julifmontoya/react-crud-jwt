import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { URL } from "../constants/global";

const PostDetProvider = () => {
  const { postId } = useParams();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { authTokens } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (postId) {
      axios
        .get(`${URL}/affiliate/posts/${postId}/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authTokens.access,
          },
        })
        .then((response) => {
          setTitle(response.data.title);
          setDescription(response.data.description);
          setCategory(response.data.category);
        })
        .catch((error) => {
          if (error.response && error.response.status === 403) {
            // Redirect to home page
            navigate("/");
          }
        });
    }

    // Fetch category list
    axios.get(`${URL}/category-list/`).then((response) => {
      setCategories(response.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedCategory = category.length > 0 ? category : "1";
    const body = {
      title: title,
      description: description,
      category: selectedCategory,
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + authTokens.access,
    };

    if (!postId) {
      axios
        .post(URL + "/affiliate/posts/", body, { headers })
        .then((res) => {
          navigate("/provider/list");
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .put(URL + "/affiliate/posts/" + postId + "/", body, { headers })
        .then((res) => {
          navigate("/provider/list");
        })
        .catch((error) => {
          if (error.response && error.response.status === 403) {
            // Redirect to home page
            navigate("/");
          }
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <label className="form-label semi-bold">Name</label>
      <input
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="form-control"
      ></input>

      <label className="form-label semi-bold">Description</label>
      <textarea
        required
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="form-control mb-3"
      ></textarea>

      <label className="form-label semi-bold">Category</label>
      <select
        name="category"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      >
        {categories.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>

      <div className="text-center mt-20">
        <button className="btn btn--secondary mr-5" type="submit">
          Save
        </button>
        <Link to="/provider/list" className="btn btn--dark">
          Back
        </Link>
      </div>
    </form>
  );
};

export default PostDetProvider;
