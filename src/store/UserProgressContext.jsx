import { createContext, useState } from "react";

const UserProgresscontext = createContext({
    progress : '' , //'cart' 'checkout'
    showCart: ()=>{},
    hideCart: ()=>{},
    showCheckout: ()=>{},
    hideCheckout: ()=>{}
});

export function UserProgresscontextProvider({children}){
    const [userProgress, setUserProgress] = useState();

    function showCart(){
        setUserProgress('cart')
    }
    
    function hideCart(){
        setUserProgress('')
    }
    
    function showCheckout(){
        setUserProgress('checkout')
    }
    
    function hideCheckout(){
        setUserProgress('')
    }

    const userProgressCtx = {
        progress : userProgress ,   //'cart' 'checkout'
        showCart,
        hideCart,
        showCheckout,
        hideCheckout
    }

    return <UserProgresscontext.Provider value={userProgressCtx}>{children}</UserProgresscontext.Provider>
}

export default UserProgresscontext;