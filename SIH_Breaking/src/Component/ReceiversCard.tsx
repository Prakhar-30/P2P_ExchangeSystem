import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface ReceiversCardProps {
  receivers: string[];
  onReceiverChange: (index: number, value: string) => void;
}

export const ReceiversCard: React.FC<ReceiversCardProps> = ({ receivers, onReceiverChange }) => (
  <Card>
    <CardHeader>
      <CardTitle>Receiver Addresses</CardTitle>
      <CardDescription>Enter up to three receiver addresses</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {receivers.map((receiver, index) => (
          <div key={index} className="space-y-2">
            <Label htmlFor={`receiver${index + 1}`}>Receiver {index + 1}</Label>
            <Input
              id={`receiver${index + 1}`}
              type="text"
              placeholder="0x..."
              value={receiver}
              onChange={(e) => onReceiverChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>
    </CardContent>
    <CardFooter>
      <Button className="w-full bg-blue-600 hover:bg-blue-700">Transfer Funds</Button>
    </CardFooter>
  </Card>
);