import { useState } from "react";

export default function EditTodoForm({ todo, onUpdate, onCancel }) { //The component takes three props: todo, onUpdate, and onCancel, onUpdate and onCancel props are likely callbacks that handle updating the todo item and canceling the edit operation, respectively.
    const [editedTodo, setEditedTodo] = useState({ //editedTodo is the state then setEditedTodo is to update its value
        title: todo.title,
        priority: todo.priority,
        duedate: todo.duedate,
        description: todo.description, //This suggests that the component is designed to edit a todo item, and the initial state is set to the values of the todo item passed as a prop.
      });

      const handleUpdate = () => {
        fetch(`http://localhost:7000/todos/${todo.id}`, {
        method: 'PUT', //use PUT to update or create a resource on the server
        headers: {
            'Content-Type': 'application/json', //The request includes a header specifying that the content type of the request body is JSON.

        },
        body: JSON.stringify(editedTodo), //The JSON.stringify(editedTodo) converts the editedTodo object into a JSON string(like in data/db.json), which is then sent as the request body
        }).then((response) => {
            if (!response.ok) {
            throw new Error('Failed to update todo');
            }
            return response.json(); //checks if the response status is okay (status code 200-299). If not, it throws an error. If the response is okay, it proceeds to parse the JSON response using response.json().
        }).then((updatedTodo) => {
            onUpdate(updatedTodo); //calls the onUpdate prop, passing the updated todo item as an argument. This suggests that onUpdate is a callback function provided by the parent component to handle the update locally.
            history.go(-1) 
        }).catch((error) => {
            console.error(error.message);
        })
      };

    return(
        <div className="m-4">
            <h2 className="font-bold text-lg">Update Todo</h2>

            <div className="w-auto border border-gray-300 rounded-full my-4"></div>

            <div className="flex flex-col space-y-4">
                <div className="flex flex-col space-y-1">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        value={editedTodo.title} // sets the current value of the input field to the title property of the editedTodo object. This means that the input field will display the value of editedTodo.title.
                        onChange={(e) => setEditedTodo({ ...editedTodo, title: e.target.value })} //function takes an event object e as its argument, and it uses setEditedTodo to update the state. It creates a new object by spreading the properties of the current editedTodo and then overwrites the title property with the new value from e.target.value. The spread operator (...) is used to achieve this by creating a new object with the existing properties and updating the title property with the new value.
                        className="border border-gray-200 rounded-md px-3.5 py-2"
                    />
                </div>

                <div className="flex flex-col space-y-1">
                    <label htmlFor="priority">Priority</label>
                    <select 
                        name="priority" 
                        id="priority"
                        required
                        value={editedTodo.priority}
                        onChange={(e) => setEditedTodo({ ...editedTodo, priority: e.target.value })}
                        defaultValue={'DEFAULT'}
                        className="border border-gray-200 rounded-md px-3.5 py-2">

                        <option value="DEFAULT" disabled defaultValue>Select todo priority</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>

                <div className="flex flex-col space-y-1">
                    <label htmlFor="duedate">Due Date</label>
                    <input 
                        type="date"
                        id="duedate"
                        name="duedate" //placeholder gimana?
                        required
                        value={editedTodo.duedate}
                        onChange={(e) => setEditedTodo({ ...editedTodo, duedate: e.target.value })}
                        className="border border-gray-200 rounded-md px-3.5 py-2" />
                </div>

                <div className="flex flex-col space-y-1">
                    <label htmlFor="description">Description</label>
                    <textarea 
                        name="description" 
                        id="description" 
                        required
                        value={editedTodo.description}
                        onChange={(e) => setEditedTodo({ ...editedTodo, description: e.target.value })}
                        cols="30" 
                        rows="3"
                        placeholder="Type todo description here."
                        className="border border-gray-200 rounded-md px-3.5 py-2"></textarea>
                </div>
            </div>

            <div className="space-x-2">
                <button onClick={handleUpdate} className="bg-black text-white rounded-md py-1 px-4 mt-4">Update</button>
                <button onClick={onCancel} className="border border-red-500 text-red-500 rounded-md py-1 px-4 mt-4">Cancel</button>
            </div>

        </div>
        
    )
}