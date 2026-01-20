-- Add explicit SELECT policy that blocks all reads (satisfies security scanner)
CREATE POLICY "No public read access" ON public.quote_requests
FOR SELECT USING (false);

-- Add explicit UPDATE policy that blocks all updates
CREATE POLICY "No public update access" ON public.quote_requests
FOR UPDATE USING (false);

-- Add explicit DELETE policy that blocks all deletes
CREATE POLICY "No public delete access" ON public.quote_requests
FOR DELETE USING (false);