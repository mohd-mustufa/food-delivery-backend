create table organizations (id serial primary key, name varchar(255) not null);
INSERT INTO organizations (name) VALUES ('Company A'), ('Company B'), ('Company C'), ('Company D'), ('Company E');

create table items (id serial primary key, type varchar(50) not null, description text);
INSERT INTO items (type, description) VALUES ('perishable', 'Spoils quickly.'), ('non-perishable', 'Long shelf life.');

CREATE TABLE pricing (
organization_id INT REFERENCES Organizations(id),
item_id INT REFERENCES Items(id),
zone VARCHAR(50),
base_distance_in_km NUMERIC(10, 2) NOT NULL,
km_price NUMERIC(10, 2) NOT NULL,
fix_price NUMERIC(10, 2) NOT NULL,
PRIMARY KEY (organization_id, item_id, zone)
);

INSERT INTO pricing (organization_id, item_id, zone, base_distance_in_km, km_price, fix_price) VALUES
(1, 1, 'north', 6, 2, 10), (1, 1, 'south', 6, 2, 10), (1, 1, 'east', 5, 2, 10), (1, 1, 'west', 5, 2, 10), (1, 1, 'central', 4, 2, 10),
(1, 2, 'north', 6, 1, 10), (1, 2, 'south', 6, 1, 10), (1, 2, 'east', 5, 1, 10), (1, 2, 'west', 5, 1, 10), (1, 2, 'central', 4, 1, 10),

(2, 1, 'north', 5, 2, 10), (2, 1, 'south', 5, 2, 10), (2, 1, 'east', 5, 2, 10), (2, 1, 'west', 5, 2, 10), (2, 1, 'central', 5, 2, 10),
(2, 2, 'north', 5, 1.5, 10), (2, 2, 'south', 5, 1.5, 10), (2, 2, 'east', 5, 1, 10), (2, 2, 'west', 5, 1, 10), (2, 2, 'central', 5, 1, 10),

(3, 1, 'north', 5, 2, 10), (3, 1, 'south', 5, 2, 10), (3, 1, 'east', 5, 2, 10), (3, 1, 'west', 5, 2, 10), (3, 1, 'central', 5, 2, 10),
(3, 2, 'north', 5, 1, 10), (3, 2, 'south', 5, 1, 10), (3, 2, 'east', 5, 1, 10), (3, 2, 'west', 5, 1, 10), (3, 2, 'central', 5, 1, 10),

(4, 1, 'north', 5, 2, 10), (4, 1, 'south', 5, 2, 10), (4, 1, 'east', 5, 2, 10), (4, 1, 'west', 5, 2, 10), (4, 1, 'central', 5, 2, 10),
(4, 2, 'north', 5, 1, 10), (4, 2, 'south', 5, 1, 10), (4, 2, 'east', 5, 1, 10), (4, 2, 'west', 5, 1, 10), (4, 2, 'central', 5, 1, 10),

(5, 1, 'north', 5, 2, 10), (5, 1, 'south', 5, 2, 10), (5, 1, 'east', 5, 2, 10), (5, 1, 'west', 5, 2, 10), (5, 1, 'central', 5, 2, 10),
(5, 2, 'north', 5, 1, 10), (5, 2, 'south', 5, 1, 10), (5, 2, 'east', 5, 1, 10), (5, 2, 'west', 5, 1, 10), (5, 2, 'central', 5, 1, 10);
