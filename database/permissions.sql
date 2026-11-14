-- Run as a PostgreSQL administrator while connected
-- to the vehicle_service_db database.
-- The vehicle_app role must already exist.

GRANT CONNECT ON DATABASE vehicle_service_db TO vehicle_app;

GRANT USAGE ON SCHEMA public TO vehicle_app;

GRANT SELECT, INSERT, UPDATE, DELETE
ON TABLE public.vehicles TO vehicle_app;

GRANT USAGE ON ALL SEQUENCES
IN SCHEMA public TO vehicle_app;