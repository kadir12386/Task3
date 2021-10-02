  // UI variables
      const form = document.querySelector("#form");
      const search = document.querySelector("#search");
      const box = document.querySelector("#box");

      let cities_data = [];

      //Initial data load
      document.addEventListener("DOMContentLoaded", () => {
        loadData();
      });

      //Filter using onchange event on search input
      search.addEventListener("keyup", (e) => {
        e.preventDefault();
        filterCities(e.target.value);
      });

      const loadData = async () => {
        try {
          const res = await fetch(
            "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json"
          );
          const data = await res.json();
          console.log(data);
          cities_data = data;
          //   console.log(cities_data); //copy of full data
          displayCities(cities_data);
        } catch (err) {
          const output = `
                <div class="card">
                <h5>Plzz try later </h5>
                <h5>Error:${err.message}</h5>
                </div>`;
          //Add output to card-box
          box.innerHTML = output;
        }
      };

      //Filter through cities
      const filterCities = (text) => {
        const filteredCities = cities_data.filter((city) => {
          const regex = new RegExp(`${text}`, "gi");
          return city.city.match(regex) || city.state.match(regex);
        });
        displayCities(filteredCities);
      };

      //Display Cities function
      const displayCities = (cities) => {
        let output = "";
        if (cities.length > 0) {
          //add card for each city
          cities.forEach((city_value) => {
            output =
              output +
              `
            <div class="card">
                <h5 id="city">City: ${city_value.city}</h5>
                <h6 id="growth_form_2000_to_2013">Growth: ${city_value.growth_form_2000_to_201}</h6>
                <h6 id="latitude">Latitude: ${city_value.latitude}</h6>
                <h6 id="longitude">Longitude: ${city_value.longitude}</h6>
                <h6 id="population">Population: ${city_value.population}</h6>
                <h6 id="rank">Rank: ${city_value.rank}</h6>
                <h6 id="state">State: ${city_value.state}</h6>
            </div>
                `;
          });
        } else {
          //Display ERROR
          output = `<div class="card">
                <h5>Error: NO Cities /States Found.....</h5>
                </div>`;
        }
        //Add output to card-box
        box.innerHTML = output;
      };
