// 📁 src/api/resultsApi.js
export async function saveQuizResult(token, user, score) {
  const response = await fetch("http://localhost:8080/api/results", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      userId: user.id,
      username: user.username,
      score,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to save quiz result.");
  }

  return response.json();
}
