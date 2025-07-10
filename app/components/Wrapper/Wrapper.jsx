import Navbar from "../Navbar/Navbar"

const Wrapper = ({children}) => {
    return (
        <>
        <section className="flex flex-row gap-10">
            <Navbar />
            {children}
        </section>
            
        </>
    )
}

export default Wrapper