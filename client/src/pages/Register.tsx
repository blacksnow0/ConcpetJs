import { useState } from "react";
// import AuthService from "../services/authService";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user", // Default role
    acceptedTerms: false,
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = event.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    if (!formData.acceptedTerms) {
      setError("You must accept the terms and conditions.");
      setLoading(false);
      return;
    }

    // try {
    //   const response = await AuthService.register(
    //     formData.username,
    //     formData.email,
    //     formData.password,
    //     formData.role
    //   );
    //   console.log(response);
    // } catch (error) {
    //   console.error(error);
    //   setError("Registration failed");
    //   return;
    // } finally {
    //   setLoading(false);
    // }

    console.log("Registering:", formData);
  };

  return (
    <form className="space-y-5 text-neutral-100" onSubmit={handleSubmit}>
      {error && (
        <p className="text-red-600 bg-red-100 border border-red-400 text-sm font-medium p-2 rounded-md">
          {error}
        </p>
      )}

      {/* Username */}
      <div>
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 text-sm border border-gray-600 rounded-md focus:outline-none focus:ring-gray-00 focus:border-gray-100"
          type="text"
          placeholder="Username..."
          required
        />
      </div>

      {/* Email */}
      <div>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 text-sm border border-gray-600 rounded-md focus:outline-none focus:ring-gray-00 focus:border-gray-100"
          type="email"
          placeholder="Email..."
          required
        />
      </div>

      {/* Password */}
      <div>
        <input
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 text-sm border border-gray-600 rounded-md focus:outline-none focus:ring-gray-00 focus:border-gray-100"
          type="password"
          placeholder="Password..."
          required
        />
      </div>

      {/* Role Selection */}
      <div>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 text-sm border border-gray-600 rounded-md focus:outline-none focus:ring-gray-00 focus:border-gray-100"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Accept Terms Checkbox */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="acceptedTerms"
          checked={formData.acceptedTerms}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label className="text-sm font-medium">
          I accept the terms and conditions
        </label>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full p-2 bg-neutral-100 text-sm font-semibold text-neutral-800"
          disabled={loading}
        >
          {loading ? "REGISTERING..." : "REGISTER"}
        </button>
      </div>
    </form>
  );
}
