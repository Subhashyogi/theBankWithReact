import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { MainContext } from '../context/MainContext';


const Movements = () => {
    const { movements,loading} = useContext(MainContext);
    
    if (loading) {
        return <div className='row-span-3 bg-[#fff] rounded-2xl overflow-scroll flex items-center justify-center'>
            <p>Loading movements...</p>
        </div>;
    }
    // [...movements]
    //     .sort((a, b) => new Date(b.date) - new Date(a.date)) // 🔥 Sorting right here
    //     .map((movement, i) => (
    return (
        <div className='row-span-3 bg-[#fff] rounded-2xl overflow-scroll'>
            {movements.length > 0 ? (
                // movements.map((movement,i) => (
                [...movements]
                    .sort((a, b) => b.index - a.index) // 🔥 Sorting right here
                    .map((movement, i) => (
                    
                    <div key={`${i}-${movement.date}`} className='py-9 px-16 flex items-center border-b border-[#eee]'>
                        <div className={`text-xs md:text-lg lg:text-lg uppercase font-medium text-[#fff] p-[0.1rem_1rem] mr-8 rounded-full ${
                            movement.type === 'deposit' 
                                ? 'bg-gradient-to-tl from-[#39b385] to-[#9be15d]' 
                                : 'bg-gradient-to-tl from-[#e52a5a] to-[#ff585f]'
                        }`}>
                            {movement.type || 'Transaction'}
                        </div>
                        <div className='text-xs md:text-lg lg:text-lg uppercase font-medium text-[#666]'>
                            {new Date(movement.date).toLocaleDateString()}
                        </div>
                        <div className='text-xs md:text-lg lg:text-lg uppercase font-medium text-[#666]'>
                            {}
                        </div>
                        <div className={`text-xl md:text-3xl lg:text-3xl ml-auto ${
                            movement.type === 'deposit' ? 'text-[#39b385]' : 'text-[#e52a5a]'
                        }`}>
                            {movement.type === 'deposit' ? '+' : '-'}₹{Math.abs(movement.trans).toFixed(2)}
                        </div>
                    </div>
                )
            )
            ) : (
                <div className='py-9 px-16 flex items-center justify-center'>
                    <p className='text-gray-500'>No Transactions yet</p>
                </div>
            )}
        </div>
    );
}

export default Movements;
