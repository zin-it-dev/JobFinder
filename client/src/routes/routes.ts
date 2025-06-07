import Home from "@/pages/Home";
import LogIn from "@/pages/LogIn";
import Register from "@/pages/Register";

type Path = {
    path: string;
    component: any;
    layout?: any;
};

const publicRoutes: Path[] = [
    {
        path: "/",
        component: Home,
    },
    {
        path: "/login",
        component: LogIn,
        layout: null,
    },
    {
        path: "/register",
        component: Register,
        layout: null,
    },
];

export { publicRoutes };
