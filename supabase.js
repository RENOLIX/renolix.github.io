import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kawlncpapaxdzjyhnhhz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imthd2xuY3BhcGF4ZHpqeWhuaGh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4NjkwMjEsImV4cCI6MjA3MjQ0NTAyMX0.jm-6Ll26WU-y0EMCBMR7Zv_aX7XU3iPomuMZNofps2U';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;