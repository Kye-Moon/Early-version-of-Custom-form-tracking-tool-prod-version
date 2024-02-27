import {atom, DefaultValue} from "recoil";
import * as SecureStore from 'expo-secure-store';

export const accessTokenState = atom({
    key: 'accessToken',
    default: '',
    effects: [
        ({onSet, setSelf}) => {
            onSet(async (newValue: any, _: any, isReset: any) => {
                await SecureStore.setItemAsync('access_token', JSON.stringify(newValue));
            });
            setSelf(SecureStore.getItemAsync('access_token').then((value) =>
                value != null ? JSON.parse(value) : new DefaultValue()
            ));
        }
    ],
});

export const API_URLS = {
    local: 'http://localhost:4000/graphql',
    dev: 'https://varify-server.onrender.com/graphql',
    production: 'https://production-v2-varify-server.onrender.com/graphql'
};

export const apiUrlState = atom({
    key: 'base_url',
    default: __DEV__ ? API_URLS.local : API_URLS.production,
    // effects: [
    //     ({onSet, setSelf}) => {
    //         onSet(async (newValue: any, _: any, isReset: any) => {
    //                 await SecureStore.setItemAsync('api_url', JSON.stringify(newValue));
    //         });
    //         // setSelf(SecureStore.getItemAsync('api_url').then((value) =>
    //         //     value != null ? JSON.parse(value) : new DefaultValue()
    //         // ));
    //     },
    // ],
});

//
// export const refreshTokenState = selector({
//     key: "refreshToken",
//     get: async () => {
//         return await SecureStore.getItemAsync('refresh_token');
//     }
// })
//
// export const isLoginState = selector({
//     key: 'isLogin',
//     get: ({get}) => {
//         const accessToken = get(accessTokenState);
//         const refreshToken = get(refreshTokenState);
//         return accessToken && refreshToken;
//     }
// });
//
// export const userIdState = selector({
//     key: 'userId',
//     get: async () => {
//         return await SecureStore.getItemAsync('user_id');
//     }
// });
