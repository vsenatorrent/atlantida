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


// установка высоты .blog_items в зависимости от ширины окна браузера

const actualResizeBlogItems = () => {
  const blogContainer = document.querySelector('.blog_items');
  const hToWRatio = 52; // отношение высоты к ширине (%)
  blogContainer.style.height = blogContainer.offsetWidth * hToWRatio / 100 + 'px';
}

window.addEventListener("resize", actualResizeBlogItems);


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

// portfolio gallery
const actualResizePortfolioGallery = () => {
  const gallery = document.querySelector('.portfolio-gallery');
  const widthScreen = document.body.offsetWidth;
  const hToWRatioGallery = 42.5; // отношение высоты к ширине (%)
  const galleryHeight = widthScreen * hToWRatioGallery / 100;
  gallery.style.height = galleryHeight + 'px';

  // высота первого ряда галереи
  const galleryTopRow = document.querySelectorAll('.portfolio-gallery_item--row1');
  const galleryRowSort = [...galleryTopRow].sort((a,b)=>a.offsetHeight - b.offsetHeight);
  const galleryRowMaxHeight = galleryRowSort[galleryRowSort.length-1].offsetHeight;

  // расчет margin-top у элементов нижнего ряда галереи
  const galleryBottomRow = document.querySelectorAll('.portfolio-gallery_item--row2');
  [...galleryBottomRow].forEach((galleryItem, index, array)=>{
    // const currentItemIndex = galleryItem.className.match(/portfolio-gallery_item--(\d)/)[1];
    const heightElementAboveMe = document.querySelector('.portfolio-gallery_item--' + (++index)).offsetHeight;
    galleryItem.style.marginTop = heightElementAboveMe - galleryRowMaxHeight - 2 + 'px'
  })
}
actualResizePortfolioGallery();
window.addEventListener('resize', actualResizePortfolioGallery)

const classNameReplace = (node,index,i) => {
  const replaced = node.className.replace(/portfolio-gallery_item--\d/, 'portfolio-gallery_item--' + ++index).replace(/portfolio-gallery_item--row\d/, 'portfolio-gallery_item--row'+i);
  node.className = replaced;
}

const portfolioButtons = document.querySelectorAll('.category_item');
const portfolioGallery = document.querySelectorAll('.portfolio-gallery_item');
[...portfolioButtons].forEach((button,index,array) => {
  button.addEventListener('click', function(e){
    const galleryParent = document.querySelector('.portfolio-gallery');
    [...portfolioGallery].forEach(node => {
      galleryParent.appendChild(node);
    })
    const id = e.target.innerHTML.toLowerCase();
    // if(id !== 'all') {
      const getNecessaryElements = document.querySelectorAll('.portfolio-gallery_item--' + id);
      let child = galleryParent.lastElementChild;  
      while (child) { 
        galleryParent.removeChild(child); 
          child = galleryParent.lastElementChild; 
      } 
      const resultNodeElements = [...getNecessaryElements].map((node,index)=>{
        const rowTopLength = 4;
        if(index <= rowTopLength - 1){
          // const replaced = node.className.replace(/portfolio-gallery_item--\d/, 'portfolio-gallery_item--' + ++index);
          node.style.marginTop = 0
          const replaced = classNameReplace(node, index,1);
          return node;
        }
        const replaced = classNameReplace(node, index,2);
        return node;
      })
      resultNodeElements.forEach(node => {
        galleryParent.appendChild(node);
      })
    // }
    actualResizePortfolioGallery();

    // добавить класс к активной кнопке
    array.forEach(button=>{
      array.indexOf(button) === index ? button.classList.add('category_item--active') : button.classList.remove('category_item--active')
    })

  })
})