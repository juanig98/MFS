CREATE TABLE products_categories (
    product_id	BIGINT NOT NULL,
	category_id	INTEGER NOT NULL,
	
	created_at 	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 	updated_at 	TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 
  	PRIMARY KEY (product_id, category_id),
	FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
	FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);
 