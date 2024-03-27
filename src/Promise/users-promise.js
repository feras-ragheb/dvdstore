const https = require('https');

// Function to fetch customer data using a promise
function fetchCustomerDataWithPromise() {
  return new Promise((resolve, reject) => {
    const url = 'https://jsonplaceholder.typicode.com/users';
    https.get(url, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        const customers = JSON.parse(data);
        resolve(customers);
      });
    }).on('error', (error) => {
      reject(error+", nothning working!!!!!!");
    });
  });
}

// Usage example
fetchCustomerDataWithPromise()
  .then((customers) => {
    console.log('Customers (Promise):', customers);
  })
  .catch((error) => {
    console.error('Error fetching customer data:', error);
  });
