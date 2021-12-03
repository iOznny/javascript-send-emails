// Variables
const form = document.querySelector('#enviar-mail');
const btnReset = document.querySelector('#resetBtn');
const btnSend = document.querySelector('#enviar');

const email = document.querySelector('#email');
const subject = document.querySelector('#asunto');
const message = document.querySelector('#mensaje');
const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;        

eventListeners();
function eventListeners() {
    // Starting App
    document.addEventListener('DOMContentLoaded', startingApp);

    // Inputs form
    email.addEventListener('blur', checkingForm);
    subject.addEventListener('blur', checkingForm);
    message.addEventListener('blur', checkingForm);

    // Send email
    form.addEventListener('submit', sendEmail);

    // Reset form
    btnReset.addEventListener('click', resetForm);
}

// Functions
function startingApp() {      
    btnSend.disabled = true;
    btnSend.classList.add('cursor-not-allowed', 'opacity-50');
}

function checkingForm(e) {
    if (e.target.value.length > 0) {      
        // Delete errors
        const error = document.querySelector('p.error');
        if (error) {            
            error.remove();
        }

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    } else {        
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');

        // Show error
        showError('Verifique los campos, todos son obligatorios.');
    }    

    if (e.target.type === 'email') {        
        if (regEx.test(e.target.value)) {        
            // Delete errors
            const error = document.querySelector('p.error');
            if (error) {            
                error.remove();
            }

            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        } else {            
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');

            // Show error            
            showError('El email es incorrecto.');
        }
    }

    if (regEx.test(email.value) && subject.value !== '' && message.value !== '') {
        btnSend.disabled = false;
        btnSend.classList.remove('cursor-not-allowed', 'opacity-50');
    }
}

function showError(msg) {
    const error = document.createElement('p');
    error.textContent = msg;
    error.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errors = document.querySelectorAll('.error');
    if (errors.length === 0) {        
        form.appendChild(error);
    }
}

function sendEmail(e) {
    e.preventDefault();
    
    // Show spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    // Hiden spinner and show message
    setTimeout(() => {
        spinner.style.display = 'none';

        // Message
        const p = document.createElement('p');
        p.textContent = 'El mensaje se envio correctamente.';
        p.classList.add('text-center', 'my-10', 'p-5', 'border-green-500', 'font-bold', 'uppercase');
        form.insertBefore(p, spinner);

        // P remove
        setTimeout(() => {
            p.remove();
            resetForm();
        }, 5000);
    }, 3000);


}

function resetForm() {
    form.reset();
    startingApp();
}