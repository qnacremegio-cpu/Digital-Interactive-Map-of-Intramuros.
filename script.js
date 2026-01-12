// DATA
const landmarks = [
    { 
        name: "Statue of Jose Rizal at Fort Santiago", 
        category: "fort",
        desc: "Inside Fort Santiago, this statue commemorates Rizal's imprisonment before his execution in 1896.", 
        image: "rizal.png", 
        top: "20%", left: "38%" 
    },
    { 
        name: "Manila Cathedral", 
        category: "church",
        desc: "The Minor Basilica and Metropolitan Cathedral of the Immaculate Conception, the seat of the Archdiocese of Manila.", 
        image: "cathderal.png", 
        top: "58%", left: "42%" 
    },
    { 
        name: "San Agustin Church", 
        category: "church",
        desc: "The oldest stone church in the Philippines (1607) and a UNESCO World Heritage Site.", 
        image: "church.png", 
        top: "68%", left: "64%" 
    },
    { 
        name: "Baluarte de San Diego", 
        category: "fort",
        desc: "A spade-shaped bastion built in the late 16th century as part of the defensive fortifications.", 
        image: "Baluarte.png", 
        top: "84%", left: "84%" 
    },
    {
        name: "San Ignacio Church (Intramuros Museum)", 
        category: "museum", 
        desc: "Originally built by the Jesuits, this church was destroyed during WWII. It has now been reconstructed as the Museo de Intramuros.", 
        image: "san.png", 
        top: "72%", left: "18%" 
    },
    { 
        name: "Casa Manila", 
        category: "museum", 
        desc: "A reproduction of a Spanish colonial house that depicts the lifestyle of an affluent Filipino family during the late Spanish era.", 
        image: "casa.png", 
        top: "76%", left: "48%" 
    },
    { 
        name: "The Aduana Building", 
        category: "fort", 
        desc: "Also known as the Intendencia, this historic building served as the custom house of the Spanish colonial government.", 
        image: "Aduana.png", 
        top: "28%", left: "70%" 
    }
];

const map = document.getElementById('map');
const mainLayout = document.getElementById('mainLayout');
const locImage = document.getElementById('loc-image'); 
const locName = document.getElementById('loc-name');
const locDesc = document.getElementById('loc-desc');

function renderPins(filterCategory) {
    map.innerHTML = '';
    landmarks.forEach(point => {
        if (filterCategory === 'all' || point.category === filterCategory) {
            const pin = document.createElement('div');
            pin.className = 'pin pin-enter';
            pin.style.top = point.top;
            pin.style.left = point.left;
            pin.addEventListener('click', (e) => { 
                e.stopPropagation(); // Prevent clicking map from resetting
                showInfo(point); 
            });
            map.appendChild(pin);
        }
    });
}

function filterMap(category, btnElement) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');
    renderPins(category);
    resetUI();
}

function showInfo(point) {
    // 1. Populate Data
    locName.innerText = point.name;
    locDesc.innerText = point.desc;
    locImage.src = point.image; 

    // 2. Trigger Layout Animation (Move Map Left, Slide Panel In)
    mainLayout.classList.add('active');
}

function resetUI() {
    // Remove active class to revert layout
    mainLayout.classList.remove('active');
    
    // Clear image after animation so it doesn't flicker
    setTimeout(() => {
        locImage.src = "";
    }, 500);
}

// Optional: Click outside pins to close
document.addEventListener('click', (e) => {
    if(!e.target.closest('.pin') && !e.target.closest('.info-panel') && !e.target.closest('.filter-menu')) {
        resetUI();
    }
});

renderPins('all');