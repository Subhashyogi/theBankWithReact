import { useState, useEffect, useContext } from 'react'
import Header from './Components/Header'
import Main from './Components/Main'
import { MainContext } from './context/MainContext'


function App() {
  const { isLoggedIn, setIsLoggedIn } = useContext(MainContext);
  // const [isLoggedIn, setIsLoggedIn] = useState(() => {
  //   // Initialize from localStorage
  //   const saved = localStorage.getItem('bankistLoggedIn')
  //   return saved === 'true'
  // })

  // const [balance, setBalance] = useState(0);
  // const [uId, setUId] = useState();
  // const [date, setDate] = useState(new Date().toLocaleDateString());

  // const fetchBalance = async () => {
  //   try {
  //     const userId = JSON.parse(localStorage.getItem('userId'))?.id;
  //     setUId(userId)
  //     if (!userId) {
  //       setBalance(0);
  //       setDate(new Date().toLocaleDateString());
  //       return;
  //     }

  //     const response = await axios.get(`http://localhost:5000/user/get-data/${userId}`);
  //     const currentUser = response.data.data;

  //     const total = currentUser.Transictions?.reduce((sum, trans) => {
  //       const amount = typeof trans === 'object' ? trans.amount : trans;
  //       return sum + (Number(amount) || 0);
  //     }, 0) || 0;

  //     setBalance(total);
  //     setDate(new Date().toLocaleDateString());
  //     console.log('Balance updated:', total);
  //   } catch (error) {
  //     console.error('Error fetching balance:', error);
  //   }
  // };

  useEffect(() => {
    // Persist to localStorage
    localStorage.setItem('bankistLoggedIn', isLoggedIn)
  }, [isLoggedIn])

  return (
    <>
      <Header isLoggedIn={isLoggedIn}/>
      <Main isLoggedIn={isLoggedIn}/>
    </>
  )
}

export default App
