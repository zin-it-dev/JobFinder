import React from "react";
import { Route, Routes } from "react-router";

import RootLayout from "@/components/layouts/RootLayout";
import AuthLayout from "@/components/layouts/AuthLayout";
import { publicRoutes } from "@/routes/routes";

const App: React.FC = () => {
    return (
        <Routes>
            {publicRoutes.map((route, idx) => {
                const Wrapper = route.layout === null ? AuthLayout : RootLayout;
                return (
                    <Route element={<Wrapper />}>
                        <Route
                            key={idx}
                            path={route.path}
                            element={<route.component />}
                        />
                    </Route>
                );
            })}
        </Routes>
    );
};

export default App;
