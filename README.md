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
1. Install [application requirements](#application-requirements) if not done so already.
1. In this we get two folders one is backend-server and certify
1. Now open each folders using the command ```cd backend-server``` and ```cd certify ```
1. now install dependencies in both terminals with the below command
1. ```bash
1. > npm install
```
1. If you don't have an account, [create a free one here](https://cloud.ibm.com).
1. Login to your account via the command line: `ibmcloud login`
1. Target your account ORG and SPACE  `ibmcloud target --cf`
1. Create the instance of IBM Cloud Databases for MongoDB on IBM Cloud:  `ibmcloud cf create-service databases-for-mongodb standard mean-starter-mongodb`
1. Rename `.env.example` file to `.env` and run `ibmcloud cf service-key mean-starter-mongodb "Service credentials-1"` for MONGODB_URL and CERTIFICATE_BASE64. Choose your own SESSION_SECRET.
1. Run `node server.js` to start your app
1. Open a browser to the link provided in the terminal prompt to view your app
