from flask import Flask, render_template,flash,request,redirect,url_for

app = Flask(__name__)


@app.route('/')
def main():
    return render_template('index.html')  # Ensure index.html exists in the templates folder


@app.route('/select')
def select():
    return render_template('select.html')

@app.route('/create')
def create():
    return render_template('create.html')

@app.route('/code', methods=['GET', 'POST'])
def code():
    if request.method == 'POST':
        entered_code = request.form.get('code')
        if entered_code == '00000':
            return redirect(url_for('switch')) 
        else:
            return render_template('code.html', error=True)  # Show error

    return render_template('code.html', error=False)

@app.route('/switch')
def switch():
    return render_template('switch.html')  

@app.route('/selectquiz')
def selectquiz():
    return render_template('selectquiz.html')  # Create this template

@app.route('/math')
def math():
    return render_template('math.html')

@app.route('/gk')
def gk():
    return render_template('gk.html')

@app.route('/english')
def english():
    return render_template('english.html')

@app.route('/science')
def science():
    return render_template('science.html')


@app.route('/score')
def score():
    return render_template('score.html')



if __name__ == '__main__':
    app.run(debug=True)
