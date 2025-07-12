import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/api/user-api";

type SignUpParams = {
  email: string;
  password: string;
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: ({ email, password }: SignUpParams) =>
      signUp({ email, password }),
  });
};
