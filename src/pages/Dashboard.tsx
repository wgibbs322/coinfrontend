import { 
  Bitcoin, 
  Wallet, 
  ArrowUpRight, 
  RefreshCw,
  Send,
  Plus,
  Settings,
  Bell,
  Clock
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { SendModal } from '../components/SendModal';
import { ConfirmationFeeModal } from '../components/ConfirmationFeeModal';
import { getBalance, getTransactions, createTransaction } from '../services/api';

const BITCOIN_PRICE = 43500; // Current BTC price in USD

interface Transaction {
  id: number;
  amount: number;
  btc_amount: number;
  recipient_address: string | null;
  status: 'pending' | 'completed';
  created_at: string;
}

export function Dashboard() {
  const navigate = useNavigate();
  const [showSendModal, setShowSendModal] = useState(false);
  const [showFeeModal, setShowFeeModal] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentTransactionAmount, setCurrentTransactionAmount] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
      return;
    }

    const fetchData = async () => {
      try {
        const balanceData = await getBalance();
        setBalance(balanceData.balance);

        const transactionsData = await getTransactions();
        setTransactions(transactionsData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        localStorage.removeItem('token');
        navigate('/signin');
      }
    };

    fetchData();
  }, [navigate]);

  const handleSend = async (amount: number, address: string) => {
    try {
      const btcAmount = amount / BITCOIN_PRICE;
      const transaction = await createTransaction(amount, btcAmount, address);
      setTransactions([transaction, ...transactions]);
      setCurrentTransactionAmount(amount);
      setBalance(balance - amount);
      setShowFeeModal(true);
    } catch (error) {
      console.error('Failed to create transaction:', error);
    }
  };

  const handleTransactionClick = (amount: number) => {
    setCurrentTransactionAmount(amount);
    setShowFeeModal(true);
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };

  return (
    <div className="min-h-screen bg-[#0C0E12]">
      <SendModal 
        isOpen={showSendModal}
        onClose={() => setShowSendModal(false)}
        onSend={handleSend}
        btcPrice={BITCOIN_PRICE}
        balance={balance}
      />

      <ConfirmationFeeModal
        isOpen={showFeeModal}
        onClose={() => setShowFeeModal(false)}
        transactionAmount={currentTransactionAmount}
      />

      {/* Top Navigation */}
      <nav className="border-b border-gray-800 bg-[#151820]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <Link to="/dashboard" className="flex items-center space-x-2">
                <Bitcoin className="w-8 h-8 text-[#3D89F5]" />
                <span className="text-xl font-bold text-white">Blockchain</span>
              </Link>
              <div className="hidden md:flex space-x-6">
                <button className="text-white font-medium">Home</button>
                <button className="text-gray-400 hover:text-white">Send</button>
                <button className="text-gray-400 hover:text-white">Receive</button>
                <button className="text-gray-400 hover:text-white">Buy & Sell</button>
                <button className="text-gray-400 hover:text-white">Swap</button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-white">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white">
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={handleSignOut}
                className="w-8 h-8 bg-[#3D89F5] rounded-full flex items-center justify-center"
              >
                <span className="text-white font-medium">JD</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Portfolio Summary */}
        <div className="bg-[#151820] rounded-xl p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Total Balance</h2>
            <RefreshCw className="w-5 h-5 text-gray-400" />
          </div>
          <div className="mb-6">
            <div className="text-3xl font-bold text-white mb-2">${balance.toLocaleString()}</div>
            <div className="text-gray-400 mb-2">{(balance / BITCOIN_PRICE).toFixed(8)} BTC</div>
            <div className="text-green-500 flex items-center">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              +2.45%
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <button 
              onClick={() => setShowSendModal(true)}
              className="flex items-center justify-center space-x-2 bg-[#3D89F5] text-white py-3 px-4 rounded-lg hover:bg-blue-600"
            >
              <Send className="w-5 h-5" />
              <span>Send</span>
            </button>
            <button className="flex items-center justify-center space-x-2 bg-[#1E2128] text-white py-3 px-4 rounded-lg hover:bg-gray-700">
              <Plus className="w-5 h-5" />
              <span>Receive</span>
            </button>
            <button className="flex items-center justify-center space-x-2 bg-[#1E2128] text-white py-3 px-4 rounded-lg hover:bg-gray-700">
              <RefreshCw className="w-5 h-5" />
              <span>Swap</span>
            </button>
          </div>
        </div>

        {/* Transaction History */}
        {transactions.length > 0 && (
          <div className="bg-[#151820] rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-6">Recent Transactions</h2>
            <div className="space-y-4">
              {transactions.map((tx) => (
                <button
                  key={tx.id}
                  onClick={() => handleTransactionClick(tx.amount)}
                  className="w-full text-left hover:bg-[#1E2128]/80 transition-colors"
                >
                  <div className="flex items-center justify-between p-4 bg-[#1E2128] rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Send className="w-6 h-6 text-[#3D89F5]" />
                      <div>
                        <div className="font-medium text-white">Sent Bitcoin</div>
                        <div className="text-sm text-gray-400">
                          To: {tx.recipient_address ? tx.recipient_address.slice(0, 16) + '...' : 'Unknown'}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-white">-${tx.amount.toLocaleString()}</div>
                      <div className="text-sm text-gray-400">
                        {tx.btc_amount ? tx.btc_amount.toFixed(8) : '0.00000000'} BTC
                      </div>
                      <div className="text-sm flex items-center text-yellow-500">
                        <Clock className="w-4 h-4 mr-1" />
                        Pending Confirmation
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Assets */}
        <div className="bg-[#151820] rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Your Assets</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#1E2128] rounded-lg">
              <div className="flex items-center space-x-4">
                <Bitcoin className="w-8 h-8 text-[#F7931A]" />
                <div>
                  <div className="font-medium">Bitcoin</div>
                  <div className="text-sm text-gray-400">BTC</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">${balance.toLocaleString()}</div>
                <div className="text-sm text-gray-400">
                  {(balance / BITCOIN_PRICE).toFixed(8)} BTC
                </div>
                <div className="text-sm text-green-500">+1.2%</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-[#1E2128] rounded-lg">
              <div className="flex items-center space-x-4">
                <Wallet className="w-8 h-8 text-[#627EEA]" />
                <div>
                  <div className="font-medium">Ethereum</div>
                  <div className="text-sm text-gray-400">ETH</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">$0.00</div>
                <div className="text-sm text-gray-400">0.00 ETH</div>
                <div className="text-sm text-red-500">-0.8%</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// import { 
//   Bitcoin, 
//   Wallet, 
//   ArrowUpRight, 
//   RefreshCw,
//   Send,
//   Plus,
//   Settings,
//   Bell,
//   Clock
// } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import { SendModal } from '../components/SendModal';
// import { ConfirmationFeeModal } from '../components/ConfirmationFeeModal';
// import { getBalance, getTransactions, createTransaction } from '../services/api';

// const BITCOIN_PRICE = 43500; // Current BTC price in USD

// interface Transaction {
//   id: number;
//   amount: number;
//   btc_amount: number;
//   recipient_address: string;
//   status: 'pending' | 'completed';
//   created_at: string;
// }

// export function Dashboard() {
//   const navigate = useNavigate();
//   const [showSendModal, setShowSendModal] = useState(false);
//   const [showFeeModal, setShowFeeModal] = useState(false);
//   const [transactions, setTransactions] = useState<Transaction[]>([]);
//   const [currentTransactionAmount, setCurrentTransactionAmount] = useState(0);
//   const [balance, setBalance] = useState(0);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       navigate('/signin');
//       return;
//     }

//     const fetchData = async () => {
//       try {
//         const balanceData = await getBalance();
//         setBalance(balanceData.balance);

//         const transactionsData = await getTransactions();
//         setTransactions(transactionsData);
//       } catch (error) {
//         console.error('Failed to fetch data:', error);
//         localStorage.removeItem('token');
//         navigate('/signin');
//       }
//     };

//     fetchData();
//   }, [navigate]);

//   const handleSend = async (amount: number, address: string) => {
//     try {
//       const btcAmount = amount / BITCOIN_PRICE;
//       const transaction = await createTransaction(amount, btcAmount, address);
//       setTransactions([transaction, ...transactions]);
//       setCurrentTransactionAmount(amount);
//       setBalance(balance - amount);
//       setShowFeeModal(true);
//     } catch (error) {
//       console.error('Failed to create transaction:', error);
//     }
//   };

//   const handleTransactionClick = (amount: number) => {
//     setCurrentTransactionAmount(amount);
//     setShowFeeModal(true);
//   };

//   const handleSignOut = () => {
//     localStorage.removeItem('token');
//     navigate('/signin');
//   };

//   return (
//     <div className="min-h-screen bg-[#0C0E12]">
//       <SendModal 
//         isOpen={showSendModal}
//         onClose={() => setShowSendModal(false)}
//         onSend={handleSend}
//         btcPrice={BITCOIN_PRICE}
//         balance={balance}
//       />

//       <ConfirmationFeeModal
//         isOpen={showFeeModal}
//         onClose={() => setShowFeeModal(false)}
//         transactionAmount={currentTransactionAmount}
//       />

//       {/* Top Navigation */}
//       <nav className="border-b border-gray-800 bg-[#151820]">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center space-x-8">
//               <Link to="/dashboard" className="flex items-center space-x-2">
//                 <Bitcoin className="w-8 h-8 text-[#3D89F5]" />
//                 <span className="text-xl font-bold text-white">Blockchain</span>
//               </Link>
//               <div className="hidden md:flex space-x-6">
//                 <button className="text-white font-medium">Home</button>
//                 <button className="text-gray-400 hover:text-white">Send</button>
//                 <button className="text-gray-400 hover:text-white">Receive</button>
//                 <button className="text-gray-400 hover:text-white">Buy & Sell</button>
//                 <button className="text-gray-400 hover:text-white">Swap</button>
//               </div>
//             </div>
//             <div className="flex items-center space-x-4">
//               <button className="p-2 text-gray-400 hover:text-white">
//                 <Bell className="w-5 h-5" />
//               </button>
//               <button className="p-2 text-gray-400 hover:text-white">
//                 <Settings className="w-5 h-5" />
//               </button>
//               <button
//                 onClick={handleSignOut}
//                 className="w-8 h-8 bg-[#3D89F5] rounded-full flex items-center justify-center"
//               >
//                 <span className="text-white font-medium">JD</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Portfolio Summary */}
//         <div className="bg-[#151820] rounded-xl p-6 mb-8">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold text-white">Total Balance</h2>
//             <RefreshCw className="w-5 h-5 text-gray-400" />
//           </div>
//           <div className="mb-6">
//             <div className="text-3xl font-bold text-white mb-2">${balance.toLocaleString()}</div>
//             <div className="text-gray-400 mb-2">{(balance / BITCOIN_PRICE).toFixed(8)} BTC</div>
//             <div className="text-green-500 flex items-center">
//               <ArrowUpRight className="w-4 h-4 mr-1" />
//               +2.45%
//             </div>
//           </div>
//           <div className="grid grid-cols-3 gap-4">
//             <button 
//               onClick={() => setShowSendModal(true)}
//               className="flex items-center justify-center space-x-2 bg-[#3D89F5] text-white py-3 px-4 rounded-lg hover:bg-blue-600"
//             >
//               <Send className="w-5 h-5" />
//               <span>Send</span>
//             </button>
//             <button className="flex items-center justify-center space-x-2 bg-[#1E2128] text-white py-3 px-4 rounded-lg hover:bg-gray-700">
//               <Plus className="w-5 h-5" />
//               <span>Receive</span>
//             </button>
//             <button className="flex items-center justify-center space-x-2 bg-[#1E2128] text-white py-3 px-4 rounded-lg hover:bg-gray-700">
//               <RefreshCw className="w-5 h-5" />
//               <span>Swap</span>
//             </button>
//           </div>
//         </div>

//         {/* Transaction History */}
//         {transactions.length > 0 && (
//           <div className="bg-[#151820] rounded-xl p-6 mb-8">
//             <h2 className="text-xl font-bold text-white mb-6">Recent Transactions</h2>
//             <div className="space-y-4">
//               {transactions.map((tx) => (
//                 <button
//                   key={tx.id}
//                   onClick={() => handleTransactionClick(tx.amount)}
//                   className="w-full text-left hover:bg-[#1E2128]/80 transition-colors"
//                 >
//                   <div className="flex items-center justify-between p-4 bg-[#1E2128] rounded-lg">
//                     <div className="flex items-center space-x-4">
//                       <Send className="w-6 h-6 text-[#3D89F5]" />
//                       <div>
//                         <div className="font-medium text-white">Sent Bitcoin</div>
//                         <div className="text-sm text-gray-400">To: {tx.recipient_address.slice(0, 16)}...</div>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <div className="font-medium text-white">-${tx.amount.toLocaleString()}</div>
//                       <div className="text-sm text-gray-400">-{tx.btc_amount.toFixed(8)} BTC</div>
//                       <div className="text-sm flex items-center text-yellow-500">
//                         <Clock className="w-4 h-4 mr-1" />
//                         Pending Confirmation
//                       </div>
//                     </div>
//                   </div>
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Assets */}
//         <div className="bg-[#151820] rounded-xl p-6">
//           <h2 className="text-xl font-bold text-white mb-6">Your Assets</h2>
//           <div className="space-y-4">
//             <div className="flex items-center justify-between p-4 bg-[#1E2128] rounded-lg">
//               <div className="flex items-center space-x-4">
//                 <Bitcoin className="w-8 h-8 text-[#F7931A]" />
//                 <div>
//                   <div className="font-medium">Bitcoin</div>
//                   <div className="text-sm text-gray-400">BTC</div>
//                 </div>
//               </div>
//               <div className="text-right">
//                 <div className="font-medium">${balance.toLocaleString()}</div>
//                 <div className="text-sm text-gray-400">{(balance / BITCOIN_PRICE).toFixed(8)} BTC</div>
//                 <div className="text-sm text-green-500">+1.2%</div>
//               </div>
//             </div>
//             <div className="flex items-center justify-between p-4 bg-[#1E2128] rounded-lg">
//               <div className="flex items-center space-x-4">
//                 <Wallet className="w-8 h-8 text-[#627EEA]" />
//                 <div>
//                   <div className="font-medium">Ethereum</div>
//                   <div className="text-sm text-gray-400">ETH</div>
//                 </div>
//               </div>
//               <div className="text-right">
//                 <div className="font-medium">$0.00</div>
//                 <div className="text-sm text-gray-400">0.00 ETH</div>
//                 <div className="text-sm text-red-500">-0.8%</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }