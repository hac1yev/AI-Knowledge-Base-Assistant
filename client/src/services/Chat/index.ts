import { httpClient } from "../httpClient";

export async function sendMessage(message: string, file: File | null) {
    const formData = new FormData();

    formData.append("message", message);

    if (file) {
        formData.append("file", file);
    }

    return httpClient.post("/chat", formData);
}
