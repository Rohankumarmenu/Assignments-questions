//Many Accounts


// We can use JavaScript frameworks such as Node.js with Express. 


// we will Set up the project and install the required dependencies:
// mkdir bank-app
// cd bank-app
// npm init -y
// npm install express

// Creating an app.js file and implement the Transaction Microservice:

// We will follow the below code:-


const express = require('express');

const app = express();
const port = 3000;

// Account data
const accounts = [
  { account_id: 'A1', balance: 0, users: ['U1', 'U2'] },
  { account_id: 'A2', balance: 0, users: ['U3', 'U4'] }
];

// User data
const users = [
  { user_id: 'U1', name: 'User 1' },
  { user_id: 'U2', name: 'User 2' },
  { user_id: 'U3', name: 'User 3' },
  { user_id: 'U4', name: 'User 4' }
];

// Helper function to get an account by ID
function getAccountById(accountId) {
  return accounts.find(account => account.account_id === accountId);
}

// Helper function to get a user by ID
function getUserById(userId) {
  return users.find(user => user.user_id === userId);
}

// API endpoint for credit operation
app.post('/credit', (req, res) => {
  const { userId, accountId, amount } = req.body;

  const account = getAccountById(accountId);
  const user = getUserById(userId);

  if (!account || !user) {
    res.status(404).send('Account or user not found');
    return;
  }

  // Perform credit operation
  account.balance += amount;

  // Check maximum balance limit
  if (account.balance > 10000000) {
    res.status(400).send('Account balance cannot exceed 10 million');
    return;
  }

  res.send(`Successfully credited ${amount} to account ${accountId}`);
});

// API endpoint for debit operation
app.post('/debit', (req, res) => {
  const { userId, accountId, amount } = req.body;

  const account = getAccountById(accountId);
  const user = getUserById(userId);

  if (!account || !user) {
    res.status(404).send('Account or user not found');
    return;
  }

  // Perform debit operation
  account.balance -= amount;

  // Check minimum balance limit
  if (account.balance < 0) {
    res.status(400).send('Account balance cannot be negative');
    return;
  }

  res.send(`Successfully debited ${amount} from account ${accountId}`);
});

app.use(express.json());

app.listen(port, () => {
  console.log(`Transaction Microservice is running on port ${port}`);
});

//For running the code we will use :-  node app.js


// Now, we can make requests to the Transaction Microservice API endpoints while credit and debit operations:

// To credit an amount to an account:

// Method: POST
// URL: http://localhost:3000/credit
// Request body: { "userId": "U1", "accountId": "A1", "amount": 5000 }
// To debit an amount from an account:

// Method: POST
// URL: http://localhost:3000/debit
// Request body: `{ "userId": "U1", "accountId": "A
