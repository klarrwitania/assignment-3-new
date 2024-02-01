import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [isMenuHidden, setMenuHidden] = useState(true);

    const toggleMenu = () => {
    setMenuHidden((prevState) => !prevState);
  };

    return (
        <nav className='m-4'>
            <div className='flex justify-between items-center'>
                <Link to="/" className="font-bold text-2xl hover:underline">Next Todo App</Link>

                <div className="px-4 cursor-pointer" id="burger" onClick={toggleMenu}>
                    <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </div>
            </div>

                <div className={`space-x-4 text-sm font-semibold ${isMenuHidden ? 'hidden' : ''}`} id="menu">
                    <Link to="/" className="px-4 flex justify-end">Home</Link>
                    <Link to="/new" className="px-4 flex justify-end">New</Link>
                    <Link to="/completed" className="px-4 flex justify-end">Completed</Link>
            </div>
        </nav>
    );
}