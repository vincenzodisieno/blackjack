const emailtxt = document.getElementById("email");
const errorEmail = document.getElementById("error-email");
const passwordtxt = document.getElementById("password")
const errorPassword = document.getElementById("error-password");
const MostraPassword = document.getElementById("occhioAperto");
const NascondiPassword = document.getElementById("occhioChiuso");
MostraPassword.style.display = 'block'
NascondiPassword.style.display = 'none'

// Funzione per validare l'email
function validateEmail() {
    var email = emailtxt.value;

    if(email[email.length - 1] == ' '){
        email = email.slice(0, email.length - 1)
    }
    emailtxt.value = email;

    // Verifica se l'email contiene la @ e non contiene spazi
    if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        errorEmail.innerHTML = ""; // Rimuove il messaggio di errore
        return true;
    } else {
        errorEmail.innerHTML = "Inserire un'email valida"; // Visualizza il messaggio di errore
        return false;
    }
}

// Funzione per validare la password
function validatePassword() {
    var password = passwordtxt.value;

    var password = password.replace(/\s/g, '');
    passwordtxt.value = password; 
    
    // Verifica se la password ha almeno 8 caratteri, una lettera maiuscola, una minuscola e un simbolo
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/.test(password)) {
        errorPassword.innerHTML = ""; // Rimuove il messaggio di errore
        return true;
    } else {
        errorPassword.innerHTML = "La password deve contenere almeno 8 caratteri, una lettera maiuscola, una minuscola e un simbolo"; // Visualizza il messaggio di errore
        return false;
    }
}

let isPasswordVisible = false;

function MostraNascondiPassword()
{
    if (isPasswordVisible) {
        // Se la password è attualmente visibile, nascondila
        passwordtxt.type = "password";
        MostraPassword.style.display = "block";
        NascondiPassword.style.display = "none";
    } else {
        // Se la password è attualmente nascosta, mostrala
        passwordtxt.type = "text";
        MostraPassword.style.display = "none";
        NascondiPassword.style.display = "block";
    }

    // Inverti lo stato del flag
    isPasswordVisible = !isPasswordVisible;
}

MostraPassword.addEventListener("click", MostraNascondiPassword);
NascondiPassword.addEventListener("click", MostraNascondiPassword);

// Funzione per validare il form prima di inviare i dati
function validateForm() {
    let v = 'Inserire un valore';
    let bool = true

    if (emailtxt.value === '') {
        errorEmail.innerHTML = v;
        bool = false;
    }

    if (passwordtxt.value === '') {
        errorPassword.innerHTML = v;
        bool = false;
    }
    return bool && validateEmail() && validatePassword(); // Verifica sia l'email che la password
}