import { auth } from "@/lib/auth";
import { headers } from "next/headers";
export async function getTokenFromServer(){
     const jwtToken = await auth.api.getToken({
          headers: await headers(),
        });
        console.log(jwtToken);
    
        const token = jwtToken?.token
        return token;
}