from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from flask_bcrypt import Bcrypt
from datetime import timedelta

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SECRET_KEY'] = 'your_secret_key'  
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=5) 

db = SQLAlchemy(app)
login_manager = LoginManager(app)
bcrypt = Bcrypt(app)



class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)  # Hashed password
    username = db.Column(db.String(50), nullable=True)  # Store username
    avatar = db.Column(db.String(200), nullable=True)  # Store avatar path
    score = db.Column(db.Integer, default=0)  # Store quiz score


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))



@app.route('/')
def index():
    return render_template('index.html')



@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            flash("Email already registered!", "info")
            return redirect(url_for('login'))

        # Hash the password before storing
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        new_user = User(email=email, password=hashed_password)

        db.session.add(new_user)
        db.session.commit()

        flash("Signup successful! Login!", "success")
        return redirect(url_for('login'))  

    return render_template('signup.html')



@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        user = User.query.filter_by(email=email).first()

        if user and bcrypt.check_password_hash(user.password, password):
            login_user(user, remember=True)
            session.permanent = True  # Keep user logged in for 5 days
            flash("Login successful!", "success")
            return redirect(url_for('select'))  
        else:
            flash("Invalid email or password!", "danger")

    return render_template('login.html')


@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash("You have been logged out.", "info")
    return redirect(url_for('login')) 



@app.route('/code', methods=['GET', 'POST'])
@login_required
def code():
    if request.method == 'POST':
        entered_code = request.form.get('code')
        if entered_code == '00000':
            return redirect(url_for('switch'))
        else:
            return render_template('code.html', error=True)  

    return render_template('code.html', error=False)



@app.route('/select')
@login_required
def select():
    return render_template('select.html')



@app.route('/selectquiz')
@login_required
def selectquiz():
    if not current_user.username or not current_user.avatar:
        flash("Please select your name and avatar first!", "warning")
        return redirect(url_for('switch'))
    return render_template('selectquiz.html')



@app.route('/math')
@login_required
def math():
    return render_template('math.html')

@app.route('/gk')
@login_required
def gk():
    return render_template('gk.html')

@app.route('/english')
@login_required
def english():
    return render_template('english.html')

@app.route('/science')
@login_required
def science():
    return render_template('science.html')

@app.route('/create')
@login_required
def create():
    return render_template('create.html')



@app.route('/switch', methods=['GET', 'POST'])
@login_required
def switch():
    if request.method == 'POST':
        username = request.form.get('username')
        avatar = request.form.get('avatar')

        if not username:
            flash("Please enter a name!", "danger")
            return redirect(url_for('switch'))

        
        current_user.username = username
        current_user.avatar = avatar
        db.session.commit()

        
        db.session.refresh(current_user)

        flash("Avatar and name saved!", "success")
        return redirect(url_for('selectquiz'))  

    return render_template('switch.html')



@app.route('/submit_quiz', methods=['POST'])
@login_required
def submit_quiz():
    score = request.json.get('score', 0)  
    current_user.score = score  
    db.session.commit()
    return jsonify({"message": "Score saved successfully!"})



@app.route('/score')
@login_required
def score():
    return render_template('score.html', username=current_user.username, avatar=current_user.avatar or "/static/images/default_avatar.png", score=current_user.score)


if __name__ == '__main__':
    try:
        with app.app_context():
            db.create_all()  
    except Exception as e:
        print(f"Database error: {e}")
    app.run(debug=True)
