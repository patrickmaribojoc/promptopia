import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { NextApiRequest } from "next";
import { ParsedUrlQuery } from "querystring";

interface IParams extends ParsedUrlQuery {
    userId: string,
}

export const GET = async (request: NextApiRequest, {params}: {params: IParams}) => {
    const userId = params.userId;
  try {
    await connectToDB();
    const prompts = await Prompt.find({
      creator: userId,
    }).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log("error in api/prompt GET", error);
    return new Response("Failed to retrieve prompts", { status: 500 });
  }
};
