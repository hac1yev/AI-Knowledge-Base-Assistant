import axios, { type AxiosInstance } from "axios";

export class HttpClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: "http://localhost:3000/api",
    });
  }

  get(url: string, config?: any) {
    return this.client.get(url, config);
  }

  post(url: string, data?: any, config?: any) {
    return this.client.post(url, data, config);
  }
}

export const httpClient = new HttpClient();