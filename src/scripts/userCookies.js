// Function to get the cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}

// Function to set the cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}

// Check if the user's name is stored in cookies
function checkUser() {
    const userName = getCookie("userName");
    const welcomeSection = document.getElementById("user-welcome");

    if (userName) {
        // If the cookie already exists, display the below
        welcomeSection.textContent = `Welcome back, ${userName}!`;
    } else {
        // If the cookie does not exist, create a new one
        const name = prompt("What's your name?");
        if (name) {
            setCookie("userName", name, 7); // Store the cookie for 7 days
            welcomeSection.textContent = `Welcome, ${name}`;
        }
    }
}

// When the page loads, run the function "checkUser" defined above
document.addEventListener("DOMContentLoaded", checkUser);
