-- Drop all SELECT, UPDATE, DELETE policies - only keep INSERT
DROP POLICY IF EXISTS "Authenticated users can view quote requests" ON public.quote_requests;
DROP POLICY IF EXISTS "Authenticated users can update quote requests" ON public.quote_requests;
DROP POLICY IF EXISTS "Authenticated users can delete quote requests" ON public.quote_requests;

-- The INSERT policy "Anyone can submit quote requests" remains in place
-- Data access will only be through edge functions with service role key