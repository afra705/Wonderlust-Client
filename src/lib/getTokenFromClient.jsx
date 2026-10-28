import { authClient } from "./auth-client";
export async function getTokenFromServer(){
         const {data} = await authClient.token()
         const token = data?.token

        return token;
}