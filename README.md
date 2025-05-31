# OpenAI Chatbot Backend

This is the backend part of the OpenAI Chatbot project. It is built using Node.js and Express, and it handles API calls to interact with the OpenAI API.

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd openai-chatbot/backend
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the `backend` directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

4. **Run the server:**
   ```
   npm start
   ```

The server will start on `http://localhost:5000`.

## API Endpoints

### POST /api/chat/send

- **Description:** Sends a message to the OpenAI API and receives a response.
- **Request Body:**
  ```json
  {
    "message": "Your message here"
  }
  ```
- **Response:**
  ```json
  {
    "response": "Response from OpenAI"
  }
  ```

## Folder Structure

- `src/app.js`: Entry point for the application.
- `src/routes/chat.js`: Defines chat-related API routes.
- `src/controllers/chatController.js`: Contains logic for interacting with the OpenAI API.

## License

This project is licensed under the MIT License.