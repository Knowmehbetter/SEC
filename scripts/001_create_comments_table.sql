-- Create comments table for live streaming comments
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  username TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read comments (public stream)
CREATE POLICY "Anyone can view comments" ON public.comments FOR SELECT USING (true);

-- Allow anyone to insert comments (anonymous commenting for now)
CREATE POLICY "Anyone can insert comments" ON public.comments FOR INSERT WITH CHECK (true);
