// изменение иконки бургер-меню при клике

const burgerBtn = document.querySelector('.header_trigger');
const navbar = document.querySelector('.navbar');
burgerBtn.addEventListener('click', () => {
  navbar.classList.toggle('navbar-show');
  burgerBtn.classList.toggle('triggered');
  document.body.classList.toggle('overflow');
}, true);

// выделение активного элемента меню при скролле и клике

const sectionVisible = (section, headerHeight) => {
  const scrollTop = window.pageYOffset;
  const sectionTopPos = section.getBoundingClientRect().top + scrollTop - headerHeight - 5;
  return sectionTopPos <= scrollTop && sectionTopPos + section.offsetHeight > scrollTop;
};

const anchorHandler = (scrolling) => {
  const anchors = document.querySelectorAll('.navbar_link');
  const headerHeight = document.querySelector('.navbar').offsetHeight;
  return () => {
    Array.from(anchors).forEach((item) => {
      const section = document.querySelector(`.${item.getAttribute('href').slice(1)}`);
      // обработчик события "scroll"
      if (scrolling) {
        if (sectionVisible(section, headerHeight)) {
          item.classList.add('link-active');
        } else {
          item.classList.remove('link-active');
        }
      // обработчик события "click"
      } else {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          document.body.classList.remove('overflow');
          navbar.classList.remove('navbar-show');
          burgerBtn.classList.remove('triggered');
          const coordY = section.getBoundingClientRect().top;
          if (window.innerWidth > 767) {
            window.scrollBy({ top: coordY - headerHeight, behavior: 'smooth' });
          } else {
            window.scrollBy({ top: coordY, behavior: 'smooth' });
          }
        });
      }
    });
  };
};

window.addEventListener('scroll', anchorHandler(true));

const scrollTo = anchorHandler(false);
scrollTo();


// установка высоты .blog_items в зависимости от ширины окна браузера

const actualResizeBlogItems = (auto) => {
  const blogContainer = document.querySelector('.blog_items');
  const hToWRatio = 52; // отношение высоты к ширине (%)
  blogContainer.style.height = `${blogContainer.offsetWidth * hToWRatio / 100}px`;
  if (auto) {
    blogContainer.style.height = 'auto';
  }
};
if (window.innerWidth > 767) {
  actualResizeBlogItems();
}

window.addEventListener('resize', () => {
  if (window.innerWidth > 767) {
    actualResizeBlogItems();
  } else {
    actualResizeBlogItems('auto');
  }
});


// инициализация слайдера раздела "cites"

const slider = document.getElementById('slider');
mySwipe = new Swipe(slider, {
  startSlide: 1,
});

mySwipe.stop();

const sliderButtons = document.querySelectorAll('.cites_btn');
const className = 'cites_btn--current';

const sliderButtonHandler = function (index) {
  if (!this.classList.contains(className)) {
    const prev = document.querySelector(`.${className}`);
    prev.classList.remove(className);
    mySwipe.slide(index + 1);
    this.classList.add(className);
  }
};

Array.from(sliderButtons).forEach((button, index) => {
  button.addEventListener('click', sliderButtonHandler.bind(button, index));
});

// установка высоты галереи раздела "portfolio"

const actualResizePortfolioGallery = () => {
  const gallery = document.querySelector('.portfolio-gallery');
  const widthScreen = document.body.offsetWidth;
  const hToWRatioGallery = 42.5; // отношение высоты к ширине (%)
  const galleryHeight = widthScreen * hToWRatioGallery / 100;
  gallery.style.height = `${galleryHeight}px`;

  // высота первого ряда галереи
  const galleryTopRow = document.querySelectorAll('.portfolio-gallery_item--row1');
  const galleryRowSort = [...galleryTopRow].sort((a, b) => a.offsetHeight - b.offsetHeight);
  const galleryRowMaxHeight = galleryRowSort[galleryRowSort.length - 1].offsetHeight;

  // расчет margin-top у элементов нижнего ряда галереи
  const galleryBottomRow = document.querySelectorAll('.portfolio-gallery_item--row2');
  [...galleryBottomRow].forEach((galleryItem, index) => {
    let idx = index;
    idx += 1;
    const heightElementAboveMe = document.querySelector(`.portfolio-gallery_item--${idx}`).offsetHeight;
    const item = galleryItem;
    item.style.marginTop = `${heightElementAboveMe - galleryRowMaxHeight - 2}px`;
  });
};

actualResizePortfolioGallery();
window.addEventListener('resize', actualResizePortfolioGallery);


// отображение выбранных элементов галереи

const classNameReplace = (node, index, i) => {
  let idx = index;
  idx += 1;
  const nodeInner = node;
  const replaced = nodeInner.className.replace(/portfolio-gallery_item--\d/, `portfolio-gallery_item--${idx}`).replace(/portfolio-gallery_item--row\d/, `portfolio-gallery_item--row${i}`);
  nodeInner.className = replaced;
};

const portfolioButtons = document.querySelectorAll('.category_item');
const portfolioGallery = document.querySelectorAll('.portfolio-gallery_item');
[...portfolioButtons].forEach((button, index, array) => {
  button.addEventListener('click', (e) => {
    const galleryParent = document.querySelector('.portfolio-gallery');
    [...portfolioGallery].forEach((node) => {
      galleryParent.appendChild(node);
    });
    const id = e.target.innerHTML.toLowerCase();
    const getNecessaryElements = document.querySelectorAll(`.portfolio-gallery_item--${id}`);
    let child = galleryParent.lastElementChild;
    while (child) {
      galleryParent.removeChild(child);
      child = galleryParent.lastElementChild;
    }
    const resultNodeElements = [...getNecessaryElements].map((node, idx) => {
      const rowTopLength = 4;
      const nodeInner = node;
      if (idx <= rowTopLength - 1) {
        nodeInner.style.marginTop = 0;
        classNameReplace(nodeInner, idx, 1);
        return nodeInner;
      }
      classNameReplace(nodeInner, idx, 2);
      return nodeInner;
    });
    resultNodeElements.forEach((node) => {
      galleryParent.appendChild(node);
    });
    actualResizePortfolioGallery();

    // добавить класс к активной кнопке
    array.forEach((btn) => {
      if (array.indexOf(btn) === index) {
        btn.classList.add('category_item--active');
      } else {
        btn.classList.remove('category_item--active');
      }
    });
  });
});
