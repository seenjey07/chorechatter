# ChoreChatter

ChoreChatter is a simple and interactive chat and to-do application designed to help users manage their daily tasks in a fun and engaging way. The app combines a mock chatbot feature with a to-do list to create a lightweight productivity tool.

## Features

### Chatbox with Mock AI Integration

- Users can type messages into the chatbox, and the mock AI will respond with predefined replies.
- If the user includes keywords such as **"add task"** or **"new task"** in their message, the mock AI will automatically extract the task from the message and add it to the to-do list.
  - For example:
    - User: _"Add task: Buy groceries"_
    - Mock AI: _"Got it! I’ve added 'Buy groceries' to your to-do list."_

### To-Do List Management

- Users can manually add tasks to the to-do list using the input field in the to-do area.
- Tasks are displayed on the right side of the screen for easy access.

### Clean and Simple UI

- The app features a visually appealing and minimalist design with:
  - A chat area labeled **"Let's Chat!"** for user-Mock AI interaction.
  - A to-do area where users can view, add, and manage tasks.
- Light and playful color scheme to make task management less stressful.

## How It Works

1. **Chat Functionality**: Users can interact with the mock chatbot by typing messages in the chatbox.
2. **Task Detection**: When users mention adding tasks in the chat (using keywords), the mock AI detects the task and updates the to-do list automatically.
3. **Manual Input**: Users can add tasks manually by typing in the to-do input field and clicking the "Add Task" button.

## Technologies Used

- **Frontend**: ReactJS and TypeScript
- **Styling**: Plain Vanilla CSS
- **Mock AI**: Predefined logic-based response system for recognizing keywords
- **Development Tools**: Vite for building the application

## Installation

To set up the application on your local machine:

1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```
2. Navigate to the project folder:
   ```bash
   cd chorechatter
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and go to `http://localhost:5173` to view the app.

## Usage

1. Launch the app on your browser.
2. Start chatting with the mock AI to add tasks or simply type "add task" or "new task" in your chat message followed by the task description.
3. Alternatively, use the manual input field in the to-do section to add tasks directly.
4. Watch your tasks get organized in the to-do list!

## Future Enhancements

- Task editing functionality.
- Persistent data storage using local storage or a database.
- Enhanced mock AI responses for a more interactive experience.
- Additional themes for customizable UI.

## License

This project is licensed under the MIT License. Feel free to use and modify it as per your needs.
