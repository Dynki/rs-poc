import React, { useContext, Fragment } from "react";
import authContext from '../context/authContext';

const Profile = () => {
  const { profile } = useContext(authContext);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <img src={profile.picture} alt="Profile" />

      <h2>{profile.name}</h2>
      <p>{profile.email}</p>
      <code>{JSON.stringify(profile, null, 2)}</code>
    </Fragment>
  );
};

export default Profile;