"use client";

import Image from 'next/image';


const WspButton = () => {

    const handleWSP = () => {
        //const message = encodeURIComponent("Hola, quería consultar sobre los horarios");
        const phoneNumber = "5493434681337"; // Número de WhatsApp
        const url = `https://wa.me/${phoneNumber}`;
        
        window.open(url, "_blank");
    }
    
  return (
    <div>
        <button onClick={handleWSP}>
            <Image 
                src="/icons/whatsapp_icon.png" 
                alt="Whatsapp icon" 
                width={35} 
                height={35} 
                className=""
                priority 
                />
        </button>
    </div>
  );
};

export default WspButton;

