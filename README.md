# DoggyPile

DoggyPile is a pet social app made for dog owners that allows users to set up playdates and check in at local parks. Our interactive map will include features such as filtering dog friendly establishments, lost or found pets, and the ability to create markers. 

## Getting Started

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

5. Create the database (Postgresql)
```
$ createdb group_proj_db
```
- If you get an error like this: `Is the server running locally and accepting connections on that socket?` Run this command:
```
$ sudo service postgresql start
```
6. Move into `Back-end` directory and migrate the models into your database.
```
$ python manage.py makemigrations
```
Or
```
$ python3 manage.py makemigrations
```
7. Run migrate command
```
$ python manage.py migrate
```
Or 
```
$ python3 manage.py migrate
```
8. Finally, start up the backend server to ensure it's set up successfully.
```
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
## Group Collaboration
### **Important note:** Make sure you are committing your changes on your own branch before merging onto the main branch!
1. Ensure you're in the main branch by checking with: `$ git branch -a`
2. Pull from the main branch with this command: `$ git pull origin main`
3. Create a new branch and name it after the feature you will be working on:
```
$ git branch <new-branch>
```
#### (Example: landing page -> `$ git branch landing`)
4. Move into the branch you created
```
$ git checkout <branch-name>
```
5. Start coding!
6. Run commit commands to **your** branch
```
$ git add .
$ git commit -m "Your message here"
$ git push origin <branch-name>
```
7. To avoid running into conflicts when creating a pull request, checkout into the local main branch and run:
```
git merge <branch-name>
```
8. Submit a pull request. GitHub will notify you if there are any conflicts you need to resolve within the files before being able to merge the changes.
- If there are any issues, run `$ git status` to pinpoint their location.