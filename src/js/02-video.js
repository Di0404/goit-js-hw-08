
import throttle from 'lodash.throttle';
// 1.Ознакомься с документацией библиотеки Vimeo плеера. - OK
// 2. Добавь библиотеку как зависимость проекта через npm. - OK
// 3. Инициализируй плеер в файле скрипта как это описано в секции pre-existing player, 
// но учти что у тебя плеер добавлен как npm пакет, а не через CDN.



const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);


// 5.Сохраняй время воспроизведения в локальное хранилище. 
// Пусть ключом для хранилища будет строка "videoplayer-current-time". 
// !!!тоесть нам нужно сохранять в локальное хранилище секунды которые мы получаем!!!
// дата это обьект, у которого есть 3 свойства {seconds: 0, percent: 0, duration: 0}
// можно сделать делаем декстр. тогда берём только seconds
const onPlay = function(data) {
    // data is an object containing properties specific to that event
    // ключь "videoplayer-current-time", значение data.secounds
    localStorage.setItem("videoplayer-current-time", data.seconds)
    console.log(data.seconds)
};



// 4.Разбери документацию метода on() и начни отслеживать событие timeupdate - 
// обновление времени воспроизведения. OK
// это из докуметации... player.on('play', onPlay);
// в задании указанно  отследи событие timeupdate, пожтому меняем play на 
player.on('timeupdate', throttle(onPlay, 1000));
// нам нужно сделать так что бы наша функция
//  onPlay что бы она выполнялась по задержке,
// нам нужно именно жту функцию обернуть в throttle потому что
// нам нужно что бы она выполнялась по задержке

// 6. При перезагрузке страницы воспользуйся методом setCurrentTime() 
// для того чтобы возобновить воспроизведение с сохраненной позиции.
// Добавь в проект бибилотеку lodash.throttle и сделай так,
//  чтобы время воспроизведения обновлялось в хранилище не чаще чем раз в секунду.
const currentTime = localStorage.getItem("videoplayer-current-time")
if (currentTime){
    player.setCurrentTime(currentTime)
}
