# Foodies

Final team project, backend, technology stack: Node.js

**public**

## **GET .../recipes** - to get all recipes\

Can take next

- query:
  1. page -> String
  2. limit -> String
  3. category -> ObjectId (StringHex)
  4. area -> ObjectId (StringHex)
  5. ingredients -> ObjectId (StringHex)

## **GET .../recipes/:id** - to get recipe\

Take next:

- params:

1.  id -> ObjectId (StringHex)

## **GET .../popular/list** - to get list of popular recipes

Can take next:

- query:
  1. page -> String
  2. limit -> String

## **GET .../recipes/user/:id** - to get recipes of some user

Take next:

- params:

1.  id -> ObjectId (StringHex)

- query:
  1. page -> String
  2. limit -> String

**private**

## **GET .../recipes/personal/data** - to get user`s recipes after login

Can take next:

- query:
  1. page -> String
  2. limit -> String

## **POST .../recipes/personal** - to post new user`s recipe

Take next (in form-data form):

- body:

1. title -> String
2. category -> ObjectId (StringHex)
3. area -> ObjectId (StringHex)
4. instructions -> String
5. description -> String
6. time -> String
7. ingredients -> Array[ Obejct {id: ObjectId (StringHex), measure: String} ]
8. thumb -> file

## **DELETE .../recipes/:id** - to delete user`s recipe

Take next:

- params:

1.  id -> ObjectId (StringHex)
