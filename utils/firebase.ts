import { initializeApp } from "firebase/app";
import {
    initializeAuth,
    // @ts-ignore
    getReactNativePersistence,
    getAuth
} from "firebase/auth";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
    apiKey: "AIzaSyAC5qVIHmX8CS5u1mvzhypys4f7n98BGt4",
    authDomain: "vitehire-app.firebaseapp.com",
    projectId: "vitehire-app",
    storageBucket: "vitehire-app.firebasestorage.app",
    messagingSenderId: "803154669211",
    appId: "1:803154669211:web:25ce01734088c5d5f5e03e",
    measurementId: "G-8EDBQEEC0C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with proper persistence for each platform
let auth: any;
try {
    if (Platform.OS === 'web') {
        auth = getAuth(app);
    } else {
        auth = initializeAuth(app, {
            // @ts-ignore - getReactNativePersistence is available in the RN bundle
            persistence: getReactNativePersistence(AsyncStorage)
        });
    }
} catch (e) {
    console.warn("Auth initialization failed, falling back to basic auth", e);
    auth = getAuth(app);
}

export { app, auth };
