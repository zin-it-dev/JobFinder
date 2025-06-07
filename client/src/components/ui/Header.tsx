import React from "react";
import { Link } from "react-router";

const Header: React.FC = () => {
    const paths = [
        {
            title: "Home",
            path: "/",
        },
        {
            title: "Log In",
            path: "/login",
        },
        {
            title: "Register",
            path: "/register",
        },
    ];

    return (
        <header>
            <ul>
                {paths.map((item, idx) => (
                    <li key={idx}>
                        <Link to={item.path}>{item.title}</Link>
                    </li>
                ))}
            </ul>
        </header>
    );
};

export default Header;
