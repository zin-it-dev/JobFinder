import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

type Inputs = {
    username: string;
    email: string;
    password: string;
};

const LogIn: React.FC = () => {
    const { register, handleSubmit, watch } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

    console.log(watch(["email", "username"]));

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("email")} />

            <input {...register("username")} />

            <input type="submit" />
        </form>
    );
};

export default LogIn;
