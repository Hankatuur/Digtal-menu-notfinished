// auth.js


function handleLogin(event) { event.preventDefault();

const email = document.getElementById('email').value; const password = document.getElementById('password').value; const btnText = document.querySelector('.btn-text'); const loadingSpinner = document.querySelector('.loading-spinner');

btnText.style.display = 'none'; loadingSpinner.style.display = 'inline-block';

setTimeout(() => { if (users[email] && users[email].password === password) { currentUser = users[email];

if (currentUser.role === 'admin') {
    document.getElementById('adminName').textContent = currentUser.name;
    showPage('admin');
    renderAdminMenu();
  } else {
    document.getElementById('userName').textContent = currentUser.name;
    showPage('menu');
    renderMenu();
  }

  showToast('Login Successful', 'Welcome back!', 'success');
} else {
  showToast('Login Failed', 'Invalid email or password', 'error');
}

btnText.style.display = 'inline';
loadingSpinner.style.display = 'none';

}, 1000); }

function handleLogout() { currentUser = null; cart = []; updateCartDisplay(); showPage('login'); document.getElementById('loginForm').reset(); showToast('Logged Out', 'See you next time!', 'info'); }


// function handleLogin(event) {
//     event.preventDefault();
    
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
//     const btnText = document.querySelector('.btn-text');
//     const loadingSpinner = document.querySelector('.loading-spinner');
    
//     // Show loading state
//     btnText.style.display = 'none';
//     loadingSpinner.style.display = 'inline-block';
    
//     setTimeout(() => {
//         if (users[email] && users[email].password === password) {
//             currentUser = users[email];
            
//             if (currentUser.role === 'admin') {
//                 document.getElementById('adminName').textContent = currentUser.name;
//                 showPage('admin');
//                 renderAdminMenu();
//             } else {
//                 document.getElementById('userName').textContent = currentUser.name;
//                 showPage('menu');
//                 renderMenu();
//             }
            
//             showToast('Login Successful', 'Welcome back!', 'success');
//         } else {
//             showToast('Login Failed', 'Invalid email or password', 'error');
//         }
        
//         // Hide loading state
//         btnText.style.display = 'inline';
//         loadingSpinner.style.display = 'none';
//     }, 1000);
// }

// function handleLogout() {
//     currentUser = null;
//     cart = [];
//     updateCartDisplay();
//     showPage('login');
//     document.getElementById('loginForm').reset();
//     showToast('Logged Out', 'See you next time!', 'info');
// }