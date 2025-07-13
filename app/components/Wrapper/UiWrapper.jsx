import Navbar from "../Navbar/Navbar"

const UiWrapper = ({children}) => {
    return (
        <>
        <main className="flex flex-row gap-10 px-30">
            <Navbar />
            {children}
        </main>
            
        </>
    )
}

export default UiWrapper