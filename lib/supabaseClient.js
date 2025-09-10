// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cdtmcdxrdnauwehohxkh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkdG1jZHhyZG5hdXdlaG9oeGtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2MTcyNDMsImV4cCI6MjA3MTE5MzI0M30.73-sH3eE3t9gxTEpTtbJezrKXT6E496CXDieAu1tIbQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
