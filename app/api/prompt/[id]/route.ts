import Prompt, { IPrompt } from "@models/prompt";
import { connectToDB } from "@utils/database";
import { NextApiRequest } from "next";
import { NextRequest } from "next/server";
import { PropertyNameLiteral } from "typescript";

interface IParams {
  id: string;
}

export const PATCH = async (
  request: any, // NextJS doesn't work if you specify a type here
  { params }: { params: IParams }
) => {
  try {
    const body = await request.json();

    const { prompt, tag } = body;
    console.log(prompt, tag);

    await connectToDB();

    const existingPrompt = (await Prompt.findById(params.id).populate(
      "creator"
    )) as IPrompt;

    if (!existingPrompt) {
      return new Response(`Unable to find prompt with id ${params.id}`, {
        status: 404,
      });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    console.log("error in api/prompt/[id] PATCH", error);
    return new Response(`Failed to update prompt with id ${params.id}`, {
      status: 500,
    });
  }
};

export const DELETE = async (
  request: any,
  { params }: { params: IParams }
) => {
  try {
    await connectToDB();

    await Prompt.deleteOne({ _id: params.id });

    return new Response(`Deleted prompt with id ${params.id}`, { status: 200 });
  } catch (error) {
    console.log("error in api/prompt/[id] DELETE", error);
    return new Response(`Failed to upddeleteate prompt with id ${params.id}`, {
      status: 500,
    });
  }
};

export const GET = async (
  request: any,
  { params }: { params: IParams }
) => {
  try {
    await connectToDB();
    const prompt = (await Prompt.findById(params.id).populate(
      "creator"
    )) as IPrompt;

    if (!prompt) {
      return new Response(`Unable to find prompt with id ${params.id}`, {
        status: 404,
      });
    }
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.log("error in api/prompt GET", error);
    return new Response(`Failed to retrieve prompt with id ${params.id}`, {
      status: 500,
    });
  }
};
