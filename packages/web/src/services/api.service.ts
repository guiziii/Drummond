import axios from "axios";
import Keys from "../utils/keys";

export function ReturnBaseUrl() {
  return Keys.API_URL;
}

export const HttpStatus = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
};

export const api = axios.create({
  baseURL: `${ReturnBaseUrl()}`,
  timeout: 60 * 1000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async config => {
    return config;
  },
  error => {
    console.log({
      error,
    });
  }
);
