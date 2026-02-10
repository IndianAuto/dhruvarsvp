CREATE TABLE rsvps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  attending BOOLEAN NOT NULL DEFAULT true,
  guest_count INTEGER NOT NULL DEFAULT 1,
  dietary_preferences TEXT[] DEFAULT '{}',
  dietary_other TEXT,
  arriving_by_air BOOLEAN DEFAULT false,
  airport TEXT,
  arrival_datetime TIMESTAMPTZ,
  need_accommodation BOOLEAN DEFAULT false,
  check_in_date DATE,
  check_out_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for the public RSVP form)
CREATE POLICY "Allow public inserts" ON rsvps FOR INSERT WITH CHECK (true);

-- Allow reads only from service role (for admin page)
CREATE POLICY "Allow service role reads" ON rsvps FOR SELECT USING (auth.role() = 'service_role');
