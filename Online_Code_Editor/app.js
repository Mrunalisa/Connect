const auth = firebase.auth();
const database = firebase.database();

function signUp() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log("Account created successfully with ID: ", user.uid);
      alert("Account created successfully!");
      window.location.href="index.html";

      database.ref('users/' + user.uid).set({
        email : email,
        password : password,
        userId : user.uid,
      })
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
      // Signed in
      const user = userCredential.user;
      console.log("Logged in successfully with ID: ", user.uid);
      alert("Logged in successfully!");
      window.location.href="index.html";
      database.ref('users/' + user.uid).set({
        email : email,
        password : password,
        userId : user.uid,
      })
      

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


//for ide
function saveFile() {
  // Get the current user's ID
  var user = firebase.auth().currentUser;
  if (!user) {
    // User is not logged in, redirect to login page
    alert("Please login first for save file in database");
    window.location.href = "signup.html";
    return;
  }
  
  var userId = user.uid;
  var fileName = document.getElementById("filename").value;
  var fileContent = document.getElementById("source").value;

  // Create a reference to the file in Firebase Storage
  var storageRef = firebase.storage().ref().child(userId + "/" + fileName);

  // Upload the file to Firebase Storage
  storageRef.putString(fileContent)
    .then(function(snapshot) {
      console.log('File saved successfully.');
      alert('File saved successfully.');
    })
    .catch(function(error) {
      console.error('Error saving file:', error);
      alert('Error saving file.');
    });
}

//for web

function saveFiles() {
  var user = firebase.auth().currentUser;

  // Check if user is logged in
  if (!user) {
    alert('Please log in to save files.');
    window.location.href = "signup.html";
    return;
  }

  var userId = user.uid;

  var htmlFileContent = document.getElementById("html-code").value;
  var cssFileContent = document.getElementById("css-code").value;
  var jsFileContent = document.getElementById("js-code").value;

  // Check if any of the files are empty
  if (!htmlFileContent || !cssFileContent || !jsFileContent) {
      alert('Please provide content for all three files');
      return;
  }

  // Save HTML file
  var htmlFileName = document.getElementById("filename_html");
  if (!htmlFileName || !htmlFileName.value) {
      alert('Please provide a filename for the HTML file');
      return;
  }
  var htmlStorageRef = firebase.storage().ref().child(userId + "/" + htmlFileName.value);
  htmlStorageRef.putString(htmlFileContent)
    .then(function(snapshot) {
      console.log('HTML file saved successfully.');
      alert('HTML file saved successfully.');
    })
    .catch(function(error) {
      console.error('Error saving HTML file:', error);
      alert('Error saving HTML file.');
    });

  // Save CSS file
  var cssFileName = document.getElementById("filename_css");
  if (!cssFileName || !cssFileName.value) {
      alert('Please provide a filename for the CSS file');
      return;
  }
  var cssStorageRef = firebase.storage().ref().child(userId + "/" + cssFileName.value);
  cssStorageRef.putString(cssFileContent)
    .then(function(snapshot) {
      console.log('CSS file saved successfully.');
      alert('CSS file saved successfully.');
    })
    .catch(function(error) {
      console.error('Error saving CSS file:', error);
      alert('Error saving CSS file.');
    });

  // Save JS file
  var jsFileName = document.getElementById("filename_js");
  if (!jsFileName || !jsFileName.value) {
      alert('Please provide a filename for the JS file');
      return;
  }
  var jsStorageRef = firebase.storage().ref().child(userId + "/" + jsFileName.value);
  jsStorageRef.putString(jsFileContent)
    .then(function(snapshot) {
      console.log('JS file saved successfully.');
      alert('JS file saved successfully.');
    })
    .catch(function(error) {
      console.error('Error saving JS file:', error);
      alert('Error saving JS file.');
    });
}



//for web

function uploadFiles() {
	// Create an input field of type "file"
	const fileInput = document.createElement('input');
	fileInput.type = 'file';
  
	fileInput.addEventListener('change', function() {
		// Get the selected file
		const file = fileInput.files[0];
	  
		// Create a file reader
		const reader = new FileReader();
	  
		// Set up a callback for when the file is loaded
		reader.onload = function(event) {
			// Get the contents of the file
			const contents = event.target.result;
			
			// Determine the file type
			const fileType = getFileType(file.name);

			// Set the contents of the appropriate textarea
			if (fileType === 'html') {
				const htmlTextarea = document.getElementById('html-code');
				htmlTextarea.value = contents;
			} else if (fileType === 'css') {
				const cssTextarea = document.getElementById('css-code');
				cssTextarea.value = contents;
			} else if (fileType === 'js') {
				const jsTextarea = document.getElementById('js-code');
				jsTextarea.value = contents;
			}
		};
	  
		// Read the file as text
		reader.readAsText(file);
	});
	
	// Trigger a click on the input field to open the file dialog
	fileInput.click();

	// Helper function to determine the file type based on the file extension
	function getFileType(fileName) {
		const extension = fileName.split('.').pop();
		if (extension === 'html') {
			return 'html';
		} else if (extension === 'css') {
			return 'css';
		} else if (extension === 'js') {
			return 'js';
		}
	}
}

//for web
function downloadFiles(filename_html,filename_css,filename_js,htmlText, cssText, jsText) {
	// Create an anchor element for each file download
	const htmlLink = document.createElement('a');
	htmlLink.style.display = 'none';
	htmlLink.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(htmlText));
	htmlLink.setAttribute('download', filename_html);
	document.body.appendChild(htmlLink);

	const cssLink = document.createElement('a');
	cssLink.style.display = 'none';
	cssLink.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(cssText));
	cssLink.setAttribute('download', filename_css);
	document.body.appendChild(cssLink);

	const jsLink = document.createElement('a');
	jsLink.style.display = 'none';
	jsLink.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsText));
	jsLink.setAttribute('download', filename_js);
	document.body.appendChild(jsLink);

	// Trigger the click events for each anchor element
	htmlLink.click();
	cssLink.click();
	jsLink.click();

	// Remove the anchor elements from the DOM
	document.body.removeChild(htmlLink);
	document.body.removeChild(cssLink);
	document.body.removeChild(jsLink);
}

document.getElementById('downloadBtn').addEventListener('click', function() {
	const htmlText = document.getElementById('html-code').value;
	const cssText = document.getElementById('css-code').value;
	const jsText = document.getElementById('js-code').value;
	var filename_html=document.getElementById("filename_html").value;
	var filename_css=document.getElementById("filename_css").value;
	var filename_js=document.getElementById("filename_js").value;

	downloadFiles(filename_html,filename_css,filename_js,htmlText, cssText, jsText);
}, false);


//for ide  
function uploadFile() {
	// Create an input field of type "file"
	const fileInput = document.createElement('input');
	fileInput.type = 'file';
  
	fileInput.addEventListener('change', function() {
	  // Get the selected file
	  const file = fileInput.files[0];
	  
	  // Create a file reader
	  const reader = new FileReader();
	  
	  // Set up a callback for when the file is loaded
	  reader.onload = function(event) {
		// Get the contents of the file
		const contents = event.target.result;
		
		// Set the contents of the textarea to the file contents
		const textarea = document.getElementById('source');
		textarea.value = contents;
	  };
	  
	  // Read the file as text
	  reader.readAsText(file);
	});
	
	// Trigger a click on the input field to open the file dialog
	fileInput.click();
  }
  

  //for ide
// Download the current file
function downloadFile(filename,text) {

  var element = document.createElement('a');
  element.style.display='none';
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);

}
document.getElementById("downloadBtn").addEventListener("click",function(){
 var text=document.getElementById("source").value;
 var filename=document.getElementById("filename").value;

 downloadFile(filename,text);
},false);


//for both web+ide

function deleteFile(){
  var userId = firebase.auth().currentUser.uid;
  var fileName = prompt("enter file name that you want to delete: ");
  var storageRef = firebase.storage().ref().child(userId + "/" + fileName);
  storageRef.delete().then(function() {
    console.log('File deleted successfully.');
    alert('File deleted successfully.');
  }).catch(function(error) {
    console.error('Error deleting file:', error);
    alert('Error deleting file.');
  });

}

//for ide
function openFile(){
  var userId = firebase.auth().currentUser.uid;
  var fileName = prompt("enter file name that you want to open: ");
  var storageRef = firebase.storage().ref().child(userId + "/" + fileName);
  storageRef.getDownloadURL().then(function(url) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'text';
    xhr.onload = function(event) {
      var fileContent = xhr.response;
      console.log('File opened successfully.');
      alert('File opened successfully.');
      document.getElementById("source").value = fileContent;
    };
    xhr.open('GET', url);
    xhr.send();
  }).catch(function(error) {
    console.error('Error opening file:', error);
    alert('Error opening file.');
  });

  // Read the contents of the file
const fs = require('fs');
const fileContents = fs.readFileSync(filename, 'utf8');

// Write the contents of the file to the database
database.ref('your-data-path').set({
  fileContents: fileContents
}, function(error) {
  if (error) {
    console.error('Error writing data to Firebase:', error);
  } else {
    console.log('Data written to Firebase successfully!');
  }
});
 }


 //for web

function openFiles(userId) {
  const fileName = prompt("Enter file name:");
  if (fileName !== null && fileName.trim() !== "") {
    const storageRef = firebase.storage().ref().child(userId).child(fileName);
    storageRef.getDownloadURL()
      .then(function(url) {
        return fetch(url);
      })
      .then(function(response) {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error('Error loading file content');
        }
      })
      .then(function(text) {
        const extension = fileName.split('.').pop()?.toLowerCase() || '';
        const textareaId = getTextAreaId(extension);
        const textarea = document.getElementById(textareaId);
        if (textarea) {
          textarea.value = text;
        } else {
          console.log('Textarea not found.');
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  } else {
    console.log('Invalid or empty file name.');
  }
}

function getTextAreaId(extension) {
  if (extension === 'html') {
    return 'html';
  } else if (extension === 'css') {
    return 'css';
  } else if (extension === 'js') {
    return 'js';
  } else {
    return 'defaultTextAreaId';
  }
}

var user = firebase.auth().currentUser;
if (user) {
  var userId = user.uid;
  openFiles(userId);
} else {
  console.log('User is not authenticated.');
}

