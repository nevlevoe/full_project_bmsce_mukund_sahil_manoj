function myFunction() {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
  var myInput = document.getElementById("myInput");
  var letter = document.getElementById("letter");
  
  // When the user clicks on the password field, show the message box
  myInput.onfocus = function() {
    document.getElementById("message").style.display = "block";
  }
  
  // When the user clicks outside of the password field, hide the message box
  myInput.onblur = function() {
    document.getElementById("message").style.display = "none";
  }
  
  // When the user starts to type something inside the password field
  myInput.onkeyup = function(){
    // Validate lowercase letters
    var lowerCaseLetters = /(?=.*[!@#$%^&])(?=.*\d)(?=.*[A-Z]).{8,}/g;
    if(myInput.value.match(lowerCaseLetters)) {  
      letter.innerHTML="Password is <b>Strong</b>"
      letter.classList.remove("invalid");
      letter.classList.add("valid");
    } else {
      letter.classList.remove("valid");
      letter.classList.add("invalid");
    }
  }