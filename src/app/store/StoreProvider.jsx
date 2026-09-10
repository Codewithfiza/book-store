"use client";

import { useEffect, useRef } from "react";
import { store } from "./store";
import { hydrateCart } from "./cartSlice";
import { Provider } from "react-redux";



export default function StoreProvider({children}){


    const initialized = useRef(false);

    useEffect(()=>{
        if(!initialized.current){
            const saved = localStorage.getItem('cart');
            if(saved) store.dispatch(hydrateCart(JSON.parse(saved)));
            initialized.current = true;
        }

        const unsubscribe = store.subscribe(()=>{
            localStorage.setItem('cart', JSON.stringify(store.getState().cart.items));
        });
        return ()=> unsubscribe();




    }, [])

    return <Provider store = {store}>{children}</Provider>


}