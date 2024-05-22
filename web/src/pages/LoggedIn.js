import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoggedIn = () => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/auth/me", {
      credentials: "include", // This is important for sending cookies over cross-origin requests
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((error) =>
        console.error("An error occurred fetching user:", error)
      );
  }, []);

  return (
    <div className="bg-bg h-screen flex flex-col justify-center items-center relative">
      <div className="absolute top-0 right-0 m-4">
        <button
          className="rounded-3xl bg-button px-5 py-3 text-lg font-roboto leading-6 text-white shadow-sm hover:bg-hoverbtn focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
          onClick={() => {
            fetch("http://localhost:3001/auth/logout", {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
            })
              .then((res) => res.json())
              .then((data) => {
                console.log("data", data);

                if (data.message === "Logged out") {
                  setUser(null);
                  navigate("/login");
                }
              })
              .catch((error) =>
                console.error("An error occurred logging out:", error)
              );
          }}
        >
          Logout
        </button>
      </div>
      <h1 className="text-headline font-roboto text-3xl">
        You have been logged in as: {user?.user?.username || "Unknown"}
      </h1>
    </div>
  );
};

export default LoggedIn;
