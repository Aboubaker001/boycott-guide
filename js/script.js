// Initialize Firebase
function addAlternative(boycotted, alternative, category) {
  return alternativesRef.add({
    boycotted: boycotted,
    alternative: alternative,
    category: category,
    approved: false, // For moderation
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
}

// Function to fetch alternatives from Firestore
function fetchAlternatives(category = null) {
  let query = alternativesRef.where("approved", "==", true);

  // Optional: Filter by category
  if (category) {
    query = query.where("category", "==", category);
  }

  return query.orderBy("createdAt", "desc").get();
}

// Function to display alternatives in the table
function renderAlternatives(alternatives) {
  const container = document.getElementById("alternatives-container");
  container.innerHTML = "";

  alternatives.forEach(doc => {
    const product = doc.data();
    container.innerHTML += `
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-transform hover:-translate-y-1">
        <div class="relative h-48 bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 flex items-center justify-center">
          <img src="../assets/images/local-product.jpg" alt="${product.alternative}" class="h-40 object-contain">
          ${product.isNew ? '<div class="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm">جديد</div>' : ''}
        </div>
        <div class="p-6">
          <div class="flex justify-between items-start mb-2">
            <h3 class="text-xl font-bold">${product.alternative}</h3>
            <span class="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full text-xs">بديل ${product.boycotted}</span>
          </div>
          <p class="text-gray-600 dark:text-gray-400 mb-4 text-sm">${product.description || 'منتج وطني عالي الجودة'}</p>
          <div class="flex justify-between items-center">
            <span class="text-green-600 dark:text-green-400 font-bold">${product.price || '---'} د.ج</span>
            <div>
              <span class="text-yellow-500 mr-1">★</span>
              <span class="text-sm">${product.rating || '4.5'} (${product.reviews || '0'})</span>
            </div>
          </div>
        </div>
      </div>
    `;
  });
}

// Function to handle form submission
document.addEventListener("DOMContentLoaded", () => {
  fetchAlternatives().then(snapshot => {
    const products = snapshot.docs;
    renderAlternatives(products);
  });
});

// Usage example:
document.getElementById("add-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const boycotted = document.getElementById("boycotted-input").value;
  const alternative = document.getElementById("alternative-input").value;
  const category = document.getElementById("category-select").value;

  addAlternative(boycotted, alternative, category)
    .then(() => alert("تمت الإضافة بنجاح!"))
    .catch(err => console.error("Error:", err));
});


// Initialize AOS animations
document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });

  // Mobile menu toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  mobileMenuButton.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (!mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
        }
      }
    });
  });

  // Product hover effects
  const productCards = document.querySelectorAll('.group');
  productCards.forEach(card => {
    const img = card.querySelector('img');
    if (img) {
      card.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.1)';
      });
      card.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';
      });
    }
  });

  // Form submission handling
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      // Add your form submission logic here
      alert('شكراً لك! سيتم معالجة طلبك قريباً.');
      this.reset();
    });
  });

  // Scroll to top button
  const scrollToTopButton = document.createElement('button');
  scrollToTopButton.innerHTML = '&uarr;';
  scrollToTopButton.className = 'fixed bottom-8 left-8 bg-primary dark:bg-accent text-white p-3 rounded-full shadow-lg z-50 opacity-0 invisible transition-all duration-300';
  document.body.appendChild(scrollToTopButton);

  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollToTopButton.classList.remove('opacity-0', 'invisible');
      scrollToTopButton.classList.add('opacity-100', 'visible');
    } else {
      scrollToTopButton.classList.remove('opacity-100', 'visible');
      scrollToTopButton.classList.add('opacity-0', 'invisible');
    }
  });

  scrollToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});


// In script.js
function searchProducts() {
  const input = document.getElementById('search-input').value.toLowerCase();
  const rows = document.querySelectorAll('tbody tr');
  
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(input) ? '' : 'none';
  });
}


function filterByCategory(category) {
  fetchAlternatives(category).then(snapshot => {
    renderAlternatives(snapshot.docs);
  });
  
  // Update active button style
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.classList.remove('bg-green-600', 'text-white');
  });
  if (category) {
    event.target.classList.add('bg-green-600', 'text-white');
  }
}

document.addEventListener("DOMContentLoaded", () => {
  alternativesRef.where("approved", "==", true)
    .orderBy("createdAt", "desc")
    .onSnapshot(snapshot => {
      renderAlternatives(snapshot.docs);
    });
});

function sortProducts() {
  const table = document.getElementById('product-table');
  const rows = Array.from(table.querySelectorAll('tbody tr'));
  const sortOrder = document.getElementById('sort-order').value;
  
  rows.sort((a, b) => {
    const priceA = parseFloat(a.querySelector('.price').textContent.replace('$', ''));
    const priceB = parseFloat(b.querySelector('.price').textContent.replace('$', ''));
    
    return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
  });
  
  rows.forEach(row => table.querySelector('tbody').appendChild(row));
}


// Real-time data fetch
function loadAlternatives() {
  firebase.firestore().collection("alternatives")
    .where("approved", "==", true)
    .orderBy("createdAt", "desc")
    .onSnapshot((snapshot) => {
      const container = document.getElementById("alternatives-container");
      container.innerHTML = "";

      snapshot.forEach(doc => {
        const product = doc.data();
        container.innerHTML += `
          <div class="product-card">
            <h3 class="text-red-600">${product.boycotted}</h3>
            <p class="text-green-600">${product.alternative}</p>
            <p>الفئة: ${product.category}</p>
            ${product.price ? `<p>السعر: ${product.price} د.ج</p>` : ''}
          </div>
        `;
      });
      
      if (snapshot.empty) {
        container.innerHTML = `<p class="text-gray-500">لا توجد بدائل مسجلة بعد</p>`;
      }
    });
}

// Call on page load
window.addEventListener('DOMContentLoaded', loadAlternatives);