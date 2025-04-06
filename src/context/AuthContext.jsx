import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const demoUser = {
    token: "demoToken",
    username: "Demo",
    id: 1,
    accessLevel: 1,
    user_type: 1,
    info: {
      id: 1,
      name: "Demo Full Name",
      phone: "",
      email: "demo@gmail.com",
      mobile: "",
    },
  };
  const [authLoading, setAuthLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [authMessage, setAuthMessage] = useState("");
  const [user, setUser] = useState(demoUser);
  const [devMode, setDevMode] = useState(true);

  useEffect(() => {
    setAuthLoading(true);
    const effect = async () => {
      let json = await localStorage.getItem("user");
      console.log(json);
      let userObject = JSON.parse(json ?? "{}");
      if (userObject?.token) {
        setUser(userObject);
        setAuthenticated(true);
        setAuthLoading(false);
        console.log(authenticated);
        //readJsonFile();
        return;
      }
      if (devMode) {
        console.info("Dev Mode Detected");
        setUser(demoUser);
        setAuthenticated(true);
        setAuthLoading(false);
        console.info("Authenticated Demo User in Dev Mode");
      }
      setAuthLoading(false);
      console.log(authenticated);
    };
    effect();
  }, []);

  useEffect(() => {
    if (user) {
      console.log("User in UseEffect   : ", user);
    }
  }, [user]);

  const loginAsync = async (username, password) => {
    setAuthLoading(true);
    setAuthError(false);

    axios
      .post(
        "https://elkadysolutions.com/api/Authentication/Login",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        let data = res.data?.data;
        if (data?.user_Type !== 1 && data?.user_Type !== 2) {
          console.log("Not a valid user type");
          setAuthError(true);
          setAuthMessage("Cannot Sign In");
          setUser({});
          setAuthLoading(false);
          return;
        }

        // Set User Object based on retrieved data from Database
        const userObj = {
          token: data?.token,
          username: data?.username,
          id: data?.userId,
          accessLevel: data?.accessLevel,
          linked_Id: data?.linked_Id,
          user_type: data?.user_Type,
          info: {
            id: data?.info?.id,
            name: data?.info?.name,
            phone: data?.info?.phone,
            email: data?.info?.email,
            mobile: data?.info?.mobile,
          },
        };
        setUser(userObj);
        const setStorage = async () => {
          await localStorage
            .setItem("user", JSON.stringify(userObj))
            .then(() => {
              localStorage.getItem("user").then((json) => {
                console.log("SET STORAGE");
                console.log(json);
                setAuthError(false);
                setAuthLoading(false);
                setAuthenticated(true);
              });
            });
        };
        setStorage();
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
        setAuthError(true);
        setUser();
        setAuthMessage(JSON.stringify(err) ?? "Error, Cannot Sign In");
        setAuthLoading(false);
      });
  };

  const logoutAsync = async () => {
    setAuthLoading(true);
    setAuthError(false);
    setUser({});
    await localStorage.removeItem("user");
    setAuthenticated(false);
    setAuthLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        loginAsync,
        authLoading,
        user,
        authenticated,
        authError,
        authMessage,
        logoutAsync,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
