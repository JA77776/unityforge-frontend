import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "sb_publishable_ZtlgYg3kjZF8rs1nsLtWYA_E_kRySOy";
const supabaseKey = "sb_secret_QsT5tIElytQR0ydn3cJAyQ_ATbVqOGC8";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);