import { AUTHENTICATED_API } from "./api";

const AuthService = {
  login: async (username: string, password: string) => {
    const response = await AUTHENTICATED_API.post(
      "auth/login",
      { username, password },
      { withCredentials: true }
    );
    return response.data;
  },
  logout: async () => {
    const response = await AUTHENTICATED_API.post(
      "auth/logout",
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  },
  getMe: async () => {
    const response = await AUTHENTICATED_API.get("auth/me", {
      withCredentials: true,
    });

    return response.data;
  },
};

export default AuthService;
