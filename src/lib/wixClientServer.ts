import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { cookies } from "next/headers";
import { members } from "@wix/members";
import { orders } from "@wix/ecom";

export const wixClientServer = async () => {
    let refreshToken;
    try {
        const cookieStore = cookies();
        refreshToken = JSON.parse(cookieStore.get("refreshToken")?.value || "{}");
    } catch (error) {
        console.error("Error parsing refresh token:", error);
    }

    const wixClient = createClient({
        modules: {
            products,
            collections,
            members,
            orders,
        },
        auth: OAuthStrategy({
            clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
            tokens: {
                refreshToken, accessToken: { value: "", expiresAt: 0 },
            }
        }),
    });

    return wixClient;
};