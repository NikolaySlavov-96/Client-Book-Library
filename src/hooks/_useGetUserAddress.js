import { useCallback, useEffect, useState } from "react";

const DOMAIN = 'https://geolocation-db.com/json/';
// https://api.ipify.org/?format=json

const _useGetUserAddress = () => {
    const [userData, setUserData] = useState({});

    const checkUserAddress = useCallback(async () => {
        try {
            const test = await fetch(DOMAIN);
            const result = await test.json();
            setUserData(result);
        } catch (err) {

        }
    }, [])

    useEffect(() => {
        checkUserAddress();
    }, []);

    return userData;
};

export default _useGetUserAddress;