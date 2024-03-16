import { useEffect, useState } from "react";

function minimizeTransactions(doneTransactions, numPeople) {
    let balance = {};
    for (let i = 0; i < numPeople; i++) {
        balance[i] = 0;
    }

    let transactions = [];
    if(numPeople==1)
        return transactions;

    doneTransactions.forEach(transaction => {
        const amountPerShouldPay = transaction.amount / transaction.should_pay.length;
        const amountPerPaid = transaction.amount / transaction.paid.length;

        transaction.should_pay.forEach(person => {
            balance[person] -= Math.round(amountPerShouldPay * 100) / 100;
        });

        transaction.paid.forEach(person => {
            balance[person] += Math.round(amountPerPaid * 100) / 100;
        });
    });

    let sortedBalance = Object.entries(balance).sort((a, b) => a[1] - b[1]);
    // let transactions = [];

    while (sortedBalance.length) {

        if (sortedBalance.length === 2) {
            let [poorPerson, poorAmount] = sortedBalance.shift();
            let [richPerson, richAmount] = sortedBalance.pop();
            let amountPaid = Math.max(-poorAmount, richAmount);
            transactions.push({
                from: parseInt(poorPerson),
                to: parseInt(richPerson),
                amount: Math.round(amountPaid * 100) / 100
            });
            break;
        }

        let [poorPerson, poorAmount] = sortedBalance.shift();
        let [richPerson, richAmount] = sortedBalance.pop();

        if(poorAmount === 0 && richAmount === 0)
            break;

        let amountPaid = Math.min(-poorAmount, richAmount);

        transactions.push({
            from: parseInt(poorPerson),
            to: parseInt(richPerson),
            amount: Math.round(amountPaid * 100) / 100
        });

        poorAmount += amountPaid;
        richAmount -= amountPaid;

        if (poorAmount < 0) {
            sortedBalance.unshift([poorPerson, Math.round(poorAmount * 100) / 100]);
        }

        if (richAmount > 0) {
            sortedBalance.push([richPerson, Math.round(richAmount * 100) / 100]);
        }

        sortedBalance = sortedBalance.sort((a, b) => a[1] - b[1]);
    }

    return transactions;
}


export default function SplitMoney() {  
    const [expenses, setExpenses] = useState(() => {
        const savedExpenses = localStorage.getItem('expenses');
        return savedExpenses ? JSON.parse(savedExpenses) : [];
    });

    const [users, setUsers] = useState(() => {
        const people = JSON.parse(localStorage.getItem('people'));
        return people ? people : [];
    });

    const [transactions, setTransactions] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        console.log('expenses', expenses);
        const newTransactions = minimizeTransactions(expenses, users.length);
        setTransactions(newTransactions);

        // To view the updated transactions in console after they're set
        console.log('Updated transactions:', newTransactions);
    }, [expenses, users]); // Add dependencies here to ensure useEffect reacts to their changes
return (
    <div className="Transaction">
        {/* <h1 className="text-3xl font-bold underline">Split Money</h1> */}
        <p className="text-red-500">{errorMessage}</p>

        {transactions.length === 0 ? (
            <p>No transaction needed.</p>
        ) : (
            <ul>
                {transactions.map((transaction, index) => (
                    <li key={index}>
                        {users[transaction.from]} will pay {users[transaction.to]} {transaction.amount}
                    </li>
                ))}
            </ul>
        )}
    </div>
);
                }

