import React, { useState } from 'react'
import WalletConnect from './Wallet';
import './header.css'
const Header = () => {
   const [ ShowComponent , setShowComponent] = useState(false);
   const handleclicked = () => {
    setShowComponent(true);
    console.log("Hankle")
   }
  return (
    <>
    <div>
      <header className="header">
      <div className="logo">Web3 App</div>
      <nav className="nav">
        <a href="#home" className="nav-link">Home</a>
        <a href="#about" className="nav-link">About</a>
        <a href="#features" className="nav-link">Features</a>
      </nav>
      <button className='header-wallet' onClick={()=> handleclicked()}>Connect Wallet</button>
      </header>
    </div>
    <div>
      {ShowComponent && <WalletConnect ShowComponent={ShowComponent} setShowComponent={setShowComponent}/>}
    </div>
    </>
  )
}

export default Header;
