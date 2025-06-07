import axios from "@/configs/axios";
import endpoints from "@/constants/endpoints";
import type { registerValues } from "@/types/schemas";

export const createUser = async (data: registerValues) => {
    const response = await axios.post(endpoints["users"], data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};
