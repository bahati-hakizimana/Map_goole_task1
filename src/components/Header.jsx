import React, { useEffect, useState } from "react";
import { BiMenu, BiPhoneCall } from "react-icons/bi";
import { FaCaretDown } from "react-icons/fa";
// import ourlogo from '../../assets/ourlogo.png'
const Header = () => {
    // Check the local storage or user's preference for the initial theme
    const element = document.documentElement;
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") ? localStorage.getItem("theme") : "system",
    );

    function onWindowMatch() {
        if (
            localStorage.theme === "dark" ||
            (!("theme" in localStorage) && darkQuery?.matches)
        ) {
            element.classList.add("dark");
        } else {
            element.classList.remove("dark");
        }
    }
    onWindowMatch();

    useEffect(() => {
        switch (theme) {
            case "dark":
                {
                    element.classList.add("dark");
                    localStorage.setItem("theme", "dark");
                    console.log("dark theme");
                }
                break;
            case "light":
                {
                    element.classList.remove("dark");
                    localStorage.setItem("theme", "light");
                    console.log("light theme");
                }
                break;
            default: {
                localStorage.removeItem("theme");
                onWindowMatch();
                console.log("system theme");
            }
        }
    }, [theme]);

    darkQuery.addEventListener("change", onWindowMatch);

    // Function to handle theme change
    const handleThemeChange = (selectedTheme) => {
        if (selectedTheme === "dark" || selectedTheme === "light") {
            setTheme(selectedTheme);
        }
    };
    return (
        <header
            data-aos="fade"
            data-aos-duration="300"
            className="relative z-20 border-b-[1px]  border-primary/50 bg-green-600 text-white shadow-lg"
        >
            <nav className="container  flex h-[70px] items-center justify-between py-2 ">
                <div className="text-2xl text-white md:text-3xl ">
                    <a href="/#home" className="">
                        Sta
            <span className="inline-block font-bold text-primary dark:text-black">
              rtup
            </span>
                        
                    </a>
                </div>
                <div className="hidden md:block">
                    <ul className="flex items-center gap-10 ">
                        <li className="cursor pointer group relative hover:text-gray-400">
                            <a href="/#home" className="flex h-[72px] items-center gap-[2px]">
                                Home
                                
                            </a>
                           
                        </li>
                        <li className="cursor pointer group hover:text-gray-400">
                            <a href="/#home" className="flex h-[72px] items-center gap-[2px]">
                                Services
                                
                            </a>
                          
                        </li>
                        <li className="cursor pointer hover:text-gray-400">
                            <a href="/#contact">Contact</a>
                        </li>
                       

                        
                    </ul>
                </div>
                <div className="block md:hidden ">
                    <BiMenu className="text-2xl" />
                </div>
            </nav>
        </header>
    );
}

export default Header;

