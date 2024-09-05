// src/components/Header.tsx
import React from 'react';
import { Button } from "./ui/button";

interface HeaderProps {
  isConnected: boolean;
  onConnect: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isConnected, onConnect }) => (
  <header className="mb-6">
    <h1 className="text-3xl font-bold text-green-800 mb-4">EtherTransfer</h1>
    <Button
      onClick={onConnect}
      className={`${isConnected ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
    >
      {isConnected ? 'Wallet Connected' : 'Connect MetaMask'}
    </Button>
  </header>
);