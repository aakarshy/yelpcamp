RESTful ROUTES

name      url    		  HTTP verb       desc
=================================================================
INDEX     /dogs     		GET   Displays a list of all dogs
NEW       /dogs/new 		GET   Displays form to make a new dog
CREATE    /dogs     		POST  Add new dog to DB 
SHOW      /dogs/:id 		GET   Shows info about one dog 
EDIT	  /dogs/:id/edit    GET	  Show edit form for one dog
UPDATE	  /dogs/:           PUT   Update a particular dog, then redirect somewhere
DESTROY	  /dogs/:id         DELETE Delete a particular dog, then redirect somewhere


#Restful Routing

REST - a mapping between HTTP routes and CRUD 

(CRUD: CREATE, READ, UPDATE and DESTROY)





