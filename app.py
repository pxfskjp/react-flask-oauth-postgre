import json
from logging import log

from flask import Flask, request, session
from flask_cors import CORS, cross_origin

from google.oauth2 import id_token
from google.auth.transport import requests

import string
import random

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# TODO: Replace secret key in an actual prod environment (See this article)
# https://blog.paradoxis.nl/defeating-flasks-session-management-65706ba9d3ce
# In a nutshell, hackers can use a rainbow table against your session to find out the secret key and parrot your app.
app.secret_key = f'INSECURE_DEV_SECRET_KEY_REPLACE_STATICALLY_IN_PROD_'.join(random.choices(string.ascii_uppercase +
                                                                                            string.digits, k=10))

# Replace with your client ID later.
CLIENT_ID = '757547404515-2n22h5rprveqe2f6ji46c2b6iiii1i63.apps.googleusercontent.com'


@app.route('/api/authenticated_endpoint', methods=['POST'])
@cross_origin()
def authenticated_endpoint():
    request_data = request.get_json()
    token = request_data['token']
    res = {}
    if 'user' in session:
        user = session['user']
        if token == user:
            res = {
                'email': user
            }
        else:
            res = {
                'error': 'token is invalid!'
            }
    json_res = json.dumps(res)
    return json_res


# Enable CORS so frontend (localhost:3000) can communicate with backend (localhost:5000)
@app.route('/api/auth', methods=['POST'])
@cross_origin()
def google_sign_in():
    request_data = request.get_json()
    token = request_data['token']
    session_user = ""
    res = {}
    try:
            # Specify the CLIENT_ID of the app that accesses the backend:
        id_info = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)

        # Create the session
        session_user = id_info['email']
        session["user"] = id_info['email']
        res = {
            "token": session_user
        }
    except ValueError as e:
        res = {
            "error": e
        }
        # Invalid token
        pass

    # convert into JSON:
    json_res = json.dumps(res)
    return json_res


if __name__ == '__main__':
    app.run()
