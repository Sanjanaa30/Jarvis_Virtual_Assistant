import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const userDataContext = createContext();

function UserContext({ children }) {
  const serverUrl = "http://localhost:8000";
  const [userData, setUserData] = useState(null);
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const handleCurrentUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/current`, {
        withCredentials: true,
      });
      setUserData(result.data);
      console.log("Current user data:", result.data);
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        // 🔹 Normalize "User not found" as just "no logged-in user"
        if (status === 400 && data?.message === "User not found") {
          console.info("No current user (not logged in yet).");
          setUserData(null);
        } else {
          console.error("Current user request failed:", status, data);
          setUserData(null);
        }
      } else {
        console.error("Error fetching current user:", error.message);
        setUserData(null);
      }
      // no rethrow – we handle it here
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    handleCurrentUser();
  }, []);

  const value = {
    serverUrl,
    setUserData,
    userData,
    loadingUser,
    refreshUser: handleCurrentUser,
    backendImage,
    setBackendImage,
    frontendImage,
    setFrontendImage,
    selectedImage,
    setSelectedImage,
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;
