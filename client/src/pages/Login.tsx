import { useState } from "react";

import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const { login, error, loading } = useAuth();

  // const [error, setError] = useState<string | null>(null);
  // const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // setError(null);
    // setLoading(true);

    const success = await login(formData.username, formData.password);

    if (success) {
      navigate("/");
    }

    // setLoading(false);
  };

  return (
    <form className="space-y-5 text-neutral-100" onSubmit={handleSubmit}>
      {error && (
        <p className="text-red-600 bg-red-100 border border-red-400 text-sm font-medium p-2 rounded-md">
          {error}
        </p>
      )}

      <div>
        <label className="block font-medium text-sm">Username:</label>
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 text-sm border border-gray-600 rounded-md focus:outline-none focus:ring-gray-00 focus:border-gray-100"
          type="text"
          placeholder="Username..."
        />
      </div>
      <div>
        <label className="block font-medium text-sm">Password:</label>
        <input
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 text-sm border border-gray-600 rounded-md focus:outline-none focus:ring-gray-00 focus:border-gray-100"
          type="password"
          placeholder="Password..."
        />
      </div>
      <div>
        <button
          type="submit"
          className="w-full p-2 bg-neutral-100 text-sm font-semibold text-neutral-800"
          disabled={loading}
        >
          {loading ? "LOGGING IN..." : "LOGIN"}
        </button>
      </div>
    </form>
  );
}
