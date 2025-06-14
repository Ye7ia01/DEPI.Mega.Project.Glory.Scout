﻿import {useState, useEffect, useContext} from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext.jsx";

const useGetPlayersScouts = (dataType) => {
  const {user} = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  console.log("Data type in API useGetPlayers: ",dataType)

  const url = dataType == 'players' ? 'https://f5f8-156-207-133-154.ngrok-free.app/api/SearchPages/players' :
      'https://f5f8-156-207-133-154.ngrok-free.app/api/SearchPages/scouts'

  useEffect(() => {

    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      setErrorMessage("");

      try {
     const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            'ngrok-skip-browser-warning': 'true', // 👈 Add this header
          },
        });
        setData(response.data);
      } catch (error) {
        setIsError(true);
        setErrorMessage(error?.response?.data || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, isError, errorMessage };
};

export default useGetPlayersScouts;