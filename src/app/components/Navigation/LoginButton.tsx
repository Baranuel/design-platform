import { SignInButton } from "@clerk/nextjs"

export const LoginButton = () => {

    return (
        <SignInButton redirectUrl="http://localhost:3000/profile">
                <span className=" py-2 px-12 w-[250px] rounded-md  bg-purple text-white hover:cursor-pointer">
                    Log in
            </span>  
            </SignInButton>
    )

}