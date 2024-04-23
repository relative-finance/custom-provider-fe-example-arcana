import React from "react";
import Button from "./Button";

const redirectToLogin = (loginType: string) => {
  window.location.href = `${
    import.meta.env.VITE_SERVER_URL
  }/start?loginType=${loginType}`;
};

const Start = () => {
  React.useEffect(() => {}, []);
  return (
    <div className="main">
      <div className="container">
        <div>
          <h2>LOGIN OPTIONS</h2>
          <hr />
        </div>
        <div className="login-container">
          <div>
            <Button
              onClick={() => {
                redirectToLogin("google");
              }}
            >
              Login with google
            </Button>
          </div>
          <div>
            <Button
              onClick={() => {
                redirectToLogin("epic");
              }}
            >
              Login with epic
            </Button>
          </div>
          <div>
            <Button
              onClick={() => {
                redirectToLogin("twitch");
              }}
            >
              Login with twitch
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start;
