import { useState, useEffect } from "react";
import "./Products.css";

import Post from "../../components/Post/Post";
import Search from "../../components/Search/Search";
import { AZ, ZA, lowestFirst, highestFirst } from "../../utils/sort";
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
      case "name-ascending":
        setSearchResult(AZ(searchResult));
        break;
      case "name-descending":
        setSearchResult(ZA(searchResult));
        break;
      case "price-ascending":
        setSearchResult(lowestFirst(searchResult));
        break;
      case "price-descending":
        setSearchResult(highestFirst(searchResult));
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
              name={post.title}
              author={post.author}
              imgURL={post.imgURL}
              key={index}
            />
          );
        })}
      </div>
    </Layout>
  );
};

export default Posts;
