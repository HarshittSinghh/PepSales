import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Posts from './posts';

const PostsContainer = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://x-com-clone-q3le.onrender.com/post');
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const handleDeletePost = (deletedPost) => {
    setPosts(posts.filter(post => post._id !== deletedPost._id));
  };

  return (
    <div>
      {posts.map((post) => (
        <Posts key={post._id} p={post} onDelete={handleDeletePost} />
      ))}
    </div>
  );
};

export default PostsContainer;
