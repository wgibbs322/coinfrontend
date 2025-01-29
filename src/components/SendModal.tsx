import { useState, FormEvent } from 'react';
import { X, Bitcoin } from 'lucide-react';

interface SendModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (amount: number, address: string) => void;
  btcPrice: number;
  balance: number;
}

export function SendModal({ isOpen, onClose, onSend, btcPrice, balance }: SendModalProps) {
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const btcAmount = parseFloat(amount) / btcPrice;
  const isInsufficientBalance = parseFloat(amount) > balance;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isInsufficientBalance) {
      setError('Insufficient balance');
      return;
    }
    
    if (step === 1) {
      setError('');
      setStep(2);
    } else {
      onSend(parseFloat(amount), address);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setStep(1);
        setAmount('');
        setAddress('');
        setError('');
        onClose();
      }, 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#151820] rounded-xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-8">
            <div className="text-green-500 text-xl mb-2">Transaction Submitted!</div>
            <div className="text-gray-400">
              Amount: ${amount} (≈ {btcAmount.toFixed(8)} BTC)
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold text-white mb-6">
              {step === 1 ? 'Send Bitcoin' : 'Confirm Transaction'}
            </h2>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
                {error}
              </div>
            )}

            {step === 1 ? (
              <>
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Amount (USD)
                    </label>
                    <span className="text-sm text-gray-400">
                      Available: ${balance.toLocaleString()}
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className={`w-full px-3 py-2 bg-[#1E2128] border rounded-lg text-white ${
                        isInsufficientBalance 
                          ? 'border-red-500' 
                          : 'border-gray-700'
                      }`}
                      placeholder="0.00"
                      required
                    />
                    <div className="absolute right-3 top-2 text-gray-400">
                      ≈ {btcAmount.toFixed(8)} BTC
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Bitcoin Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 bg-[#1E2128] border border-gray-700 rounded-lg text-white"
                    placeholder="Enter recipient's Bitcoin address"
                    required
                  />
                </div>
              </>
            ) : (
              <div className="mb-6">
                <div className="bg-[#1E2128] p-4 rounded-lg mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Amount:</span>
                    <span className="text-white">${amount}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">BTC Amount:</span>
                    <span className="text-white">{btcAmount.toFixed(8)} BTC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">To Address:</span>
                    <span className="text-white">{address.slice(0, 16)}...</span>
                  </div>
                </div>
                <div className="text-sm text-gray-400 text-center">
                  Please verify all details before confirming
                </div>
              </div>
            )}

            <div className="flex space-x-4">
              {step === 2 && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-2 px-4 border border-gray-700 rounded-lg text-white hover:bg-gray-700"
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                className={`flex-1 py-2 px-4 rounded-lg text-white ${
                  isInsufficientBalance
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-[#3D89F5] hover:bg-blue-600'
                }`}
                disabled={isInsufficientBalance}
              >
                {step === 1 ? 'Continue' : 'Confirm Send'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}