(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();

    // Initiate the wowjs
    new WOW().init();

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });

    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });

    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: true,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });

    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            }
        }
    });

    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({ filter: $(this).data('filter') });
    });

    // Add floating buttons dynamically
    const floatingButtonsHtml = `
        <div class="floating-buttons">
            <a href="https://wa.me/919668700452" target="_blank">
                <img src="img/wp.png" alt="WhatsApp">
            </a>
            <a href="tel:+919668700452" target="_blank">
                <img src="img/call.png" alt="Link">
            </a>
        </div>
    `;

    const floatingButtonsStyle = `
        <style>
            .floating-buttons {
                position: fixed;
                bottom: 30px;
                left: 20px;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            .floating-buttons a {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 60px;
                height: 60px;
                background: #25d366;
                border-radius: 50%;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                transition: transform 0.3s;
            }
            .floating-buttons a img {
                width: 30px;
                height: 30px;
            }
            .floating-buttons a:hover {
                transform: scale(1.1);
            }
        </style>
    `;

    $('body').append(floatingButtonsHtml);
    $('head').append(floatingButtonsStyle);

})(jQuery);

// Your booking form submission logic
document.getElementById('bookingForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const appliance = document.getElementById('appliance').value;
    const phone = document.getElementById('phone').value;
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;

    const message = `#New_Booking:\n\nAppliance: ${appliance}\nName: ${name}\nPhone: ${phone}\nAddress: ${address}`;
    console.log(message);

    const telegramMessage = encodeURIComponent(message);
    const telegramBotToken = '7589123215:AAG6E-x1NqACiw2MBY3L2fsnWCsp6TQTTgY';
    const chatId = '-1002168382676';
    fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage?chat_id=${chatId}&text=${telegramMessage}`);

    alert("Your booking will be processed and confirmed shortly!");
});
