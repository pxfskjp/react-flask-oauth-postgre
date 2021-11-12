# GoogleLogin
Learning using Login with Google using Google SDK, React, and Python Flask. Built based on [Google's  documentation](https://developers.google.com/identity/sign-in/web/backend-auth)

# Frontend
The react Frontend uses the GoogleLogin component to handle logging in and requesting an OAuth token. 

# Backend
The python flask backend accepts a POST from the frontend with the token and verifies it using Google's SDK. If it's valid, it creates a session cookie containing the user email. Then when the user visits another endpoint `/authorized_endpoint`, it will return the user's email if he or she has a valid session. If not, it returns not found.