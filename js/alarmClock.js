const display = document.getElementById('clock');
const soundSelector = document.getElementById('alarmSound');

let audio = new Audio();
audio.loop = true;

let previewAudio = new Audio();

let alarmTime = null;
let alarmTimeout = null;

function updateTime() {
    const date = new Date();

    let hour = date.getHours();
    const minutes = formatTime(date.getMinutes());

    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12; // Convert 0 to 12

    display.innerText = `${hour} : ${minutes} ${ampm}`;
}

function formatTime(time) {
    return time < 10 ? '0' + time : time;
}

function setAlarmTime(value) {
    alarmTime = value;
}

function setAlarm() {
    if (alarmTime) {
        const current = new Date();
        const timeToAlarm = new Date(alarmTime);

        if (timeToAlarm > current) {
            const timeout = timeToAlarm.getTime() - current.getTime();

            // Set selected audio source
            const selectedSound = soundSelector.value;
            audio.src = selectedSound;

            alarmTimeout = setTimeout(() => audio.play(), timeout);
            alert('Alarm set');
        }
    }
}

function clearAlarm() {
    audio.pause();
    audio.currentTime = 0;

    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
        alert('Alarm cleared');
    }
}

function previewAlarmSound() {
    const selectedSound = soundSelector.value;

    // Stop previous preview if playing
    previewAudio.pause();
    previewAudio.currentTime = 0;

    previewAudio = new Audio(selectedSound);
    previewAudio.play();

    // Stop after 3 seconds
    setTimeout(() => {
        previewAudio.pause();
        previewAudio.currentTime = 0;
    }, 3000);
}

setInterval(updateTime, 1000);
