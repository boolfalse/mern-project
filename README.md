
## MERN stack assessment




### About:

MongoDB + Express.js + React.js + Node.js assessment project.



### Setup Instructions:

- Clone the repository:
```bash
git clone git@github.com:boolfalse/mern-assessment.git && cd mern-assessment
```

- Install backend and frontend dependencies:
```bash
npm install --prefix backend && npm install --prefix frontend
```

- Setup Frontend environment variables as in `.env.example`.
  You can leave the default values as they are.
```bash
cp frontend/.env.example frontend/.env
```

- Setup Backend environment variables as in `backend/.env.example`.
  Make sure to have `FRONTEND_BASE_URL` the same as in the frontend `.env` file.
```bash
cp backend/.env.example backend/.env
```

- Optionally, run seeds to have some data in the database.
```bash
npm run seed --prefix backend
```

- Start the backend:
```bash
npm start --prefix backend
```

- Start the frontend:
```bash
npm run dev --prefix frontend
```

- Open the application in your browser (default port is in example):
```bash
http://localhost:5173
```


### Author:

- [Website](https://boolfalse.com)
- [LinkedIn](https://www.linkedin.com/in/boolfalse/)
