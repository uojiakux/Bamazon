USE bamazon;

CREATE TABLE products (
	item_id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    price INTEGER,
    stock_quantity INTEGER
);

SELECT * FROM bamazon.products;

UPDATE `products` SET `product_name` = 'Bill Haley' WHERE `item_id` = 2;
UPDATE `products` SET `product_name` = 'Sinead O Conn' WHERE `item_id` = 7;