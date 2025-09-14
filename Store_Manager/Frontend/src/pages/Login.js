import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loginUser = async (e) => {
    e.preventDefault(); // Stop default form submission

    if (!form.email || !form.password) {
      alert("Please enter email and password!");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        // If backend sends 401 or 400
        alert("Invalid credentials, try again!");
        return;
      }

      const data = await response.json();
      // Save logged-in user in localStorage
      localStorage.setItem("user", JSON.stringify(data));
      // Update context
      authContext.signin(data._id, () => {
        navigate("/");
      });
      alert("Successfully logged in!");
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen items-center place-items-center">
      <div className="flex justify-center">
        <img src={require("../assets/signup.jpg")} alt="" />
      </div>

      <div className="w-full max-w-md space-y-8 p-10 rounded-lg">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src={require("../assets/logo.png")}
            alt="Logo"
          />
          <h2 className="mt-6 text-center text-3xl font-bold">Sign in</h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={loginUser}>
          <div className="-space-y-px rounded-md shadow-sm">
            <input
              name="email"
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleInputChange}
              required
              className="input-field"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleInputChange}
              required
              className="input-field"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
          >
            Sign in
          </button>

          <p className="mt-2 text-center text-sm text-gray-600">
            Don't have an account? <Link to="/register">Register now</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
