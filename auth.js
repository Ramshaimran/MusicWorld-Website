document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const loginBtn = document.getElementById("loginBtn");
    const showSignup = document.getElementById("showSignup");
    const showLogin = document.getElementById("showLogin");
    const loginSection = document.getElementById("loginSection");
    const signupSection = document.getElementById("signupSection");
    const logoutBtn = document.getElementById("logoutBtn");
        // Check if user is logged in
        function checkLoginStatus() {
            return localStorage.getItem("isLoggedIn") === "true";
        }
    
        function updateLoginUI() {
            if (checkLoginStatus()) {
                const loggedInUser = localStorage.getItem("loggedInUser") || "";
                const userInitial = loggedInUser.charAt(0).toUpperCase(); // Get first letter in uppercase
                loginBtn.textContent = userInitial || "U"; // Default to "U" if no name is found
                loginBtn.classList.add("user-initial"); // Add styling if needed
            } else {
                loginBtn.textContent = "Login";
                loginBtn.classList.remove("user-initial"); // Remove styling
            }
        }
    

        // Toggle Login & Signup Forms
        if (showSignup && showLogin) {
            showSignup.addEventListener("click", function (e) {
                e.preventDefault();
                loginSection.classList.add("hidden");
                signupSection.classList.remove("hidden");
            });

            showLogin.addEventListener("click", function (e) {
                e.preventDefault();
                signupSection.classList.add("hidden");
                loginSection.classList.remove("hidden");
            });
        }

        // Handle Signup
       
        if (signupForm) {
            signupForm.addEventListener("submit", function (event) {
                event.preventDefault();

                const fullName = document.getElementById("fullName").value;
                const email = document.getElementById("email").value;
                const newUsername = document.getElementById("newUsername").value;
                const newPassword = document.getElementById("newPassword").value;
                const confirmPassword = document.getElementById("confirmPassword").value;
                const termsChecked = document.getElementById("terms").checked;

                if (newPassword !== confirmPassword) {
                    alert("Passwords do not match!");
                    return;
                }

                if (!termsChecked) {
                    alert("You must agree to the Terms and Conditions!");
                    return;
                }

                const users = JSON.parse(localStorage.getItem("users")) || [];
                const existingUser = users.find(user => user.username === newUsername);

                if (existingUser) {
                    alert("Username already exists. Try another one.");
                    return;
                }

                users.push({ fullName, email, username: newUsername, password: newPassword });
                localStorage.setItem("users", JSON.stringify(users));

                alert("Account created successfully! Please log in.");
                signupSection.classList.add("hidden");
                loginSection.classList.remove("hidden");
            });
        }
        // Handle Login
        if (loginForm) {
            loginForm.addEventListener("submit", function (event) {
                event.preventDefault();

                const username = document.getElementById("username").value;
                const password = document.getElementById("password").value;

                const users = JSON.parse(localStorage.getItem("users")) || [];
                const validUser = users.find(user => user.username === username && user.password === password);

                if (validUser) {
                    localStorage.setItem("isLoggedIn", "true");
                    localStorage.setItem("loggedInUser", validUser.username); // Store username for initials
                    alert("Login Successful now you can download the songs!");
                    window.location.href = "index.html"; // Redirect to home page
                } else {
                    alert("Invalid username or password.");
                }
            });
        }


        // Handle Logout

 // Handle Logout
 if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
        localStorage.setItem("isLoggedIn", "false");
        localStorage.removeItem("loggedInUser"); // Remove user info
        alert("Logged out successfully.");
        window.location.href = "auth.html"; // Redirect to login page
    });
}

// Toggle Login & Signup Forms
if (showSignup && showLogin) {
    showSignup.addEventListener("click", function (e) {
        e.preventDefault();
        loginSection.classList.add("hidden");
        signupSection.classList.remove("hidden");
    });

    showLogin.addEventListener("click", function (e) {
        e.preventDefault();
        signupSection.classList.add("hidden");
        loginSection.classList.remove("hidden");
    });
}

updateLoginUI();
});
