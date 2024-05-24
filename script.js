const apis = 'https://restcountries.com/v3.1/all';
const countriesContainer = document.getElementById('country'); // Assuming 'country' is the ID of the container element
const searchInput = document.getElementById('search');
const regions = document.getElementById('regionsFilter');
const darkMode = document.getElementById('darkMode');

let countriesData = [];

fetch(apis)
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
        console.error('Error fetching data:', error);
    });

function displayCountries(countries) {
    countriesContainer.innerHTML = '';
    countries.forEach(country => {
        const countryCard = document.createElement('div');
        countryCard.classList.add('country-card');
        countryCard.innerHTML = `
            <img src="${country.flags.png}" alt="${country.name.common} Flag">
            <div class="details">
                <h2>${country.name.common}</h2>
                <p>Population: ${country.population.toLocaleString()}</p>
                <p>Region: ${country.region}</p>
                <p>Capital: ${country.capital ? country.capital[0] : 'N/A'}</p>
            </div>
        `;
        countryCard.addEventListener('click', () => {
            window.location.href = `detail.html?name=${country.name.common}`;
        });
        countriesContainer.appendChild(countryCard);
    });


    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase('search');
        const filteredCountries = countriesData.filter(country => country.name.common.toLowerCase().includes(searchTerm));
        displayCountries(filteredCountries);
    });
    const regions=document.getElementById('regionFilter')
    regions.addEventListener('change', () => {
        const selectedRegion = regions.value;
        if (selectedRegion === 'all') {
            displayCountries(countriesData);
        } else {
            const filteredCountries = countriesData.filter(country => country.region === selectedRegion);
            displayCountries(filteredCountries);
        }
    });
    
}


document.getElementById('darkMode').addEventListener('click', function() {
    var body = document.body;
    var button = this;

    if (body.classList.contains('darkMode')) {
        body.classList.remove('darkMode');
        body.classList.add('light-mode');
        button.textContent = 'Dark Mode';
    } else {
        body.classList.remove('light-mode');
        body.classList.add('darkMode');
        button.textContent = 'Light Mode';
    }
});

document.getElementById('back').addEventListener('click', function() {
    document.getElementById('country-detail').style.display = 'none';
    document.getElementById('country-list').style.display = 'block';
});

