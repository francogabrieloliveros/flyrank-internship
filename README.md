# Auth - Login & Protect

## Backend AI Engineering - Week 4

## Auth & Login API

An API that tests authentication and authorization through Next.js and Supabase.

## Setup and Running

### Setup

```bash
# Clone the repository
git clone https://github.com/francogabrieloliveros/flyrank-internship.git
# Enter the project directory
cd flyrank-internship
# Checkout the desired branch
git checkout backend-ai-engineering/week4/auth-login-%26-protect
# Create an .env file
cp .env.example .env
```

After this, open the `.env` file and update the values as needed.

### Running

Make sure you have Docker installed on your machine.

```bash
# Run the api and database
docker compose up
```

The server starts on `http://localhost:3000`. Interactive docs are available at `http://localhost:3000/docs`.

## Endpoints

| Method | Path                   | Description                        | Body                                         | Success | Error(s) |
| ------ | ---------------------- | ---------------------------------- | -------------------------------------------- | ------- | -------- |
| POST   | `/auth/signup`         | Sign up a new user                 | `{ "email": string, "password": string }`    | 201     | 400, 401 |
| POST   | `/auth/login`          | Log in with email/password         | `{ "email": string, "password": string }`    | 200     | 400, 401 |
| POST   | `/auth/logout`         | Log out the current user           | — (requires `Authorization: Bearer <token>`) | 204     | 401      |
| GET    | `/protected/profile`   | Get authenticated user's profile   | — (requires `Authorization: Bearer <token>`) | 200     | 401      |
| GET    | `/protected/dashboard` | Get authenticated user's dashboard | — (requires `Authorization: Bearer <token>`) | 200     | 401      |
| GET    | `/public/info`         | Get public welcome info            | —                                            | 200     | —        |

## Swagger UI Screenshots

Try out the API endpoints interactively [here](http://localhost:3000/docs) after running the server.

**/auth/signup**

<img width="825" height="1005" alt="Image" src="https://github.com/user-attachments/assets/95ac4f16-ced0-43c4-a319-511710dff064" />

---

**/auth/login**

<img width="822" height="1002" alt="Image" src="https://github.com/user-attachments/assets/4122dc6c-d3aa-4766-99fa-62a3ca4eb591" />

---

**/public/info**

<img width="817" height="866" alt="Image" src="https://github.com/user-attachments/assets/9a4b6baa-ac26-47cb-af2b-2aab81754333" />

---

### The remaining routes require a bearer_token. Retrieve the token from login, click the lock icon, and paste the token.

<img width="855" height="299" alt="Image" src="https://github.com/user-attachments/assets/b07d2bd1-e4f7-43ce-96cd-4ee5a9dfcf37" />

**/protected/profile**

<img width="819" height="943" alt="Image" src="https://github.com/user-attachments/assets/dd8007ec-ad50-43db-a18b-f55a0a14d0d8" />

---

**/protected/dashboard**

<img width="826" height="937" alt="Image" src="https://github.com/user-attachments/assets/a59a3f43-acd8-4779-a44c-b2b62a665251" />

---

**/auth/logout**

<img width="819" height="881" alt="Image" src="https://github.com/user-attachments/assets/dad6a4cd-5a58-4b78-bc8c-e5cccce68db6" />
