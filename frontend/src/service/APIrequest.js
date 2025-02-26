import handleResponse from "./handleResponses"
export function getToken() {
  return localStorage.getItem("token");
}

export async function apiRequest(url, method, body = null) {

  const accessToken =getToken();
  const originalRequest = {
    url,
    config: {
      method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  };

  if (body) {
    originalRequest.config.body = body;
  }
  try {
    const response = await fetch(originalRequest.url, originalRequest.config);
    return await handleResponse(response, originalRequest);
  } catch (error) {
    console.error("API Request Error:", error.message);
    throw error;
  }
}
