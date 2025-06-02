// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ptbkysrnmcqtvhyhrejr.supabase.co';  // Replace with your URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0Ymt5c3JubWNxdHZoeWhyZWpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMDk4MjEsImV4cCI6MjA2Mjg4NTgyMX0.QrpW-VV-X8A7RUyxhKTeJnhVrb1LR07yIL86U516jMc';         // Replace with your Anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
