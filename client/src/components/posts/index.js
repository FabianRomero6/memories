import React from 'react';
import { useSelector } from 'react-redux';
import { selectPosts } from '../../slice/postsSlice';
import Post from './post';
import styles from './Posts.module.css';

const Posts = () => {
  const posts = useSelector(selectPosts);

  return (
    <>
      <h1>Posts</h1>
      <Post />
      <Post />
    </>
  );
};

export default Posts;
