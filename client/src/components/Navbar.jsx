import { Link, Outlet } from 'react-router-dom';
import webjamzLogo from '../assets/WebJAMZ Logo.png';
import taskarooLogo from '../assets/Taskaroo Logo.png';

export default function Layout() {
  return (
    <>
        <nav class="navbar">
            <a href="#" class="logo-navbar">
                <img src={taskarooLogo} alt="Taskaroo" width={100} />
            </a>
            
            <div class="navbar-links">
                <a href="/dashboard" class="active">Dashboard</a>
                <a href="/tasks">Tasks</a>
                <a href="/habits">Habits</a>
                <a href="/logout">Logout</a>
            </div>
        </nav>

        {/*<header class="hero">
            <img src={taskarooLogo} alt="Taskaroo" width={140} />
            <p>Your personal task & habit tracker to boost your productivity.</p>
            <button class="primary">Get Started</button>
        </header>*/}
    </>
  )
}