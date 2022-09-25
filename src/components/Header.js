import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router-dom'

const Header = ({ text, newTask, showAdd }) => {
    const location = useLocation()

    return (
        <header className="header" >
            <h1>{text}</h1>
            {location.pathname === '/' &&
                <Button
                    color={showAdd ? 'red' : 'green'}
                    text={showAdd ? 'Close' : 'Add'}
                    onClick={newTask} />
            }
        </header>
    )
}

Header.defaultProps = {
    text: 'Task Tracker'
}

Header.propTypes = {
    text: PropTypes.string.isRequired,
}

// const headingStyle ={
//     color: 'blue',
// }
export default Header
