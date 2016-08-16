function animate(elem, style, unit, from, to, time, prop) {
    if( !elem) return;
    var start = new Date().getTime(),
        timer = setInterval(function() {
            var step = Math.min(1, (new Date().getTime() - start) / time);
            if (prop) {
                elem[style] = (from + step * (to - from)) + unit;
            } else {
                elem.style[style] = (from + step * (to - from)) + unit;
            }
            if( step == 1) clearInterval(timer);
        }, 25);
    elem.style[style] = from + unit;
}


// плавный переход по ссылкам-якорям
function goAnchor() { // не работает в Mozilla
    var body = document.body;

    var linkTarget = this.hash.substring(1);
    var targetElement = document.getElementById(linkTarget) || document.body;
    var targetOffset = targetElement.offsetTop;

    // 0.5с на каждую 1000px
    var time = Math.round(Math.abs(body.scrollTop - targetOffset) / 1000) * (1000 / 2);

    animate(body, "scrollTop", "",  body.scrollTop, targetOffset, time, true);
}
// -------------------------


// класс хедера
function changeHeaderClass() {
    var header = document.querySelector('.header');

    if (this.scrollY > 175) {
        header.classList.add('header_scrolled');
    } else {
         header.classList.remove('header_scrolled');
    }
}
// -------------------------


// круговая диаграмма
function drawSkillDiagrams() {
    var chartSkills = document.getElementsByClassName("chart__skills");
    var W = 150;
    var H = 150;
    var degrees = 0;
    // var new_degrees = 0;
    // var difference = 10;
    var color = "#ffe600";
    var textcolor = "#fff";
    var bgcolor = "#fff";
    var text;

    function draw (new_degrees, ctx, animation_loop) {
        //Cancel any movement animation if a new chart is requested
        if (typeof animation_loop != undefined) clearInterval(animation_loop);

        difference = new_degrees - degrees;

        animation_loop = setInterval(function () {
            if (degrees > new_degrees)
                clearInterval(animation_loop);

            if (degrees <= new_degrees)
                degrees++;
            else
                degrees--;

            ctx.clearRect(0, 0, W, H);

            ctx.beginPath();
            ctx.strokeStyle = bgcolor;
            ctx.lineWidth = 4;
            ctx.arc(W/2, H/2, 71, 0, Math.PI*2, false);
            ctx.stroke();

            var radians = degrees * Math.PI / 180;
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.lineWidth = 4;

            ctx.arc(W/2, H/2, 71, 0 - 270*Math.PI/180, radians - 270*Math.PI/180, false);
            ctx.stroke();

            ctx.fillStyle = textcolor;
            ctx.font = "300 36px Oswald";
            text = Math.round(degrees/360*100) + "%";
            text_width = ctx.measureText(text).width;
            ctx.fillText(text, W/2 - text_width/2, H/2 + 15);

        }, 8*1000/difference);
    }

    if (chartSkills[0].getBoundingClientRect().top < 400 && chartSkills[0].getBoundingClientRect().top > -50) {
        for (var i = 0; i < chartSkills.length; i++) {
            var percent = chartSkills[i].dataset.percent;
            draw(Math.round(percent*360/100), chartSkills[i].getContext("2d"));
        }

        window.removeEventListener("scroll", drawSkillDiagrams);
    }
}
// -------------------------


// статистические данные
function drawNumbers() {
    var counterNumber = document.getElementsByClassName("counter__number");
    var W = 200;
    var H = 62;
    var value = 0;
    var color = "#ffe600";
    var textcolor = "#fff";
    var bgcolor = "#fff";
    var text;

    function draw(new_value, ctx, deltaN, animation_loop) {
        //Cancel any movement animation if a new chart is requested
        if (typeof animation_loop != undefined) clearInterval(animation_loop);

        difference = new_value - value;

        animation_loop = setInterval(function () {
            if (value > new_value)
                clearInterval(animation_loop);

            if (value <= new_value)
                value += deltaN;
            else
                value = new_value;

            ctx.clearRect(0, 0, W, H);

            ctx.fillStyle = textcolor;
            ctx.font = "700 40px Oswald";
            text = value + "";
            text_width = ctx.measureText(text).width;
            ctx.fillText(text, W/2 - text_width/3, H/2 + 18);

        }, 100);
    }

    if (counterNumber[0].getBoundingClientRect().top < 600 && counterNumber[0].getBoundingClientRect().top > -50) {
        var count_1 = +counterNumber[0].dataset.count;
        draw(count_1, counterNumber[0].getContext("2d"), 53);

        var count_2 = +counterNumber[1].dataset.count;
        draw(count_2, counterNumber[1].getContext("2d"), 106);

        var count_3 = +counterNumber[2].dataset.count;
        draw(count_3, counterNumber[2].getContext("2d"), 1);

        var count_4 = +counterNumber[3].dataset.count;
        draw(count_4, counterNumber[3].getContext("2d"), 667);

        window.removeEventListener("scroll", drawNumbers);
    }
}
// -------------------------


// изменение размера иконок
function scaleIcon() {
    var element = this;
    setTransformProperty(element, "scale(1.1)");
}

function descaleIcon() {
    var element = this;
    setTransformProperty(element, "");
}

function setTransformProperty(element, property) {
    element.style.webkitTransform = property;
    element.style.MozTransform = property;
    element.style.msTransform = property;
    element.style.OTransform = property;
    element.style.transform = property;
}
// -------------------------



window.onload = function () {

    changeHeaderClass();

    // плавный переход по ссылкам-якорям
    var goLinks = document.querySelectorAll('.navigation__link, .go-to, .jump-to');
    for (var i = 0; i < goLinks.length; i++) {
        goLinks[i].addEventListener('click', goAnchor);
    }

    // изменение размера иконок при наведение на 10%
    var serviceIcons = document.querySelectorAll('.circle, .small-icon');

    for (var i = 0; i < serviceIcons.length; i++) {
        serviceIcons[i].addEventListener('mouseover', scaleIcon);
        serviceIcons[i].addEventListener('mouseout', descaleIcon);
    }

    // измнеть класс хедера в зависимости от значения величины прокрутки
    window.addEventListener("scroll", changeHeaderClass);
    // прорисовка диаграмм умений
    window.addEventListener("scroll", drawSkillDiagrams);
    // прорисовка статистических чисел
    window.addEventListener("scroll", drawNumbers);


    // фильтр категорий изображений
    var portfolioCategory = document.getElementsByClassName('portfolio-category');

    for (var i = 0; i < portfolioCategory.length; i++) {
        portfolioCategory[i].addEventListener('click', showCategory);
    }

    function showCategory(e) {
        var target = e.target;
        if (target.tagName != 'A') return;

        e.preventDefault();

        for (var i = 0; i < portfolioCategory.length; i++) {
            portfolioCategory[i].classList.remove('link_active');
        }

        target.classList.add('link_active');

        var portfolio = document.getElementsByClassName('portfolio__list')[0];

        for (var i = 0; i < portfolio.children.length; i++) {
            var portfolioItem = portfolio.children[i];
            var currentCategory = portfolioItem.getAttribute('data-category');

            if (target.getAttribute('data-category') == 'all') {
                portfolioItem.style.display = '';
                continue;
            }

            if (currentCategory != target.getAttribute('data-category')) {
                portfolioItem.style.display = 'none';
            } else {
                portfolioItem.style.display = '';
            }
        }
    }
    // -------------------------


    // валидация формы
    var form = document.querySelector('.contact-form');
    var inputName = form.querySelector('input[name="name"]');
    var inputMail = form.querySelector('input[name="mail"]');
    var inputSubject = form.querySelector('input[name="subject"]');

    form.addEventListener('submit', checkSubmit);
    inputName.addEventListener('input', checkName);
    inputMail.addEventListener('input', checkMail);
    inputSubject.addEventListener('input', checkSubject);
    
    function checkSubmit(e) {
        if (this.querySelector('.warning')) e.preventDefault();
    };

    function checkName (e) {
        var regexp = /[^a-zA-z]/;
        var message = 'Разрешены только английские символы';
        checkInput(e, regexp, message);
    };

    function checkMail (e) {
        var regexp = /[^a-zA-z0-9_@]/;
        var message = 'Разрешены только английские символы, цифры, знаки _ и @';
        checkInput(e, regexp, message);
    };

    function checkSubject (e) {
        var regexp = /[^a-zA-z0-9]/;
        var message = 'Разрешены только английские символы и цифры';
        checkInput(e, regexp, message);
    };

    function checkInput(e, regexp, message) {
        hideWarning(e);
        var target = e.target;
        if (~target.value.search(regexp)) {
            showWarning(e, message);
        }
    };

    function showWarning(e, message) {
        var target = e.target;
        var parent = target.parentElement;
        parent.style.position = "relative";

        if (target.parentElement.querySelector('.for-' + target.getAttribute('name'))) return;

        var newWarning = document.createElement('span');
        newWarning.className = 'warning for-' + target.getAttribute('name');
        newWarning.innerHTML = message;
        newWarning.style.position = 'relative';
        newWarning.style.top = 12 + 'px';
        parent.appendChild(newWarning);
    }

    function hideWarning(e) {
        var target = e.target;
        var attr = target.getAttribute('name');
        var needToRemove = target.parentElement.querySelector('.for-'+ attr);
        if (!needToRemove) return;
        needToRemove.remove();
    }
    // -------------------------


    // слайдер для блока "Quotes"
    var quotesSlides = document.querySelectorAll('#testimonials .quotes__slide');
    var quotesSlider = document.querySelector('.quotes__slider');

    var quotesWidth = 0;
    var transformOffset = [];

    for (var i = 0; i < quotesSlides.length; i++) {
        transformOffset.push(quotesWidth);
        quotesWidth += parseFloat(getComputedStyle(quotesSlides[i]).width);
        quotesSlides[i].style.width = parseFloat(getComputedStyle(quotesSlides[i]).width) + 'px';
    }

    quotesSlider.style.width = quotesWidth + 'px';

    
    var quotesControls = document.querySelectorAll('.bx-pager-link');

    for (var i = 0; i < quotesControls.length; i++) {
        quotesControls[i].addEventListener('click', nextSlide);
    }


    var currentSlide = 0;
    var slideTime = 3000;

    var slideInterval = setInterval(nextSlide, slideTime);

    nextSlide();

    function nextSlide(e) {

        var index = currentSlide;

         for (var i = 0; i < quotesControls.length; i++) {
            quotesControls[i].className = 'bx-pager-link';
        }

        if (e) {
            e.preventDefault();
            index = +e.target.dataset.slideIndex;

            e.target.classList.add('active');

            clearInterval(slideInterval);

            setTimeout(function() {
              slideInterval = setInterval(nextSlide, slideTime);
            }, 2000);
        }

        currentSlide = index;

        quotesSlides[currentSlide].className = 'quotes__slide';

        quotesControls[currentSlide].classList.add('active');
        
        quotesSlider.style.transform = 'translate3d(-' + transformOffset[currentSlide] + 'px, 0px, 0px)';
        
        currentSlide = (currentSlide + 1) % quotesSlides.length;

        quotesSlides[currentSlide].className = 'quotes__slide quotes__slide_active';
    }
    // -------------------------

}