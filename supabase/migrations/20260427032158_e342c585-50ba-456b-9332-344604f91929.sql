DROP POLICY IF EXISTS "Anyone can submit a diagnostic lead" ON public.diagnostic_leads;

CREATE POLICY "Anyone can submit a valid diagnostic lead"
ON public.diagnostic_leads
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(trim(name)) BETWEEN 2 AND 100
  AND char_length(trim(phone)) BETWEEN 5 AND 30
  AND char_length(trim(clinic)) BETWEEN 2 AND 200
  AND char_length(trim(niche)) BETWEEN 2 AND 100
);