# Demo 

Live version with demo data can be viewed at [Heroku](https://radiant-fjord-72608.herokuapp.com/)  
### Demo accounts :
test1@moviedb.com  
123123  
test2@moviedb.com  
123123  

# Local Build
## Server side (Rails)
### Build
Clone repo and run in project directory 
```
$ bundle install
$ rake db:create
$ rake db:migrate
$ rake db:seed
```
### Run
```
$ bin/rails s -p 3001
```
### Test
```
rspec spec 
```
## Client side(react)
### Build
```
$ cd client
$ npm install
```
### Run
```
$ npm start 
```
### Test
For the end to end tests to work make sure the DB is populated with `rake db:seed`, and both backend and fronted are running, easiest way is to run `foreman start -f Procfile.dev` 
from project root directory. 
Or run `bin/rails s -p 3001` from root directory
and `npm start` from client directory in separate terminals.

```
$ npm run cypress
``` 
### Deployment to heroku

With heroku-cli installed run following commands
```
$ heroku create
$ heroku buildpacks:add heroku/nodejs --index 1
$ git push heroku master
$ heroku run rake db:migrate
$ heroku run rake db:seed
```


# Assignment for Applicants

MovieDB (like IMBD)

- Movie: Title, Text, Ratings, Category
- Movie should have all REST actions
- C(R)UD of own movies only for logged-in users
- Rating (5 star system) of movies only for logged-in users
- Home page = listing of all movies including full text search and facets of categories and ratings:
  - Example for categories:
    - Action (5)
    - Drama (2)
    - …
  - Example for ratings:
    - 5 Stars (4)
    - 4 Stars (9)
    - …
  - Clicking on a facet filters the movie list accordingly without a page reload
  - In the movie list, I want to be able to rate the movie without a page reload.
  - Next to it should be the buttons for C(R)UD actions if it’s the user’s movie
  - Pagination for more than 10 items.
  - The stars should use graphics (not bitmap)
- For creating the application, I would like to see the use of technologies Rails, Twitter Bootstrap, Unsemantic, React
- Testing of the application is a must
- Deployment on Heroku, code in Github



