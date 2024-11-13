const firebaseConfig = {
  apiKey: "AIzaSyCsSHYjWiMXER4q8z9G5xIr726pNYRZ6zI",
  authDomain: "quiz-app-1496d.firebaseapp.com",
  projectId: "quiz-app-1496d",
  storageBucket: "quiz-app-1496d.firebasestorage.app",
  messagingSenderId: "926924424969",
  appId: "1:926924424969:web:4fdfa5863f60bd293db5d8",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(function (user) {
  window.localStorage.setItem("user", JSON.stringify(user));

  if (user && window.location.pathname != "/") {
    window.location.replace("/");
  }
  if (!user && window.location.pathname != "/login.html") {
    window.location.replace("/login.html");
  }
});

function login() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((data) => console.log(data))
    .catch((err) => {
      register(email, password)
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
    });
}

async function register(email, password) {
  return await firebase.auth().createUserWithEmailAndPassword(email, password);
}

async function logout() {
  window.localStorage.setItem("user", null);
  firebase
    .auth()
    .signOut()
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
}
