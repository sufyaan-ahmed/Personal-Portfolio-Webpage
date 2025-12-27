document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Check if the link is a navigation link to a section
            if (this.classList.contains('nav-link') || this.classList.contains('logo')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    // Get the height of the fixed header
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    
                    // Calculate the position to scroll to, accounting for the header
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 2. Navbar Active State on Scroll (Intersection Observer API for modern, efficient solution)
    
    // Get all sections and nav links
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('.navbar a');
    
    // Options for the Intersection Observer
    const observerOptions = {
        // Root margin ensures that the header doesn't obscure the section when it is marked 'active'
        // Using the header height as a negative top margin
        rootMargin: `-${document.querySelector('.header').offsetHeight}px 0px 0px 0px`,
        threshold: 0.3 // Section is considered active when 30% of it is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove 'active' class from all links
                navLinks.forEach(link => link.classList.remove('active'));

                // Add 'active' class to the link that corresponds to the visible section
                const activeLink = document.querySelector(`.navbar a[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    // Observe each section
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Fallback for the Hero section if no other sections are intersecting
    window.addEventListener('scroll', () => {
        if (window.scrollY === 0) {
            navLinks.forEach(link => link.classList.remove('active'));
            document.querySelector('.navbar a[href="#hero"]').classList.add('active');
        }
    });


    // 3. Simple Animation: Fill Skills Bars on Load/Visibility
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If the skill bar is visible, trigger the CSS width transition
                const targetWidth = entry.target.style.width;
                entry.target.style.width = targetWidth;
                
                // Stop observing after animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, {
        // Trigger when skill section comes into view
        threshold: 0.1 
    });

    skillBars.forEach(bar => {
        // Reset width to 0 for initial state, allowing the CSS transition to work on load
        const initialWidth = bar.style.width; 
        bar.style.width = '0';
        bar.setAttribute('data-target-width', initialWidth); // Store target width

        skillObserver.observe(bar);
    });

    // Re-applying the width after the observer triggers for animation
    const reObserveSkillBars = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetWidth = entry.target.getAttribute('data-target-width');
                entry.target.style.width = targetWidth;
            }
        });
    }, { threshold: 0.1 });

    skillBars.forEach(bar => {
        reObserveSkillBars.observe(bar);
    });
    
    
    // 4. Simple Form UI Interaction
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // In a real deployment, you would send this data to a backend service (e.g., Formspree, Netlify Forms, or your own server)
        console.log("Form submitted (Client-side simulation only)");

        // Simple success message or visual feedback
        const submitButton = this.querySelector('button[type="submit"]');
        submitButton.textContent = "Message Sent! (Simulated)";
        submitButton.style.backgroundColor = 'green';
        
        // Reset the form after a short delay
        setTimeout(() => {
            contactForm.reset();
            submitButton.textContent = "Send Message";
            submitButton.style.backgroundColor = 'var(--color-primary)';
        }, 3000);
    });

});

// add classes for mobile navigation toggling
    var CSbody = document.querySelector("body");
    const CSnavbarMenu = document.querySelector("#cs-navigation");
    const CShamburgerMenu = document.querySelector("#cs-navigation .cs-toggle");

    CShamburgerMenu.addEventListener('click', function() {
        CShamburgerMenu.classList.toggle("cs-active");
        CSnavbarMenu.classList.toggle("cs-active");
        CSbody.classList.toggle("cs-open");
        // run the function to check the aria-expanded value
        ariaExpanded();
    });

    // checks the value of aria expanded on the cs-ul and changes it accordingly whether it is expanded or not 
    function ariaExpanded() {
        const csUL = document.querySelector('#cs-expanded');
        const csExpanded = csUL.getAttribute('aria-expanded');

        if (csExpanded === 'false') {
            csUL.setAttribute('aria-expanded', 'true');
        } else {
            csUL.setAttribute('aria-expanded', 'false');
        }
    }

        // This script adds a class to the body after scrolling 100px
    // and we used these body.scroll styles to create some on scroll 
    // animations with the navbar
    
    document.addEventListener('scroll', (e) => { 
        const scroll = document.documentElement.scrollTop;
        if(scroll >= 100){
    document.querySelector('body').classList.add('scroll')
        } else {
        document.querySelector('body').classList.remove('scroll')
        }
    });


    // mobile nav toggle code
    const dropDowns = Array.from(document.querySelectorAll('#cs-navigation .cs-dropdown'));
        for (const item of dropDowns) {
            const onClick = () => {
            item.classList.toggle('cs-active')
        }
        item.addEventListener('click', onClick)
        }
                                