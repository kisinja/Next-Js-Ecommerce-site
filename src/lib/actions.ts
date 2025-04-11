"use server"

import { wixClientServer } from "./wixClientServer";

export const updateUser = async (formData: FormData) => {
    const wixClient = await wixClientServer();

    const username = formData.get("username") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const id = formData.get("id") as string;

    try {
        const res = await wixClient.members.updateMember(id, {
            contact: {
                firstName: firstName || undefined,
                lastName: lastName || undefined,
                phones: [phone] || undefined,
            },
            loginEmail: email || undefined,
            profile: {
                nickname: username || undefined,
            }
        });

        console.log(res);
    } catch (error) {
        console.log(error);
    }
};