// Smooth scroll for navigation
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.hash) {
            e.preventDefault();
            document.querySelector(this.hash).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// EmailJS contact form integration
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
            .then(function() {
                formMessage.textContent = 'Thank you for contacting us! Your message has been sent.';
                contactForm.reset();
            }, function(error) {
                formMessage.textContent = 'Failed to send message. Please try again later.';
            });
    });
}

// Animation on scroll
function animateOnScroll() {
    const animatedEls = document.querySelectorAll('.animated-fade-in, .animated-slide-down, .animated-slide-up, .animated-slide-left, .animated-pop');
    animatedEls.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 60) {
            el.classList.add('show-anim');
        }
    });
}

// Add star rating system to element
function addStarRating(el) {
    const rating = document.createElement('div');
    rating.className = 'rating-stars';
    rating.style.marginTop = '8px';
    rating.style.fontSize = '16px';
    rating.style.color = '#ccc';
    rating.style.cursor = 'pointer';
    rating.dataset.rating = 0;

    for (let j = 0; j < 5; j++) {
        const star = document.createElement('span');
        star.textContent = '★';
        star.style.color = '#ccc';
        star.addEventListener('click', () => {
            rating.dataset.rating = j + 1;
            [...rating.children].forEach((s, i) => s.style.color = i <= j ? '#ffc107' : '#ccc');
        });
        rating.appendChild(star);
    }

    el.appendChild(rating);
}

// Apply star ratings to all menu items
function applyRatingsToAllItems() {
    document.querySelectorAll('.menu-item:not(.rated)').forEach(el => {
        addStarRating(el);
        el.classList.add('rated');
    });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.menu-item.animated-pop').forEach((el, i) => {
        el.style.setProperty('--i', i + 1);
    });

    animateOnScroll();
    applyRatingsToAllItems();
    setTimeout(applyRatingsToAllItems, 1000);

    // Daily deals rotator
    const deals = [
        "🔥 Buy 1 Zinger Burger, Get 1 Free!",
        "🍟 Free Masala Fries with any Burger!",
        "🍔 10% off on orders above Rs. 800!",
        "🥤 Get a Free Drink with every Paratha Roll!",
        "🍕 Flat Rs. 100 off on Pizza Slice combo!",
        "🎁 Order now and get a surprise gift!"
    ];
    const banner = document.createElement('div');
    banner.className = 'daily-deal-banner';
    banner.id = 'dealBanner';
    const header = document.querySelector('header');
    header.parentNode.insertBefore(banner, header.nextSibling);

    let dealIndex = 0;
    function updateDeal() {
        banner.textContent = deals[dealIndex];
        banner.classList.remove('slide-left');
        void banner.offsetWidth;
        banner.classList.add('slide-left');
        dealIndex = (dealIndex + 1) % deals.length;
    }
    updateDeal();
    setInterval(updateDeal, 3000);

    // Floating scroll man button only (removed sentence + voice)
    const childBtn = document.createElement('div');
    childBtn.id = 'childFloatBtn';
    childBtn.style.position = 'fixed';
    childBtn.style.bottom = '100px';
    childBtn.style.right = '20px';
    childBtn.style.background = '#eee';
    childBtn.style.borderRadius = '50%';
    childBtn.style.width = '60px';
    childBtn.style.height = '60px';
    childBtn.style.display = 'flex';
    childBtn.style.alignItems = 'center';
    childBtn.style.justifyContent = 'center';
    childBtn.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)';
    childBtn.style.zIndex = '1000';
    childBtn.style.transition = 'bottom 0.3s ease';
    childBtn.innerHTML = '<img src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png" alt="Walking Man" style="width:40px">';
    document.body.appendChild(childBtn);

    let lastY = window.scrollY;
    window.addEventListener('scroll', () => {
        const currentY = window.scrollY;
        if (currentY > lastY) {
            childBtn.style.bottom = '40px';
        } else {
            childBtn.style.bottom = '100px';
        }
        lastY = currentY;
    });

    // Floating speech bubble beside the man icon
    const bubble = document.createElement('div');
    bubble.id = 'manBubble';
    bubble.style.position = 'fixed';
    bubble.style.right = '90px';
    bubble.style.bottom = '100px';
    bubble.style.background = '#fff';
    bubble.style.padding = '10px 14px';
    bubble.style.borderRadius = '16px';
    bubble.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
    bubble.style.fontSize = '14px';
    bubble.style.color = '#333';
    bubble.style.transition = 'opacity 0.5s ease';
    bubble.style.opacity = '0';
    bubble.style.zIndex = '999';
    document.body.appendChild(bubble);

    const bubbleMessages = [
        "Freshly made for you 🍔",
        "We have fast delivery 🚀",
        "Enjoying our website? 😍",
        "Check out our bestsellers!",
        "Try our spicy deals 🌶️",
        "Order now & get a surprise!"
    ];

    let bubbleIndex = 0;
    function showNextBubble() {
        bubble.textContent = bubbleMessages[bubbleIndex];
        bubble.style.opacity = '1';
        setTimeout(() => {
            bubble.style.opacity = '0';
        }, 5000);
        bubbleIndex = (bubbleIndex + 1) % bubbleMessages.length;
    }
    showNextBubble();
    setInterval(showNextBubble, 7000);

    // Order progress tracker
    const cartBox = document.getElementById('cartBox');
    const buyBtn = document.getElementById('buyNowBtn');

    const createTracker = () => {
        const tracker = document.createElement('div');
        tracker.id = 'orderTracker';
        tracker.style.position = 'fixed';
        tracker.style.bottom = '20px';
        tracker.style.left = '50%';
        tracker.style.transform = 'translateX(-50%)';
        tracker.style.background = '#fff';
        tracker.style.padding = '15px 25px';
        tracker.style.borderRadius = '12px';
        tracker.style.boxShadow = '0 0 15px rgba(0,0,0,0.2)';
        tracker.style.zIndex = '1001';
        tracker.style.fontSize = '16px';
        tracker.textContent = 'Order Confirmed';
        document.body.appendChild(tracker);

        const steps = ["Preparing", "Out for Delivery", "Delivered"];
        let step = 0;
        const interval = setInterval(() => {
            if (step < steps.length) {
                tracker.textContent = steps[step];
                step++;
            } else {
                clearInterval(interval);
                setTimeout(() => tracker.remove(), 2000);
            }
        }, 60000);
    };

    if (buyBtn) {
        buyBtn.addEventListener('click', createTracker);
    }

    // Food Reaction Emojis
    function addEmojiBars() {
        document.querySelectorAll('.menu-item:not(.emoji-added)').forEach(item => {
            const emojiBar = document.createElement('div');
            emojiBar.className = 'emoji-bar';
            emojiBar.innerHTML = '😍 🔥 🤤';
            emojiBar.style.marginTop = '6px';
            emojiBar.style.fontSize = '18px';
            emojiBar.style.cursor = 'pointer';
            item.appendChild(emojiBar);
            item.classList.add('emoji-added');
        });
    }
    addEmojiBars();
    setTimeout(addEmojiBars, 1000);
});

// Walking man to restaurant animation (scroll-based)
let lastScroll = window.scrollY;
const man = document.getElementById('scrollMan');
const burger = document.getElementById('scrollBurger');

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  if (currentScroll > lastScroll) {
    // Scroll down
    man.style.transition = 'transform 1.2s ease';
    man.style.transform = 'translateX(250px)';
    burger.style.transition = 'transform 1.2s ease, opacity 1.2s ease';
    burger.style.transform = 'scale(0)';
    burger.style.opacity = '0';
  } else {
    // Scroll up
    man.style.transition = 'transform 1.2s ease';
    man.style.transform = 'translateX(0)';
    burger.style.transition = 'transform 1.2s ease, opacity 1.2s ease';
    burger.style.transform = 'scale(1)';
    burger.style.opacity = '1';
  }

  lastScroll = currentScroll <= 0 ? 0 : currentScroll;
});

// Add more products dynamically
window.addEventListener('DOMContentLoaded', () => {
    const menuContainer = document.querySelector('.menu-items');
    const newProducts = [
        {
            name: "Chicken Tikka Pizza",
            desc: "Smoky chicken tikka on a cheesy base.",
            price: 450,
            img: "../tikka-pizza.jpg"
        },
        {
            name: "Creamy Pasta",
            desc: "Rich cream sauce with spicy chicken.",
            price: 300,
            img: "../creamy-pasta.jpg"
        },
        {
            name: "BBQ Paratha Roll",
            desc: "Barbecue chicken wrapped in crispy paratha.",
            price: 200,
            img: "../bbq-roll.jpg"
        },
        {
            name: "Cheese Burst Burger",
            desc: "Oozing cheese inside a spicy chicken patty.",
            price: 380,
            img: "../cheese-burst.jpg"
        }
    ];

    const cart = [];
    const cartBox = document.getElementById('cartBox');
    const renderCart = () => {
        const ul = document.getElementById("cartItems");
        const totalDiv = document.getElementById("cartTotal");
        ul.innerHTML = "";
        let total = 0;
        cart.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
              ${item.name} (x${item.qty}) - Rs. ${item.price * item.qty}
              <button class="qty-btn" onclick="updateQty(${index}, -1)">-</button>
              <button class="qty-btn" onclick="updateQty(${index}, 1)">+</button>
            `;
            ul.appendChild(li);
            total += item.price * item.qty;
        });
        totalDiv.innerText = `Total: Rs. ${total}`;
    };

    newProducts.forEach((product, index) => {
        const div = document.createElement('div');
        div.className = 'menu-item animated-pop';
        div.style.setProperty('--i', index + 20);
        div.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.desc}</p>
            <span class="price">Rs. ${product.price}</span>
        `;

        const btn = document.createElement("button");
        btn.innerText = "Add to Cart";
        btn.className = "add-to-cart";
        btn.addEventListener("click", () => {
            const existing = cart.find(p => p.name === product.name);
            if (existing) {
                existing.qty += 1;
            } else {
                cart.push({ name: product.name, price: product.price, qty: 1 });
            }
            renderCart();
            cartBox.style.display = 'block';
        });

        div.appendChild(btn);
        menuContainer.appendChild(div);
    });

    //  feature 5Live search filter
    const searchInput = document.createElement('input');
    searchInput.placeholder = "Search menu...";
    searchInput.style.width = '100%';
    searchInput.style.maxWidth = '300px';
    searchInput.style.margin = '20px auto';
    searchInput.style.display = 'block';
    searchInput.style.padding = '10px';
    searchInput.style.border = '2px solid #ffd600';
    searchInput.style.borderRadius = '8px';
    searchInput.style.fontSize = '1rem';

    menuContainer.parentElement.insertBefore(searchInput, menuContainer);

    searchInput.addEventListener('input', () => {
        const keyword = searchInput.value.toLowerCase();
        let found = false;
        document.querySelectorAll('.menu-item').forEach(item => {
            const name = item.querySelector('h3')?.innerText.toLowerCase() || '';
            const desc = item.querySelector('p')?.innerText.toLowerCase() || '';
            const match = name.includes(keyword) || desc.includes(keyword);
            item.style.display = match ? 'block' : 'none';
            if (match) found = true;
        });

        if (!found && !document.getElementById('noResults')) {
            const noResult = document.createElement('div');
            noResult.id = 'noResults';
            noResult.textContent = 'No results found.';
            noResult.style.textAlign = 'center';
            noResult.style.color = '#ff0000';
            menuContainer.appendChild(noResult);
        } else if (found && document.getElementById('noResults')) {
            document.getElementById('noResults').remove();
        }
    });
});
// Feature 6: Fake Checkout Page (open alert on Buy Now)
// Already shows total in alert, simulate checkout UI if needed

// Feature 7: Google Maps Embed (assumes HTML element with #map)
window.addEventListener('DOMContentLoaded', () => {
    const contactSection = document.querySelector('#contact');
    const mapFrame = document.createElement('iframe');
    mapFrame.src = 'https://www.google.com/maps/embed?...';
    mapFrame.width = '100%';
    mapFrame.height = '200';
    mapFrame.style.border = '0';
    contactSection.appendChild(mapFrame);
});

// Feature 8: Language Switcher (EN/UR for headings)
window.addEventListener('DOMContentLoaded', () => {
    const langBtn = document.createElement('button');
    langBtn.innerText = 'اردو';
    langBtn.style.cssText = 'position:fixed;top:10px;left:10px;padding:6px 12px;background:#ff0000;color:#fff;border:none;border-radius:4px;cursor:pointer;z-index:1000;';
    document.body.appendChild(langBtn);
    let isUrdu = false;
    langBtn.addEventListener('click', () => {
        document.querySelector('#home h1').innerText = isUrdu ? 'Welcome to Munchy Food' : 'منچی فوڈ میں خوش آمدید';
        document.querySelector('#menu h2').innerText = isUrdu ? 'Our Menu' : 'ہمارا مینو';
        document.querySelector('#about h2').innerText = isUrdu ? 'About Us' : 'ہمارے بارے میں';
        document.querySelector('#contact h2').innerText = isUrdu ? 'Contact Us' : 'ہم سے رابطہ کریں';
        langBtn.innerText = isUrdu ? 'اردو' : 'EN';
        isUrdu = !isUrdu;
    });
});
