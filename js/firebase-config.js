const firebaseConfig = {
    apiKey: "AIzaSyCKgzlv1G6U8bnWuVnz1YDd3VZiVx4hr84",
    authDomain: "americable-51b5c.firebaseapp.com",
    projectId: "americable-51b5c",
    storageBucket: "americable-51b5c.firebasestorage.app",
    messagingSenderId: "209575452502",
    appId: "1:209575452502:web:a95bc43d3b6b12ce1640f7",
    measurementId: "G-0WSZXRHLNS"
};

// Inicializar Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Exportar referencias globales si es necesario, o usarlas directamente
window.db = firebase.firestore();
