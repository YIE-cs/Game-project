function validateEmail(email) {
    email = email.trim();
    if (email === "")
         return "Email cannot be empty";

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; //email requiremens (1 @, 1. etc.. )
    if (!emailPattern.test(email)) 
        return "Please input a valid email address";

    return true;
}

function validateUsername(username){
    if (username==="") 
        return "Username cannot be empty";
    if (username.length < 3) 
        return "Username must be at least 3 characters long";
    return true;
}

function validateDOB(dob) {
    if (!dob) return "Please select your date of birth";

    const birthDate = new Date(dob);
    const today = new Date();
    if (birthDate > today) return "Date of birth cannot be in the future";

    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 12) return "You must be at least 12 years old to have an account";
    return true;
}

function validatePhone(phone) {
    if (phone === "") return "Phone number cannot be empty";
    const phonePattern = /^\+?\d{7,15}$/;
    if (!phonePattern.test(phone)) return "Please enter a valid phone number";
    return true;
}

function validatePassword(password) {
    if (password.trim() === "")
         return "Password cannot be empty or just spaces";

    if (password.length < 8) 
        return "Password is too short";
    //using RegEx  
    const LowerCase = /[a-z]/.test(password); 
    const UpperCase = /[A-Z]/.test(password);
    const SpecialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    const Number = /[0-9]/.test(password);

    if (LowerCase && UpperCase && SpecialCharacters && Number) {
        return true; //valid
    } else {
        return "Password must contain at least one lowercase, one uppercase, one number, and one special character";
    }
}

function confirmPassword(password, confirmPassword) {
     if (confirmPassword === "")
         return "Please confirm your Password";

     if (confirmPassword !== password)
         return "The two passwords don't match";

     return true;
}

const passwordField = document.getElementById("password");
const strengthBar = document.getElementById("strength-bar");
const strengthText = document.getElementById("strength-text");
const togglePassword = document.getElementById("togglePassword");

passwordField.addEventListener("input", function () {
    let password = passwordField.value;
    let strength = 0;
    //increase password strength for each criteria met
    if (password.length >= 8) 
        strength++;

    if (/[A-Z]/.test(password)) 
        strength++;

    if (/[a-z]/.test(password)) 
        strength++;

    if (/[0-9]/.test(password)) 
        strength++;

    if (/[^A-Za-z0-9]/.test(password)) 
        strength++;
//live ux for password strength 
    if (strength === 0) {
        strengthBar.style.width = "0%";
        strengthText.innerText = "";
    } else if (strength <= 2) {
        strengthBar.style.width = "20%";
        strengthBar.style.background = "red";
        strengthText.innerText = "Weak";
        strengthText.style.color = "red";
    } else if (strength === 3) {
        strengthBar.style.width = "40%";
        strengthBar.style.background = "orange";
        strengthText.innerText = "Medium";
        strengthText.style.color = "orange";
    } else if (strength === 4) {
        strengthBar.style.width = "80%";
        strengthBar.style.background = "yellowgreen";
        strengthText.innerText = "Strong";
        strengthText.style.color = "yellowgreen";
    } else {
        strengthBar.style.width = "100%";
        strengthBar.style.background = "green";
        strengthText.innerText = "Very Strong";
        strengthText.style.color = "green";
    }
});

togglePassword.addEventListener("click", () => {
    if (passwordField.type === "password") {
        passwordField.type = "text";
        togglePassword.className = "fa-solid fa-eye";
    } else {
        passwordField.type = "password";
        togglePassword.className = "fa-solid fa-eye-slash";
    }
});

const confirmField = document.getElementById("confirmPassword");
const toggleConfirm = document.getElementById("toggleConfirmPassword");

toggleConfirm.addEventListener("click", () => {
    if (confirmField.type === "password") {
        confirmField.type = "text";
        toggleConfirm.className = "fa-solid fa-eye";
    } else {
        confirmField.type = "password";
        toggleConfirm.className = "fa-solid fa-eye-slash";
    }
});


document.getElementById("Registrationform").addEventListener("submit", function(event){
    event.preventDefault();
    const usernameInput=document.getElementById("username").value;
    const dobInput=document.getElementById("dob").value;
    const phoneInput=document.getElementById("phone-num").value;
    const emailInput = document.getElementById("email").value;
    const passwordInput = document.getElementById("password").value;
    const confirmInput = document.getElementById("confirmPassword").value;
    //check validation for each input and  display appropriate message

    const usernameValidation=validateUsername(usernameInput);
    if (usernameValidation!== true){
        document.getElementById("message").innerText= usernameValidation
    }

    const dobValidation = validateDOB(dobInput);
    if (dobValidation !== true) {
        document.getElementById("message").innerText = dobValidation;
        return;
    }

    const phoneValidation = validatePhone(phoneInput);
    if (phoneValidation !== true) {
        document.getElementById("message").innerText = phoneValidation;
        return;
    }

    const emailValidation = validateEmail(emailInput);
    if (emailValidation !== true) {
        document.getElementById("message").innerText = emailValidation;
        return;
    }

    const passwordValidation = validatePassword(passwordInput);
    if (passwordValidation !== true) {
        document.getElementById("message").innerText = passwordValidation;
        return;
    }

    const confirmValidation = confirmPassword(passwordInput, confirmInput);
    if (confirmValidation !== true) {
        document.getElementById("message").innerText = confirmValidation;
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const emailExist = users.some(user => user.email === emailInput);

    if (emailExist) {
        document.getElementById("message").innerText = "This email is already in use";
        return;
    }
    //create new user, store it in LocalStorage
    const newUser = {
        email: emailInput,
        password: passwordInput,
        dob: dobInput,
        phone: phoneInput,
        username: usernameInput
    };

    users.push(newUser);
    //save users array to local storage and convert it to JSON string
    localStorage.setItem("users", JSON.stringify(users));

    document.getElementById("message").innerText = "Registration successful";

    setTimeout(() => {
        window.location.href = "login.html";
    }, 1000);
});

