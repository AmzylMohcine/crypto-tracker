import React, { createContext, useContext, useEffect , useState } from 'react'

const Crypto = createContext() ; 
export const CryptoContext = ({children}) => {
const [currency, setCurrency] = useState("USD"); 
const [symbol, setsymbol] = useState("$");

useEffect (()=> { 
    if(currency === "USD") setsymbol("$") ;
    else if (currency === "EUR" ) setsymbol("€");
    else if (currency==="MAD") setsymbol("MAD") ;

} , [currency]) ;

  return (
    <Crypto.Provider value = {{currency , symbol , setCurrency}}> 
        {children}
    </Crypto.Provider>
  )
}
export default CryptoContext ; 

export const CryptoState = () => { 
   return  useContext(Crypto) ; 
}