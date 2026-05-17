CREATE TABLE public.diagnostic_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  clinic TEXT NOT NULL,
  niche TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'landing',
  user_agent TEXT,
  referrer TEXT,
  fbp TEXT,
  fbc TEXT,
  meta_event_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.diagnostic_leads ENABLE ROW LEVEL SECURITY;

-- Anyone (including anonymous visitors) can submit a lead
CREATE POLICY "Anyone can submit a diagnostic lead"
ON public.diagnostic_leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- No client-side reads. Edge functions use service role and bypass RLS.
-- (No SELECT policy => nobody can read via the JS client.)

CREATE INDEX idx_diagnostic_leads_created_at ON public.diagnostic_leads (created_at DESC);