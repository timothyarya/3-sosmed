import Link from "next/link";

const { defaultConfig } = require("next/dist/server/config-shared");

const Login = () => {
    

    return (
        <section className="flex h-dvh w-dvw justify-center items-center">
            <div className="flex flex-col bg-gray-200 dark:bg-gray-800 rounded-2xl p-10 justify-between items-start gap-7 w-100">
                <div className="flex flex-col w-full justify-center items-center text-center gap-1">
                    <h1 className="font-black text-4xl font-mono antialiased">Welcome</h1>
                    <p className="font-normal text-lg antialiased">Sign In to Your Account</p>
                </div>
                
                <form className="flex flex-col gap-5 w-full">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="" className="font-bold">Email</label>
                        <input type="email" className="w-full bg-gray-300 dark:bg-gray-700 rounded-lg border-black dark:border-white px-4 py-2 text-black dark:text-gray-300 placeholder:antialiased" placeholder="name@mail.com" required />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex flex-row justify-between w-full gap-10">
                            <label htmlFor="" className="font-bold">Password</label>
                            <Link href="/auth/register" className="font-bold dark:text-gray-400">Forgot Password?</Link>
                        </div>
                        
                        <input type="password" className="bg-gray-300 dark:bg-gray-700 rounded-lg border-black dark:border-white px-4 py-2 text-black dark:text-gray-300" required/>
                    </div>
                </form>
                <div className="flex flex-col justify-center items-start">
                    
                    <p>Don't Have an Account? <Link href="/auth/register" className="font-bold dark:text-gray-400">Sign Up</Link></p>
                </div>
                <div className="flex flex-col items-center justify-center w-full">
                    <button type="submit" className="bg-gray-400 dark:bg-gray-600 rounded-lg px-5 py-3 text-center font-bold text-gray-100 dark:text-gray-300 text-xl font-mono cursor-pointer transition ease-in-out duration-300 hover:scale-105">LOGIN</button>
                </div>
                
            </div>
        </section>
    );
}

export default Login;