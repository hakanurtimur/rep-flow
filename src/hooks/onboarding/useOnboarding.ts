import { useMutation } from "@tanstack/react-query";
import { postOnboarding } from "@/api/user-api";
import { useRouter } from "next/navigation";

export const useOnboarding = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: postOnboarding,
    onSuccess: () => {
      router.push("/dashboard");
    },
    onError: (err) => {
      console.error("Onboarding failed", err);
    },
  });
};
