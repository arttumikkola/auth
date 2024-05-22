import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Redirect to the logged-in page
        navigate("/login");
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
            <h2 className="mt-4 text-center text-5xl leading-9 tracking-tight text-headline font-roboto">
              Register
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-roboto leading-6 text-paragraph"
                >
                  <div className="flex flex-row items-center">
                    {/*  <Email className="h-5 w-5 mr-2" /> */}
                    <p className="text-lg">Email</p>
                  </div>
                </label>
                <div className="flex justify-center mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    /* style={
                      errors.email
                        ? { border: "1px solid red" }
                        : { border: "1px solid #ffa400" }
                    } */
                    className="block w-full rounded-3xl border-0 py-1.5 px-2 text-paragraph shadow-sm ring-2 ring-inset ring-secondary placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-paragraph font-roboto"
                >
                  <div className="flex flex-row items-center">
                    {/*   <User className="h-5 w-5 mr-2" /> */}
                    <p className="text-lg">Username</p>
                  </div>
                </label>
                <div className="flex justify-center mt-2">
                  <input
                    id="username"
                    name="username"
                    type="username"
                    autoComplete="username"
                    required
                    /* style={
                      errors.username
                        ? { border: "1px solid red" }
                        : { border: "1px solid #ffa400" }
                    } */
                    className="block w-full rounded-3xl border-0 py-1.5 px-2 text-paragraph shadow-sm ring-2 ring-inset ring-secondary placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-roboto leading-6 text-paragraph"
                  >
                    <div className="flex flex-row items-center">
                      {/*   <Lock className="h-5 w-5 mr-2" /> */}
                      <p className="text-lg">Password</p>
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
                        ? { border: "1px solid red" }
                        : { border: "1px solid #ffa400" }
                    } */
                    className="block w-full rounded-3xl border-0 py-1.5 px-2 text-paragraph shadow-sm ring-2 ring-inset ring-secondary placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="flex w-2/4 justify-center rounded-3xl bg-button px-5 py-3 text-lg font-roboto leading-6 text-white shadow-sm hover:bg-hoverbtn focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
                  onClick={handleSubmit}
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
