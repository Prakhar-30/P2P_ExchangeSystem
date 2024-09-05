import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface DepositCardProps {
  depositAmount: string;
  onDepositChange: (value: string) => void;
}

export const DepositCard: React.FC<DepositCardProps> = ({ depositAmount, onDepositChange }) => (
  <Card>
    <CardHeader>
      <CardTitle>Deposit Funds</CardTitle>
      <CardDescription>Enter the amount to deposit in ETH</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <Label htmlFor="depositAmount">Amount (ETH)</Label>
        <Input
          id="depositAmount"
          type="number"
          placeholder="0.0"
          value={depositAmount}
          onChange={(e) => onDepositChange(e.target.value)}
        />
      </div>
    </CardContent>
    <CardFooter>
      <Button className="w-full bg-green-600 hover:bg-green-700">Deposit</Button>
    </CardFooter>
  </Card>
);