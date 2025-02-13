
export default async function handleResponse(resp, originalRequest) {
    if (!resp.ok) {
      const errorResp = await resp.json().catch(() => {
        console.error("Error parsing response JSON.");
        throw new Error("Error parsing response data.");
      });
      console.error("Response Error:", resp);
      console.error("Error Details:", errorResp);
      // Handle other non-successful responses
      const message = errorResp?.detail || "Unexpected error occurred.";
      throw new Error(message);
    }
    if (resp.status === 204) {
      return {}; // No Content
    }
    try {
      return await resp.json(); // Parse response JSON for successful requests
    } catch (error) {
      console.error("Unexpected error while parsing JSON:", error);
      throw new Error("Failed to parse response data.");
    }
  }
  
      // if (resp.status === 401 && errorResp?.code === "token_not_valid") {
      //   console.warn("Access token expired, attempting to refresh...");
      //   const newAccessToken = await refreshAccessToken();
      //   if (newAccessToken) {
      //     // Retry the original request with the new token
      //     const retryResponse = await fetch(originalRequest.url, {
      //       ...originalRequest.config, // Reuse original request configuration
      //       headers: {
      //         ...originalRequest.config.headers,
      //         Authorization: `Bearer ${newAccessToken}`, // Update token
      //       },
      //     });
  
      //     return handleResponse(retryResponse, originalRequest);
      //   } else {
      //     console.error("Token refresh failed. Redirecting to login.");
      //     localStorage.removeItem("accessToken");
      //     localStorage.removeItem("refreshToken");
      //     if (window.location.pathname !== "/login")
      //       window.location.href = "/login";
      //     throw new Error("Session expired. Please log in again.");
      //   }
      // }