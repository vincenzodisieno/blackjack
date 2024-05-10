const emailtxt = document.getElementById("email");
const confirmemailtxt = document.getElementById("confirm-email")
const errorEmail = document.getElementById("email-error");
const errorConfirmEmail = document.getElementById("email-confirm-error");
const passwordtxt = document.getElementById("password")
const confirmpasswordtxt = document.getElementById("confirm-password")
const errorPassword = document.getElementById("password-error");
const errorConfirmPassword = document.getElementById("password-confirm-error");
const usertxt = document.getElementById("username");
const errorUser = document.getElementById("user-error");
const MostraPassword = document.getElementById("occhioAperto");
const NascondiPassword = document.getElementById("occhioChiuso");
const MostraConfirmPassword = document.getElementById("occhioAperto2");
const NascondiConfirmPassword = document.getElementById("occhioChiuso2");
MostraPassword.style.display = 'block'
NascondiPassword.style.display = 'none'
MostraConfirmPassword.style.display = 'block'
NascondiConfirmPassword.style.display = 'none'


let boolEmail
let boolConfirmEmail
let boolPassword
let boolConfirmPassword

let isPasswordVisible = false;
let isConfirmPasswordVisible = false;

// Funzione per validare l'email
function validateEmail() {
    var email = emailtxt.value
    var confirmemail = confirmemailtxt.value

    // Rimuovi eventuali spazi presenti
    if(email[email.length - 1] == ' '){
        email = email.slice(0, email.length - 1)
    }
    if(confirmemail[confirmemail.length - 1] == ' '){
        confirmemail = confirmemail.slice(0, confirmemail.length - 1)
    }
    
    // Aggiorna il valore della textbox senza spazi
    emailtxt.value = email;
    confirmemailtxt.value = confirmemail;
    // Verifica se l'email contiene la @ e non contiene 
    if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        errorEmail.innerHTML = ""; // Rimuove il messaggio di errore
        boolEmail = true
    } else {
        errorEmail.innerHTML = "Inserire un'email valida"; // Visualizza il messaggio di errore  
        boolEmail = false
    }

    if(email != confirmemail)
    {
        errorConfirmEmail.innerHTML = "La mail non è uguale a quella messa precedentemente";
        boolConfirmEmail = false
    }
    else
    {
        errorConfirmEmail.innerHTML = ''
        boolConfirmEmail = true
    }
}

function validatePassword() {
    var password = passwordtxt.value;
    var confirmpassword = confirmpasswordtxt.value

    // Rimuovi eventuali spazi presenti
    var password = password.replace(/\s/g, '');       
    // Aggiorna il valore della textbox senza spazi
    passwordtxt.value = password; 

    var confirmpassword = confirmpassword.replace(/\s/g, '');  
    confirmpasswordtxt.value = confirmpassword;

    // Verifica se la password ha almeno 8 caratteri, una lettera maiuscola, una minuscola e un simbolo
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/.test(password)) {
        errorPassword.innerHTML = ""; // Rimuove il messaggio di errore
        boolPassword = true
    } else {
        errorPassword.innerHTML = "La password deve contenere almeno 8 caratteri, una lettera maiuscola, una minuscola, un numero e un simbolo"; // Visualizza il messaggio di errore
        boolPassword = false
    }

    if(password != confirmpassword)
    {
        errorConfirmPassword.innerHTML = "La password non è uguale a quella messa precedentemente";
        boolConfirmPassword = false
    }
    else
    {
        errorConfirmPassword.innerHTML = ''
        boolConfirmPassword = true
    }
}

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

function MostraNascondiConfirmPassword()
{
    if (isConfirmPasswordVisible) {
        // Se la password è attualmente visibile, nascondila
        confirmpasswordtxt.type = "password";
        MostraConfirmPassword.style.display = "block";
        NascondiConfirmPassword.style.display = "none";
    } else {
        // Se la password è attualmente nascosta, mostrala
        confirmpasswordtxt.type = "text";
        MostraConfirmPassword.style.display = "none";
        NascondiConfirmPassword.style.display = "block";
    }

    // Inverti lo stato del flag
    isConfirmPasswordVisible = !isConfirmPasswordVisible;
}

MostraPassword.addEventListener("click", MostraNascondiPassword);
NascondiPassword.addEventListener("click", MostraNascondiPassword);
MostraConfirmPassword.addEventListener("click", MostraNascondiConfirmPassword);
NascondiConfirmPassword.addEventListener("click", MostraNascondiConfirmPassword);


function validateUsername()
{   
    errorUser.innerHTML = ''
    //Per le lettere grandi sempre
    var value = usertxt.value.toUpperCase();
    
    // Se il testo contiene simboli, rimuovili e aggiorna il valore della textbox
    var value = value.replace(/[^A-Z0-9]/g, '');
    usertxt.value = value;
}

function validateForm() {
    let v = 'Inserire un valore';
    let bool = true
    if (usertxt.value === '') {
        errorUser.innerHTML = v;
        bool = false;
    }
    if (emailtxt.value === '') {
        errorEmail.innerHTML = v;
        bool = false;
    }
    if (confirmemailtxt.value === '') {
        errorConfirmEmail.innerHTML = v;
        bool = false;
    }
    if (passwordtxt.value === '') {
        errorPassword.innerHTML = v;
        bool = false;
    }
    if (confirmpasswordtxt.value === '') {
        errorConfirmPassword.innerHTML = v;
        bool = false;
    }

    return bool && boolEmail && boolConfirmEmail && boolPassword && boolConfirmPassword;
}