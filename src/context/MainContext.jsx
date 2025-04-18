import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Initialize from localStorage
    const saved = localStorage.getItem('bankistLoggedIn')
    return saved === 'true'
  })
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('bankistUser');
    return saved ? JSON.parse(saved).name : '';
  });
  const [balance, setBalance] = useState(0);
  // const [data, setData] = useState(true)
  const [_in, set_In] = useState(0);
  const [_out, set_Out] = useState(0);
  const [interest, setInterest] = useState(0)
  const [cUser, setCuser] = useState()
  const [uId, setUId] = useState();
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(0)
  const [amt, setAmt] = useState()
  const [match, setMatch] = useState()

  // To featch balance -------------------------------------------------------------------------------------
  const fetchBalance = async () => {
    try {

      const userId = JSON.parse(localStorage.getItem('userId'))?.id;
      setUId(userId);

      if (!userId) {
        setBalance(0);
        setDate(new Date().toLocaleDateString());
        return;
      }

      const response = await axios.get(`http://localhost:5000/user/get-data/${userId}`);
      const currentUser = response.data.data;
      setCuser(currentUser)
      // console.log(currentUser);
      const total = currentUser.Transictions?.reduce((sum, trans) => {
        const amount = trans;
        return sum + (Number(amount));
      }, 0);

      setBalance(total);

      const tran_in = currentUser.Transictions?.filter((trans) => trans > 0).reduce((acc, trans) => acc + trans, 0);
      set_In(tran_in)
      const tran_out = currentUser.Transictions?.filter((trans) => trans < 0).reduce((acc, trans) => acc + trans, 0);
      set_Out(Math.abs(tran_out))
      const Interest = currentUser.Transictions?.filter((trans) => trans > 0).map((dep) => (dep * currentUser.interestRate) /100).reduce((acc, interest) => acc + interest, 0);
      setInterest(Interest)
      setDate(new Date().toLocaleDateString());
      // console.log('Balance updated:', total);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  useEffect(() => {

    if (isLoggedIn) {
      fetchBalance();
      fetchMovements();
      LogoutTimerStart(); // Restart timer from saved state
      fetchLoanRequests();
    }
  }, [uId]);

  //--------------------------------------------------------------------------------------------------------------

  const submitHandler = (e) => {
    e.preventDefault();
    const User = e.target.User.value;
    const Pin = +e.target.Pin.value;

    axios.get(`http://localhost:5000/user/get-data`)
      .then((success) => {
        const userData = success.data.data;
        const matchedUser = userData.find(user => {
          const nameInitials = `${user.firstName}`;
          setUser(user.firstName);
          // setData(nameInitials === User && user.pin === Pin)
          return nameInitials === User && user.pin === Pin;
        });

        if (matchedUser) {

          // console.log('Login successful:', matchedUser);
          const id = matchedUser._id;
          localStorage.setItem('userId', JSON.stringify({ id }));
          
          LogoutTimerStart(true);
          setIsLoggedIn(true)
          e.target.User.value = '';
          e.target.Pin.value = '';

          localStorage.setItem('bankistUser', JSON.stringify({
            initials: `${matchedUser.firstName[0]}${matchedUser.lastName[0]}`,
            name: matchedUser.firstName
          }));
          fetchBalance()

        } else {
          alert('User name or Pin is wrong');
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  };

  //--------------------------------------
 
  
  const fetchMovements = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem('userId'));
      if (!userId) {
        throw new Error('No user logged in');
      }

      const response = await axios.get(`http://localhost:5000/user/get-data/${userId.id}`);
      const currentUser = response.data.data;
      // console.log('Current User:', currentUser);
      
      // Process only current user's transactions
      const userMovements = (currentUser.Transictions || []).map((trans, index) => ({
        trans,
        userName: `${currentUser.firstName} ${currentUser.lastName}`,
        date: currentUser.TransictionsDates?.[index] || new Date().toISOString(),
        index: index,
        type: trans > 0 ? 'deposit' : 'withdrawal'
      }));
      ;

      // console.log('Processed Movements:', userMovements);
      setMovements(userMovements);
    } catch (error) {
      console.error('Error fetching movements:', error);
      // setMovements([]); // Reset on error
    } finally {
      setLoading(false);
    }
  };

  


  // Logout timer ----------------------------------------------------------------
  const LogoutTimerStart = (isNewLogin = false) => {
    const userId = JSON.parse(localStorage.getItem("userId"))?.id;
    if (!userId) return;

    // Key specific to the logged-in user
    const logoutKey = `logoutEndTime_${userId}`;

    // If new login, set a fresh logout time
    if (isNewLogin) {
      localStorage.setItem(logoutKey, Date.now() + 600000); // 10 mins
    }

    // Clear any existing timer (important!)
    if (timer) {
      clearInterval(timer);
    }

    const endTime = parseInt(localStorage.getItem(logoutKey), 10);
    if (!endTime) return;

    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
      const min = String(Math.trunc(remaining / 60)).padStart(2, "0");
      const sec = String(remaining % 60).padStart(2, "0");

      setMin(min);
      setSec(sec);
      setTime(remaining);

      if (remaining === 0) {
        clearInterval(interval);
        localStorage.removeItem(logoutKey);
        setIsLoggedIn(false);
        localStorage.setItem("bankistLoggedIn", "false");
        localStorage.removeItem("userId");
        localStorage.removeItem("bankistUser");
      }
    }, 1000);

    // Save this interval ID in state
    setTimer(interval);
  };


  // Transfer money to anouther account ---------------------------------------------------------------

  const transferHandler = (e) => {
    e.preventDefault();

    const User = e.target.User.value;
    const Amount = + e.target.Amount.value;
    axios.get(`http://localhost:5000/user/get-data`)
      .then((success) => {
        const userData = success.data.data;
        const matchedUser = userData.find(user => {

          const nameInitials = `${user.firstName[0]}${user.lastName[0]}`;
          return nameInitials === User && Amount;
        });
        if (matchedUser) {
          e.target.User.value = '';
          e.target.Amount.value = '';

          if (Amount > 0 && matchedUser.firstName && balance >= Amount && matchedUser.firstName !== cUser.firstName) {

            // Atomic transfer API call with proper data
            axios.put(`http://localhost:5000/user/transfer/${cUser._id}/${matchedUser._id}/${Amount}`)

              .then((success) => {
                // Update UI
                fetchBalance();
                fetchMovements();
                fetchLoanRequests();
                alert(`Successfully transferred ₹${Amount} to ${matchedUser.firstName}`);
              })
              .catch(error => {
                // console.error('Transfer failed:', error);
                alert(`Transfer failed: ${error.response?.data?.message || error.message}`);
              });



          }

        } else {
          console.log('Invalid credentials');
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });

  }
  //----------------------to Loan -----------------------------------
  const loanHandler =  (e) => {
    e.preventDefault();
    const User = e.target.User.value;
    const Amount = + e.target.Amount.value;

    axios.get(`http://localhost:5000/user/get-data`)
      .then((success) => {
        const userData = success.data.data;
        const matchedUser = userData.find(user => {
          const nameInitials = `${user.firstName[0]}${user.lastName[0]}`;
          return nameInitials === User && Amount;
        });

        if (matchedUser) {
          e.target.User.value = '';
          e.target.Amount.value = '';

          if (matchedUser.firstName !== cUser.firstName) {
            // Send request to Himanshu (receiver)
            // console.log(matchedUser);
            axios.put(`http://localhost:5000/user/request-loan/${matchedUser._id}`, {
              fromUserId:cUser._id,
              amount:Amount,
              date: date
            })
              .then(
                (success) => {
                  fetchBalance();
                  fetchMovements();
                  fetchLoanRequests();
                  showMessageHandler(matchedUser, Amount);
                }
              ).catch(
                (err) => {
                  console.log('error');
                }
              )


          } else {
            console.log('Invalid credentials');
          }
        }
      });
  };

  const [loanRequests, setLoanRequests] = useState([]);

  const fetchLoanRequests = async () => {
    const userId = JSON.parse(localStorage.getItem("userId"))?.id;
    if (!userId) return;

    const res = await axios.get(`http://localhost:5000/user/get-data/${userId}`);
    const userData = res.data.data;
    setLoanRequests(userData.loanRequests || []);
  };



  const showMessageHandler = (matchUser, amount) => {
    setMatch(matchUser)
    return setAmt(amount)

  }

  const approveLoan = async (req) => {
    try {
      await axios.put(`http://localhost:5000/user/transfer/${cUser._id}/${req.fromUserId
}/${req.amount}`);

      // Remove the request from the DB
      await axios.put(`http://localhost:5000/user/clear-loan-request/${cUser._id}`, {
        requestId: req._id,
        fromUserId: req.fromUserId,
        amount: req.amount,
        date: req.date
      });

      setLoanRequests(prev => prev.filter(r =>
        !(r.fromUserId === req.fromUserId && r.amount === req.amount && r.date === req.date)
      ));


      fetchBalance();
      fetchMovements();
      fetchLoanRequests();

      alert(`Loan of ₹${req.amount} approved for ${req.fromUserName}`);
    } catch (err) {
      console.error("Approval failed", err);
    }
  };




  const denyLoan = async (req) => {
    await axios.put(`http://localhost:5000/user/clear-loan-request/${cUser._id}`, {
      requestId: req._id,
      fromUserId: req.fromUserId,
      amount: req.amount,
      date: req.date
    });

    setLoanRequests(prev => prev.filter(r =>
      !(r.fromUserId === req.fromUserId && r.amount === req.amount && r.date === req.date)
    ));
    fetchBalance();
    fetchMovements();
    fetchLoanRequests();
    setAmt(null);
    setMatch(null);
    // alert("Loan request denied");
  };



  const closeHandler = (e) => {
    e.preventDefault();
    const User = e.target.User.value;
    const Pin = + e.target.Pin.value;
    axios.get(`http://localhost:5000/user/get-data`)
      .then((success) => {
        const userData = success.data.data;
        const matchedUser = userData.find(user => {

          const nameInitials = `${user.firstName[0]}${user.lastName[0]}`;
          return nameInitials === User && Pin;
        });
        if (matchedUser) {
          console.log(matchedUser);
          e.target.User.value = '';
          e.target.Pin.value = '';

          if (cUser.firstName === matchedUser.firstName && cUser.Pin === matchedUser.Pin) {

            axios.delete(`http://localhost:5000/user/closeAccount/${cUser._id}`)
              .then(
                (success) => {
                  clearInterval(timer);
                  localStorage.removeItem("logoutEndTime");
                  setIsLoggedIn(false);
                  localStorage.setItem("bankistLoggedIn", "false");
                  localStorage.removeItem("userId");
                  localStorage.removeItem("bankistUser");
                  console.log('Account closed');
                }
              ).catch(
                (error) => {
                  console.log('there is some problme to close account! try again leter');
                }
              )
          }
        }
      })
  }

  return (
    <MainContext.Provider value={{
      fetchBalance,
      fetchMovements,
      balance,
      setBalance,
      LogoutTimerStart,
      // data,
      _in,
      _out,
      interest,
      date,
      min,
      sec,
      time,
      amt,
      match,
      setDate,
      uId,
      setUId,
      user,
      setUser,
      submitHandler,
      isLoggedIn,
      setIsLoggedIn,
      cUser,
      movements,
      setMovements,
      loading,
      setLoading,
      transferHandler,
      loanHandler,
      showMessageHandler,
      closeHandler,
      approveLoan,
      denyLoan,
      loanRequests,
    }}>
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => useContext(MainContext);
export { MainContext };
