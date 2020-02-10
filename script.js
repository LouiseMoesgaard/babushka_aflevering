      const endpoint = ("https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json");

      let menuData = [];
      let filter = "all";

      document.addEventListener("DOMContentLoaded", start);

      function start() {
          fetchData();
          setButtonEvent();
      }


      async function fetchData() {
          const response = await fetch(endpoint);
          menuData = await response.json();
          renderMenuItems();
      };

      function setButtonEvent() {
          let buttons = document.querySelectorAll(".button").forEach(elm => {
              elm.addEventListener("click", event => {
                  filter = event.target.dataset.filter; //sætter filter-variablet til filter-atributten på knappen (derfor SKAL data-filter have samme navn som kategorierne i datasættet)
                  renderMenuItems();
              });

          })
      }

      function renderMenuItems() {

          const container = document.querySelector(".data-container");
          const oversigtTemplate = document.querySelector("template");

          container.innerHTML = ""; //sletter alle klonede dom elemener i container-elementer (for at skjule tidligere filtrede data i HTML)

          let filteredMenu = null; //filteredMenu sættes til ingenting, for at nulstille den filtrede dat efter hvert clickevent.


          if (filter == "all") {
              filteredMenu = menuData.feed.entry;
          } else {
              filteredMenu = menuData.feed.entry.filter(elm => {
                  return elm.gsx$kategori.$t == filter; //filtrerer alle elementer væk, som ikke overholder det boolske udtryk.

              });
          }

          filteredMenu.forEach(food => {
              let klon = oversigtTemplate.cloneNode(true).content; //kloner dom-element.
              klon.querySelector("h3").textContent = food.gsx$navn.$t;
              klon.querySelector(".desciption").textContent = food.gsx$kort.$t;
              klon.querySelector(".price").textContent = `Pris: ${food.gsx$pris.$t}`;
              klon.querySelector("img").src = `/imgs/small/${food.gsx$billede.$t}-sm.jpg`;
              container.appendChild(klon); //klonede domelement sættes ind i HTML-dom.
          })

      }
