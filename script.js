      const endpoint = ("");

      let menuData = [];

      document.addEventListener("DOMContentLoaded", start);

      function start() {
          fetchData();
      }


      async function fetchData() {
          const response = await fetch(endpoint);
          menuData = await response.json();
          renderMenuItems();
      };

      function renderMenuItems() {

          const container = document.querySelector(".data-container");
          const oversigtTemplate = document.querySelector("template");

          menuData.feed.entry.forEach(food => {
              let klon = oversigtTemplate.cloneNode(true).content;
              klon.querySelector("h3").textContent = person.gsx$navn.$t;
              klon.querySelector(".desciption").textContent = person.gsx$kort.$t;
              klon.querySelector(".price").textContent = `Pris: ${person.gsx$pris.$t}`;
              klon.querySelector("img").src = `${person.gsx$billede.$t}`;
              container.appendChild(klon);
          })

      }
