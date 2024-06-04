const expenseForm = document.getElementById('expense-form');
const expensesList = document.getElementById('expenses-list');
const messageDiv = document.getElementById('message');

// Function to show a message
function showMessage(message, isSuccess = true) {
    messageDiv.textContent = message;
    messageDiv.className = isSuccess ? 'success' : 'error';
    messageDiv.style.display = 'block';
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 3000);
}

// Function to fetch expenses from the backend and render them
async function fetchAndRenderExpenses() {
    const apiUrl = 'http://127.0.0.1:8000/expenses/read';

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch expenses');
        }
        const expenses = await response.json();

        expensesList.innerHTML = ''; // Clear previous expenses

        expenses.forEach(expense => {
            const expenseItem = document.createElement('div');
            expenseItem.classList.add('expense-item');
            expenseItem.textContent = `${expense.name} - $${expense.amount}`;
            expensesList.appendChild(expenseItem);
        });
    } catch (error) {
        showMessage('Error fetching expenses: ' + error.message, false);
        console.error('Error fetching expenses:', error);
    }
}

expenseForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    const name = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);

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
        if (!response.ok) {
            throw new Error('Failed to add expense');
        }
        showMessage('Expense added successfully');
        fetchAndRenderExpenses();
    } catch (error) {
        showMessage('Error adding expense: ' + error.message, false);
        console.error('Error adding expense:', error);
    }
});

// Initial fetch and render of expenses when the page loads
fetchAndRenderExpenses();
