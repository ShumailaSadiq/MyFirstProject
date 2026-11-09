document.addEventListener("DOMContentLoaded", function () 
{

  const style = document.createElement("style");
  style.textContent = `
    .js-btn {
      background-color: #3a6a94; color: #fff; border: none;
      padding: 8px 16px; border-radius: 5px; cursor: pointer;
      font-weight: 600; margin: 8px 6px 8px 0; transition: background-color .3s ease;
    }
    .js-btn:hover { background-color: #1f3b57; }
    #status-banner {
      display: inline-block; background: #fff; padding: 4px 14px;
      border-radius: 5px; font-weight: 700; margin-top: 8px;
    }
    #theme-toggle { margin-top: 12px; display: block; margin-left: auto; margin-right: auto; }
    #menu-table td:first-child { width: 70px; text-align: center; }
    #total, #form-message, #discount-message { font-weight: 600; margin-top: 10px; }
    #char-count { font-size: .9rem; color: #555; }
    #special-notes {
      padding: 10px; border: 1px solid #ccc; border-radius: 5px;
      font-size: 1rem; font-family: inherit; resize: vertical; min-height: 80px;
    }
    /* Dark mode */
    body.dark-mode { background-color: #121212; color: #f1f1f1; }
    body.dark-mode section { background-color: #1e1e1e; }
    body.dark-mode section.cards { background: none; }
    body.dark-mode section h2 { color: #8fb8de; border-bottom-color: #8fb8de; }
    body.dark-mode .main p, body.dark-mode #char-count { color: #ccc; }
    body.dark-mode section a { color: #8fb8de; }
    body.dark-mode td { border-color: #444; }
    body.dark-mode #special-notes, body.dark-mode form input[type="text"] {
      background: #2a2a2a; color: #f1f1f1; border-color: #555;
    }
  `;
  document.head.appendChild(style);

  function makeButton(text, id) {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = text;
    b.className = "js-btn";
    if (id) b.id = id;
    return b;
  }


  
  const header = document.querySelector("header");
  const h1 = header.querySelector("h1");

  const statusBanner = document.createElement("p");
  statusBanner.id = "status-banner";
  h1.insertAdjacentElement("afterend", statusBanner);

  const hour = new Date().getHours();
  if (hour >= 8 && hour < 22) {              // available 8 AM - 10 PM
    statusBanner.textContent = "We are Open! Available for new projects";
    statusBanner.style.color = "green";
  } else {
    statusBanner.textContent = "Closed - Open at 8 AM";
    statusBanner.style.color = "red";
  }


  
  const themeBtn = makeButton("Toggle Light/Dark Mode", "theme-toggle");
  header.appendChild(themeBtn);

  themeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
  });


  
  const contactSection = Array.from(document.querySelectorAll("section")).find(function (s) {
    const h2 = s.querySelector("h2");
    return h2 && h2.textContent.trim() === "Contact Me";
  });

  
  const aboutSection = document.createElement("section");
  aboutSection.innerHTML = `
    <h2>About Me</h2>
    <article>
      <p>I am a BSCS student who loves turning ideas into clean, creative designs and websites.</p>
      <div id="extra-text" style="display: none;">
        <p>I work with HTML, CSS and Python, and I enjoy graphic design, branding and building responsive web pages.</p>
        <p>Every project starts with listening to the client's needs, followed by sketches, drafts and polished final work.</p>
      </div>
    </article>
  `;
  const readMoreBtn = makeButton("Read More", "read-more-btn");
  aboutSection.querySelector("article").appendChild(readMoreBtn);

  /* ---- Services & Pricing ---- */
  const menuSection = document.createElement("section");
  menuSection.innerHTML = `
    <h2>Services &amp; Pricing</h2>
    <div id="filters"></div>
    <table id="menu-table">
      <thead>
        <tr><th>Select</th><th>Service</th><th>Price</th></tr>
      </thead>
      <tbody>
        <tr data-category="Design">
          <td><input type="checkbox" class="item-check" value="50"></td><td>Logo Design</td><td>$50</td>
        </tr>
        <tr data-category="Design">
          <td><input type="checkbox" class="item-check" value="30"></td><td>Poster Design</td><td>$30</td>
        </tr>
        <tr data-category="Web">
          <td><input type="checkbox" class="item-check" value="80"></td><td>Landing Page</td><td>$80</td>
        </tr>
        <tr data-category="Web">
          <td><input type="checkbox" class="item-check" value="120"></td><td>Portfolio Website</td><td>$120</td>
        </tr>
      </tbody>
    </table>
    <p id="total">Total: $0</p>
  `;

  if (contactSection) {
    contactSection.insertAdjacentElement("beforebegin", aboutSection);
    contactSection.insertAdjacentElement("beforebegin", menuSection);
  } else {
    document.body.insertBefore(aboutSection, document.querySelector("footer"));
    document.body.insertBefore(menuSection, document.querySelector("footer"));
  }


  
  const extraText = document.getElementById("extra-text");

  readMoreBtn.addEventListener("click", function () {
    if (extraText.style.display === "none") {
      extraText.style.display = "block";
      readMoreBtn.textContent = "Read Less";
    } else {
      extraText.style.display = "none";
      readMoreBtn.textContent = "Read More";
    }
  });


  
  const menuRows = document.querySelectorAll("#menu-table tbody tr");
  const filtersDiv = document.getElementById("filters");

  ["All", "Design", "Web"].forEach(function (category) {
    const btn = makeButton(category);
    btn.addEventListener("click", function () {
      menuRows.forEach(function (row) {
        if (category === "All" || row.getAttribute("data-category") === category) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    });
    filtersDiv.appendChild(btn);
  });


  
  document.querySelectorAll("table tr").forEach(function (row) {
    // skip header rows (the ones containing <th>)
    if (row.querySelector("th")) return;

    row.addEventListener("mouseover", function () {
      row.style.backgroundColor = "#dbe7f3";
    });
    row.addEventListener("mouseout", function () {
      row.style.backgroundColor = "";     // back to normal
    });
  });


  
  const checkboxes = document.querySelectorAll(".item-check");
  const totalEl = document.getElementById("total");

  checkboxes.forEach(function (cb) {
    cb.addEventListener("change", function () {
      let total = 0;
      checkboxes.forEach(function (c) {
        if (c.checked) total += parseInt(c.value, 10);
      });
      totalEl.textContent = "Total: $" + total;
    });
  });


  
  const form = document.querySelector("form");

  // your existing Name field becomes the "username" field
  const nameInput = form.querySelector("input[type='text']");
  nameInput.id = "username";


  const emailInput = document.createElement("input");
  emailInput.type = "text";
  emailInput.id = "email";
  emailInput.placeholder = "Email";

  
  const birthInput = document.createElement("input");
  birthInput.type = "text";
  birthInput.id = "birth-year";
  birthInput.placeholder = "Birth Year (e.g. 2002)";

  const discountMsg = document.createElement("p");
  discountMsg.id = "discount-message";

 
  const notes = document.createElement("textarea");
  notes.id = "special-notes";
  notes.setAttribute("maxlength", "100");
  notes.placeholder = "Special project requests";

  const counter = document.createElement("p");
  counter.id = "char-count";
  counter.textContent = "100 characters remaining";

  // insert right after the Name input
  nameInput.insertAdjacentElement("afterend", emailInput);
  emailInput.insertAdjacentElement("afterend", birthInput);
  birthInput.insertAdjacentElement("afterend", discountMsg);
  discountMsg.insertAdjacentElement("afterend", notes);
  notes.insertAdjacentElement("afterend", counter);

  // message shown below the form (Task 1)
  const formMessage = document.createElement("p");
  formMessage.id = "form-message";
  form.insertAdjacentElement("afterend", formMessage);


  
  notes.addEventListener("input", function () {
    const remaining = parseInt(notes.getAttribute("maxlength"), 10) - notes.value.length;
    counter.textContent = remaining + " characters remaining";
  });


 
  form.addEventListener("submit", function (e) {
    e.preventDefault();                       // stop page refresh

    const username = nameInput.value.trim();
    const email = emailInput.value.trim();

    if (username !== "" && email !== "") {
      formMessage.textContent =
        "Thank you for visiting, " + username + "! We will contact you at " + email + ".";
      formMessage.style.color = "green";
    } else {
      formMessage.textContent = "Please fill out both name and email.";
      formMessage.style.color = "red";
    }

    // Task 5
    const birthYear = parseInt(birthInput.value, 10);   // string -> integer

    if (isNaN(birthYear)) {
      discountMsg.textContent = "";
    } else {
      const age = 2026 - birthYear;
      if (age < 0 || age > 120) {
        discountMsg.textContent = "Please enter a valid birth year.";
        discountMsg.style.color = "red";
      } else if (age <= 25) {
        discountMsg.textContent = "Age " + age + ": Student discount applied!";
        discountMsg.style.color = "green";
      } else if (age >= 60) {
        discountMsg.textContent = "Age " + age + ": Senior discount applied!";
        discountMsg.style.color = "green";
      } else {
        discountMsg.textContent = "Age " + age + ": Sorry, you do not qualify for a discount.";
        discountMsg.style.color = "#555";
      }
    }
  });

});