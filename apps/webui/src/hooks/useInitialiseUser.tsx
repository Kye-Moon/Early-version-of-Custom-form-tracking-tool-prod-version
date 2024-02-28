import {useMutation} from "@apollo/client";
import {useAuth} from "@clerk/clerk-react";
import {useRecoilState} from "recoil";
import {userInitialisedState} from "@/State/state";
import {initialiseUserMutation} from "@/Services/userService";


export function useInitialiseUser() {
    const {userId} = useAuth();
    const [isUserInitialized, setIsUserInitialized] = useRecoilState(userInitialisedState);
    const [initUser] = useMutation(initialiseUserMutation)

    async function initialiseUser() {
        if (!userId) return null;
        await initUser()
        setIsUserInitialized(true)
    }

    return {isUserInitialized, initialiseUser}
}
