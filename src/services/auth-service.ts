import { createUser } from "@/services/user-service";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export const signUp = async (email: string, password: string) => {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
    },
  });

  if (error || !data.user) throw error;

  await createUser({
    id: data.user.id,
    email: data.user.email!,
  });
};
