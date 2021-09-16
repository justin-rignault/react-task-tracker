import Button from './Button'

const Header = () => {
    const btnClick = e => {
        console.log(e)
    }
    return (
        <header className="header">
            <h1>Task tracker</h1>
            <Button color="green" text="Add" onClick={btnClick} />
        </header>
    )
}

export default Header