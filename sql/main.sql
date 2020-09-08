CREATE TABLE event (
  id SERIAL PRIMARY KEY,
  start_date DATE,
  end_date DATE,
  name varchar(255),
  description text,
  start_time TIME,
  end_time TIME,
  address varchar(255),
  city varchar(255),
  state varchar(255),
  zip float8
); 

CREATE TABLE participant (
  id SERIAL PRIMARY KEY,
  event_id INT REFERENCES event(id),
  firstName varchar(255),
  lastName varchar(255),
  phone float8,
  email varchar(255)
); 
