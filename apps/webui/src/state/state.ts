import {atom, selector} from "recoil";
import {jwtDecode} from "jwt-decode";

export interface UserInfo {
	sub: string;
	name: string;
	email: string;
	role: string;
	orgId: string;
}

const localStorageEffect = (key: string) => ({setSelf, onSet}: { setSelf: any, onSet: any }) => {
	const savedValue = localStorage.getItem(key)
	if (savedValue != null && savedValue !== "undefined") {
		setSelf(JSON.parse(savedValue));
	}

	onSet((newValue: any, _: any, isReset: any) => {
		isReset
			? localStorage.removeItem(key)
			: localStorage.setItem(key, JSON.stringify(newValue));
	});
};
export const userState = selector({
	key: 'userState',
	get: ({get}): UserInfo | null => {
		const token = get(tokenState);
		if (!token) {
			return null;
		}
		const decoded = jwtDecode(token);
		return decoded as UserInfo;
	}
})

export const tokenState = atom({
	key: 'tokenState',
	default: localStorage.getItem("access_token") || "",
	effects: [({onSet}) => {
		return onSet((newValue: string) => {
			localStorage.setItem("access_token", newValue);
		});
	}]
})

export const userInitialisedState = atom({
	key: 'userInitialisedState',
	default: false,
	effects: [localStorageEffect('userInitialisedState')]
})



