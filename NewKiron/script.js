function doGet(e) {
    const sheet = SpreadsheetApp.openById('1pUdq-WM7Bgg_U4PO_JYQoq5R5VQsU_0f204_H0OHUBo').getActiveSheet();
    const data = sheet.getDataRange().getValues();
  
    return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
  }
  // Toggle between Sign In and Sign Up forms
  document.querySelector('.img__btn').addEventListener('click', function () {
      document.querySelector('.cont').classList.toggle('s--signup');
  });
  
  // Handle Sign-Up form submission
  const scriptURL = 'https://script.google.com/macros/s/AKfycbwR1VW1EZLdP-LPBARmZ4UnzVzcw_Yc0e2Ly8vdlPb7Usjkf_abnXKI2k45Zni0y1Nt/exec';
  const signupForm = document.getElementById('contact-form');
  
  signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      fetch(scriptURL, { method: 'POST', body: new FormData(signupForm) })
          .then((response) => {
              alert('Thank you! Your form has been submitted successfully.');
              window.location.reload();
          })
          .catch((error) => {
              console.error('Error!', error.message);
          });
  });
  
  // Handle Login form submission
  const loginForm = document.getElementById('login-form');
  
  loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      try {
          // Fetch credentials from the Google Sheet
          const response = await fetch('https://script.google.com/macros/s/AKfycbwR1VW1EZLdP-LPBARmZ4UnzVzcw_Yc0e2Ly8vdlPb7Usjkf_abnXKI2k45Zni0y1Nt/exec');
          const data = await response.json();
  
          // Check credentials
          const validUser = data.find((row) => row[1] === email && row[3] === password); // Adjust column indices if needed
  
          if (validUser) {
              alert('Login successful!');
              window.location.href = 'dashboard.html';
          } else {
              alert('Invalid email or password.');
          }
      } catch (error) {
          console.error('Error fetching credentials:', error);
          alert('Error verifying credentials. Please try again later.');
      }
  });
  