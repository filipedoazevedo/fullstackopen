import React, { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const addBlog = async (event) => {
    event.preventDefault();
    createBlog(newBlog);

    setNewBlog({
      title: "",
      author: "",
      url: "",
    });
  };

  const handleBlogChange = (event, property) => {
    const newBlogObject = Object.assign({}, newBlog);
    newBlogObject[property] = event.target.value;

    setNewBlog(newBlogObject);
  };

  return (
    <div>
      <h2>Create new</h2>

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
    </div>
  );
};

export default BlogForm;
