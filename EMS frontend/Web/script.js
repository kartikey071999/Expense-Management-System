const expenseForm = document.getElementById('expense-form');
const expensesList = document.getElementById('expenses-list');

// Function to fetch expenses from the backend and render them
async function fetchAndRenderExpenses() {
    // You should replace this URL with the actual URL of your FastAPI backend
    const apiUrl = 'http://127.0.0.1:8000/expenses/read';

    try {
        const response = await fetch(apiUrl);
        const expenses = await response.json();

        expensesList.innerHTML = ''; // Clear previous expenses

        expenses.forEach(expense => {
            const expenseItem = document.createElement('div');
            expenseItem.classList.add('expense-item');
            expenseItem.textContent = `${expense.name} - $${expense.amount}`;
            expensesList.appendChild(expenseItem);
        });
    } catch (error) {
        console.error('Error fetching expenses:', error);
    }
}

expenseForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const amount = parseFloat(document.getElementById('amount').value);

    // You should replace this URL with the actual URL of your FastAPI backend
    const apiUrl = 'http://127.0.0.1:8000/expenses/create';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                amount
            })
        });
        if (response.ok) {
            // If the expense was successfully added, fetch and render updated expenses
            fetchAndRenderExpenses();
        } else {
            console.error('Failed to add expense:', response.statusText);
        }
    } catch (error) {
        console.error('Error adding expense:', error);
    }
});

// Initial fetch and render of expenses when the page loads
fetchAndRenderExpenses();
