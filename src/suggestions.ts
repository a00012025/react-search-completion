import axios from "axios";
import { useEffect, useState } from "react";

const prompt =
  "You are acting as a search engine auto complete system. I will send the user input text and you should return 5 suggestions of what user may want to search seperated by newline (including my input). For example, if I enter Facebook, you may say Facebook Login or Facebook data. My input is: ";
const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

const fetchSuggestions = async (query: string) => {
  try {
    const content = prompt + query;
    const body = JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content }],
      temperature: 0.7,
    });
    const data = (
      await axios.post("https://api.openai.com/v1/chat/completions", body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      })
    ).data;
    let result: string[] = [];
    if (data?.choices && data?.choices.length > 0) {
      const content = data?.choices[0].message.content as string;
      result = content.split("\n");
    }
    return result;
  } catch (error) {
    return [];
  }
};

const useSuggestions = (query: string) => {
  const [result, setResult] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }
    setLoading(true);
    setResult([]);
    fetchSuggestions(query)
      .then((newResults) => {
        setLoading(false);
        setResult(newResults);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, [query]);

  return {
    result,
    loading,
    error,
  };
};

export { useSuggestions };
