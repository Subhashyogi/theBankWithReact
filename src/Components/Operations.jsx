import axios from 'axios';
import React, { useContext, useState } from 'react';
import { MainContext } from '../context/MainContext';
import Main from './Main';
import Maincontext from '../../../Quizz/Frontend/src/context/Maincontext';
const Operations = () => {
    
    return (
        <>
            <Transfer />
            <Loan />
            <Close />

        </>
    );
}



const Transfer = (props) => {
    const { transferHandler } = useContext(MainContext)
   
 
    return (
        <div className='rounded-2xl p-[3rem_4rem] text-[#333] bg-gradient-to-tl from-[#ffb003] to-[#ffcb03]'>
            <h2>Transfer money</h2>
            <form onSubmit={transferHandler} className='grid grid-cols-[2.5fr_2.5fr_1fr] grid-rows-[auto_auto] gap-[0.4rem_1rem]'>
                <input type="text" name='User' className='w-full border-none bg-[rgba(225,225,225,0.4)] text-inherit text-2xl text-center text-[#333] p-[0.3rem_1rem] rounded-xl transition-all duration-300 focus:outline-none focus:bg-[rgba(225,225,225,0.6)]' />
                <input type="number" name='Amount' className='w-full border-none bg-[rgba(225,225,225,0.4)] text-inherit text-2xl text-center text-[#333] p-[0.3rem_1rem] rounded-xl transition-all duration-300 focus:outline-none focus:bg-[rgba(225,225,225,0.6)]' />
                <button className='border-none rounded-xl text-3xl bg-[#fff] cursor-pointer transition-all duration-300 focus:outline-none bg-[rgba(225,225,225,0.8)]'>&rarr;</button>
                <label className='text-xl text-center'>Transfer to</label>
                <label className='text-xl text-center'>Amount</label>
            </form>
        </div>
    )
}
const Loan = () => {
    const { loanHandler } = useContext(MainContext)
    
    return (
        <div className='rounded-2xl p-[3rem_4rem] text-[#333] bg-gradient-to-tl from-[#39b385] to-[#9be15d]'>
            <h2>Request loan</h2>
            <form onSubmit={loanHandler} className='grid grid-cols-[2.5fr_2.5fr_1fr] grid-rows-[auto_auto] gap-[0.4rem_1rem]'>
                <input  type="number" name='Amount' className='w-full border-none bg-[rgba(225,225,225,0.4)] text-inherit text-2xl text-center text-[#333] p-[0.3rem_1rem] rounded-xl transition-all duration-300 focus:outline-none focus:bg-[rgba(225,225,225,0.6)]' />
                <input type="text"  name='User' className='w-full border-none bg-[rgba(225,225,225,0.4)] text-inherit text-2xl text-center text-[#333] p-[0.3rem_1rem] rounded-xl transition-all duration-300 focus:outline-none focus:bg-[rgba(225,225,225,0.6)]' />
                <button className='border-none rounded-xl text-3xl bg-[#fff] cursor-pointer transition-all duration-300 focus:outline-none bg-[rgba(225,225,225,0.8)]'>&rarr;</button>
                <label className='text-xl text-center'>Amount</label>
                <label className='text-xl text-center'>receive from</label>
            </form>
        </div>
    )
}
const Close = () => {
    const { closeHandler } = useContext(MainContext)
    
    return (
        <>
            <div className='rounded-2xl p-[3rem_4rem] text-[#333] bg-gradient-to-tl from-[#e52a5a] to-[#ff585f]'>
                <h2>Close account</h2>
                <form onSubmit={closeHandler} className='grid grid-cols-[2.5fr_2.5fr_1fr] grid-rows-[auto_auto] gap-[0.4rem_1rem]'>
                    <input type="text" name='User' title='Enter first latter of first and last name' className='w-full border-none bg-[rgba(225,225,225,0.4)] text-inherit text-2xl text-center text-[#333] p-[0.3rem_1rem] rounded-xl transition-all duration-300 focus:outline-none focus:bg-[rgba(225,225,225,0.6)]' />
                    <input type="password" name='Pin' className='w-full border-none bg-[rgba(225,225,225,0.4)] text-inherit text-2xl text-center text-[#333] p-[0.3rem_1rem] rounded-xl transition-all duration-300 focus:outline-none focus:bg-[rgba(225,225,225,0.6)]' />
                    <button className='border-none rounded-xl text-3xl bg-[#fff] cursor-pointer transition-all duration-300 focus:outline-none bg-[rgba(225,225,225,0.8)]'>&rarr;</button>
                    <label className='text-xl text-center'>Confirm user</label>
                    <label className='text-xl text-center'>Confirm PIN</label>
                </form>

            </div>
            <Timer />

        </>
    )
}

const Timer = () => {
    const {min,sec} = useContext(MainContext)
    return (
        <>
            <p className='p-[0_0.3rem]  md:mt-10 lg:mt-10 text-center text-xl'>You will logged out in
                <span className='font-semibold'>{` ${min}.${sec}`}</span>
            </p>
        </>
    )
}
export default Operations;
