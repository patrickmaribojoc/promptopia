"use client";

import Post from "@models/post";
import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({
  data,
  handleTagClick,
}: {
  data: any;
  handleTagClick: any;
}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post: any) => {
        return (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
            handleEdit={() => {
              return {};
            }}
            handleDelete={() => {
              return {};
            }}
          />
        );
      })}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e: any) => {};

  useEffect(() => {
    (async () => {
      const res = await fetch("api/prompt");
      const data = await res.json();
      setPosts(data);
    })();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input_peer"
        />
      </form>
      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
