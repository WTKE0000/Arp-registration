
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vudxvshctmwouwrfumhj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1ZHh2c2hjdG13b3V3cmZ1bWhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYyMjkyNTEsImV4cCI6MjA0MTgwNTI1MX0.insqtrCooHdr2qnbM_BcJAaabaOCm9u0MqbSxOK74B4'
export const supabase = createClient(supabaseUrl, supabaseKey)