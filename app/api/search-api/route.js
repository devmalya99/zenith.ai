import { NextResponse } from "next/server";
import axios from "axios";

// CORS Headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// Handle preflight requests
export async function OPTIONS() {
  console.log("OPTIONS request received");
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(req) {
  try {
    console.log("Incoming POST request...");

    // Step 1: Validate environment variables
    if (
      !process.env.GOOGLE_SEARCH_API_URL ||
      !process.env.GOOGLE_SEARCH_API_KEY ||
      !process.env.GOOGLE_SEARCH_ENGINE_ID
    ) {
      console.error("Missing env variables");
      throw new Error("Missing required API variables");
    }

    // Step 2: Parse request body
    const body = await req.json();
    console.log("Body:", body);

    const { userInput, searchType } = body;

    // Step 3: Basic input validation
    if (
      !userInput ||
      typeof userInput !== "string" ||
      !searchType ||
      typeof searchType !== "string" ||
      userInput.trim() === ""
    ) {
      console.warn("Missing or invalid input params");
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: "Missing required parameters",
        }),
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    // Step 4: Construct params
    const params = {
      key: process.env.GOOGLE_SEARCH_API_KEY,
      cx: process.env.GOOGLE_SEARCH_ENGINE_ID,
      q: userInput,
      num: 10,
      safe: "active",
    };

    // Step 5: External API request
    console.log("Calling Google Search API...");
    const response = await axios.get(process.env.GOOGLE_SEARCH_API_URL, {
      params,
      timeout: 5000,
    });

    console.log("Google API success");

    return new NextResponse(
      JSON.stringify({
        success: true,
        query: userInput,
        results: response.data,
      }),
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error("Search API Error:", error);

    const isAxiosError = axios.isAxiosError(error);
    const status = isAxiosError
      ? error.response?.status || 500
      : 500;

    return new NextResponse(
      JSON.stringify({
        success: false,
        error: isAxiosError
          ? error.message
          : error.message || "Internal server error",
      }),
      {
        status,
        headers: corsHeaders,
      }
    );
  }
}
