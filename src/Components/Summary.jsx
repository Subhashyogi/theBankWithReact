import React, { useContext } from 'react';
import { MainContext } from '../context/MainContext';

const Summary = () => {
    const {_in, _out, interest} = useContext(MainContext)
    return (
        
        <div className='row-span-3 flex lg:flex md:grid sm:flex grid-cols-2 items-baseline p-[0_0.3rem] pb-8 mt-4'>
            {/* <span>under process</span> */}
            <p className='md:text-xl lg:text-xl font-medium uppercase mr-[0.8rem]'>In</p>
            <p className='md:text-4xl lg:text-4xl mr-9 text-[#66c873]'>₹{_in.toFixed(2)}</p>
            <p className='md:text-xl lg:text-xl font-medium uppercase mr-[0.8rem]'>Out</p>
            <p className='md:text-4xl lg:text-4xl mr-9 text-[#f5465d]'>₹{_out.toFixed(2)}</p>
            <p className='md:text-xl lg:text-xl font-medium uppercase mr-[0.8rem]'>Interest</p>
            <p className='md:text-4xl lg:text-4xl mr-9 text-[#66c873]'>₹{interest.toFixed(2)}</p>
            {/* <button className='ml-auto border-none bg-none text-xl font-medium cursor-pointer active:scale-[.98]'> ⬇ SORT</button> */}
        </div>
    );
}

export default Summary;
