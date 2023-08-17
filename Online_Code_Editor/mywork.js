firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        const userId = user.uid;
        const storageRef = firebase.storage().ref().child(userId);
        storageRef.listAll().then(function(result) {
            const fileData = document.getElementById("fileData");
            result.items.forEach(function(item, index) {
                const fileName = item.name;
                const row = fileData.insertRow();
                const snoCell = row.insertCell(0);
                const nameCell = row.insertCell(1);
                const linkCell = row.insertCell(2);
                snoCell.innerHTML = index + 1;
                nameCell.innerHTML = fileName;
                const fileExtension = fileName.split('.').pop().toLowerCase();
                if (['html', 'css', 'js'].includes(fileExtension)) {
                    linkCell.innerHTML = `<a href="web.html?userId=${userId}&fileName=${fileName}">Edit</a>`;
                } else {
                    linkCell.innerHTML = `<a href="intercompil.html?userId=${userId}&fileName=${fileName}">Edit</a>`;
                }
            });
        }).catch(function(error) {
            console.log(error);
        });
    } else {
        alert("Please LogIn for Workpage");
        window.location.href="signup.html";
    }
});

// firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//         const userId = user.uid;
//         const storageRef = firebase.storage().ref().child(userId);
//         const fileData = document.getElementById("fileData");
//         const fileContent = document.getElementById("html-code"); // Get the textarea element
        
//         storageRef.listAll().then(function(result) {
//             result.items.forEach(function(item, index) {
//                 const fileName = item.name;
//                 const row = fileData.insertRow();
//                 const snoCell = row.insertCell(0);
//                 const nameCell = row.insertCell(1);
//                 const linkCell = row.insertCell(2);
//                 snoCell.innerHTML = index + 1;
//                 nameCell.innerHTML = fileName;
//                 const fileExtension = fileName.split('.').pop().toLowerCase();
//                 if (['html', 'css', 'js'].includes(fileExtension)) {
//                     linkCell.innerHTML = `<a href="#">Edit</a>`; // Change link href to "#"
//                     linkCell.querySelector('a').addEventListener('click', function() {
//                         // Load file content into the textarea when Edit link is clicked
//                         item.getDownloadURL().then(function(url) {
//                             fetch(url)
//                                 .then(response => response.text())
//                                 .then(content => {
//                                     fileContent.value = content;
//                                 })
//                                 .catch(error => {
//                                     console.log(error);
//                                 });
//                         });
//                     });
//                 } else {
//                     linkCell.innerHTML = `<a href="#">Edit</a>`; // Change link href to "#"
//                     linkCell.querySelector('a').addEventListener('click', function() {
//                         // Load file content into the textarea when Edit link is clicked
//                         item.getDownloadURL().then(function(url) {
//                             fetch(url)
//                                 .then(response => response.text())
//                                 .then(content => {
//                                     fileContent.value = content;
//                                 })
//                                 .catch(error => {
//                                     console.log(error);
//                                 });
//                         });
//                     });
//                 }
//             });
//         }).catch(function(error) {
//             console.log(error);
//         });
//     } else {
//         alert("Please LogIn for Workpage");
//         window.location.href = "signup.html";
//     }
// });
