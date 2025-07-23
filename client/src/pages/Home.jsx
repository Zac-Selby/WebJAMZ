import { Link, Outlet } from 'react-router-dom';
import webjamzLogo from '../assets/WebJAMZ Logo.png';
import taskarooLogo from '../assets/Taskaroo Logo.png';

export default function Home() {
  return (
    <>
        <header class="hero">
            <img src={taskarooLogo} alt="Taskaroo" width={140} />
            <p>Your personal task & habit tracker to boost your productivity.</p>
            <button class="primary">Get Started</button>
        </header>
    </>
  )
}