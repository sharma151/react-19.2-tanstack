/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import type { AdviceResponse, SearchResponse } from "../types/advice";

const BASE_URL = "https://api.adviceslip.com";

// Fetcher 1: Get Advice by ID
export const fetchAdviceById = async (id: string): Promise<AdviceResponse> => {
  const response = await axios.get<AdviceResponse>(`${BASE_URL}/advice/${id}`);

  return response.data;
};

// Fetcher 2: Search Advice by Mood
export const fetchAdviceByMood = async (
  mood: string
): Promise<SearchResponse> => {
  const response = await axios.get<SearchResponse | { message: any }>(
    `${BASE_URL}/advice/search/${mood}`
  );

  // API returns a message object if no advice is found
  if ("message" in response.data) {
    throw new Error(response.data.message?.text || "No advice found");
  }

  return response.data;
};
