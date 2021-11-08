import React, { useState } from "react";

const Blog = ({ blog }) => {
  const [blogVisible, setBlogVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleBlogVisible = () => {
    setBlogVisible(!blogVisible);
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={handleBlogVisible}>{!blogVisible ? 'view' : 'hide'}</button>
      {
        blogVisible ? (
          <div>
            <p>{blog.url}</p>
            <p>likes: {blog.likes} <button>like</button></p>
            <p>{blog.author}</p>
          </div>
        ) : null
      }
    </div>
  );
};

export default Blog;
