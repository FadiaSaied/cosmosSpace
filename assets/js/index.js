let btnToday = document.getElementById("today-apod-btn");
let btnLoad = document.getElementById("load-date-btn");
let btnView = document.getElementById("btnView");
let apodImg = document.getElementById("apod-image");
let apodvideo = document.getElementById("apod-video");
let apodDateInput = document.getElementById("apod-date-input");
let apodTitle = document.getElementById("apod-title");
let apodDateDetail = document.getElementById("apod-date-detail");
let apodExplanation = document.getElementById("apod-explanation");
let apodCopyRight = document.getElementById("apod-copyright");
let apodDateInfo = document.getElementById("apod-date-info");
let apodMediaType = document.getElementById("apod-media-type");
let apodDate = document.getElementById("apod-date");
let displayDataToday = document.getElementById("displayDataToday");
let loading = document.getElementById("apod-loading");
let hdurlImg = "";
let urlVideo = "";
let today = new Date().toISOString().split("T")[0];
let linkSide = document.querySelectorAll("#linkSide");
let linkSection = document.querySelectorAll("section");
let planetDetailImage = document.getElementById("planet-detail-image");
let planetDetailName = document.getElementById("planet-detail-name");
let planetDetailDes = document.getElementById("planet-detail-description");
let planetDistance = document.getElementById("planet-distance");
let planetRadius = document.getElementById("planet-radius");
let planetMass = document.getElementById("planet-mass");
let planetDensity = document.getElementById("planet-density");
let planetOrbitalPeriod = document.getElementById("planet-orbital-period");
let planetRotation = document.getElementById("planet-rotation");
let planetMoons = document.getElementById("planet-moons");
let planetGravity = document.getElementById("planet-gravity");
let planetDiscoverer = document.getElementById("planet-discoverer");
let planetDiscoveryDate = document.getElementById("planet-discovery-date");
let planetBodyType = document.getElementById("planet-body-type");
let planetVolume = document.getElementById("planet-volume");
let planetFacts = document.querySelectorAll("#planet-facts li span");
let planetPerihelion = document.getElementById("planet-perihelion");
let planetAphelion = document.getElementById("planet-aphelion");
let planetAccentricity = document.getElementById("planet-eccentricity");
let planetInclination = document.getElementById("planet-inclination");
let planetAxialTilt = document.getElementById("planet-axial-tilt");
let planetTemp = document.getElementById("planet-temp");
let planetEscape = document.getElementById("planet-escape");
let navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navLinks.forEach((e) => e.classList.remove("active"));

    link.classList.add("active");
  });
});

for (let i = 0; i < linkSide.length; i++) {
  linkSide[i].addEventListener("click", function () {
    let link = linkSide[i].getAttribute("data-section");

    for (let j = 0; j < linkSection.length; j++) {
      let section = linkSection[j].getAttribute("data-section");
      if (link === section) {
        linkSection[j].classList.remove("hidden");
      } else {
        linkSection[j].classList.add("hidden");
      }
    }
  });
}

apodDateInput.max = today;

todayInSpace();

async function todayInSpace() {
  loading.classList.remove("hidden");
  apodImg.classList.add("hidden");
  apodvideo.classList.add("hidden");
  try {
    let infoToday = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=jAtH8pga0tOFEWDHMqKUZ1ADPMGfdHreemN7oWJf`,
    );
    if (infoToday.ok) {
      let response = await infoToday.json();
      loading.classList.add("hidden");

      displayData(response);
    } else {
      let error = await infoToday.json();
      console.log(error);
    }
  } catch (error) {
    loading.classList.add("hidden");
    console.log(error);
  }
}

function displayData(data) {
  if (data.media_type === "image") {
    apodvideo.classList.add("hidden");
    apodImg.classList.remove("hidden");
    apodImg.src = data.url;
    apodImg.title = data.title;
  } else if (data.media_type === "video") {
    apodvideo.classList.remove("hidden");
    apodImg.classList.add("hidden");
    apodvideo.src = data.url;
  }

  apodDateInput.value = data.date;
  apodTitle.innerHTML = data.title;
  apodDateDetail.innerHTML = data.date;
  apodExplanation.innerHTML = data.explanation;

  if (data.copyright) {
    apodCopyRight.innerHTML = `&copy; Copyright: ${data.copyright}`;
  } else {
    apodCopyRight.innerHTML = "";
  }

  apodDateInfo.innerHTML = data.date;
  apodMediaType.innerHTML = data.media_type;

  apodDate.innerHTML = `Astronomy Picture of the Day - ${data.date}`;
  displayDataToday.innerHTML = data.date;
  hdurlImg = data.hdurl;
  urlVideo = data.url;
}

btnView.addEventListener("click", function () {
  if (hdurlImg) {
    window.open(hdurlImg, "_blank");
  } else if (urlVideo) {
    window.open(urlVideo, "_blank");
  }
});

btnToday.addEventListener("click", function () {
  todayInSpace();
});

btnLoad.addEventListener("click", function () {
  let chooseDate = apodDateInput.value;
  if (chooseDate) {
    spaceByDate(chooseDate);
  }
});

async function spaceByDate(chooseDate) {
  loading.classList.remove("hidden");
  apodImg.classList.add("hidden");
  apodvideo.classList.add("hidden");
  try {
    let dateInfo = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=jAtH8pga0tOFEWDHMqKUZ1ADPMGfdHreemN7oWJf&date=${chooseDate}`,
    );
    if (dateInfo.ok) {
      let response = await dateInfo.json();
      loading.classList.add("hidden");
      displayData(response);
    } else {
      let error = await dateInfo.json();
      console.log(error);
    }
  } catch (error) {
    loading.classList.add("hidden");
    console.log(error);
  }
}

upcominglaunches();
upcomingAlllaunches();

async function upcominglaunches() {
  try {
    let launche = await fetch(
      `https://lldev.thespacedevs.com/2.3.0/launches/upcoming`,
    );
    if (launche.ok) {
      let response = await launche.json();
      let oneRocket = response.results;
      displaylaunches(oneRocket[0]);
    } else {
      let error = await launche.json();
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}

function displaylaunches(data) {
  let newDate = new Date(data.net);
  let now = new Date();
  let launchDate = Math.ceil(newDate - now) / (1000 * 60 * 60 * 24);
  let currentDate = newDate.toLocaleDateString("en-US", { timeZone: "UTC" });
  let currentTime = newDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  });
  let box = ` <div
              class="relative bg-slate-800/30 border border-slate-700 rounded-3xl overflow-hidden group hover:border-blue-500/50 transition-all"
            >
              <div
                class="absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
              ></div>
              <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
                <div class="flex flex-col justify-between">
                  <div>
                    <div class="flex items-center gap-3 mb-4">
                      <span
                        class="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold flex items-center gap-2"
                      >
                        <i class="fas fa-star"></i>
                        Featured Launch
                      </span>
                      <span
                        class="px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold"
                      >
                        Go
                      </span>
                    </div>
                    <h3 class="text-3xl font-bold mb-3 leading-tight">
                      ${data.name}
                    </h3>
                    <div
                      class="flex flex-col xl:flex-row xl:items-center gap-4 mb-6 text-slate-400"
                    >
                      <div class="flex items-center gap-2">
                        <i class="fas fa-building"></i>
                        <span>${data.launch_service_provider?.name}</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <i class="fas fa-rocket"></i>
                        <span>${data.rocket.configuration?.name}</span>
                      </div>
                    </div>
                   ${
                     launchDate > 0
                       ? ` <div
                      class="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-xl mb-6"
                    >
                      <i class="fas fa-clock text-2xl text-blue-400"></i>
                    
                      <div>
                        <p class="text-2xl font-bold text-blue-400">${launchDate}</p>
                        <p class="text-xs text-slate-400">Days Until Launch</p>
                      </div>
                    </div>`
                       : ""
                   }
                    <div class="grid xl:grid-cols-2 gap-4 mb-6">
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-calendar"></i>
                          Launch Date
                        </p>
                        <p class="font-semibold">${currentDate}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-clock"></i>
                          Launch Time
                        </p>
                        <p class="font-semibold">${currentTime} UTC</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-map-marker-alt"></i>
                          Location
                        </p>
                        <p class="font-semibold text-sm">${data.pad.location?.name}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-globe"></i>
                          Country
                        </p>
                        <p class="font-semibold">${data.pad.country?.name}</p>
                      </div>
                    </div>
                    <p class="text-slate-300 leading-relaxed mb-6">
                     ${data.mission?.description}
                    </p>
                  </div>
                  <div class="flex flex-col md:flex-row gap-3">
                    <button
                      class="flex-1 self-start md:self-center px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                      <i class="fas fa-info-circle"></i>
                      View Full Details
                    </button>
                    <div class="icons self-end md:self-center">
                      <button
                        class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                      >
                        <i class="far fa-heart"></i>
                      </button>
                      <button
                        class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                      >
                        <i class="fas fa-bell"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="relative">

                  <div
                    class="relative h-full min-h-[400px] rounded-2xl overflow-hidden bg-slate-900/50"
                  > ${
                    data.image?.image_url
                      ? `<img src="${data.image?.image_url}" alt="${data.name}" class="w-full h-full object-cover">`
                      : ` <div
                      class="flex items-center justify-center h-full min-h-[400px] bg-slate-800"
                    >
                      <i class="fas fa-rocket text-9xl text-slate-700/50"></i>
                    </div> `
                  }
                    <div
                      class="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent"
                    ></div>
                  </div>
                </div>
              </div>
            </div>`;

  document.getElementById("featured-launch").innerHTML = box;
}

async function upcomingAlllaunches() {
  try {
    let launche = await fetch(
      `https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=10`,
    );
    if (launche.ok) {
      let response = await launche.json();
      let arr = response.results;

      displayAlllaunches(arr);
    } else {
      let error = await launche.json();
      console.log(error);
    }
  } catch (error) {
    console.log("error");
  }
}

function displayAlllaunches(data) {
  let boxTwo = "";

  for (let i = 1; i < data.length; i++) {
    let allRocket = data[i];
    let newDate = new Date(allRocket.net);
    let currentDate = newDate.toLocaleDateString("en-US", { timeZone: "UTC" });
    let currentTime = newDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    });

    boxTwo += ` <div
              class="h-full flex flex-col  bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer"
            >
              <div
                class="relative h-48 bg-slate-900/50 flex items-center justify-center"
              >  ${
                allRocket.image?.image_url
                  ? `<img src="${allRocket.image?.image_url}" alt="${allRocket.name}" class="w-full h-full object-cover">`
                  : `<i class="fas fa-space-shuttle text-5xl text-slate-700"></i>`
              }
                
                <div class="absolute top-3 right-3">
                  <span
                    class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold"
                  >
                    ${allRocket.status.abbrev}
                   
                  </span>
                </div>
              </div>
              <div class="p-5 flex flex-col flex-1">
                <div class="mb-3">
                  <h4
                    class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors"
                  >
                    ${allRocket.name}
                  </h4>
                  <p class="text-sm text-slate-400 flex items-center gap-2">
                    <i class="fas fa-building text-xs"></i>
                  ${allRocket.launch_service_provider?.name}
                  </p>
                </div>
                <div class="space-y-2 mb-4">
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-calendar text-slate-500 w-4"></i>
                    <span class="text-slate-300">${currentDate}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-clock text-slate-500 w-4"></i>
                    <span class="text-slate-300">${currentTime} UTC</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-rocket text-slate-500 w-4"></i>
                    <span class="text-slate-300">${allRocket.rocket.configuration?.name}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                    <span class="text-slate-300 line-clamp-1">${allRocket.pad.location?.name}</span>
                  </div>
                </div>
                <div
                  class="flex items-center gap-2 pt-4 border-t border-slate-700"
                >
                  <button
                    class="mt-auto flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold"
                  >
                    Details
                  </button>
                  <button
                    class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    <i class="far fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>`;
  }

  document.getElementById("launches-grid").innerHTML = boxTwo;
}

solarSystem();

async function solarSystem() {
  try {
    let response = await fetch(
      `https://solar-system-opendata-proxy.vercel.app/api/planets`,
    );
    if (response.ok) {
      let data = await response.json();
      displayPlanetCard(data.bodies);
    } else {
      let error = await response.json();
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}

function displayPlanetCard(arr) {
  let planets = "";
  let table = "";

  for (let i = 0; i < arr.length; i++) {
    planets += `
      <div
        class="planet-card bg-slate-800/50 border border-slate-700 rounded-2xl p-4 transition-all cursor-pointer group"
        data-planet-id="${arr[i].id}"
        style="--planet-color: #eab308"
      >
        <div class="relative mb-3 h-24 flex items-center justify-center">
          <img
            class="w-20 h-20 object-contain group-hover:scale-110 transition-transform"
            src="${arr[i].image}"
            alt="${arr[i].englishName}"
          />
        </div>

        <h4 class="font-semibold text-center text-sm">
          ${arr[i].englishName}
        </h4>

        <p class="text-xs text-slate-400 text-center">
          ${(arr[i].semimajorAxis / 149597870.7).toFixed(2)} AU
        </p>
      </div>
    `;
  }

  document.getElementById("planets-grid").innerHTML = planets;

  let planetCard = document.querySelectorAll(".planet-card");
  for (let i = 0; i < planetCard.length; i++) {
    planetCard[i].addEventListener("click", function () {
      let planetId = planetCard[i].getAttribute("data-planet-id");

      for (let j = 0; j < arr.length; j++) {
        if (arr[j].id === planetId) {
          planetDetailImage.src = arr[j].image;
          planetDetailName.innerHTML = arr[j].englishName;
          planetDetailDes.innerHTML = arr[j].description;

          planetDistance.innerHTML = `${(arr[j].semimajorAxis / 1000000).toFixed(1)}M km`;

          planetRadius.innerHTML = ` ${arr[j].meanRadius.toFixed(0)} KM `;

          planetMass.innerHTML = `${arr[j].mass.massValue} × 10^${arr[j].mass.massExponent} kg`;

          planetGravity.innerHTML = `${arr[j].gravity.toFixed(2)} m/s<sup>2</sup>`;

          planetOrbitalPeriod.innerHTML = `${arr[j].sideralOrbit.toFixed(2)} days`;

          planetRotation.innerHTML = `${arr[j].sideralRotation.toFixed(2)} hours`;

          planetMoons.innerHTML = arr[j].moons ? arr[j].moons.length : 0;

          planetDiscoverer.innerHTML =
            arr[j].discoveredBy || "Known since antiquity";

          planetDiscoveryDate.innerHTML =
            arr[j].discoveryDate || "Ancient times";
          planetBodyType.innerHTML = arr[j].bodyType;

          planetVolume.innerHTML = `${arr[j].vol.volValue} × 10^${arr[j].vol.volExponent} km³`;

          planetFacts[0].innerHTML = `Mass: ${arr[j].mass.massValue} x 10^${arr[j].mass.massExponent} kg`;

          planetFacts[1].innerHTML = `Surface gravity: ${arr[j].gravity} m/s²`;

          planetFacts[2].innerHTML = `Density: ${arr[j].density} g/cm³`;

          planetFacts[3].innerHTML = `Axial tilt: ${arr[j].axialTilt}°`;

          planetPerihelion.innerHTML = `${(arr[j].perihelion / 1000000).toFixed(1)}M km`;

          planetAphelion.innerHTML = `${(arr[j].aphelion / 1000000).toFixed(1)}M km`;

          planetAccentricity.innerHTML = arr[j].eccentricity.toFixed(5);

          planetInclination.innerHTML = `${arr[j].inclination.toFixed(2)}°`;

          planetAxialTilt.innerHTML = `${arr[j].axialTilt.toFixed(2)}°`;

          planetTemp.innerHTML = arr[j].avgTemp || "N/A";

          planetEscape.innerHTML = `${(arr[j].escape / 1000).toFixed(2)} km/s`;
        }
      }
    });
  }
}
