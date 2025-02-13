const LOGINURL='http://127.0.0.1:8000/api/token/'
const SIGNUP='http://127.0.0.1:8000/api/users/'

export async function signup(data) {
    try {
        const response = await fetch(SIGNUP, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Signup failed: ${response.statusText}`);
        }
        const userData = await response.json(); 
        const access_token = userData.access_token || "";
        const user = userData.User || userData.user || null;
        localStorage.setItem("token", access_token);
        localStorage.setItem("user", JSON.stringify(user));
        return user;
    } catch (error) {
        console.error("Error during signup:", error);
        throw error;
    }
}



export async function login(data){
    try {
        const response = await fetch(LOGINURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorResp = await response.json().catch(() => {
              console.error("Error parsing response JSON.");
              throw new Error("Error parsing response data.");
            });
            console.error("Response Error:", response);
            console.error("Error Details:", errorResp);
            // Handle other non-successful responses
            const message = errorResp?.detail || "Unexpected error occurred.";
            throw new Error(message);
          }

        const userData = await response.json(); 
        const access_token = userData.access_token || "";
        const user ={
            email:userData.email || userData.user || null,
            role:userData.role||null
        } 
        localStorage.setItem("token", access_token);
        localStorage.setItem("user", JSON.stringify(user));
        return user;
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
}