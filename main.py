from flask import Flask, render_template, url_for

app = Flask('master_mind')

@app.route('/')
def index():
    return render_template('gameboard.html')


def main():
    app.run(debug=True)


if __name__ == '__main__':
    main()