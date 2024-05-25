const countriesContainer = document.getElementById('country'); 
const searchInput = document.getElementById('search');
const regions = document.getElementById('regionsFilter');
const darkMode = document.getElementById('darkMode');

let countriesData = [];

// Fetch data from JSON file
fetch('data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('ERROR 404');
        }
        return response.json();
    })
    .then(data => {
        countriesData = data;
        displayCountries(countriesData);
    })
    .catch(error => {
        console.error('Errors:', error);
    });

// Display countries
function displayCountries(countries) {
    countriesContainer.innerHTML = '';
    countries.forEach(country => {
        const countryCard = document.createElement('div');
        countryCard.classList.add('country-card');
        countryCard.innerHTML = `
            <img src="${country.flags.png}" alt="${country.name.common} Flag">
            <div class="details">
                <h2>${country.name}</h2>
                <p>Population: ${country.population.toLocaleString()}</p>
                <p>Region: ${country.region}</p>
                <p>Capital: ${country.capital ? country.capital[0] : 'N/A'}</p>
            </div>
        `;
        countryCard.addEventListener('click', () => {
            displayCountryDetail(country);
        });
        countriesContainer.appendChild(countryCard);
    });

    // Search box functionality
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredCountries = countriesData.filter(country => country.name.toLowerCase().includes(searchTerm));
        displayCountries(filteredCountries);
    });

    // Filter countries by region
    regionFilter.addEventListener('change', (e) => {
        const selectedRegion = e.target.value;
        if (selectedRegion === 'all') {
            displayCountries(countriesData);
        } else {
            const filteredCountries = countriesData.filter(country => 
                country.region === selectedRegion
            );
            displayCountries(filteredCountries);
        }
    });
}

// Toggle dark mode
darkMode.addEventListener('click', function() {
    var body = document.body;
    var button = this;

    if (body.classList.contains('darkMode')) {
        body.classList.remove('darkMode');
        body.classList.add('light-mode');
        button.textContent = 'Dark Mode';
        body.style.backgroundColor = "rgb(169, 157, 157)";
    } else {
        body.classList.remove('light-mode');
        body.classList.add('darkMode');
        button.textContent = 'Light Mode';
        body.style.backgroundColor = "#1a2127";
    }
});

// Display country details
function displayCountryDetail(country) {
    const details = document.getElementById('countryDetails');
    details.style.display = 'flex';
    details.style.flexDirection = 'row';
    countriesContainer.style.display = 'none';
    
    


    details.innerHTML = `
        <button id="back">Back</button>
        <div class="second">
            <img src="${country.flags.png}" alt="${country.name} Flag">
            <h2>${country.name}</h2>
            <p>Native Name: ${country.name.nativeName ? Object.values(country.name.nativeName)[0].common : country.name}</p>
            <p>Population: ${country.population.toLocaleString()}</p>
            <p>Region: ${country.region}</p>
            <p>Sub Region: ${country.subregion}</p>
            <p>Capital: ${country.capital ? country.capital[0] : 'N/A'}</p>
            <p>Top Level Domain: ${country.tld}</p>
            <p>Currencies: ${country.currencies ? Object.values(country.currencies).map(currency => currency.name).join(', ') : 'N/A'}</p>
            <p>Languages: ${country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
            <p>Border Countries: ${country.borders ? country.borders.map(border => `
            <button class="border-btn" data-border="${border}">${border}</button>`).join(' ') : 'N/A'}</p>
        </div>
    `;

    document.querySelectorAll('.border-btn').forEach(button => {
        button.addEventListener('click', () => {
            const borderCountry = countriesData.find(c => c.alpha3Code === button.getAttribute('data-border'));
            displayCountries(countries);
        });
    });

    document.getElementById('back').addEventListener('click', () => {
        countriesContainer.style.display = 'grid';
        details.style.display = 'none';
        searchInput.style.display = 'flex';
        regions.style.display = 'flex';
    });

}
