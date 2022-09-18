'use strict'; 

{   
    // スライダー
    const next = document.getElementById('next');
    const prev = document.getElementById('prev');
    const $ul = document.querySelector(`.slider-container ul`);
    const slides = $ul.children;
    let currentIndex = 0;
    const dots = [];

    function updateButtons() {
        prev.classList.remove('hidden');
        next.classList.remove('hidden');
        
        if(currentIndex === 0) {
            prev.classList.add('hidden');
        }

        if(currentIndex === slides.length - 1) {
            next.classList.add('hidden');
        }
    }

    function moveSlides(){
        const slideWidth = slides[0].getBoundingClientRect().width;
        $ul.style.transform = `translateX(${-1 * slideWidth * currentIndex}px)`
    }

    function setupDots(){
        for(let i = 0; i < slides.length; i++){
            const button = document.createElement('button');
            button.addEventListener('click', () => {
                currentIndex = i;
                updateDots();
                updateButtons();
                moveSlides();
            });
            dots.push(button);
            document.querySelector('.slide-bottom-button').appendChild(button);
        }

        dots[0].classList.add('current');
    }

    function updateDots(){
        dots.forEach(dots => {
            dots.classList.remove('current');
        });
        dots[currentIndex].classList.add('current');
    }

    
    updateButtons();
    setupDots();
    
    next.addEventListener('click', () => {
        currentIndex++;
        updateDots();
        updateButtons();
        moveSlides();
    });

    prev.addEventListener('click', () => {
        currentIndex--;
        updateDots();
        updateButtons();
        moveSlides();
    });

    window.addEventListener('resize', () => {
        moveSlides();
    });

    // タブメニュー
    const menuItems = document.querySelectorAll('.tab-menu li a');
    const contents = document.querySelectorAll('.tab-content');
  
    menuItems.forEach(clickedItem => {
      clickedItem.addEventListener('click', e => {
        e.preventDefault();
  
        menuItems.forEach(item => {
          item.classList.remove('active');
        });
        clickedItem.classList.add('active');
  
        contents.forEach(content => {
          content.classList.remove('active');
        });
        document.getElementById(clickedItem.dataset.id).classList.add('active');
      });
    });

    // 個人用メニュー展開
    const $personal = document.getElementById('personal');
    const $personalMenu = document.querySelector('.personal-menu');
    const closeBtn = document.querySelector('.close-btn');
    
    $personal.addEventListener('click', () => {
        if($personalMenu.classList.contains('close')) {
            $personal.classList.remove('close');
            $personal.classList.add('open');
           
            $personalMenu.classList.remove('close');
            $personalMenu.classList.add('open');
        } else {
            $personal.classList.remove('open');
            $personal.classList.add('close');
           
            $personalMenu.classList.remove('open');
            $personalMenu.classList.add('close');
        }

        // $personalMenu.classList.toggle('close');
        // $personalMenu.classList.toggle('open');
       
        // $personal.classList.toggle('open');
    });

    closeBtn.addEventListener('click', () => {
        $personalMenu.classList.add('close');
        $personal.classList.add('close');
    });

    // アコーディオンメニュー
    const dts = document.querySelectorAll('.faq .question');
    dts.forEach(dt => {
        dt.addEventListener('click', () => {
            dt.parentNode.classList.toggle('appear');
        });
    });
}
