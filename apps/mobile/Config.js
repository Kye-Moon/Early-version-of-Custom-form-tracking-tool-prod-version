import * as Updates from 'expo-updates';

let Config = {
    clerk_publishable_key: 'pk_test_c3VidGxlLXNoYWQtOTUuY2xlcmsuYWNjb3VudHMuZGV2JA'
};

if (Updates.channel === 'production') {
    Config.clerk_publishable_key = 'pk_live_Y2xlcmsuc3luZXgub25lJA';
}

export default Config;
