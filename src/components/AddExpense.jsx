import { useEffect, useState } from 'react';

export default function AddExpense() {
    const [expenses, setExpenses] = useState(() => {
        const savedExpenses = localStorage.getItem('expenses');
        return savedExpenses ? JSON.parse(savedExpenses) : [];
    });
    const [users, setUsers] = useState([]);
    const [selectedShouldPay, setSelectedShouldPay] = useState([]);
    const [selectedPaid, setSelectedPaid] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const people = JSON.parse(localStorage.getItem('people'));
        if (people) {
            setUsers(people);
        }
    }, []);



    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(expenses));
        console.log('expenses', expenses);
    }, [expenses]);

    const handleSelectAll = (type, isSelected) => {
        const userIndexes = users.map((user, index) => index);
        if (type === 'shouldPay') {
            
            // console.log('userIndexes', userIndexes);

            isSelected ? setSelectedShouldPay(userIndexes) : setSelectedShouldPay([]);
        } else {
            isSelected ? setSelectedPaid(userIndexes) : setSelectedPaid([]);
        }
    };

    const handleCheckboxChange = (type, user, isChecked) => {
        const setSelected = type === 'shouldPay' ? setSelectedShouldPay : setSelectedPaid;
        const selected = type === 'shouldPay' ? selectedShouldPay : selectedPaid;

        if (isChecked) {
            setSelected([...selected, user]);
        } else {
            setSelected(selected.filter(name => name !== user));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const amount = e.target.elements.amount.value;

        if (selectedShouldPay.length === 0 || selectedPaid.length === 0 || !amount) {
            setErrorMessage('Please ensure all fields are filled out and selections are made.');
            return;
        }

        setExpenses([...expenses, { should_pay: selectedShouldPay, paid: selectedPaid, amount }]);
        e.target.reset();
        setSelectedShouldPay([]);
        setSelectedPaid([]);
        setErrorMessage('');
    };

    const clearExpense = (index) => {
        const newExpenses = [...expenses];
        newExpenses.splice(index, 1);
        setExpenses(newExpenses);
        localStorage.setItem('expenses', JSON.stringify(newExpenses));
    };

    return (
        <div>
            {/* <h1 className="text-3xl font-bold underline">Add Expense</h1> */}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                   <div className="who-should-pay-label">Who Should Pay</div> 
                    
                    <label>
                        <input
                            type="checkbox"
                            checked={selectedShouldPay.length === users.length}
                            onChange={(e) => handleSelectAll('shouldPay', e.target.checked)}
                        /> All of Them
                    </label>

                    {users.map((user, index) => (
                        <label key={index}>
                            <input
                                type="checkbox"
                                value={user}
                                checked={selectedShouldPay.includes(index)}
                                onChange={(e) => handleCheckboxChange('shouldPay', index, e.target.checked)}
                            /> {user}
                        </label>
                    ))}
                </div>
                
                <div>

                    <div className="who-paid-label">Who Paid</div>
                    <label>
                        <input
                            type="checkbox"
                            checked={selectedPaid.length === users.length}
                            onChange={(e) => handleSelectAll('paid', e.target.checked)}
                        /> All of Them
                    </label>
                    {users.map((user, index) => (
                        <label key={index}>
                            <input
                                type="checkbox"
                                value={user}
                                checked={selectedPaid.includes(index)}
                                onChange={(e) => handleCheckboxChange('paid', index, e.target.checked)}
                            /> {user}
                        </label>
                    ))}
                </div>
                <input
                    className="border-2 border-gray-800 mt-4"
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    required // Ensure this field must be filled
                />
                <button className="" type="submit">
                    Add
                </button>
            </form>

            {/* add a button for clearing that expense */}
            <ol className="custom-ol">
                {expenses.map((expense, index) => (
                    <li key={index}>
                        {/* show the users in user array */}
                        Should Pay: 
                        {
                            Array.isArray(expense.should_pay) ? expense.should_pay.map((userIndex, index) => {
                                return <span key={index}>{users[userIndex]}{index === expense.should_pay.length - 1 ? '' : ', '}</span>;
                            }) : 'N/A'
                        }
                        Paid: 
                        {
                            Array.isArray(expense.paid) ? expense.paid.map((userIndex, index) => {
                                return <span key={index}>{users[userIndex]}{index === expense.paid.length - 1 ? '' : ', '}</span>;
                            }) : 'N/A'
                        }
                        Amount: ${expense.amount}
                        <button onClick={() => clearExpense(index)} className="ml-4 py-1 px-2 bg-red-500 text-white rounded">Clear Expense</button>
                    </li>

                ))}
            </ol>
        </div>
    );
}


