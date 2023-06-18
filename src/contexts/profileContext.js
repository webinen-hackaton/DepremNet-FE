import React, { useState, useMemo, createContext } from "react";

const ProfileContext = React.createContext(null);

export const MyProvider = ({ children }) => {
  const [profile, setProfile] = useState({});

  const value = useMemo(() => ({ profile, setProfile }), [state]);

  const LoadProfile = async () => {
    getProfile(token)
      .then((res) => {
        console.log(res.data);
        setProfile(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};
