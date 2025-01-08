CREATE TABLE stocks (
    id SERIAL PRIMARY KEY,
    stock_symbol VARCHAR(10) UNIQUE NOT NULL,
    stock_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);

CREATE TABLE user_stocks (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    stock_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (stock_id) REFERENCES stocks(id) ON DELETE CASCADE
);

CREATE TABLE stock_value_history (
    id SERIAL PRIMARY KEY,
    user_stock_id INTEGER,
    record_date TIMESTAMP,
    stock_value DECIMAL(15, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL,
    FOREIGN KEY (user_stock_id) REFERENCES user_stocks(id) ON DELETE CASCADE
);

CREATE TABLE user_stock_quantity_history (
    id SERIAL PRIMARY KEY,
    user_stock_id INTEGER,
    record_date TIMESTAMP,
    quantity INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL,
    FOREIGN KEY (user_stock_id) REFERENCES user_stocks(id) ON DELETE CASCADE
);

CREATE TABLE stock_price_history (
    id SERIAL PRIMARY KEY,
    stock_id INTEGER,
    record_date TIMESTAMP,
    open_price DECIMAL(15, 2),
    high_price DECIMAL(15, 2),
    low_price DECIMAL(15, 2),
    close_price DECIMAL(15, 2),
    volume BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL,
    FOREIGN KEY (stock_id) REFERENCES stocks(id) ON DELETE CASCADE,
    UNIQUE (stock_id, record_date)
);

CREATE TABLE stock_transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    stock_id INTEGER,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    transaction_type VARCHAR(10) CHECK (transaction_type IN ('buy', 'sell')),
    quantity INTEGER NOT NULL,
    price_per_share DECIMAL(15, 2) NOT NULL,
    total_value DECIMAL(15, 2) GENERATED ALWAYS AS (quantity * price_per_share) STORED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (stock_id) REFERENCES stocks(id) ON DELETE CASCADE
);