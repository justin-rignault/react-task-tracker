import Button from './Button'

const Header = ({ openAddForm, showAddTask }) => {
    
    return (
        <header className="header">
            <h1>Task tracker</h1>
            <Button color={showAddTask ? 'red' : 'green'} text={showAddTask ? 'Close' : 'Add'} onClick={openAddForm} />
        </header>
    )
}

export default Header