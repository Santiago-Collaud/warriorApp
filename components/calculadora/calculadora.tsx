"use client"
import React, { useState } from 'react';

const Calculadora: React.FC = () => {
    const [num1, setNum1] = useState<number>(0);
    const [num2, setNum2] = useState<number>(0);
    const [resultado, setResultado] = useState<number | null>(null);

    const handleSumar = () => setResultado(num1 + num2);
    const handleRestar = () => setResultado(num1 - num2);
    const handleMultiplicar = () => setResultado(num1 * num2);
    const handleDividir = () => setResultado(num2 !== 0 ? num1 / num2 : null);
    const handleCE = () => {setNum1(0); setNum2(0); setResultado(null);}

    return (
        <div className='bg-blue-100 p-2 text-black m-2 rounded-md'>
            <h1>Calculadora</h1>
            <input
                type="number"
                value={num1}
                onChange={(e) => setNum1(Number(e.target.value))}
                placeholder="Número 1"
                className='mr-2'
            />
            <input
                type="number"
                value={num2}
                onChange={(e) => setNum2(Number(e.target.value))}
                placeholder="Número 2"
            />
            <div className='bg-blue-200 p-2 text-black m-2 rounded-md flex justify-center'>
                <button className='border p-2 ml-2' onClick={handleSumar}>Sumar</button>
                <button className='border p-2 ml-2' onClick={handleRestar}>Restar</button>
                <button className='border p-2 ml-2' onClick={handleMultiplicar}>Multiplicar</button>
                <button className='border p-2 ml-2' onClick={handleDividir}>Dividir</button>
                <button className='border p-2 ml-2 bg-red-100' onClick={handleCE}>CE</button>
            </div>
            {resultado !== null && <h2>Resultado: {resultado}</h2>}
        </div>
    );
};

export default Calculadora;