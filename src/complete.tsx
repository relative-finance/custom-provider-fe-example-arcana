import { useSearchParams } from "react-router-dom";
import { getAuth } from "./auth";
import React from "react";
import Button from "./Button";

const STATUS = {
  INPROGRESS: "ip",
  COMPLETE: "cp",
};
const getToken = async (params: { code: string; state: string }) => {
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/complete`, {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data: {
    loginType: string;
    userID: string;
    token: string;
    loginToken: string;
    linkComplete?: boolean;
    linkedAccount?: string;
  } = await res.json();
  return data;
};

const Complete = () => {
  const [progressText, setProgressText] = React.useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [status, setStatus] = React.useState(STATUS.INPROGRESS);
  const [loginType, setLoginType] = React.useState("");

  React.useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    if (code && state) {
      setProgressText("Getting token");
      getToken({ code, state })
        .then(function (params) {
          setProgressText("Arcana: Logging In");
          if (params.linkComplete == true) {
            getAuth().then(() => {
              setProgressText(`Account linked to ${params.linkedAccount}`);
              console.log("Link complete!");
            });
            return;
          }
          localStorage.setItem("token", params.loginToken);
          setLoginType(params.loginType);
          getAuth().then(async (auth) => {
            auth.provider.once("connect", () => {
              setProgressText("Login complete");
              setStatus(STATUS.COMPLETE);
            });
            await auth.loginWithCustomProvider({
              token: params.token,
              userID: params.userID,
              provider: "csp-aAPozkerUragPuza",
            });
          });
        })
        .finally(() => {
          setSearchParams({});
        });
    }

    return;
  }, []);

  return (
    <div className="main">
      <div className="container">
        <div>
          <h2>REDIRECT PAGE</h2>
          <hr />
        </div>
        <p>{progressText}</p>
        <LinkAccount status={status} currentLogin={loginType} />
      </div>
    </div>
  );
};

const LinkAccount = ({
  currentLogin,
  status,
}: {
  currentLogin: string;
  status: string;
}) => {
  console.log({ status });
  if (status !== STATUS.COMPLETE) {
    console.log("???");
    return "";
  }

  const token = localStorage.getItem("token");
  if (!token) {
    console.log("????");
    return;
  }

  return (
    <div>
      {["epic", "google", "twitch"].map((l) => {
        console.log({ currentLogin });
        if (l == currentLogin) {
          return "";
        }
        return (
          <Button
            key={l}
            onClick={() => {
              redirectToLink(l, token);
            }}
          >
            {`Link with ${l}`}
          </Button>
        );
      })}
    </div>
  );
};

const redirectToLink = (loginType: string, token: string) => {
  window.location.href = `${
    import.meta.env.VITE_SERVER_URL
  }/link/${loginType}?token=${token}`;
};
export default Complete;
