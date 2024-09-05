// src/components/ServicesCard.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const services = [
  { name: "Fast Transfer", description: "Transfer funds within minutes" },
  { name: "Secure Transactions", description: "End-to-end encryption for all transfers" },
  { name: "Low Fees", description: "Competitive rates for all transactions" },
];

export const ServicesCard: React.FC = () => (
  <Card>
    <CardHeader>
      <CardTitle>Our Services</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        {services.map((service, index) => (
          <li key={index} className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div>
              <p className="font-semibold">{service.name}</p>
              <p className="text-sm text-gray-600">{service.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);
