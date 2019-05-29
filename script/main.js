const sectionVisible = (section, headerHeight) => {
  const scrollTop = window.pageYOffset;
  const sectionTopPos = section.getBoundingClientRect().top + scrollTop - headerHeight;
  return sectionTopPos <= scrollTop && sectionTopPos + section.offsetHeight > scrollTop;
}

const anchorHandler = (scrolling) => {
  const anchors = document.querySelectorAll('a[href*="#"]');
  const headerHeight = document.querySelector('#header').offsetHeight;
  return () => {
    Array.from(anchors).forEach(function(item) {
      const section = document.querySelector('.' + item.getAttribute('href').slice(1));
      // обработчик события "scroll"
      if(scrolling){
        if(sectionVisible(section, headerHeight)){
          item.classList.add('link-active');
        } else {
          item.classList.remove('link-active');
        }
      // обработчик события "click"
      } else {
        item.addEventListener('click', function(e) {
          e.preventDefault();
          const coordY = section.getBoundingClientRect().top - headerHeight
          window.scrollBy({ top: coordY, behavior: 'smooth' });
        });
      };
    });
  };
};

window.addEventListener('scroll', anchorHandler(true));

const scrollTo = anchorHandler(false);
scrollTo();

// const anchors = document.querySelectorAll('a[href*="#"]');
// const headerHeight = document.querySelector('#header').offsetHeight;

// window.addEventListener('scroll', function(){

//   Array.from(anchors).forEach(function(item) {
//     const section = document.querySelector('.' + item.getAttribute('href').slice(1));
//     const scrollTop = window.pageYOffset;
//     const sectionTopPos = section.getBoundingClientRect().top + window.pageYOffset - headerHeight;
//     if(sectionTopPos <= scrollTop && sectionTopPos + section.offsetHeight > scrollTop) {
//       item.classList.add('link-active');
//     } else {
//       item.classList.remove('link-active');
//     }
//   })

// })

// собираем все якоря; устанавливаем время анимации и количество кадров

    
// Array.from(anchors).forEach(function(item) {
//   // каждому якорю присваиваем обработчик события
//   item.addEventListener('click', function(e) {
//     // убираем стандартное поведение
//     e.preventDefault();

//     // для каждого якоря берем соответствующий ему элемент и определяем его координату Y
//     const coordY = document.querySelector('.' + item.getAttribute('href').slice(1)).getBoundingClientRect().top - headerHeight

//     window.scrollBy({ top: coordY, behavior: 'smooth' });
//   });
// });


// установка высоты .blog_items в зависимости от ширины окна браузера

const actualResizeHandler = () => {
  const blogContainer = document.querySelector('.blog_items');
  const hToWRatio = 52; // отношение высоты к ширине (%)
  blogContainer.style.height = blogContainer.offsetWidth * hToWRatio / 100 + 'px';
}

window.addEventListener("resize", actualResizeHandler);


// init slider for "cites" section

const slider = document.getElementById('slider');
mySwipe = new Swipe(slider, {
  startSlide: 1,
});

mySwipe.stop();

const sliderButtons = document.querySelectorAll('.cites_btn');
const className = 'cites_btn--current';

const sliderButtonHandler = function(index) {
  if(!this.classList.contains(className)) {
    const prev = document.querySelector(`.${className}`);
    prev.classList.remove(className);
    mySwipe.slide(index + 1);
    this.classList.add(className);
  }
}

Array.from(sliderButtons).forEach((button, index) => {
  button.addEventListener('click', sliderButtonHandler.bind(button, index))
})
