import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zawlphvkmuasdmsbteja.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inphd2xwaHZrbXVhc2Rtc2J0ZWphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxNTMzMjEsImV4cCI6MjA2MDcyOTMyMX0.tyaafjARkcHMsIKs2f1A1zX9NSvWeMkxMlCOjySm16I';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
