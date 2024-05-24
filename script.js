
const countriesContainer = document.getElementById('country'); 
const searchInput = document.getElementById('search');
const regions = document.getElementById('regionsFilter');
const darkMode = document.getElementById('darkMode');

let countriesData = [];

fetch('data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('ERROR 404');
        }
        return response.json();
    })
    .then(data => {
        countriesData = data;
        displyCountries(countriesData);
    })
    .catch(error => {
        console.error('Errors:', error);
    });

function displyCountries(countries) {
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
            window.location.href = `detail.html?name=${country.name.common}`;
        });
        countriesContainer.appendChild(countryCard);
    });

    //to use the country search box
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase('search');
        const filteredCountries = countriesData.filter(country => country.name.toLowerCase().includes(searchTerm));
        displyCountries(filteredCountries);
    });

    //to filter countries
    const regions=document.getElementById('regionFilter')
    regions.addEventListener('change', () => {
        const selecte = regions.value;
        if (selecte === 'all') {
            displyCountries(countriesData);
        } else {
            const filteredCountries = countriesData.filter(country => country.region === selecte);
            displyCountries(filteredCountries);
        }
    });
    
    
}



//change the darkmode option to light mode
document.getElementById('darkMode').addEventListener('click', function() {
    var body = document.body;
    var button = this;

    if (body.classList.contains('darkMode')) {
        body.classList.remove('darkMode');
        body.classList.add('light-mode');
        button.textContent = 'Dark Mode';
        body.style.backgroundColor ="rgb(169, 157, 157)";
    } else {
        body.classList.remove('light-mode');
        body.classList.add('darkMode');
        button.textContent = 'Dark Mode';
        body.style.backgroundColor ="#1a2127";
    }
});

document.getElementById('back').addEventListener('click', function() {
    
    if (countryCard.checked) {
        details.style.display = "none";
    }
   countryCard.style.display = 'none';
    country.style.display = 'flex';
});
