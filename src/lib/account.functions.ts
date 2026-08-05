import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/**
 * Upgrades a brand-new customer account (e.g. created via Google sign-in) to a
 * seller account. Only allowed while the account has no seller/admin role yet.
 */
export const becomeSeller = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { storeName?: string }) => input)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: roles, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);
    if (error) throw new Error(error.message);
    const existing = (roles ?? []).map((r) => r.role);
    if (existing.includes("admin")) throw new Error("Admins cannot become sellers.");
    if (existing.includes("seller")) return { ok: true, alreadySeller: true };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error: roleError } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: userId, role: "seller" });
    if (roleError) throw new Error(roleError.message);

    await supabaseAdmin
      .from("profiles")
      .update({
        account_type: "seller",
        ...(data.storeName ? { store_name: data.storeName } : {}),
      })
      .eq("id", userId);

    return { ok: true, alreadySeller: false };
  });