const selectMenu = document.querySelectorAll('select');
const timeBox = document.querySelector('.time');
const setAlarmBtn = document.querySelector('button');
const content = document.querySelector('.content');
let alarmTime, alarmState = 'noset';
const ringtone = new Audio('https://next1code.ir/wp-content/uploads/2022/08/ringtone.mp3');

for (let i = 0; i <= 23; i++) {
    let hour = i < 10 ? '0' + i : i;
    let option = `<option value="${hour}">${hour}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML('afterend', option);
}

for (let i = 0; i <= 59; i++) {
    let minute = i < 10 ? '0' + i : i;
    let option = `<option value="${minute}">${minute}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML('afterend', option);
}

setInterval(() => {
    const date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();

    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;

    timeBox.innerHTML = `${h} : ${m} : ${s}`;

    if (alarmTime === `${h}:${m}` && s === '00') {
        ringtone.play();
    }
}, 1000);


setAlarmBtn.addEventListener('click', () => {
    if (alarmState === 'noset') {
        alarmTime = `${selectMenu[0].value}:${selectMenu[1].value}`;
        if (alarmTime.includes('Hour') || alarmTime.includes('Minute')) {
            return alert('زمان هشدار را وارد کنید.');
        }
        checkState(alarmState); // فعال کردن حالت ست شده
    } else {
        checkState(alarmState); // پاک کردن آلارم
    }
});

function checkState(state) {
    if (state === 'noset') {
        content.classList.add('disable');
        setAlarmBtn.innerText = 'Clear Alarm';
        alarmState = 'set';
    } else {
        content.classList.remove('disable');
        setAlarmBtn.innerText = 'Set Alarm';
        alarmTime = '';
        ringtone.pause();
        alarmState = 'noset';
    }
}
