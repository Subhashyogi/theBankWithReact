import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { MainContext } from '../context/MainContext';

const Balance = () => {
    const { balance, date, loanRequests, approveLoan, denyLoan } = useContext(MainContext);
    const [toggle, setToggle] = useState(false);
    const popHandler = (e) => {
        e.preventDefault();
        setToggle(true);
    }

    const clickHandler = (e) => {
        setToggle(false);
    }

    return (
        <div className='col-span-2 flex items-end justify-between mb-8'>
            <div>
                <p className='text-2xl md:text-4xl lg:text-3xl sm:text-5xl font-medium mb-[-0.2rem]'>Current Balance</p>
                <p className='text-xl md:text-2xl lg:text-2xl text-[#888]'>as of <span>{date}</span></p>
                <button onClick={popHandler} className={`mt-6 border-none rounded-xl text-3xl bg-[#fff] cursor-pointer transition-all duration-300 focus:outline-none bg-[rgba(225,225,225,0.8)] `}>📮{loanRequests.length > 0 ? loanRequests.length : ''}</button>
            </div>
            <p className='text-7xl md:text-7xl lg:text-5xl font-light'>
                ₹{balance.toFixed(2)}
            </p>
            

            <div className={`modal ${toggle === true ? '' : 'hidden'}`}>
                <button onClick={clickHandler} className="btn--close-modal">&times;</button>
                {loanRequests.length > 0 ? (
                    loanRequests.map((req, i) => (
                        <div key={i} className=' absolute top-24 left-0  bg-[#eee] w-full h-20 flex justify-around items-center gap-6 text-2xl'>
                            <span>{req.amount}₹ requested by user : {req.fromUserName}</span>
                            <>
                                <button onClick={() => approveLoan(req)} className='border-none rounded-xl text-3xl bg-[#fff] cursor-pointer transition-all duration-300 focus:outline-none bg-[rgba(225,225,225,0.8)]'>✅</button>
                                <button onClick={() => denyLoan(req)} className='border-none rounded-xl text-3xl bg-[#fff] cursor-pointer transition-all duration-300 focus:outline-none bg-[rgba(225,225,225,0.8)]'>❎</button>
                          </>
                        </div>
                    ))
                ) : (
                    <span>No loan requests yet</span>
                )}

            </div>
            <div onClick={clickHandler} className={`overlay ${toggle === true ? '' : 'hidden'}`}></div>
        </div>
    );
};


export default Balance;




// {
//     loanRequests.length > 0 ? (
//         loanRequests.map((req, i) => (
//             <div key={i} className=' absolute top-24 left-0  bg-[#eee] w-full h-20 flex justify-around items-center gap-6 text-2xl'>
//                 {req.fromUserName} has requested ₹{req.amount} loan.
//                 {/* {req && req._id === cUser._id && ( */}
//                 <>
//                     <button onClick={() => approveLoan(req)} className='border-none rounded-xl text-3xl bg-[#fff] cursor-pointer transition-all duration-300 focus:outline-none bg-[rgba(225,225,225,0.8)]'>✅</button>
//                     <button onClick={() => denyLoan(req)} className='border-none rounded-xl text-3xl bg-[#fff] cursor-pointer transition-all duration-300 focus:outline-none bg-[rgba(225,225,225,0.8)]'>❎</button>
//                 </>
//                 {/* )} */}
//             </div>
//         ))
//     ) : (
//     <p>No loan requests</p>
// )
// }