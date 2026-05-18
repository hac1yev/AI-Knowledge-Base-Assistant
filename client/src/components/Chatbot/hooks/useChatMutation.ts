import { sendMessage } from "../../../services/Chat";
import { useMutation } from "@tanstack/react-query";

type ChatPayload = {
  message: string;
  file?: File | null;
};

export const useChatMutation = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async ({message, file}: ChatPayload) => {
      return sendMessage(message, file ?? null);
    },
  });

  return {
    mutate,
    isPending,
  }
};
