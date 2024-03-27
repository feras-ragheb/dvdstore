const https = require('https');

// Function to fetch customer data using a callback
function fetchCustomerDataWithCallback(callback) {
  const url = 'https://jsonplaceholder.typicode.com/users';
  https.get(url, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      const customers = JSON.parse(data);
      callback(null, customers);
    });
  }).on('error', (error) => {
    callback(error, null);
  });
}

// Usage example
fetchCustomerDataWithCallback((error, customers) => {
  if (error) {
    console.error('Error fetching customer data:', error);
  } else {
    console.log('Customers (Callback):', customers);
  }
});
