
const socket = io('http://localhost:8000');
const form = document.getElementById('sendcontainer');
const messageInput = document.getElementById('message');
const messagecontainer = document.querySelector(".container");
var audio = new Audio('ting.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messagecontainer.append(messageElement);
    if (position == 'left') {
        audio.play();
    }
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`you: ${message}`, 'right')
    socket.emit('send', message);
    messageInput.value = ''
});


const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

socket.on('user-joined', (userName) => {
    if (userName !== name) {
        append(`${userName} joined the chat`, 'right');
    }
});

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left');
});


socket.on('leave', name => {
    append(`${name} left the chat`, 'right');
});
