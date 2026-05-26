import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cvdwyrbnynthuicqtfev.supabase.co";
const supabaseKey = "sb_publishable_ZtlgYg3kjZF8rs1nsLtWYA_E_kRySOy";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);