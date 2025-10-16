import sqlite3
import hashlib

class DatabaseManager:
    def __init__(self, db_path='users.db'):
        self.db_path = db_path
    
    def connect(self):
        return sqlite3.connect(self.db_path)
    
    def verify_login(self, email, password):
        conn = self.connect()
        cursor = conn.cursor()
        cursor.execute("SELECT password FROM users WHERE email = ?", (email,))
        result = cursor.fetchone()
        conn.close()
        
        if result:
            stored_password = result[0]
            return stored_password == password
        return False