import React, { useState } from 'react';
import Web3 from 'web3';
import "./index.css"
import { Header } from './Component/Header';
import { DepositCard } from './Component/DepositCard';
import { ServicesCard } from './Component/ServicesCard';
import { ReceiversCard } from './Component/ReceiversCard';

const App: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [receivers, setReceivers] = useState(['', '', '']);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
          setIsConnected(true);
        }
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    } else {
      console.log('MetaMask not detected');
    }
  };

  const handleReceiverChange = (index: number, value: string) => {
    const newReceivers = [...receivers];
    newReceivers[index] = value;
    setReceivers(newReceivers);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-400 to-blue-200 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Header isConnected={isConnected} onConnect={connectWallet} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DepositCard depositAmount={depositAmount} onDepositChange={setDepositAmount} />
          <ServicesCard />
        </div>

        <div className="mt-6">
          <ReceiversCard receivers={receivers} onReceiverChange={handleReceiverChange} />
        </div>
      </div>
    </div>
  );
};

export default App;
