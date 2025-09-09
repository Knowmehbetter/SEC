-- Create viewer presence table for real-time viewer tracking
CREATE TABLE IF NOT EXISTS public.viewer_presence (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id TEXT NOT NULL UNIQUE,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.viewer_presence ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read and write access for viewer tracking
CREATE POLICY "Allow public read access on viewer_presence" ON public.viewer_presence
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert access on viewer_presence" ON public.viewer_presence
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access on viewer_presence" ON public.viewer_presence
    FOR UPDATE USING (true);

CREATE POLICY "Allow public delete access on viewer_presence" ON public.viewer_presence
    FOR DELETE USING (true);

-- Enable real-time subscriptions for the viewer_presence table
ALTER PUBLICATION supabase_realtime ADD TABLE public.viewer_presence;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_viewer_presence_session_id ON public.viewer_presence(session_id);
CREATE INDEX IF NOT EXISTS idx_viewer_presence_last_seen ON public.viewer_presence(last_seen);
