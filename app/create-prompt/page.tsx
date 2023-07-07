"use client";

import Form from "@components/Form";
import Post from "@models/post";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<Post>({
    prompt: "",
    tag: "",
  });

  const createPrompt = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);

    try {

      const res = await fetch("/api/prompt", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          creator: session?.user.id,
        }),
      });
      if (res.ok) {
        router.push("/")
      }
    } catch (error) {
      console.log("error in createPrompt()", error);
    } finally {
        setSubmitting(false);
    }
  };
  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
