import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [newBlog, setNewBlog] = useState({});
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const get_blogs = async () => {
      const blogs = await blogService.getAll();

      setBlogs(blogs)
    };

    if (user) {
      try {
        get_blogs();
      } catch (error) {
        setNotification({
          message: `Error getting blogs: ${error.response.data.error}`,
          className: "error",
        });
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      }
    }
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setNotification({
        message: `User (${username}) logged-in`,
        className: "success",
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error) {
      setNotification({
        message: error.response.data.error,
        className: "error",
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    blogService.setToken(null);
    setUser(null);
    setUsername("");
    setPassword("");
    console.log("Logout with success");
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const handleBlogChange = (event, property) => {
    const newBlogObject = Object.assign({}, newBlog);
    newBlogObject[property] = event.target.value;

    setNewBlog(newBlogObject);
  };

  const addBlog = async (event) => {
    event.preventDefault();
    try {
      const returnedBlog = await blogService.create(newBlog);

      setBlogs(blogs.concat(returnedBlog));
      setNewBlog({
        title: "",
        author: "",
        url: "",
      });
      setNotification({
        message: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
        className: "success",
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error) {
      setNotification({
        message: `Error adding blog: by ${error.response.data.error}`,
        className: "error",
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        <label>title:</label>
        <input
          value={newBlog.title}
          onChange={(event) => {
            handleBlogChange(event, "title");
          }}
        />
      </div>
      <div>
        <label>author:</label>
        <input
          value={newBlog.author}
          onChange={(event) => {
            handleBlogChange(event, "author");
          }}
        />
      </div>
      <div>
        <label>url:</label>
        <input
          value={newBlog.url}
          onChange={(event) => {
            handleBlogChange(event, "url");
          }}
        />
      </div>
      <button style={{ marginTop: "10px" }} type="submit">
        save
      </button>
    </form>
  );

  return (
    <div>
      {user === null ? (
        <div>
          <h2>Log in to application</h2>
          <Notification notification={notification} />
          {loginForm()}
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification notification={notification} />
          <p>
            {user.name} logged-in <button onClick={handleLogout}>Logout</button>
          </p>
          {blogForm()}
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
