-- Create roles enum
CREATE TYPE public.app_role AS ENUM ('admin', 'operator', 'customer');

-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  role app_role DEFAULT 'customer',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create vendors table
CREATE TABLE public.vendors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  contact_email TEXT,
  contact_phone TEXT,
  license_number TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create routes table
CREATE TABLE public.routes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_city TEXT NOT NULL,
  to_city TEXT NOT NULL,
  distance_km INTEGER,
  estimated_duration_hours DECIMAL(4,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create buses table
CREATE TABLE public.buses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID REFERENCES public.vendors(id) NOT NULL,
  bus_number TEXT UNIQUE NOT NULL,
  bus_type TEXT NOT NULL, -- AC, Non-AC, Deluxe, etc
  total_seats INTEGER NOT NULL,
  seat_layout JSONB NOT NULL, -- seat configuration
  amenities TEXT[],
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create schedules table
CREATE TABLE public.schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  route_id UUID REFERENCES public.routes(id) NOT NULL,
  bus_id UUID REFERENCES public.buses(id) NOT NULL,
  departure_time TIME NOT NULL,
  arrival_time TIME NOT NULL,
  base_price DECIMAL(10,2) NOT NULL,
  available_dates DATE[] NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_reference TEXT UNIQUE NOT NULL,
  schedule_id UUID REFERENCES public.schedules(id) NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  travel_date DATE NOT NULL,
  selected_seats INTEGER[] NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  booking_status TEXT DEFAULT 'pending', -- pending, confirmed, cancelled
  payment_status TEXT DEFAULT 'pending', -- pending, completed, failed, refunded
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create booking passengers table
CREATE TABLE public.booking_passengers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE NOT NULL,
  seat_number INTEGER NOT NULL,
  passenger_name TEXT NOT NULL,
  passenger_age INTEGER,
  passenger_gender TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create payments table
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES public.bookings(id) NOT NULL,
  payment_method TEXT NOT NULL, -- esewa, khalti, stripe
  payment_gateway_id TEXT,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'NPR',
  status TEXT DEFAULT 'pending', -- pending, completed, failed, refunded
  transaction_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  gateway_response JSONB
);

-- Create packages table
CREATE TABLE public.packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  duration_days INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  max_group_size INTEGER,
  highlights TEXT[],
  includes TEXT[],
  excludes TEXT[],
  itinerary JSONB,
  images TEXT[],
  category TEXT, -- trekking, safari, cultural, adventure
  difficulty_level TEXT, -- easy, moderate, challenging
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create package availability table
CREATE TABLE public.package_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id UUID REFERENCES public.packages(id) ON DELETE CASCADE NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  available_slots INTEGER NOT NULL,
  price_override DECIMAL(10,2), -- optional price override for specific dates
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create package bookings table
CREATE TABLE public.package_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_reference TEXT UNIQUE NOT NULL,
  package_id UUID REFERENCES public.packages(id) NOT NULL,
  availability_id UUID REFERENCES public.package_availability(id) NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  number_of_people INTEGER NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  special_requests TEXT,
  booking_status TEXT DEFAULT 'pending',
  payment_status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create promotions table
CREATE TABLE public.promotions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  discount_type TEXT NOT NULL, -- percentage, fixed_amount
  discount_value DECIMAL(10,2) NOT NULL,
  min_amount DECIMAL(10,2),
  max_discount DECIMAL(10,2),
  valid_from DATE NOT NULL,
  valid_until DATE NOT NULL,
  usage_limit INTEGER,
  used_count INTEGER DEFAULT 0,
  applicable_to TEXT NOT NULL, -- bus, package, all
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.buses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_passengers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.package_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.package_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promotions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for public access (for browsing buses and packages)
CREATE POLICY "Allow public read access to routes" ON public.routes FOR SELECT USING (true);
CREATE POLICY "Allow public read access to schedules" ON public.schedules FOR SELECT USING (true);
CREATE POLICY "Allow public read access to buses" ON public.buses FOR SELECT USING (true);
CREATE POLICY "Allow public read access to vendors" ON public.vendors FOR SELECT USING (true);
CREATE POLICY "Allow public read access to packages" ON public.packages FOR SELECT USING (true);
CREATE POLICY "Allow public read access to package availability" ON public.package_availability FOR SELECT USING (true);
CREATE POLICY "Allow public read access to promotions" ON public.promotions FOR SELECT USING (true);

-- Create RLS policies for bookings (users can only see their own)
CREATE POLICY "Users can view their own bookings" ON public.bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create bookings" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update their own bookings" ON public.bookings FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own package bookings" ON public.package_bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create package bookings" ON public.package_bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update their own package bookings" ON public.package_bookings FOR UPDATE USING (auth.uid() = user_id);

-- Allow public access to booking passengers (needed for anonymous bookings)
CREATE POLICY "Allow access to booking passengers" ON public.booking_passengers FOR ALL USING (true);
CREATE POLICY "Allow access to payments" ON public.payments FOR ALL USING (true);

-- Profile policies
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Insert dummy data for vendors
INSERT INTO public.vendors (id, name, contact_email, contact_phone, license_number) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Greenline Tours', 'info@greenlinetours.com', '+977-1-4412345', 'GL001'),
('550e8400-e29b-41d4-a716-446655440002', 'Sajha Yatayat', 'contact@sajhayatayat.com', '+977-1-5512345', 'SY002'),
('550e8400-e29b-41d4-a716-446655440003', 'Buddha Air Express', 'bookings@buddhaairexpress.com', '+977-1-4412789', 'BAE003'),
('550e8400-e29b-41d4-a716-446655440004', 'Himalayan Express', 'info@himalayanexpress.com', '+977-1-4423456', 'HE004');

-- Insert dummy data for routes
INSERT INTO public.routes (id, from_city, to_city, distance_km, estimated_duration_hours) VALUES
('550e8400-e29b-41d4-a716-446655440010', 'Kathmandu', 'Pokhara', 200, 6.5),
('550e8400-e29b-41d4-a716-446655440011', 'Kathmandu', 'Chitwan', 160, 5.0),
('550e8400-e29b-41d4-a716-446655440012', 'Pokhara', 'Chitwan', 120, 4.0),
('550e8400-e29b-41d4-a716-446655440013', 'Kathmandu', 'Lumbini', 280, 8.0),
('550e8400-e29b-41d4-a716-446655440014', 'Pokhara', 'Kathmandu', 200, 6.5),
('550e8400-e29b-41d4-a716-446655440015', 'Chitwan', 'Kathmandu', 160, 5.0);

-- Insert dummy data for buses
INSERT INTO public.buses (id, vendor_id, bus_number, bus_type, total_seats, seat_layout, amenities) VALUES
('550e8400-e29b-41d4-a716-446655440020', '550e8400-e29b-41d4-a716-446655440001', 'BA-1-PA-1234', 'AC Deluxe', 32, '{"rows": 8, "seatsPerRow": 4, "layout": [[1,2,"aisle",3,4],[5,6,"aisle",7,8],[9,10,"aisle",11,12],[13,14,"aisle",15,16],[17,18,"aisle",19,20],[21,22,"aisle",23,24],[25,26,"aisle",27,28],[29,30,"aisle",31,32]]}', '{"WiFi", "AC", "Charging Ports", "Entertainment System"}'),
('550e8400-e29b-41d4-a716-446655440021', '550e8400-e29b-41d4-a716-446655440001', 'BA-1-PA-5678', 'AC Standard', 40, '{"rows": 10, "seatsPerRow": 4, "layout": [[1,2,"aisle",3,4],[5,6,"aisle",7,8],[9,10,"aisle",11,12],[13,14,"aisle",15,16],[17,18,"aisle",19,20],[21,22,"aisle",23,24],[25,26,"aisle",27,28],[29,30,"aisle",31,32],[33,34,"aisle",35,36],[37,38,"aisle",39,40]]}', '{"AC", "Charging Ports"}'),
('550e8400-e29b-41d4-a716-446655440022', '550e8400-e29b-41d4-a716-446655440002', 'BA-2-KHA-9012', 'Non-AC Standard', 45, '{"rows": 11, "seatsPerRow": 4, "layout": [[1,2,"aisle",3,4],[5,6,"aisle",7,8],[9,10,"aisle",11,12],[13,14,"aisle",15,16],[17,18,"aisle",19,20],[21,22,"aisle",23,24],[25,26,"aisle",27,28],[29,30,"aisle",31,32],[33,34,"aisle",35,36],[37,38,"aisle",39,40],[41,42,"aisle",43,44]]}', '{"Music System"}'),
('550e8400-e29b-41d4-a716-446655440023', '550e8400-e29b-41d4-a716-446655440003', 'BA-3-GA-3456', 'VIP Deluxe', 24, '{"rows": 6, "seatsPerRow": 4, "layout": [[1,2,"aisle",3,4],[5,6,"aisle",7,8],[9,10,"aisle",11,12],[13,14,"aisle",15,16],[17,18,"aisle",19,20],[21,22,"aisle",23,24]]}', '{"WiFi", "AC", "Reclining Seats", "Personal Entertainment", "Blanket & Pillow"}');

-- Insert dummy data for schedules
INSERT INTO public.schedules (id, route_id, bus_id, departure_time, arrival_time, base_price, available_dates) VALUES
('550e8400-e29b-41d4-a716-446655440030', '550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440020', '07:00', '13:30', 1200.00, ARRAY['2024-01-15', '2024-01-16', '2024-01-17', '2024-01-18', '2024-01-19', '2024-01-20', '2024-01-21']::DATE[]),
('550e8400-e29b-41d4-a716-446655440031', '550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440021', '14:00', '20:30', 1000.00, ARRAY['2024-01-15', '2024-01-16', '2024-01-17', '2024-01-18', '2024-01-19', '2024-01-20', '2024-01-21']::DATE[]),
('550e8400-e29b-41d4-a716-446655440032', '550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440022', '09:00', '14:00', 800.00, ARRAY['2024-01-15', '2024-01-16', '2024-01-17', '2024-01-18', '2024-01-19', '2024-01-20', '2024-01-21']::DATE[]),
('550e8400-e29b-41d4-a716-446655440033', '550e8400-e29b-41d4-a716-446655440013', '550e8400-e29b-41d4-a716-446655440023', '06:00', '14:00', 1500.00, ARRAY['2024-01-15', '2024-01-16', '2024-01-17', '2024-01-18', '2024-01-19', '2024-01-20', '2024-01-21']::DATE[]),
('550e8400-e29b-41d4-a716-446655440034', '550e8400-e29b-41d4-a716-446655440014', '550e8400-e29b-41d4-a716-446655440020', '08:00', '14:30', 1200.00, ARRAY['2024-01-15', '2024-01-16', '2024-01-17', '2024-01-18', '2024-01-19', '2024-01-20', '2024-01-21']::DATE[]);

-- Insert dummy data for packages
INSERT INTO public.packages (id, title, description, duration_days, price, max_group_size, highlights, includes, excludes, category, difficulty_level, images) VALUES
('550e8400-e29b-41d4-a716-446655440040', 'Everest Base Camp Trek', '14-day adventure to the base of the world''s highest mountain with helicopter return option', 14, 45000.00, 12, 
 ARRAY['Helicopter Return', 'Professional Guide', 'All Meals', 'Mountain Views']::TEXT[], 
 ARRAY['Accommodation', 'All Meals', 'Guide & Porter', 'Permits', 'Helicopter Return']::TEXT[], 
 ARRAY['International Flights', 'Travel Insurance', 'Personal Expenses']::TEXT[], 
 'trekking', 'challenging', 
 ARRAY['https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=250&fit=crop&crop=center']::TEXT[]),

('550e8400-e29b-41d4-a716-446655440041', 'Annapurna Circuit Trek', 'Classic 12-day trek through diverse landscapes and rich cultural experiences', 12, 32000.00, 15, 
 ARRAY['Cultural Experience', 'Tea House Trek', 'Mountain Views', 'Local Cuisine']::TEXT[], 
 ARRAY['Tea House Accommodation', 'Breakfast & Dinner', 'Guide', 'Permits']::TEXT[], 
 ARRAY['Lunch', 'Travel Insurance', 'Personal Expenses', 'Tips']::TEXT[], 
 'trekking', 'moderate', 
 ARRAY['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop&crop=center']::TEXT[]),

('550e8400-e29b-41d4-a716-446655440042', 'Chitwan Safari Package', '3-day wildlife experience in Nepal''s premier national park with jungle activities', 3, 8500.00, 20, 
 ARRAY['Jungle Safari', 'Elephant Ride', 'Cultural Show', 'Bird Watching']::TEXT[], 
 ARRAY['Hotel Accommodation', 'All Meals', 'Safari Activities', 'Cultural Program']::TEXT[], 
 ARRAY['Transportation to Chitwan', 'Personal Expenses', 'Tips']::TEXT[], 
 'safari', 'easy', 
 ARRAY['https://images.unsplash.com/photo-1549366021-9f761d040a94?w=400&h=250&fit=crop&crop=center']::TEXT[]),

('550e8400-e29b-41d4-a716-446655440043', 'Kathmandu Valley Cultural Tour', '5-day exploration of UNESCO World Heritage Sites in Kathmandu Valley', 5, 15000.00, 25, 
 ARRAY['UNESCO Sites', 'Cultural Heritage', 'Local Guide', 'Traditional Crafts']::TEXT[], 
 ARRAY['Hotel Accommodation', 'Breakfast', 'Guide', 'Entry Fees', 'Transportation']::TEXT[], 
 ARRAY['Lunch & Dinner', 'Personal Expenses', 'Shopping', 'Tips']::TEXT[], 
 'cultural', 'easy', 
 ARRAY['https://images.unsplash.com/photo-1571511851313-99ee4e78e824?w=400&h=250&fit=crop&crop=center']::TEXT[]);

-- Insert dummy data for package availability
INSERT INTO public.package_availability (package_id, start_date, end_date, available_slots) VALUES
('550e8400-e29b-41d4-a716-446655440040', '2024-03-01', '2024-03-14', 8),
('550e8400-e29b-41d4-a716-446655440040', '2024-03-15', '2024-03-28', 10),
('550e8400-e29b-41d4-a716-446655440041', '2024-02-15', '2024-02-26', 12),
('550e8400-e29b-41d4-a716-446655440041', '2024-03-01', '2024-03-12', 15),
('550e8400-e29b-41d4-a716-446655440042', '2024-01-20', '2024-01-22', 18),
('550e8400-e29b-41d4-a716-446655440042', '2024-01-25', '2024-01-27', 20),
('550e8400-e29b-41d4-a716-446655440043', '2024-02-01', '2024-02-05', 22),
('550e8400-e29b-41d4-a716-446655440043', '2024-02-10', '2024-02-14', 25);

-- Insert dummy promotions
INSERT INTO public.promotions (code, title, description, discount_type, discount_value, min_amount, valid_from, valid_until, usage_limit, applicable_to) VALUES
('NEWUSER20', 'New User Discount', '20% off for first-time users', 'percentage', 20.00, 1000.00, '2024-01-01', '2024-12-31', 1000, 'all'),
('WINTER50', 'Winter Special', 'NPR 50 off on winter bookings', 'fixed_amount', 50.00, 500.00, '2024-01-01', '2024-03-31', 500, 'bus'),
('TREK15', 'Trekking Discount', '15% off on trekking packages', 'percentage', 15.00, 5000.00, '2024-01-01', '2024-06-30', 200, 'package');

-- Create indexes for better performance
CREATE INDEX idx_schedules_route_date ON public.schedules USING btree (route_id, available_dates);
CREATE INDEX idx_bookings_user_date ON public.bookings USING btree (user_id, travel_date);
CREATE INDEX idx_packages_category ON public.packages USING btree (category, status);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_packages_updated_at BEFORE UPDATE ON public.packages FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_package_bookings_updated_at BEFORE UPDATE ON public.package_bookings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();