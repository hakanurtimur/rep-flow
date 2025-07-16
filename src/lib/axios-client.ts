import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: "/",
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.api.interceptors.request.use(
      (config) => {
        const authData = localStorage.getItem("authData");
        if (authData) {
          try {
            const token = JSON.parse(authData);
            config.headers["Authorization"] = `Bearer ${token.accessToken}`;
          } catch (e) {
            console.warn("Token parse error", e);
          }
        }

        config.headers["Access-Control-Allow-Origin"] = "*";

        return config;
      },
      (error) => Promise.reject(error),
    );

    // Response Interceptor
    this.api.interceptors.response.use(
      (response) => {
        if (
          response.data &&
          response.data.statusCode &&
          response.data.statusCode === 400
        ) {
          const errorMessage =
            response.data.error?.errors?.[0] ?? "Unknown error";
          return Promise.reject({
            message: errorMessage,
            status: response.data.statusCode,
          });
        }

        return response;
      },
      (error) => {
        const backendMessage =
          error?.response?.data?.message ||
          error?.response?.data?.error?.message ||
          error?.message ||
          "Unexpected error";

        const status = error?.response?.status;

        return Promise.reject({
          message: backendMessage,
          status,
        });
      },
    );
  }

  // ✅ GET (authorized)
  public async get<T, R = AxiosResponse<T>>(
    path: string,
    params?: Record<string, unknown>,
  ): Promise<R> {
    const url = `/api/${path}`;
    const response = await this.api.get<R>(url, { params });
    return response.data;
  }

  // ✅ GET (public)
  public async getPublic<T, R = AxiosResponse<T>>(
    path: string,
    params?: Record<string, unknown>,
  ): Promise<R> {
    const url = `/public/${path}`;
    const response = await this.api.get<R>(url, { params });
    return response.data;
  }

  // ✅ POST (authorized)
  public async post<T, R = AxiosResponse<T>>(
    path: string,
    data: T,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    const url = `/api/${path}`;
    const response = await this.api.post<R>(url, data, config);
    return response.data;
  }

  // ✅ POST (authorized, without payload)
  public async postWithoutData<T, R = AxiosResponse<T>>(
    path: string,
    data?: T,
  ): Promise<R> {
    const url = `/api/${path}`;
    const response = await this.api.post<R>(url, data);
    return response.data;
  }

  // ✅ PUT
  public async put<T, R = AxiosResponse<T>>(
    path: string,
    data: T,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    const url = `/api/${path}`;
    const response = await this.api.put<R>(url, data, config);
    return response.data;
  }

  // ✅ DELETE
  public async delete<T, R = AxiosResponse<T>>(path: string): Promise<R> {
    const url = `/api/${path}`;
    const response = await this.api.delete<R>(url);
    return response.data;
  }
}

const api = new ApiService();
export default api;
