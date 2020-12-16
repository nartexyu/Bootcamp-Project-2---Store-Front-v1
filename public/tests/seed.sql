INSERT INTO users (email, password, first_name, last_name, createdAt, updatedAt)
VALUES ("danieljhersh@gmail.com", "password123", "DJ", "Hersh", '2020-12-16 04:25:45', '2020-12-16 04:25:45');

INSERT INTO users (email, password, first_name, last_name, createdAt, updatedAt)
VALUES ("fake123@gmail.com", "password123", "Daniel", "Hersh", '2020-12-16 04:25:45', '2020-12-16 04:25:45');

INSERT INTO users (email, password, first_name, last_name, createdAt, updatedAt)
VALUES ("fakeyfake@gmail.com", "password123", "Ben", "Hersh", '2020-12-16 04:25:45', '2020-12-16 04:25:45');

INSERT INTO stores (store_name, address, about, createdAt, updatedAt, UserId)
VALUES ("store number 1", "123 fake street", "This is a seed file", '2020-12-16 04:25:45', '2020-12-16 04:25:45', 1);

INSERT INTO stores (store_name, address, about, createdAt, updatedAt, UserId)
VALUES ("store number 2", "123 fake Avenue", "This is a seed file", '2020-12-16 04:25:45', '2020-12-16 04:25:45', 2);

INSERT INTO stores (store_name, address, about, createdAt, updatedAt, UserId)
VALUES ("store number 3", "123 fake court", "This is a seed file", '2020-12-16 04:25:45', '2020-12-16 04:25:45', 3);

INSERT INTO products (name, price, description, stock, createdAt, updatedAt, StoreId)
VALUES ("product number 1", 12.99, "This is a test", 24, '2020-12-16 04:25:45', '2020-12-16 04:25:45', 1);

INSERT INTO products (name, price, description, stock, createdAt, updatedAt, StoreId)
VALUES ("product number 2", 15.99, "This is a test", 16, '2020-12-16 04:25:45', '2020-12-16 04:25:45', 2);

INSERT INTO products (name, price, description, stock, createdAt, updatedAt, StoreId)
VALUES ("product number 3", 27.99, "This is a test", 33, '2020-12-16 04:25:45', '2020-12-16 04:25:45', 3);