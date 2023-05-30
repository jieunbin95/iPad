import ipads from '../data/ipads.js'
import navigations from '../data/navigations.js'


// 장바구니 메뉴
const basketstarterEl = document.querySelector('header .basket-starter')
const basketEl = basketstarterEl.querySelector('.basket')

basketstarterEl.addEventListener('click', function (event) {
  // 이벤트 버블링(basket-starter태그 안에는 전파차단)
  event.stopPropagation()
  // contains는 basket태그에 show라는 클래스가 있는지 확인하는 속성 (show가 있으면 true/없으면 false)
  if (basketEl.classList.contains('show')) {
    hideBasket()
  } else {
    showBasket()
  }
})

basketEl.addEventListener('click', function (event) {
  event.stopPropagation()
})

window.addEventListener('click', function () {
  hideBasket()
})

function showBasket() {
  basketEl.classList.add('show')
}

function hideBasket() {
  basketEl.classList.remove('show')
}

// 검색
const headerEl = document.querySelector('header')
// 전개 연산자로 자바부분에서 배울내용
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')]
const searchWrapEl = headerEl.querySelector('.search-wrap')
const searchStarterEl = headerEl.querySelector('.search-starter')
const searchCloserEl = searchWrapEl.querySelector('.search-closer')
const searchShadowEl = searchWrapEl.querySelector('.shadow')
const searchInputEl = searchWrapEl.querySelector('input')
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')]

// js콜백 파트에서 배울내용
searchStarterEl.addEventListener('click', showSearch)

searchCloserEl.addEventListener('click', function () {
  hideSearch()
})
searchShadowEl.addEventListener('click', function () {
  hideSearch()
})

function showSearch() {
  headerEl.classList.add('searching')
  // documentElement는 html을 말한다
  document.documentElement.classList.add('fixed')
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
  })
  searchDelayEls.forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
  })
  // css에서 변환효과로 .6초를 주었기 때문에 focus도 .6초 뒤에 나타나도록 설정
  setTimeout(function () {
    searchInputEl.focus()
  }, 600)

}

function hideSearch() {
  headerEl.classList.remove('searching')
  document.documentElement.classList.remove('fixed')
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
  })
  searchDelayEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
  })
  searchDelayEls.reverse()
  // 검색창을 다시 켰을때 검색창에 아무것도 남아있지 않도록 설정
  searchInputEl.value = ''
}

// 요소의 가시성 관찰
const io = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) {
      return
    } entry.target.classList.add('show')
  })
})

const infoEls = document.querySelectorAll('.info')
infoEls.forEach(function (el, index) {
  io.observe(el)
})

// 비디오 재생
const video = document.querySelector('.stage video')
const playBtn = document.querySelector('.stage .controller--play')
const pauseBtn = document.querySelector('.stage .controller--pause')

playBtn.addEventListener('click', function () {
  video.play()
  playBtn.classList.add('hide')
  pauseBtn.classList.remove('hide')
})
pauseBtn.addEventListener('click', function () {
  video.pause()
  playBtn.classList.remove('hide')
  pauseBtn.classList.add('hide')
})

// 당신에게 맞는 iPad는? 랜더링
const itemsEl = document.querySelector('section.compare .items')
ipads.forEach(function (ipad) {
  const itemEl = document.createElement('div')
  itemEl.classList.add('item')

  let colorList = ''
  ipad.colors.forEach(function (color) {
    colorList += `<li style="background-color:${color};"></li>`
  })

  itemEl.innerHTML =/*html*/`
  <div class="thumbnail">
    <img src="${ipad.thumbnail}" alt="${ipad.name}"/>
  </div>
  <ul class="colors">
    ${colorList}
  </ul>
  <h3 class="name">${ipad.name}</h3>
  <p class="tagline">${ipad.tagline}</p>
  <p class="price">₩${ipad.price.toLocaleString('en-US')}부터</p>
  <button class="btn">구입하기</button>
  <a href="${ipad.url}" class="link">더 알아보기</a>
  `


  itemsEl.append(itemEl)
})


const navigationsEl = document.querySelector('footer .navigations')
navigations.forEach(function (nav) {
  const mapEl = document.createElement('div')
  mapEl.classList.add('map')

  let mapList = ''
  nav.maps.forEach(function (map) {
    mapList +=/*html*/`<li><a href="${map.url}">${map.name}</a></li>`
  })

  mapEl.innerHTML =/*html*/`
  <h3>
    <span class="text">${nav.title}</span>
  </h3>
  <ul>
  ${mapList}
  </ul>
  `

  navigationsEl.append(mapEl)
})

const thisYearEl=document.querySelector('span.this-year')
thisYearEl.textContent=new Date().getFullYear()
