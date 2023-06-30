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
