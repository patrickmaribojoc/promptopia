"use client";

import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IPrompt } from "@models/prompt";
const MyProfile = () => {
  const { data: session } = useSession();

  const [posts, setPosts] = useState<IPrompt[]>([]);

  const router = useRouter();

  useEffect(() => {
    if (session?.user.id) {
      (async () => {
        const res = await fetch(`api/users/${session?.user.id}/posts`);
        const data = await res.json();
        setPosts(data);
      })();
    }
  }, []);

  const handleEdit = (post: IPrompt) => {
    // Navigate to edit
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = (postToDelete: IPrompt) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
    if (hasConfirmed) {
      try {
        fetch(`/api/orinot/${postToDelete._id.toString()}`, {
          method: "DELETE"
        })
        const filteredPosts = posts.filter((post: IPrompt) => post._id !== postToDelete._id);
        setPosts(filteredPosts);
      } catch (error) {
        console.log("Error deleting", error);
      }
    }
    return {};
  };
  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
