// JavaScript for Tech Career Guide Website

// Tab functionality for comparison tables
function openTab(evt, tabName) {
    // Hide all tab content
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove("active");
    }

    // Remove active class from all tab buttons
    const tabButtons = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove("active");
    }

    // Show the current tab and add active class to the button
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// Career details are now displayed by default
// This function is kept for backward compatibility but no longer toggles visibility
function toggleCareerDetails(id) {
    // Career details are now always visible
    return;
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('header nav a, .footer-nav a, a.btn');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only apply to links that point to an ID on the page
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    document.getElementById('nav-toggle').checked = false;
                    
                    // Scroll to the element
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Adjust for header height
                        behavior: 'smooth'
                    });
                    
                    // Update active state in navigation
                    navLinks.forEach(link => link.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });
    
    // Update active navigation link based on scroll position
    window.addEventListener('scroll', function() {
        let scrollPosition = window.scrollY + 100; // Adjust for header height
        
        // Get all sections
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to corresponding navigation link
                const activeLink = document.querySelector(`header nav a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    });
});

// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('nav a');
    
    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.checked = false;
        });
    });
});

// Back to top button functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.title = 'Back to Top';
    document.body.appendChild(backToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top when button is clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add CSS for back to top button
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--primary-color);
            color: white;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }
        
        .back-to-top.show {
            opacity: 1;
            visibility: visible;
        }
        
        .back-to-top:hover {
            background-color: var(--secondary-color);
            transform: translateY(-3px);
        }
        
        @media (max-width: 768px) {
            .back-to-top {
                width: 40px;
                height: 40px;
                bottom: 20px;
                right: 20px;
            }
        }
    `;
    document.head.appendChild(style);
});

// Add search functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create search container
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    
    // Create search input
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.id = 'career-search';
    searchInput.placeholder = 'Search careers...';
    
    // Add search input to container
    searchContainer.appendChild(searchInput);
    
    // Insert search container before the career grid
    const careerGrid = document.querySelector('.career-grid');
    careerGrid.parentNode.insertBefore(searchContainer, careerGrid);
    
    // Add event listener for search input
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const careerCards = document.querySelectorAll('.career-card');
        
        careerCards.forEach(card => {
            const careerTitle = card.querySelector('h3').textContent.toLowerCase();
            const careerDetails = card.querySelector('.career-details').textContent.toLowerCase();
            
            if (careerTitle.includes(searchTerm) || careerDetails.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
    
    // Add CSS for search container
    const style = document.createElement('style');
    style.textContent = `
        .search-container {
            margin-bottom: 30px;
            text-align: center;
        }
        
        #career-search {
            padding: 12px 20px;
            width: 100%;
            max-width: 500px;
            border: 2px solid #ddd;
            border-radius: var(--border-radius);
            font-size: 1rem;
            transition: var(--transition);
        }
        
        #career-search:focus {
            border-color: var(--primary-color);
            outline: none;
            box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
        }
    `;
    document.head.appendChild(style);
});

// Add salary calculator
document.addEventListener('DOMContentLoaded', function() {
    // Create calculator container
    const calculatorContainer = document.createElement('div');
    calculatorContainer.className = 'calculator-container';
    calculatorContainer.innerHTML = `
        <h3>Salary Conversion Calculator</h3>
        <div class="calculator-form">
            <div class="form-group">
                <label for="amount">Amount:</label>
                <input type="number" id="amount" placeholder="Enter amount">
            </div>
            <div class="form-group">
                <label for="from-currency">From:</label>
                <select id="from-currency">
                    <option value="usd">USD ($)</option>
                    <option value="inr">INR (₹)</option>
                </select>
            </div>
            <div class="form-group">
                <label for="to-currency">To:</label>
                <select id="to-currency">
                    <option value="inr">INR (₹)</option>
                    <option value="usd">USD ($)</option>
                </select>
            </div>
            <button id="calculate-btn" class="btn">Convert</button>
        </div>
        <div id="result" class="calculator-result"></div>
    `;
    
    // Insert calculator after the comparison section
    const comparisonSection = document.getElementById('comparison');
    comparisonSection.appendChild(calculatorContainer);
    
    // Add event listener for calculator button
    document.getElementById('calculate-btn').addEventListener('click', function() {
        const amount = parseFloat(document.getElementById('amount').value);
        const fromCurrency = document.getElementById('from-currency').value;
        const toCurrency = document.getElementById('to-currency').value;
        const resultElement = document.getElementById('result');
        
        if (isNaN(amount)) {
            resultElement.innerHTML = '<p class="error">Please enter a valid amount</p>';
            return;
        }
        
        let result;
        if (fromCurrency === 'usd' && toCurrency === 'inr') {
            // USD to INR (approximate conversion rate)
            result = amount * 83.5;
            resultElement.innerHTML = `<p>${amount.toFixed(2)} USD = ${result.toFixed(2)} INR</p>`;
        } else if (fromCurrency === 'inr' && toCurrency === 'usd') {
            // INR to USD (approximate conversion rate)
            result = amount / 83.5;
            resultElement.innerHTML = `<p>${amount.toFixed(2)} INR = ${result.toFixed(2)} USD</p>`;
        } else {
            // Same currency
            resultElement.innerHTML = `<p>${amount.toFixed(2)} ${fromCurrency.toUpperCase()} = ${amount.toFixed(2)} ${toCurrency.toUpperCase()}</p>`;
        }
    });
    
    // Add CSS for calculator
    const style = document.createElement('style');
    style.textContent = `
        .calculator-container {
            background-color: white;
            border-radius: var(--border-radius);
            padding: 30px;
            box-shadow: var(--box-shadow);
            margin-top: 50px;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }
        
        .calculator-container h3 {
            text-align: center;
            margin-bottom: 20px;
        }
        
        .calculator-form {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .form-group {
            display: flex;
            flex-direction: column;
        }
        
        .form-group label {
            margin-bottom: 8px;
            font-weight: bold;
        }
        
        .form-group input,
        .form-group select {
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: var(--border-radius);
        }
        
        .calculator-result {
            text-align: center;
            font-size: 1.2rem;
            font-weight: bold;
            margin-top: 20px;
        }
        
        .calculator-result .error {
            color: var(--accent-color);
        }
        
        @media (max-width: 768px) {
            .calculator-form {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(style);
});
