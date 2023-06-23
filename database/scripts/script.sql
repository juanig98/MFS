-- Archivo: 00000000000-drop_tables.sql
USE mfs;

DROP TABLE products_images;
DROP TABLE products_categories;
DROP TABLE products_sizes;
DROP TABLE users;
DROP TABLE products;
DROP TABLE categories;
DROP TABLE images;
DROP TABLE sizes;


-- Archivo: 20230623001-create_table_users.sql
CREATE TABLE users (
    id	        	INTEGER	PRIMARY KEY,
	username    	VARCHAR(50) UNIQUE NOT NULL,
    password    	VARCHAR(100) NOT NULL,
	email       	VARCHAR(100) UNIQUE NOT NULL,
	observations	TEXT NULL,
	status			ENUM('AC', 'BA') DEFAULT 'AC',
	created_at  	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 	updated_at  	TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Archivo: 20230623002-create_table_categories.sql
CREATE TABLE categories (
    id				INTEGER	PRIMARY KEY,
    description 	VARCHAR(100) NOT NULL,
	slug			VARCHAR(150) NOT NULL,
	observations	TEXT NULL,
	status			ENUM('AC', 'BA') DEFAULT 'AC',
	created_at 		TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 	updated_at 		TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- Archivo: 20230623003-create_table_products.sql
CREATE TABLE products (
    id				BIGINT	PRIMARY KEY,
	title 			VARCHAR(100) NOT NULL,
	slug			VARCHAR(150) UNIQUE NOT NULL,
    description 	VARCHAR(512) NULL,
	price_cost		NUMERIC(18,2) NOT NULL DEFAULT 0.00,
	price_public 	NUMERIC(18,2) NOT NULL DEFAULT 0.00,
	status			ENUM('AC', 'BA') DEFAULT 'AC',
	observations	TEXT NULL,
	created_at 		TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 	updated_at 		TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- Archivo: 20230623004-create_table_images.sql
CREATE TABLE images (
    id			BIGINT	PRIMARY KEY,
    product_id	BIGINT NOT NULL,
	filename	VARCHAR(50) NULL,
	type		CHAR(5) NULL,
	description	VARCHAR(50) NULL,
	base64		BLOB NOT NULL,
	created_at 	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 	updated_at 	TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
 

-- Archivo: 20230623005-create_table_sizes.sql
CREATE TABLE sizes (
    id				INTEGER	PRIMARY KEY,
    description 	VARCHAR(100) NOT NULL,
	type			ENUM('text', 'number') DEFAULT 'number',
	maximum			NUMERIC(18, 2) NULL,
	minimum			NUMERIC(18, 2) NULL,
	suffix			CHAR(10) NULL,
	prefix			CHAR(10) NULL,
	observations	TEXT NULL,
	created_at 		TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 	updated_at 		TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- Archivo: 20230623006-create_table_products_images.sql
CREATE TABLE products_images (
    product_id	BIGINT NOT NULL,
	image_id	BIGINT NOT NULL,
	
	created_at 	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 	updated_at 	TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 
  	PRIMARY KEY (product_id, image_id),
	FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
	FOREIGN KEY (image_id) REFERENCES images(id) ON DELETE CASCADE
);
 

-- Archivo: 20230623007-create_table_products_categories.sql
CREATE TABLE products_categories (
    product_id	BIGINT NOT NULL,
	category_id	INTEGER NOT NULL,
	
	created_at 	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 	updated_at 	TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 
  	PRIMARY KEY (product_id, category_id),
	FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
	FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);
 

-- Archivo: 20230623007-create_table_products_sizes.sql
CREATE TABLE products_sizes (
    product_id	BIGINT NOT NULL,
	size_id	INTEGER NOT NULL,
	
	value	VARCHAR(50) NOT NULL,

	created_at 	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 	updated_at 	TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 
  	PRIMARY KEY (product_id, size_id),
	FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
	FOREIGN KEY (size_id) REFERENCES sizes(id) ON DELETE CASCADE
);
 