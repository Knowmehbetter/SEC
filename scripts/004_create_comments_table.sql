-- Create the comments table for live chat functionality
CREATE TABLE IF NOT EXISTS public.comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    content TEXT NOT NULL,
    username TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read and insert
CREATE POLICY "Allow public read access on comments" ON public.comments
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert access on comments" ON public.comments
    FOR INSERT WITH CHECK (true);

-- Enable real-time subscriptions for the comments table
ALTER PUBLICATION supabase_realtime ADD TABLE public.comments;
