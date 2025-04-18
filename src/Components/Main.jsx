import React, { useContext } from 'react';
import Balance from './Balance';
import Movements from './Movements';
import Summary from './Summary';
import Operations from './Operations';
import { MainContext } from '../context/MainContext';





const Main = (props) => {
const {time} = useContext(MainContext)
    return (
        <main className={`relative max-w-[100rem] max-h-[100rem] my-16 flex flex-col mx-auto lg:grid lg:grid-cols-[4fr_3fr] lg:grid-rows-[auto_repeat(3,15rem)_auto] md:grid md:grid-cols-[4fr_3fr] md:grid-rows-[auto_repeat(3,15rem)_auto] gap-8 ${props.isLoggedIn && time !== 0 ? '' : 'opacity-0 transition-all duration-500'}`}>
            <Balance />
           <Movements/>
           <Operations/>
           <Summary/>
        </main>
    );
}

export default Main;
