import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ahusdttuujhqfgsxojbk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFodXNkdHR1dWpocWZnc3hvamJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5NTExMjEsImV4cCI6MjA4NzUyNzEyMX0.tjSA5UpyoPvM-gmDIz-x0wFed3QcukkQLbN0BPmXRB8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);