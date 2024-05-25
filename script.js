
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
            window.location.href = `displayCountryDetail(details)`;
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



const details = document.getElementById('countryDetails');

function displayCountryDetail(){
    details.style.display = 'flex';
    details.style.flexDirection = 'row';
    countriesContainer.style.display = 'none';
    searchInput.style.display = 'none';
    regions.style.display = 'none';
    

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
            window.location.href = `detail.html?name=${encodeURIComponent(button.getAttribute('data-border'))}`;
        });
    });

    document.getElementById('back').addEventListener('click', () => {
        countriesContainer.style.display = 'flex';
        details.style.display = 'none';
    });
}








