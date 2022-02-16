type Transaction = {
  timestamp: string;
  fromAddress?: string;
  toAddress: string;
  amount: string;
};

type CoordinatePoint = {
  x: string;
  y: number;
};

export default (address: string, transactions: Transaction[]) => {
  if (!transactions) return [];
  let balance = 0;

  const ledger = transactions.map((transaction) => {
    const { timestamp, fromAddress, toAddress, amount } = transaction;
    const amountNumber = parseFloat(amount);
    if (toAddress === address && fromAddress !== address) {
      balance += amountNumber;
    } else if (fromAddress === address && toAddress !== address) {
      balance -= amountNumber;
    }

    return {
      x: timestamp,
      y: balance,
    };
  });

  return ledger as CoordinatePoint[];
};
