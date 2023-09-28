INSERT INTO users(email, phone_number, hashed_password, first_name, last_name, created_at, updated_at)
VALUES ('test@test.test', '+1234567890', '$2a$10$dbN2LIdj.CRCignp0ePzuu5SpQJOzXR5fHh/HxKQqD.FgiONnc2Hu', 'TestUser', 'TestLastname', current_timestamp, current_timestamp);

INSERT INTO businesses(name, business_name, timezone, created_at, updated_at)
VALUES ('Business One', 'business1', 'America/Toronto', current_timestamp, current_timestamp);

INSERT INTO permissions(action) VALUES ('Add a booking');
INSERT INTO permissions(action) VALUES ('Cancel a booking');
INSERT INTO permissions(action) VALUES ('Modify business settings');
INSERT INTO permissions(action) VALUES ('View all bookings');

INSERT INTO roles(name) VALUES ('owner');

INSERT INTO role_permissions(role_id, permission_id, created_at) VALUES (1, 1, current_timestamp);
INSERT INTO role_permissions(role_id, permission_id, created_at) VALUES (1, 2, current_timestamp);
INSERT INTO role_permissions(role_id, permission_id, created_at) VALUES (1, 3, current_timestamp);
INSERT INTO role_permissions(role_id, permission_id, created_at) VALUES (1, 4, current_timestamp);

INSERT INTO business_users (business_id, user_id, role_id, first_name, last_name, created_at)
VALUES 
(1, 1, 1, 'TestUser/AtBiz', 'TestLastname/AtBiz', current_timestamp);

INSERT INTO business_config (business_id, key, value, created_at, updated_at)
VALUES 
(1, 'ui-config', 
'{
  "primaryColorLight": "#ffd27a",
  "primaryColorDark": "#ffaf14",
  "secondaryColorLight": "#e9edf0",
  "secondaryColorDark": "#ced4da",
  "secondaryColorDarker": "#b1bbc4",
  "secondaryColorDarkest": "#404040",
  "complementaryColorLight": "#eaf0f0",
  "complementaryColorDark": "#45645b",
  "disableColor": "#f3f3f3"
}',current_timestamp, current_timestamp);

INSERT INTO business_config (business_id, key, value, created_at, updated_at)
VALUES 
(1, 'booking-config', 
'{
  "maxFutureBookingDays": 5
}', current_timestamp, current_timestamp);

INSERT INTO service_types (business_id, name, icon, description, created_at)
VALUES 
(1, 'Show Room', 'show_room_icon', 'A premium service to make your vehicle look as good as new.', current_timestamp),
(1, 'Basic', 'basic_icon', 'Basic cleaning and maintenance, ideal for quick touch-ups.', current_timestamp),
(1, 'Interior', 'interior_icon', 'Focused on cleaning and sanitizing the vehicle''s interior.', current_timestamp),
(1, 'Exterior', 'exterior_icon', 'Focused on exterior wash and wax, to make your vehicle shine.', current_timestamp);

INSERT INTO vehicle_types (business_id, name, icon, description, created_at)
VALUES 
(1, 'Sedan', 'sedan_icon', 'A small to medium-sized vehicle with comfortable seating for 4-5 passengers.', current_timestamp),
(1, 'SUV', 'suv_icon', 'A medium to large-sized vehicle suitable for families, with optional all-wheel drive.', current_timestamp),
(1, 'Large SUV / Truck', 'large_suv_truck_icon', 'A large vehicle with ample cargo space, often used for towing or off-road activities.', current_timestamp),
(1, 'Motorcycle', 'motorcycle_icon', 'A two-wheeler suitable for individual riders or a couple, fuel-efficient and quick.', current_timestamp);

INSERT INTO users (email, phone_number, hashed_password, first_name, last_name)
VALUES ('unknown@customer.com', '0000000000', 'hashed_password_for_unknown', 'Unknown', 'Customer');

INSERT INTO channels (name)
VALUES ('sms'), ('email');

INSERT INTO bookings (business_id, user_id, vehicle_type_id, service_type_id, datetime, cost, discount, deposit, bill_number, status)
VALUES 
(1, 1, 1, 1, current_timestamp, 100, 10, 10, 1001, 'pending_payment'),
(1, 1, 2, 2, current_timestamp, 120, 15, 10, 1002, 'pending_payment'),
(1, 2, 3, 3, current_timestamp, 150, 20, 10, 1003, 'pending_payment'),
(1, 2, 4, 4, current_timestamp, 130, 10, 10, 1004, 'active'),
(1, 2, 2, 1, current_timestamp, 110, 5,  10, 1005, 'cancelled');

INSERT INTO booking_logs (booking_id, user_id, state, details)
VALUES 
(1, 1, 'Booked', 'Owner made a booking, pending payment.'),
(2, 1, 'Booked', 'Owner made another booking, pending payment.'),
(3, 2, 'Booked', 'Unknown customer booking, pending payment.'),
(4, 2, 'Paid', 'Unknown customer made a successful payment.'),
(5, 2, 'Payment Failed', 'Payment failed for this booking.');

INSERT INTO transactions (booking_id, amount, gateway, status, notes)
VALUES 
(1, 90, 'Stripe', 'pending', 'Owner booking 1.'),
(2, 105, 'Stripe', 'pending', 'Owner booking 2.'),
(3, 130, 'Stripe', 'pending', 'Customer booking 3.'),
(4, 120, 'Stripe', 'successful', 'Customer booking 4.'),
(5, 105, 'Stripe', 'failed', 'Customer booking 5.');

INSERT INTO communications (channel_id, user_id, from_address, to_address, content)
VALUES 
(2, 1, 'system@yourdomain.com', 'test@test.test', 'Your booking is pending payment.'),
(1, 1, '+1111111111', '+1234567890', 'Thank you for your booking.'), -- SMS with correct format
(2, 2, 'system@yourdomain.com', 'unknown@customer.com', 'Your booking was successful.'),
(1, 2, '+1111111111', '0000000000', 'Your payment failed. Please retry.'), -- SMS with correct format
(2, 2, 'system@yourdomain.com', 'unknown@customer.com', 'Booking cancelled due to failed payment.');

INSERT INTO contacts (contactable_type, contactable_id, address, phone, email)
VALUES 
('user', 1, '123 Owner St., City', '+1234567890', 'test@test.test'),
('user', 2, 'Unknown Address', '0000000000', 'unknown@customer.com'),
('business', 1, '123 Business St., City', '+1111111111', 'business@yourdomain.com'); -- business entry
