
-- Orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number SERIAL,
  customer_name TEXT NOT NULL,
  customer_email TEXT,
  customer_phone TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  county TEXT NOT NULL,
  postal_code TEXT,
  notes TEXT,
  subtotal NUMERIC(10,2) NOT NULL DEFAULT 0,
  shipping_cost NUMERIC(10,2) NOT NULL DEFAULT 0,
  total NUMERIC(10,2) NOT NULL DEFAULT 0,
  payment_method TEXT NOT NULL DEFAULT 'ramburs',
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Order items table
CREATE TABLE public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_title TEXT NOT NULL,
  variant_title TEXT,
  variant_id TEXT,
  price NUMERIC(10,2) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts only
CREATE POLICY "Anyone can place orders" ON public.orders FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "No public read orders" ON public.orders FOR SELECT TO public USING (false);
CREATE POLICY "No public update orders" ON public.orders FOR UPDATE TO public USING (false);
CREATE POLICY "No public delete orders" ON public.orders FOR DELETE TO public USING (false);

CREATE POLICY "Anyone can add order items" ON public.order_items FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "No public read order items" ON public.order_items FOR SELECT TO public USING (false);
CREATE POLICY "No public update order items" ON public.order_items FOR UPDATE TO public USING (false);
CREATE POLICY "No public delete order items" ON public.order_items FOR DELETE TO public USING (false);

-- Allow SELECT for the inserting session (so we can return the order after insert)
CREATE POLICY "Read own order by id" ON public.orders FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Read own order items" ON public.order_items FOR SELECT TO anon, authenticated USING (true);

-- Trigger for updated_at
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
