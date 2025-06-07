import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import {
    useForm,
    type FieldError,
    type Path,
    type SubmitHandler,
    type UseFormRegister,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type registerValues } from "@/types/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "@/services/auth.service";

type Inputs = {
    name: Path<registerValues>;
    register: UseFormRegister<registerValues>;
    label: string;
    type?: string;
    placeholder?: string;
    errors?: FieldError;
    touched?: boolean;
};

const Input: React.FC<Inputs> = ({
    label,
    name,
    register,
    type = "text",
    placeholder,
    errors,
    touched,
}: Inputs) => {
    return (
        <Form.Group as={Col} controlId={`form-control-${name}`}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={type}
                placeholder={placeholder}
                {...register(name)}
                isValid={touched && !errors}
                isInvalid={!!errors}
            />
            <Form.Control.Feedback type={errors ? "invalid" : "valid"}>
                {errors?.message || "Looks good!"}
            </Form.Control.Feedback>
        </Form.Group>
    );
};

const Register: React.FC = () => {
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields },
    } = useForm<registerValues>({
        mode: "onTouched",
        resolver: zodResolver(registerSchema),
    });

    const mutation = useMutation({
        mutationFn: (data: registerValues) => createUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["register"] });
        },
        onError: (error: any) => {
            console.error(error.response?.data || error.message);
        },
    });

    const onSubmit: SubmitHandler<registerValues> = async (data) => {
        const formData = new FormData();

        formData.append("username", data.username);
        formData.append("email", data.email);
        formData.append("firstName", data.firstName);
        formData.append("lastName", data.lastName);
        formData.append("password", data.password);

        if (data.avatar && data.avatar[0]) {
            formData.append("avatar", data.avatar[0]);
        }

        mutation.mutate(formData as any);
    };

    return (
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Row className="mb-3">
                <Input
                    label="Username"
                    name="username"
                    register={register}
                    errors={errors.username}
                    touched={!!touchedFields.username}
                />
                <Input
                    label="Email"
                    name="email"
                    register={register}
                    errors={errors.email}
                    touched={!!touchedFields.email}
                />
            </Row>

            <Row className="mb-3">
                <Input
                    label="First Name"
                    name="firstName"
                    register={register}
                    errors={errors.firstName}
                    touched={!!touchedFields.firstName}
                />

                <Input
                    label="Last Name"
                    name="lastName"
                    register={register}
                    errors={errors.lastName}
                    touched={!!touchedFields.lastName}
                />
            </Row>

            <Row className="mb-3">
                <Input
                    label="Password"
                    name="password"
                    register={register}
                    errors={errors.password}
                    touched={!!touchedFields.password}
                />

                <Input
                    label="Confirm password"
                    name="confirmPassword"
                    register={register}
                    errors={errors.confirmPassword}
                    touched={!!touchedFields.confirmPassword}
                />
            </Row>

            <Input
                label="Avatar"
                name="avatar"
                type="file"
                register={register}
                touched={!!touchedFields.avatar}
            />

            <Button
                variant="primary"
                type="submit"
                disabled={mutation.isPending}
            >
                {mutation.isPending ? "Registering..." : "Register"}
            </Button>
        </Form>
    );
};

export default Register;
