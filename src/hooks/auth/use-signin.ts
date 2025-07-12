import { useMutation } from "@tanstack/react-query";
import { signInAction } from "@/api/user-api";

export const useSignin = () => {
  const mutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const result = await signInAction(email, password);
      if (!result.success) throw new Error(result.error);
      return result;
    },
  });

  return {
    login: mutation.mutateAsync,
    ...mutation,
  };
};
