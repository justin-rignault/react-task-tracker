import Button from './Button'
import { useLocation } from 'react-router-dom'

const Header = ({ openAddForm, showAddTask }) => {
    const location = useLocation()

    return (
        <header className="header">
            <h1>Task Tracker</h1>
            { (location.pathname === '/' || location.pathname.includes('/react-task-tracker')) && (
                <Button color={showAddTask ? 'red' : 'green'} text={showAddTask ? 'Close' : 'Add'} onClick={openAddForm} /> 
            )}
        </header>
    )
}

export default Header