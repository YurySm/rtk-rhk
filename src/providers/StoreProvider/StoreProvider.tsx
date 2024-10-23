'use client'
import {useEffect, useRef} from "react";
import {AppStore, makeStore} from "@/store/store";
import {Provider} from "react-redux";
import {setupListeners} from "@reduxjs/toolkit/query";

export default function StoreProvider({
  children,
}: {
    children: React.ReactNode
}) {
    const storeRef = useRef<AppStore>()

    if (!storeRef.current) {
        storeRef.current = makeStore()
    }

    useEffect(() => {
        if (storeRef.current != null) {
            const unsubscribe = setupListeners(storeRef.current.dispatch);
            return unsubscribe;
        }
    }, []);

    return <Provider store={storeRef.current}>{children}</Provider>
}