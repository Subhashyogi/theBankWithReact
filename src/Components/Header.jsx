import React, { useState, useContext } from 'react';
import Logo from '../assets/logo.png';
import axios from 'axios';
import {MainContext } from '../context/MainContext';

const Header = (props) => {
    const { submitHandler,time, user, isLoggedIn,} = useContext(MainContext)

    return (
        <nav className='flex flex-col md:flex-row lg:flex-row gap-5 justify-between items-center px-5'>
            <p className='text-2xl md:text-3xl lg:text-4xl'>
                {isLoggedIn && time !== 0  ? `Welcome ${user}` : 'Log in to get started'}
            </p>
            <img src={Logo} alt="Logo" className='h-20' />
            <form className='flex' onSubmit={submitHandler}>
                <input title='Enter your first name' type="text" name='User' placeholder='USER' className={`border-none px-4 py-2 rounded-full text-center text-2xl text-inherit border-[#ccc] w-48 mr-4 focus:border-gray-300 transition-all duration-300 ease-in-out placeholder:text-[#bbb] `} />
                <input type="password" name='Pin' placeholder='PIN' className={`border-none px-4 py-2 rounded-full text-center text-2xl w-48 mr-4 text-inherit border-[#fff] focus:border-[#ccc] transition-all duration-300 ease-in-out placeholder:text-[#bbb] $`} />
                <button className='border-none bg-n text-4xl cursor-pointer transition-all-[duration-300] hover:outline-none hover:text-[#777] focus:outline-none focus:text-[#777]'>→</button>
            </form>
        </nav>
    );
};

export default Header;
