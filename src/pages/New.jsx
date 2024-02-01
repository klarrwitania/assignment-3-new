import { useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function New() {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('Low');
    const [duedate, setDuedate] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault(); //prevents the default behavior of a form submission. 
        const todo = { title, priority, duedate, description }; //gather values for title, priority, duedate, and description from the component's state or some other variables. This assumes that these variables are defined elsewhere in the component.

        setIsLoading(true);

        fetch('http://localhost:7000/todos/', {
            method: 'POST', //creating a new resource on the server.
            headers: { "Content-Type": "application/json "},
            body: JSON.stringify(todo) //Specifies that the request body is in JSON format
        }).then(() => {
            setIsLoading(false);
            history.push('/');
        });
    }

    return (
        <div className="m-4">
            <h2 className="font-bold text-lg">Create a New Todo</h2>

            <div className="w-auto border border-gray-300 rounded-full my-4"></div>

            <form onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-4">
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="title">Title</label>
                        <input
                        id="title" 
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Todo title"
                        className="border border-gray-200 rounded-md px-3.5 py-2" />
                    </div>

                    <div className="flex flex-col space-y-1">
                        <label htmlFor="priority">Priority</label>
                        <select 
                        name="priority" 
                        id="priority"
                        required
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        defaultValue={'DEFAULT'}
                        className="border border-gray-200 rounded-md px-3.5 py-2">
                            <option value="DEFAULT" disabled selected hidden>Select todo priority</option>
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
                        value={duedate}
                        onChange={(e) => setDuedate(e.target.value)}
                        className="border border-gray-200 rounded-md px-3.5 py-2" />
                    </div>

                    <div className="flex flex-col space-y-1">
                        <label htmlFor="description">Description</label>
                        <textarea 
                        name="description" 
                        id="description" 
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        cols="30" 
                        rows="3"
                        placeholder="Type todo description here."
                        className="border border-gray-200 rounded-md px-3.5 py-2"></textarea>
                    </div>

                    <div></div>
                </div>

                { !isLoading && <button type="submit" className="bg-black text-white rounded-md py-1 px-4 mt-4">Add Todo</button> }
                { isLoading && <button type="submit" className="bg-black text-white rounded-md py-1 px-4 mt-4">Adding Todo...</button> }

            </form>
        </div>
    )
}