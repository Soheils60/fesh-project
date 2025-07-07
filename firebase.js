<!-- firebase.js -->
<script type="module">
  // Import Firebase SDK (modular way)
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
  import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

  const firebaseConfig = {
    apiKey: "AIzaSyCmT1fhhlwlJ_EqqLdgNDNNEdb53MzCCR4",
    authDomain: "fesh-project.firebaseapp.com",
    databaseURL: "https://fesh-project-default-rtdb.firebaseio.com",
    projectId: "fesh-project",
    storageBucket: "fesh-project.firebasestorage.app",
    messagingSenderId: "775712995019",
    appId: "1:775712995019:web:d6658af65a13bbe737cd4e"
  };

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  // Make database accessible to window (optional)
  window.feshDB = {
    ref,
    push,
    database
  };
</script>
