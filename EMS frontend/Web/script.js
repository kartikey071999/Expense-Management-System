const expenseForm = document.getElementById('expense-form');
const expensesList = document.getElementById('expenses-list');

// Function to fetch expenses from the backend and render them
async function fetchAndRenderExpenses() {
    // You should replace this URL with the actual URL of your FastAPI backend
    const apiUrl = 'https://your-fastapi-backend.com/expenses';

    try {
        const response = await fetch(apiUrl);
        const expenses = await response.json();

        expensesList.innerHTML = ''; // Clear previous expenses

        expenses.forEach(expense => {
            const expenseItem = document.createElement('div');
            expenseItem.classList.add('expense-item');
            expenseItem.textContent = `${expense.description} - $${expense.amount} (${expense.category})`;
            expensesList.appendChild(expenseItem);
        });
    } catch (error) {
        console.error('Error fetching expenses:', error);
    }
}

expenseForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;

    // You should replace this URL with the actual URL of your FastAPI backend
    const apiUrl = 'https://your-fastapi-backend.com/add-expense';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                description,
                amount,
                category
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
