const https = require('https');

// Function to fetch customer data using async/await
async function fetchCustomerDataWithAsyncAwait() {
  const url = 'https://jsonplaceholder.typicode.com/users';

  try {
    const response = await new Promise((resolve, reject) => {
      https.get(url, (res) => {
        resolve(res);
      }).on('error', (error) => {
        reject(error);
      });
    });

    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    await new Promise((resolve) => {
      response.on('end', () => {
        resolve();
      });
    });

    const customers = JSON.parse(data);
    return customers;
  } catch (error) {
    throw error;
  }
}

// Usage example
(async () => {
  try {
    const customers = await fetchCustomerDataWithAsyncAwait();
    console.log('Customers (Async/Await):', customers);
  } catch (error) {
    console.error('Error fetching customer data:', error);
  }
})();
