import './App.css'
import Navbar from './components/Navbar'
import New from './pages/New'
import Home from './pages/Home'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min'
import TodoDetails from './components/TodoDetails'
import NotFound from './components/NotFound'
import Completed from './pages/Completed'
import { useEffect, useState } from 'react'

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('http://localhost:7000/todos/');
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchTodos();
  }, []);

  return (
    <Router>
      <div>
      <Navbar />
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/new">
            <New />
          </Route>
          <Route path="/todos/:id">
            <TodoDetails />
          </Route>
          <Route path="/completed">
            <Completed todos={todos.filter((todo) => todo.completed)} />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
    </Router>
  )
}

export default App
//test