import { useUser } from "@clerk/nextjs";
export default async function UseUser() {
    const user=await useUser()
    return user.user
}