CREATE TABLE products_sizes (
    product_id	BIGINT NOT NULL,
	size_id	INTEGER NOT NULL,
	
	value		VARCHAR(50) NOT NULL,
	quantity 	INTEGER	DEFAULT 1,

	created_at 	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 	updated_at 	TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 
  	PRIMARY KEY (product_id, size_id),
	FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
	FOREIGN KEY (size_id) REFERENCES sizes(id) ON DELETE CASCADE
);
 