# certify-mean 
A mean stack web application where everyone can add certificates and get recognition from top MNC companies


Live View: http://ec2-3-141-165-196.us-east-2.compute.amazonaws.com/

### Features

- Create, edit and delete user accounts
- Authentication with username/password
- upload certification images and details
- Protected routes that can only be accessed by authenticated users
- Bootstrap CSS framework
- Mongoose for MongoDB interactions.


### Application Requirements
- [Node.js & NPM](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/)
- [Angular](https://angular.io/cli)

## Getting Started
##### Run the application locally
1. Clone or download this repo onto your machine.
2. Install [application requirements](#application-requirements) if not done so already.
3. In this we get two folders one is backend-server and certify
4. Now open each folders using the command ```cd backend-server``` and ```cd certify ```
5. now install dependencies in both terminals with the below command
```bash
> npm install
```
6. This command will install all the dependencies that are in package.json

7. To run backend open terminal in the backend-server enter the below command.
```bash
> node app.js
```
8. To run angular frontend open terminal in the certify folder and enter the below code.
```bash
> ng serve
```
9. This command will run the angular frontend in ```http://localhost:4200```


10. Done, the app should be looking like:
