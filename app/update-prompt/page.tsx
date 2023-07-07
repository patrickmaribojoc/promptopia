"use client";

import Form from "@components/Form";
import Post from "@models/post";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const UpdatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<Post>({
    prompt: "",
    tag: "",
  });

  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  useEffect(() => {

    if (promptId) {
      (async () => {
        const response = await fetch(`api/prompt/${promptId}`);
        const data = await response.json();
        setPost({
          prompt: data.prompt,
          tag: data.tag,
        });
      })();
    }
  }, [promptId]);

  const updatePrompt = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);
    if (!promptId) {
      return alert("Prompt ID not found");
    }

    try {
      const headers = new Headers();
      headers.append("content-type", "application/json");
      const res = await fetch(`api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
        headers,
      });
      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log("error in createPrompt()", error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type="Update"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;
