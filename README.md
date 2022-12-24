# Vixiv
An image hosting site built from a CS Web Dev class.

# Build/Run Instructions

## Build Instructions
### Backend
1. Change the directory to the api folder
2. `npm install` to install the dependences for the backend
3. **IMPORTANT** Edit the configuration for the database in `config.ts` inside application
```ts
DB_USER: "vixiv", // DB USERNAME
DB_PASS: "vixiv", // DB PASSWORD
DB_NAME: "vixiv", // DB NAME
```
4. `npm run builddb` to build the database

### Frontend
1. Change the directory to the ui folder
2. `npm install` to install dependencies for the frontend
3. `npm run build` to build the frontend to serve from the backend

## Run Instructions
1. Change the directory to the api folder
2. Then `npm start`