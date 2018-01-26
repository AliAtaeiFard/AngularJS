
## Requirements

- Node and npm
- Mongodb
## Installation

- Restore mongo database "Testdb" from database folder.
- Install dependencies: `npm install`
- Start the server: `node server.js`

Run Postman for api testing or Run application in browser at http://localhost:3000
1. When user click on any courseid it will show that course detail.
2.  Delete record by click on delete icon.

Run Application using API's

1. Get All courses 
   http://localhost:3000/api/courses

2. Get Single courses by id , select get method in postman plugin of chrome
   http://localhost:3000/api/courses/5832df7c94dc59101000000d     //mongoid="5832df7c94dc59101000000d"

3. Delete Course using id, select delete method in postman plugin of chrome
   http://localhost:3000/api/courses/5832df7c94dc59101000000d



