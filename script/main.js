// // собираем все якоря; устанавливаем время анимации и количество кадров
// const anchorBtn = document.querySelectorAll('[data-link]'), animationTime = 300, framesCount = 20;

// Array.from(anchorBtn).forEach( button => {
//     // каждому якорю присваиваем обработчик события
//     button.addEventListener('click', (e) => {
//         // убираем стандартное поведение
//         e.preventDefault();
//         // для каждого якоря берем соответствующий ему элемент и определяем его координату Y
//         let coordY = document.querySelector('.' + button.getAttribute('data-link')).getBoundingClientRect().top;
//         // запускаем интервал, в котором
//         let scroller = setInterval(function() {
//             // считаем на сколько скроллить за 1 такт
//             let scrollBy = coordY / framesCount;
//             // если к-во пикселей для скролла за 1 такт больше расстояния до элемента
//             // и дно страницы не достигнуто
//             if(scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
//               // то скроллим на к-во пикселей, которое соответствует одному такту
//               window.scrollBy(0, scrollBy);
//             } else {
//               // иначе добираемся до элемента и выходим из интервала
//               window.scrollTo(0, coordY);
//               clearInterval(scroller);
//             }
//           // время интервала равняется частному от времени анимации и к-ва кадров
//           }, animationTime / framesCount);
//     })
// })


// собираем все якоря; устанавливаем время анимации и количество кадров
const anchors = [].slice.call(document.querySelectorAll('a[href*="#"]')),
      animationTime = 300,
      framesCount = 20;
const headerHeight = document.querySelector('header').offsetHeight;    

anchors.forEach(function(item) {
  // каждому якорю присваиваем обработчик события
  item.addEventListener('click', function(e) {
    // убираем стандартное поведение
    e.preventDefault();
    
    // anchors.forEach(item=>{
    //     item.classList.remove('link-active');
    // })

    // this.classList.add('link-active');

    // для каждого якоря берем соответствующий ему элемент и определяем его координату Y
    let coordY = document.querySelector('.' + item.getAttribute('href').slice(1)).getBoundingClientRect().top + window.pageYOffset - headerHeight

    // запускаем интервал, в котором
    let scroller = setInterval(function() {
      // считаем на сколько скроллить за 1 такт
      let scrollBy = coordY / framesCount;
      
      // если к-во пикселей для скролла за 1 такт больше расстояния до элемента
      // и дно страницы не достигнуто
      if(scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
        // то скроллим на к-во пикселей, которое соответствует одному такту
        window.scrollBy(0, scrollBy);
      } else {
        // иначе добираемся до элемента и выходим из интервала
        window.scrollTo(0, coordY);
        clearInterval(scroller);
      }
    // время интервала равняется частному от времени анимации и к-ва кадров
    }, animationTime / framesCount);
  });
});