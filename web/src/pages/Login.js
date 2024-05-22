import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ usernameOrEmail, password }),
      });

      if (response.ok) {
        navigate("/loggedin");
      } else {
        const error = await response.text();
        console.error("An error occurred:", error);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  return (
    <div className="bg-bg h-screen">
      <div className="flex justify-center items-center h-full">
        <div className="w-2/6 py-24 bg-main p-12 rounded-3xl shadow-lg">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="text-center text-5xl mb-12 font-roboto leading-9 tracking-tight text-headline">
              Login
            </h2>
          </div>
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-black"
              >
                <div className="flex flex-row ml-8">
                  {/* <User className="h-5 w-5 mr-2" /> */}
                  <p className="font-roboto text-lg text-paragraph">
                    Username or Email
                  </p>
                </div>
              </label>
              <div className="flex justify-center mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  required
                  /*  style={
                    errors.email
                      ? { border: "1px solid #e53e3e" }
                      : { border: "1px solid #ffa400" }
                  } */
                  className="block w-3/4 rounded-3xl border-0 p-2 py-1.5 text-black shadow-sm ring-2 ring-inset ring-secondary placeholder:text-gray-400 focus:ring-4 focus:ring-inset focus:ring-lightOrange sm:text-sm sm:leading-6"
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password input */}
            <div>
              <div className="flex items-center justify-between ml-8">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-black"
                >
                  <div className="flex flex-row">
                    {/* <Lock className="h-5 w-5 mr-2" /> */}
                    <p className="font-roboto text-lg text-paragraph">
                      Password
                    </p>
                  </div>
                </label>
              </div>
              <div className="flex justify-center mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  /*  style={
                    errors.password
                      ? { border: "1px solid #e53e3e" }
                      : { border: "1px solid #ffa400" }
                  } */
                  className="block p-2 w-3/4 rounded-3xl border-0 py-1.5 text-black shadow-sm ring-2 ring-inset ring-secondary placeholder:text-gray-400 focus:ring-4 focus:ring-inset focus:ring-lightOrange sm:text-sm sm:leading-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Submit button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="flex w-2/4 justify-center rounded-3xl bg-button px-5 py-3 text-lg font-roboto leading-6 text-white shadow-sm hover:bg-hoverbtn focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
                onClick={handleSubmit}
              >
                Login
              </button>
            </div>

            {/* New user registration link */}
            <div className="text-sm flex justify-center">
              <a
                href="/register"
                className="font-roboto text-lg text-paragraph focus:text-orange hover:underline"
              >
                New User? Register here
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
