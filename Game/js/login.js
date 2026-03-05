document.getElementById("loginform").addEventListener("submit", function(event){
    event.preventDefault();
  
  const emailInput = document.getElementById("email").value.trim();
  const passwordInput = document.getElementById("password").value.trim();
  const message = document.getElementById("message")
    
  if (emailInput==="" || (passwordInput==="")) {//checks for blank fields
    message.innerText="please fill in all fields"
  
  return;}
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user=users.find(thisuser=>thisuser.email===emailInput) //search this user from users array
  //handling wrong email + good email with wrong password 
  if (!user){
    message.innerText="Email not found. Please register an account first."
    return;
    }
    if (user.password!==passwordInput){
        message.innerText="Incorrect password. Try again."
        return;
    }
  message.style.color="green";
  message.innerText="Login successfull!"
  localStorage.setItem("currentUser",JSON.stringify(user));

  setTimeout(()=>{
    window.location.href="game.html";},1000); //redirects to game page after 1s
  
});