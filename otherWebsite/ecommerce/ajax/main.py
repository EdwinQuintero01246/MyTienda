from flask import Flask
#from flask import render_template
#from flask import request
#from flask import make_response
#from flask import session
#from flask import flash

#from flask import url_for
#from flask import redirect

from flask_wtf import CsrfProtect
#import forms
import json
import time

app = Flask(__name__)
app.secret_key = 'my_secret_key'
csrf = CsrfProtect(app)

@app.route('/ajax-login', methods=['POST'])
def ajax_login():
    response = {'staus':200,'username': 100,'id':1}
    return json.dumps(response)