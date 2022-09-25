import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
    const location = useLocation()

    return (
        <footer>
            <p>Copyright &copy; 2022</p>
            {location.pathname != '/about' &&
                <Link to="/about">About</Link>}
            &nbsp; &nbsp;
            {location.pathname != '/' &&
                <Link to="/">Home</Link>}
        </footer>
    )
}
export default Footer;