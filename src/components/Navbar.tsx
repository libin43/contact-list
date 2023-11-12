import React, { useState } from 'react'

export const Navbar: React.FC = () => {
    const [toggle, setToggle] = useState(false)
    const handleToggle = ()=>{
        setToggle(!toggle)
        
    }
  return (
    <nav className="navbar bg-gray-800 text-white px-5">
    <div className="nav-container flex justify-between min-h-[10vh] px-0">
        <div onClick={handleToggle} className="toggle-container xl:hidden relative my-2 mx-2 w-20 bg-white flex  items-center rounded-md overflow-hidden">
            <div className="arrow-container w-16 h-10 flex mx-auto">
            <span className={`w-10 h-2 bg-blue-500 absolute rounded-full translate-y-0  ${toggle ? 'duration-700 delay-75 rotate-45  w-14 translate-y-4' : ''}`}></span>
            <span className={`w-16 h-2 bg-blue-500 rounded-full absolute translate-y-4  ${toggle ? 'duration-500 translate-x-96' : ''}`}></span>
            <span className={`w-10 h-2 bg-blue-500 absolute rounded-full translate-y-8  ${toggle ? 'duration-700 delay-75 -rotate-45 translate-y-4  w-14' : ''}`}></span>
            </div>
        </div>
        <div className="nav-left text-3xl my-auto">
            Logo
        </div>
        <div className={`nav-center xl:static absolute  xl:min-h-fit min-h-[90vh] ${toggle ? 'bg-gray-700 left-[0%] duration-300': 'left-[-100%]'}  top-[10%] xl:w-auto w-full my-auto`}>
            <ul className={`menu-container flex xl:flex-row flex-col gap-10 xl:p-0 py-5 ${toggle ? 'duration-1000 px-10': ''}  text-xl`}>
                <li className="menu-item">Home</li>
                <li className="menu-item">Personal</li>
                <li className="menu-item">Billing</li>
            </ul>
        </div>
        <div className="nav-right my-auto ">
            <ul className="personal-container flex gap-5 text-xl">
                {/* <li className="menu-item">Notification</li> */}
                <li className="menu-item">Profile</li>
                <li className="menu-item">Logout</li>
            </ul>
        </div>
    </div>
</nav>
  )
}
