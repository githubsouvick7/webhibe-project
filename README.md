Kanban Board
A simple and interactive Kanban board built using React to manage tasks. This application allows users to add, edit, delete, and drag-and-drop tasks between different columns like "Pending", "In Progress", and "Done". The tasks are saved to localStorage for persistence.

Features
Add, edit, and delete tasks.
Drag-and-drop tasks between columns.
Track the count of tasks in each column.
Automatically saves tasks to localStorage.
Mobile and desktop friendly.
Requirements
React 18 or higher
Tailwind CSS
lucide-react (for icons)
Custom UI components like Button, Input, Textarea, Card, Badge, etc.
Installation
Clone this repository:

bash
Copy code
git clone https://github.com/your-repo/kanban-board.git
cd kanban-board
Install dependencies:

bash
Copy code
npm install
Start the development server:

bash
Copy code
npm run dev
Open the app in your browser:

bash
Copy code
http://localhost:3000
File Structure
KanbanBoard Component: The main component for rendering the board, tasks, and managing drag-and-drop.
Custom UI Components: Buttons, Inputs, and Cards are sourced from a custom UI library.
State Management: Uses React's useState and useEffect for handling task states and localStorage persistence.
Code Explanation
State Management
tasks: Stores the tasks categorized under pending, inProgress, and done.
newTask: Tracks the input for a new task.
editingTask: Tracks the task being edited.
draggedTask: Stores the task being dragged for drag-and-drop functionality.
Effects
useEffect: Loads tasks from localStorage on component mount and saves tasks to localStorage whenever the tasks state changes.
Functions
addTask: Adds a new task to the "pending" column.
deleteTask: Deletes a task from a specific column.
startEditing: Sets the task to be edited.
saveEdit: Saves the changes made to an edited task.
handleDragStart: Prepares the task for dragging.
handleDragOver: Prevents the default behavior to enable dropping.
handleDrop: Handles the drop of a dragged task into a column.
UI Components
Tasks are rendered using a Card component. When editing, a Textarea is used to modify the task.
Buttons for adding tasks and performing actions like editing and deleting.
Badges display the count of tasks in each column and indicate the task status.
Drag-and-Drop
Tasks can be dragged from one column to another. This is handled by tracking the draggedTask and updating the columns' task lists accordingly.
Example Usage
jsx
Copy code
<KanbanBoard />
This component renders a full Kanban board with three columns: "Pending", "In Progress", and "Done". Each task can be dragged between columns, edited, or deleted.

Customizing the Kanban Board
Column Colors: The color of each column is set based on the task category (pending, inProgress, done). You can customize this by modifying the getColumnColor function.
Task Content: The content of each task can be modified by updating the task text in the edit mode.
License
This project is licensed under the MIT License.
