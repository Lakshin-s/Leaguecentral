from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Home page
@app.route('/')
def home():
    return render_template('index.html')

# Standings page
@app.route('/standings')
def standings():
    return render_template('standings.html')

# Marketplace page
@app.route('/marketplace')
def marketplace():
    return render_template('marketplace.html')

# News page
@app.route('/news')
def news():
    return render_template('news.html')

# Login page
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        # For now just a dummy check
        if username == "admin" and password == "1234":
            return redirect(url_for('home'))
        else:
            return render_template('login.html', error="Invalid credentials")
    return render_template('login.html')

# Run Flask app
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
