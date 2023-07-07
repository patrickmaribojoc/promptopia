import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import User from "@models/user";

export const POST = async (req: any) => {
  const { prompt, tag, creator } = await req.json();
  try {
    await connectToDB();
    const newPrompt = new Prompt({
      creator,
      tag,
      prompt,
    });
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.log("error in api/prompt POST", error);
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};

export const GET = async (req: any) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find().populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log("error in api/prompt GET", error);
    return new Response("Failed to retrieve prompts", { status: 500 });
  }
};
