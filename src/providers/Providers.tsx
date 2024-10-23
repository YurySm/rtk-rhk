import {NextUIProvider} from "@nextui-org/react";
import StoreProvider from "@/providers/StoreProvider/StoreProvider";
import {ReactNode} from "react";

export default function Providers ({children}: {children: ReactNode}) {
    return (
        <StoreProvider>
            <NextUIProvider>
                {children}
            </NextUIProvider>
        </StoreProvider>
    );
};