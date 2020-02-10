      const endpoint = ("https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json");

      let menuData = [];

      document.addEventListener("DOMContentLoaded", start);

      function start() {
          fetchData();
      }


      async function fetchData() {
          const response = await fetch(endpoint);
          console.log(response);
          menuData = await response.json();
          renderMenuItems();
      };

      function renderMenuItems() {

          const container = document.querySelector(".data-container");
          const oversigtTemplate = document.querySelector("template");

          menuData.feed.entry.forEach(food => {
              let klon = oversigtTemplate.cloneNode(true).content;
              klon.querySelector("h3").textContent = food.gsx$navn.$t;
              klon.querySelector(".desciption").textContent = food.gsx$kort.$t;
              klon.querySelector(".price").textContent = `Pris: ${food.gsx$pris.$t}`;
              klon.querySelector("img").src = `/imgs/small/${food.gsx$billede.$t}-sm.jpg`;
              container.appendChild(klon);
          })

      }
