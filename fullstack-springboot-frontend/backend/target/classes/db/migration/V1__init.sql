CREATE TABLE category (
                          id INT AUTO_INCREMENT PRIMARY KEY,
                          name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE event (
                       id CHAR(36) PRIMARY KEY,
                       title VARCHAR(255) NOT NULL,
                       slug VARCHAR(255) NOT NULL UNIQUE,
                       description TEXT,
                       start_at DATETIME NOT NULL,
                       end_at DATETIME,
                       location_name VARCHAR(255),
                       address VARCHAR(255),
                       latitude DECIMAL(9,6),
                       longitude DECIMAL(9,6),
                       register_url VARCHAR(500),
                       is_featured BOOLEAN DEFAULT FALSE,
                       status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
                       created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                       updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE event_category (
                                event_id CHAR(36),
                                category_id INT,
                                PRIMARY KEY (event_id, category_id),
                                FOREIGN KEY (event_id) REFERENCES event(id) ON DELETE CASCADE,
                                FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE RESTRICT
);

CREATE TABLE media_asset (
                             id CHAR(36) PRIMARY KEY,
                             event_id CHAR(36) NOT NULL,
                             url VARCHAR(500) NOT NULL,
                             type ENUM('image','video') NOT NULL,
                             position INT DEFAULT 0,
                             created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                             FOREIGN KEY (event_id) REFERENCES event(id) ON DELETE CASCADE
);
