# DoggyPile

DoggyPile is a pet social app made for dog owners that allows users to set up playdates and check in at local parks. Our interactive map will include features such as filtering dog friendly establishments, lost or found pets, and the ability to create markers.

## Table of Contents
* [Backend Setup](https://github.com/quebecplatoon/gp_doggy_pile_app#backend-setup)
* [Frontend Setup](https://github.com/quebecplatoon/gp_doggy_pile_app#frontend-setup)
* [Git Workflow](https://github.com/quebecplatoon/gp_doggy_pile_app#git-workflow)

## Getting Started: Installing The Project

### **Backend Setup**

1. Make sure to clone this repo into your local machine! (No need to fork)
```
$ git clone https://github.com/quebecplatoon/gp_doggy_pile_app.git
```

2. Create a virtual environment
```
$ python -m venv .venv
```

3. Activate the virtual environment
```
$ source .venv/bin/activate
```

4. Install requirements.txt
- #### Windows
```
$ pip install -r requirements.txt
```

- #### Linux
```
$ pip3 install -r requirements.txt
```
5. Create a .env file then generate a new SECRET_KEY for Django settings.py.
```
$ touch .env
$ python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'
```
- Note: You might need to run it with `python3` instead
- Insert this inside the .env file: `SECRET_KEY = <Paste secret key here>`

6. Create the database (Postgresql)
```
$ createdb group_proj_db
```
- If you get an error like this: `Is the server running locally and accepting connections on that socket?` Run this command:
```
$ sudo service postgresql start
```
7. Move into `Back-end` directory and migrate the models into your database.
```
$ python manage.py makemigrations
```
Or
```
$ python3 manage.py makemigrations
```
8. Run migrate command
```
$ python manage.py migrate
```
Or 
```
$ python3 manage.py migrate
```
9. Finally, start up the backend server to ensure it's set up successfully.
```
cd Back-end
$ python manage.py runserver
```
Or
```
$ python3 manage.py runserver
```

### **Frontend Setup**
1. Move into `frontend/doggy-pile` directory and install packages.
```
$ npm install
```
2. Start up the frontend server
```
$ npm start
```
## Git Workflow
### **Important note:** Make sure you are committing your changes on your own branch before merging onto the main branch!
1. Ensure you're in the main branch by checking with: `$ git branch -a`
2. Pull from the main branch with this command to get the most up to date version (unless you had just cloned the repo): `$ git pull origin main`
3. Create a new branch and name it after the feature you will be working on. Running the following command will switch you to the branch after specifying the name.
```
$ git checkout -b <new-branch>
```
#### (Example: landing page -> `$ git checkout -b landing`)
4. Start coding!
5. Run commit commands to **your** branch
```
$ git add .
$ git commit -m "Your message here"
$ git push origin <branch-name>
```
6. To avoid running into conflicts when creating a pull request, checkout into the local main branch and merge it with your custom branch:
```
$ git checkout main
$ git merge <branch-name>
```
7. Submit a pull request. GitHub will notify you if there are any conflicts you need to resolve within the files before being able to merge the changes.
- If there are any issues, run `$ git status` to pinpoint their location.

[Back to top](https://github.com/quebecplatoon/gp_doggy_pile_app#doggypile)