// Array to store expenses
let expenses = [];

// Function to add expense
function addExpense(description, amount, category, date) {
    const expense = {
        id: Date.now(),
        description,
        amount: parseFloat(amount),
        category,
        date
    };
    expenses.push(expense);
    updateExpenseList();
    updateSummary();
    clearForm();
}

// Function to delete expense
function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    updateExpenseList();
    updateSummary();
}

// Function to update expense list in the table
function updateExpenseList() {
    const tableBody = document.getElementById('expenseTableBody');
    tableBody.innerHTML = '';

    expenses.forEach(expense => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.description}</td>
            <td>$${expense.amount.toFixed(2)}</td>
            <td>${expense.category}</td>
            <td>${expense.date}</td>
            <td><button class="delete-btn" onclick="deleteExpense(${expense.id})">Delete</button></td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to update summary
function updateSummary() {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    document.getElementById('totalExpenses').textContent = total.toFixed(2);
}

// Function to clear form
function clearForm() {
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('category').value = '';
    document.getElementById('date').value = '';
}

// Event listener for form submission
document.getElementById('expenseForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const description = document.getElementById('description').value;
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;

    if (description && amount && category && date) {
        addExpense(description, amount, category, date);
    }
});

// Set default date to today
document.getElementById('date').valueAsDate = new Date();