import React from "react";
import { useJwt } from "react-jwt";
import axios from "axios";

export const AppContext = React.createContext({});

const AppProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = React.useState(null);
  const [state, setState] = React.useState(true);
  console.log(loggedUser);

  const { decodedToken, isExpired } = useJwt(sessionStorage.getItem("token"));

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        if (decodedToken) {
          const response = await axios.get(
            `https://smart-city-api-tpxn.onrender.com/SmartCity/API/users/get/single/${decodedToken?.id}`
          );
          setLoggedUser(response?.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, [decodedToken]);


  return (
    <AppContext.Provider value={{ state, loggedUser }}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
