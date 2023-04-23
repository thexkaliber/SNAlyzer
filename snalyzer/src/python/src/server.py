from flask import Flask
from flask_cors import CORS, cross_origin
from subprocess import call
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route("/resetlogs")
@cross_origin()
def resetLogs():
    file = open("C:/Users/user/snalyzer/snalyzer/public/scrapping_logs.log","w")
    file.write('')
    file.close()
    return "Logs Cleared!"

@app.route("/checkupdates")
@cross_origin()
def checkUpdates():
    call(['python','C:/Users/user/snalyzer/snalyzer/src/python/src/updater.py'])
    call(['python','C:/Users/user/snalyzer/snalyzer/src/python/src/search.py'])
    return "Checking for updates..."

if __name__ == "__main__":
    app.run(debug=True,port=5001)