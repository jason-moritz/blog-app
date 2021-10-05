import { useState, useEffect } from "react";
import "./Posts.css";

import Post from "../../components/Post/Post";
import Search from "../../components/Search/Search";
import { TitleAZ, TitleZA, AuthorAZ, AuthorZA } from "../../utils/sort";
import Sort from "../../components/Sort/Sort";
import Layout from "../../components/Layout/Layout";
import { getPosts } from "../../services/posts";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [applySort, setApplySort] = useState(false);
  const [sortType, setSortType] = useState("name-ascending");

  useEffect(() => {
    const fetchPosts = async () => {
      const allPosts = await getPosts();
      setPosts(allPosts);
      setSearchResult(allPosts);
    };
    fetchPosts();
  }, []);

  const handleSort = (type) => {
    if (type !== "" && type !== undefined) {
      setSortType(type);
    }
    switch (type) {
      case "title-ascending":
        setSearchResult(TitleAZ(searchResult));
        break;
      case "title-descending":
        setSearchResult(TitleZA(searchResult));
        break;
      case "author-ascending":
        setSearchResult(AuthorAZ(searchResult));
        break;
      case "author-descending":
        setSearchResult(AuthorZA(searchResult));
        break;
      default:
        break;
    }
  };

  if (applySort) {
    handleSort(sortType);
    setApplySort(false);
  }

  const handleSearch = (event) => {
    const results = posts.filter((post) =>
      post.title.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSearchResult(results);
    setApplySort(true);
  };

  const handleSubmit = (event) => event.preventDefault();

  return (
    <Layout>
      <Search onSubmit={handleSubmit} handleSearch={handleSearch} />
      <Sort onSubmit={handleSubmit} handleSort={handleSort} />
      <div className="posts">
        {searchResult.map((post, index) => {
          return (
            <Post
              _id={post._id}
              title={post.title}
              author={post.author}
              imgURL={post.imgURL}
              article={post.article}
              key={index}
            />
          );
        })}
      </div>
    </Layout>
  );
};

export default Posts;
