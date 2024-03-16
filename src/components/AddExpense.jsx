import { useEffect, useState } from 'react';

export default function AddExpense() {
    const [expenses, setExpenses] = useState(() => {
        const savedExpenses = localStorage.getItem('expenses');
        return savedExpenses ? JSON.parse(savedExpenses) : [];
    });
    const [description, setDescription] = useState('');
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
        const description = e.target.elements.description.value;

        if (selectedShouldPay.length === 0 || selectedPaid.length === 0 || !amount) {
            setErrorMessage('Please ensure all fields are filled out and selections are made.');
            return;
        }


        setExpenses([...expenses, { should_pay: selectedShouldPay, paid: selectedPaid, amount, name: description}]);
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

<div>
  <input
    className="input-description" // Add a class for styling
    type="text"
    name="description"
    placeholder="Description"
    required
  />
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


           
           <div className='table-for-expense'>
            {expenses.length > 0 ?( <table className="custom-table">
  <thead>
    <tr>
      <th>Description</th>
      <th>Who Should Pay</th>
      <th>Paid By</th>
      <th>Amount</th>
        <th>Delete</th>

    </tr>
  </thead>
  <tbody>
    {expenses.map((expense, index) => (
      <tr key={index}>
       
        <td>{expense.name || 'N/A'}</td>
        <td>
          {Array.isArray(expense.should_pay) ? 
            expense.should_pay.map((userIndex, idx) => (
              <span key={idx}>
                {users[userIndex]}{idx < expense.should_pay.length - 1 ? ', ' : ''}
              </span>
            )) : 'N/A'
          }
        </td>
        <td>
          {Array.isArray(expense.paid) ? 
            expense.paid.map((userIndex, idx) => (
              <span key={idx}>
                {users[userIndex]}{idx < expense.paid.length - 1 ? ', ' : ''}
              </span>
            )) : 'N/A'
          }
        </td>
        <td>${expense.amount}</td>
        <td>
          <button onClick={() => clearExpense(index)} className="delete-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6zM14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3h11V2h-11z"/>
            </svg>
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>) : <p>No expenses added.</p>}
</div>

        </div>
    );
}


