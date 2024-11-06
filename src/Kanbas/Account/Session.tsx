import * as client from "./client";
import { useEffect, useState, useCallback } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";

export default function Session({ children }: { children: any }) {
    const [pending, setPending] = useState(true);
    const dispatch = useDispatch();
    const fetchProfile = useCallback(async () => {
        try {
            const currentUser = await client.profile();
            if (currentUser) dispatch(setCurrentUser(currentUser));
        } catch (err) {
            console.error("Error fetching profile:", err);
        } finally {
            setPending(false);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);
    if (!pending) {
        return children;
    }
}