const learnerKey = "hpc-learning-studio-learner-id";

export function getLearnerId() {
  let id = localStorage.getItem(learnerKey);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(learnerKey, id);
  }
  return id;
}

export async function api(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-learner-id": getLearnerId(),
      ...(options.headers || {})
    },
    credentials: "include"
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error || `API request failed: ${response.status}`);
  }

  return response.json();
}
