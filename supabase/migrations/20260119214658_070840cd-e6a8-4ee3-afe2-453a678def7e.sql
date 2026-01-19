-- Create quote_requests table to store form submissions
CREATE TABLE public.quote_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  car_brand TEXT NOT NULL,
  car_model TEXT NOT NULL,
  year TEXT NOT NULL,
  engine TEXT,
  part_needed TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add check constraint for status values
ALTER TABLE public.quote_requests 
ADD CONSTRAINT quote_requests_status_check 
CHECK (status IN ('pending', 'contacted', 'quoted', 'completed', 'cancelled'));

-- Enable Row Level Security
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to INSERT quote requests (public form submission)
-- This is safe because it only allows creating new records, not reading existing ones
CREATE POLICY "Anyone can submit quote requests"
ON public.quote_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Policy: Only authenticated users can view quote requests
-- In a production app, you'd want to add role-based access here
CREATE POLICY "Authenticated users can view quote requests"
ON public.quote_requests
FOR SELECT
TO authenticated
USING (true);

-- Policy: Only authenticated users can update quote requests
CREATE POLICY "Authenticated users can update quote requests"
ON public.quote_requests
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Policy: Only authenticated users can delete quote requests
CREATE POLICY "Authenticated users can delete quote requests"
ON public.quote_requests
FOR DELETE
TO authenticated
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_quote_requests_updated_at
BEFORE UPDATE ON public.quote_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();