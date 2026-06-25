const API = "https://pawssible-frontend.onrender.com/api/chat";

export async function getRecommendations(text) {
  const response = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
    }),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}