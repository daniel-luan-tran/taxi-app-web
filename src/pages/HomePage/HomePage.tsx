import { useEffect, useState } from "react";
import { homePage } from "../../api";
import { PublicClientApplication } from "@azure/msal-browser";
import axios from "axios";

const msalConfig = {
  auth: {
    clientId: "690be044-01c1-4440-bc20-1f30529c2af4",
    authority:
      "https://login.microsoftonline.com/5b2c7a9b-2ae8-4424-9cd7-bf4f99fddf3d", // Replace with your Azure AD tenant ID or "common" for multi-tenant apps
    redirectUri: "http://localhost:5173/", // Redirect URI after login
    pkce: true, // Enable PKCE
  },
};

// Get the current URL
const currentUrl = window.location.href;

// Parse the URL and extract the query parameters
const urlSearchParams = new URLSearchParams(currentUrl.split("?")[1]);

// Get the token parameter value
const token = urlSearchParams.get("token");

// Function to read the value of a cookie by its name
function getCookie(name: string): string | undefined {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

// Read the token cookie and parse its value as JSON
const tokenCookie = getCookie("token");
if (tokenCookie) {
  // Now, you have the access token from the cookie available for use in your TypeScript code
  console.log("Access Token:", tokenCookie);
} else {
  console.log("Token cookie not found");
}

const HomePage = () => {
  const [message, setMessage] = useState("Cannot connect to server!");
  const msalInstance = new PublicClientApplication(msalConfig);

  const loginAD = async () => {
    window.location.href = "http://localhost:3000/api/v1/auth/azureAD/login";
  };
  const test = async () => {
    axios.get("http://localhost:3000/api/v1/auth/azureAD/check", {
      withCredentials: true,
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiIyYWMwMGM3NC1hZDRkLTQ2ZjctYjNjMS1hMmY4MjM5NzZhMTEiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vYmQxZmQ2OTktYjk2Yy00NGI3LTg0NTktZjI1ZjRjOTUxNmViL3YyLjAiLCJpYXQiOjE2OTE3MjIwODksIm5iZiI6MTY5MTcyMjA4OSwiZXhwIjoxNjkxNzI1OTg5LCJhaW8iOiJBWVFBZS84VUFBQUFEdHl3OENaZkVCc2h4VmJzYm02WDExVFdJNjdkRFlCWCtmUm05QndadnRoTCtPb05uMTlRQ1JzUmI4ckF3ejRaalRJTnc5aVBoQWt3VDVYUGdlMVI2ZzVwN3hWTHFUbXVabzVMQVJ1VEs2UUpzQXdPa2hSdEVWUys1UVB5ZkdSdnU0ZkpuSjJuajhmUEJ5b3FIRXZIS1phNkFFUHRUODFZOUNsV0V1WFNSS3M9IiwiY19oYXNoIjoiS0QyRExBTDRXaGMxZ09jbHhYY3BqZyIsImVtYWlsIjoidHJhbnF1b2NiYW9sdWFuQGdtYWlsLmNvbSIsImlkcCI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZC8iLCJuYW1lIjoiTHVhbiBUcmFuIiwibm9uY2UiOiIyV29pRzVEX0psVEdLUmxCLWFxR0pINWRqcWhBam5QbiIsIm9pZCI6ImJkZDFlYjhkLWYzY2MtNGRiMS1iM2EzLTUzYjNlZGMzMTZlYiIsInByZWZlcnJlZF91c2VybmFtZSI6InRyYW5xdW9jYmFvbHVhbkBnbWFpbC5jb20iLCJyaCI6IjAuQWIwQW1kWWZ2V3k1dDBTRVdmSmZUSlVXNjNRTXdDcE5yZmRHczhHaS1DT1hhaEc5QUpNLiIsInN1YiI6InpmX2tiX253czFUQ3czdnJYUldvOHotc1VjWEtSSXIycnpRQjMzV3d0UDgiLCJ0aWQiOiJiZDFmZDY5OS1iOTZjLTQ0YjctODQ1OS1mMjVmNGM5NTE2ZWIiLCJ1dGkiOiJBMmRoZ0VCejMwcWtWM2JDZDBOR0FBIiwidmVyIjoiMi4wIn0.nQ-8vFp0rjn1At4KeUYfcB0aWujeEeS-VDx6VLNRHIQ6AjZhqth4qAR4pqqvVfhlQSNp9XvO9jFKMH9-fWt9SR6JuqrQogE3vuGQNtvLH7-D2uYH1jDMhEY-Wn-S3V-KmOAhOt1gD-f_hNPr-PBEM1InXd3MmYEZwiiHEQVr7epJFLDebCtA2bpK0zCZcWnJkLh2yPrIkaEYuBlTQb_TWmlpWt6qbRjZlTuk5043pJnUbxSTG1eyLIMhrbfoCQnQHHIJ0LPtvYRIgxZZZbZ76-PKukr4hvIUsqYVEk-o6uSLC5cIpUbvtIYvkTVVGkZobXgO9a31gZRPk2olFj8wJQ`,
      },
    });
  };
  const test2 = async () => {
    const data = await axios.get("http://localhost:3000/api/v1/auth/check", {
      withCredentials: true, // This enables sending cookies along with the request
      headers: {
        "Content-Type": "application/json",
        // You can add more headers here if needed
      },
    });
    console.log(data);
  };
  const login = async () => {
    await msalInstance.loginPopup();
  };
  const logout = async () => {
    const data = await axios.get(
      "http://localhost:3000/api/v1/auth/azureAD/logout",
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    window.location.href = data.data.logoutLink;
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    // Here you can implement your login logic
    console.log("Email:", email);
    console.log("Password:", password);

    const data = await axios.post(
      "http://localhost:3000/api/v1/auth/login",
      {
        email: `staff@blackbook`,
        password: "blackbook@1",
      },
      {
        withCredentials: true,
      }
    );
    console.log(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await homePage();
        console.log("response", res.message);
        setMessage(res.message);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>Home Page</h1>
      {/* <h2>{message}</h2> */}
      <button onClick={loginAD} style={{ background: "green" }}>
        Login Azure
      </button>
      <button onClick={test} style={{ background: "green" }}>
        Check
      </button>
      <button onClick={test2} style={{ background: "green" }}>
        Check2
      </button>
      <button onClick={login} style={{ background: "cyan" }}>
        Login Azure popup
      </button>
      <button onClick={logout} style={{ background: "red" }}>
        Logout Azure
      </button>
      <div>
        <h2>Login</h2>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button onClick={handleLogin}>Login</button>
      </div>
    </>
  );
};

export default HomePage;
