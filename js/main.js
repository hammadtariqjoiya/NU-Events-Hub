

document.addEventListener("DOMContentLoaded", function () {
  // theme button
  var themeButton = document.getElementById("themeToggle");
  var savedTheme = localStorage.getItem("campusTheme");

  if (savedTheme == "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    themeButton.textContent = "☀️ Light mode";
  }

  if (themeButton) {
    themeButton.addEventListener("click", function () {
      var currentTheme = document.documentElement.getAttribute("data-theme");

      if (currentTheme == "dark") {
        document.documentElement.setAttribute("data-theme", "light");
        themeButton.textContent = "🌙 Dark mode";
        localStorage.setItem("campusTheme", "light");
      } else {
        document.documentElement.setAttribute("data-theme", "dark");
        themeButton.textContent = "☀️ Light mode";
        localStorage.setItem("campusTheme", "dark");
      }
    });
  }

  // Countdown timer 
  var countdown = document.getElementById("countdown");
  if (countdown) {
    var eventDate = new Date("November 29, 2026 10:00:00").getTime();

    function updateCountdown() {
      var now = new Date().getTime();
      var distance = eventDate - now;

      if (distance < 0) {
        document.getElementById("countdownMessage").textContent = "The event date has arrived!";
        document.getElementById("days").textContent = "0";
        document.getElementById("hours").textContent = "0";
        document.getElementById("minutes").textContent = "0";
        document.getElementById("seconds").textContent = "0";
      } else {
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").textContent = days;
        document.getElementById("hours").textContent = hours;
        document.getElementById("minutes").textContent = minutes;
        document.getElementById("seconds").textContent = seconds;
      }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // filter buttons
  var filterButtons = document.querySelectorAll(".filter-btn");
  var eventItems = document.querySelectorAll(".event-item");

  for (var i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener("click", function () {
      var selectedCategory = this.getAttribute("data-filter");

      for (var j = 0; j < eventItems.length; j++) {
        var eventCategory = eventItems[j].getAttribute("data-category");

        if (selectedCategory == "All" || selectedCategory == eventCategory) {
          eventItems[j].classList.remove("d-none");
        } else {
          eventItems[j].classList.add("d-none");
        }
      }

      for (var k = 0; k < filterButtons.length; k++) {
        filterButtons[k].classList.remove("btn-success", "active");
        filterButtons[k].classList.add("btn-outline-success");
      }
      this.classList.remove("btn-outline-success");
      this.classList.add("btn-success", "active");

    });
  }

  // Bootstrap event modal 
  var detailButtons = document.querySelectorAll(".event-detail-button");
  for (var m = 0; m < detailButtons.length; m++) {
    detailButtons[m].addEventListener("click", function () {
      document.getElementById("eventModalTitle").textContent = this.getAttribute("data-title");
      document.getElementById("modalCategory").textContent = this.getAttribute("data-category");
      document.getElementById("modalDate").textContent = this.getAttribute("data-date");
      document.getElementById("modalVenue").textContent = this.getAttribute("data-venue");
      document.getElementById("modalDescription").textContent = this.getAttribute("data-description");
    });
  }

    // Email regex pattern (defined once so both forms can reuse it)
  var emailPattern = /^[^\s@]+@([a-zA-Z0-9-]+\.)+[a-zA-Z-]{2,}$/;

  // form validation
  var contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var name = document.getElementById("contactName");
      var email = document.getElementById("contactEmail");
      var message = document.getElementById("contactMessage");
      var valid = true;

      if (name.value.trim() == "") { name.classList.add("is-invalid"); valid = false; }
      else { name.classList.remove("is-invalid"); }

      // UPDATED EMAIL CHECK HERE
      if (!emailPattern.test(email.value.trim())) { email.classList.add("is-invalid"); valid = false; }
      else { email.classList.remove("is-invalid"); }

      if (message.value.trim() == "") { message.classList.add("is-invalid"); valid = false; }
      else { message.classList.remove("is-invalid"); }

      var success = document.getElementById("contactSuccess");
      if (valid) {
        success.textContent = "Thank you! Submitted Successfully.";
        contactForm.reset();
      } else {
        success.textContent = "";
      }
    });
  }

  // Event proposal form validation
  var proposalForm = document.getElementById("proposalForm");
  if (proposalForm) {
    var dateInput = document.getElementById("eventDate");
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var year = tomorrow.getFullYear();
    var month = String(tomorrow.getMonth() + 1).padStart(2, "0");
    var day = String(tomorrow.getDate()).padStart(2, "0");
    dateInput.min = year + "-" + month + "-" + day;

    proposalForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var name = document.getElementById("proposalName");
      var email = document.getElementById("proposalEmail");
      var eventName = document.getElementById("eventName");
      var description = document.getElementById("eventDescription");
      var valid = true;

      if (name.value.trim() == "") { name.classList.add("is-invalid"); valid = false; }
      else { name.classList.remove("is-invalid"); }

      // UPDATED EMAIL CHECK HERE
      if (!emailPattern.test(email.value.trim())) { email.classList.add("is-invalid"); valid = false; }
      else { email.classList.remove("is-invalid"); }

      if (eventName.value.trim() == "") { eventName.classList.add("is-invalid"); valid = false; }
      else { eventName.classList.remove("is-invalid"); }

      // ALSO FIXED '<=' TO '<' SO TOMORROW IS ALLOWED
      if (dateInput.value == "" || dateInput.value < dateInput.min) { dateInput.classList.add("is-invalid"); valid = false; }
      else { dateInput.classList.remove("is-invalid"); }

      if (description.value.trim() == "") { description.classList.add("is-invalid"); valid = false; }
      else { description.classList.remove("is-invalid"); }

      var success = document.getElementById("proposalSuccess");
      if (valid) {
        success.textContent = "Thank you! Submitted Successfully.";
        proposalForm.reset();
      } else {
        success.textContent = "";
      }
    });
  }

  }
);
