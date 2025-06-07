import React from "react";
import { Outlet } from "react-router";

const AuthLayout: React.FC = () => {
    return (
        <>
            <header>Auth</header>
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default AuthLayout;
