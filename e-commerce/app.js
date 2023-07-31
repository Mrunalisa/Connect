const auth = firebase.auth();
function signUp() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert("Account created successfully!");
      window.location.href="index.html";
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("Error creating account: ", errorMessage);
      alert(errorMessage);
    });
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert("Logged in successfully!");
      window.location.href="index.html";
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("Error logging in: ", errorMessage);
      alert(errorMessage);
    });   
}

function resetpassword()
{
  var forgetemail=document.getElementById("user_email").value
  firebase.auth().sendPasswordResetEmail(forgetemail)
  .then(() => {

      alert("Reset Send To Your Email")
  })
  .catch((error) => {
      alert("Error")
  });
}

function logout() {
  auth.signOut()
    .then(() => {
      console.log("Logged out successfully!");
      alert("Logged out successfully!");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("Error logging out: ", errorMessage);
      alert(errorMessage);
    });
}

function buyNow() {
  window.location.href = "checkout.html";
}

function addToCart() {
  alert("Item has been added to cart.");
}