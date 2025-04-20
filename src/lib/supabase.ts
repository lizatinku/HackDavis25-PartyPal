import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fywsdbfhqrdkkdinrisf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5d3NkYmZocXJka2tkaW5yaXNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwMzY2NDcsImV4cCI6MjA2MDYxMjY0N30.8XBXPVROc9lulNAFHWlcLYAVWGya_7MJlGHJ-4wM7nA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
