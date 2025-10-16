from flask import Flask, request, jsonify, render_template, redirect, url_for
from database_manager import DatabaseManager
from flask_cors import CORS
import os

app = Flask(__name__, static_folder='static', static_url_path='/static')
CORS(app)
db = DatabaseManager()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login')
def login_page():
    return render_template('login.html')

@app.route('/signup')
def signup_page():
    return render_template('signup.html')

@app.route('/forgotpass')
def forgotpass_page():
    return render_template('forgotpass.html')

@app.route('/verify_login', methods=['POST'])
def verify_login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    if db.verify_login(email, password):
        return jsonify({'success': True, 'message': 'Login successful'})
    else:
        return jsonify({'success': False, 'message': 'Invalid credentials'})

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

if __name__ == '__main__':
    app.run(debug=True, port=5000)