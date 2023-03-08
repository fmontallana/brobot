
import { useState } from 'react';

export default function useLocalStorage(key, initialValue) {
    // Get the initial value from localStorage if it exists
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    });

    // Return a wrapped version of useState's setter function that also persists the new value to localStorage
    const setValue = value => {
        try {
            // Allow value to be a function so we have the same API as useState
            const newValue = value instanceof Function ? value(storedValue) : value;
            // Save to local storage
            window.localStorage.setItem(key, JSON.stringify(newValue));
            // Update state
            setStoredValue(newValue);
        } catch (error) {
            console.log(error);
        }
    };

    return [storedValue, setValue];
}
