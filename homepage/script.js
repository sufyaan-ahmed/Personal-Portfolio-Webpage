window.onscroll = function() { makeSticky(); };

const navbar = document.getElementById("navbar");
const stickyOffset = 20;

function makeSticky() {
    if (window.scrollY > stickyOffset) {
        navbar.style.position = "fixed";
        navbar.style.top = "0";
        navbar.style.width = "100%";
        navbar.style.zIndex = "1000";
        navbar.style.boxShadow = "2px 10px 20px rgb(62, 61, 61)";
    } else {
        navbar.style.position = "";
        navbar.style.top = "";
        navbar.style.width = "";
        navbar.style.zIndex = "";
        navbar.style.boxShadow = "";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter-num');

    const startCounter = (counter) => {
        counter.innerText = '0';

        const updateCounter = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;

            const increment = target / 100;

            if (count < target) {
                counter.innerText = `${Math.ceil(count + increment)}`;
                setTimeout(updateCounter, 10);
            } else {
                counter.innerText = target;
            }
        };

        updateCounter();
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                startCounter(counter);
                observer.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5 
    });

    counters.forEach(counter => {
        observer.observe(counter);
    });
});
