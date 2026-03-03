import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wyiyyjacikxcmdcaowcl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5aXl5amFjaWt4Y21kY2Fvd2NsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0ODE4OTQsImV4cCI6MjA4ODA1Nzg5NH0.psCIUf8JUS93XS_K9bcpotmSPWhSGF_IgC9vc6M54Ro';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);