// ---
const hamMenuBtn = document.querySelector('.header__main-ham-menu-cont')
const smallMenu = document.querySelector('.header__sm-menu')
const headerHamMenuBtn = document.querySelector('.header__main-ham-menu')
const headerHamMenuCloseBtn = document.querySelector(
  '.header__main-ham-menu-close'
)
const headerSmallMenuLinks = document.querySelectorAll('.header__sm-menu-link')

hamMenuBtn.addEventListener('click', () => {
  if (smallMenu.classList.contains('header__sm-menu--active')) {
    smallMenu.classList.remove('header__sm-menu--active')
  } else {
    smallMenu.classList.add('header__sm-menu--active')
  }
  if (headerHamMenuBtn.classList.contains('d-none')) {
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
  } else {
    headerHamMenuBtn.classList.add('d-none')
    headerHamMenuCloseBtn.classList.remove('d-none')
  }
})

for (let i = 0; i < headerSmallMenuLinks.length; i++) {
  headerSmallMenuLinks[i].addEventListener('click', () => {
    smallMenu.classList.remove('header__sm-menu--active')
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
  })
}

// ---
const headerLogoConatiner = document.querySelector('.header__logo-container')

headerLogoConatiner.addEventListener('click', () => {
  location.href = 'index.html'
})

// Simple carousel for project showcase
document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel__track')
  if (!track) return

  const slides = Array.from(track.children)
  const nextButton = document.querySelector('.carousel__btn--next')
  const prevButton = document.querySelector('.carousel__btn--prev')
  const nav = document.querySelector('.carousel__nav')
  const indicators = nav ? Array.from(nav.children) : []
  const slideWidth = slides[0].getBoundingClientRect().width

  // arrange slides next to one another
  const setSlidePosition = (slide, index) => {
    slide.style.left = `${index * 100}%`
  }
  slides.forEach(setSlidePosition)

  const moveToSlide = (track, current, targetIndex) => {
    track.style.transform = `translateX(-${targetIndex * 100}%)`
    slides.forEach(s => s.classList.remove('current-slide'))
    slides[targetIndex].classList.add('current-slide')
    if (indicators.length) {
      indicators.forEach(i => i.classList.remove('current-slide'))
      indicators[targetIndex].classList.add('current-slide')
    }
  }

  let currentIndex = 0

  if (nextButton) {
    nextButton.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slides.length
      moveToSlide(track, null, currentIndex)
    })
  }

  if (prevButton) {
    prevButton.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length
      moveToSlide(track, null, currentIndex)
    })
  }

  if (indicators.length) {
    indicators.forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        currentIndex = idx
        moveToSlide(track, null, currentIndex)
      })
    })
  }

  // optional: auto play
  let autoPlayInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length
    moveToSlide(track, null, currentIndex)
  }, 5000)

  // pause on hover
  const carousel = document.querySelector('.carousel')
  if (carousel) {
    carousel.addEventListener('mouseenter', () => clearInterval(autoPlayInterval))
    carousel.addEventListener('mouseleave', () => {
      autoPlayInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length
        moveToSlide(track, null, currentIndex)
      }, 5000)
    })
  }
})
