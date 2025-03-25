document.getElementById("bankYes").addEventListener("change", function () {
  document.getElementById("bankAccountContainer").style.display = "block";
  document
    .getElementById("bankAccountNumber")
    .setAttribute("required", "required");
});

document.getElementById("bankNo").addEventListener("change", function () {
  document.getElementById("bankAccountContainer").style.display = "none";
  document.getElementById("bankAccountNumber").removeAttribute("required");
});

document.getElementById("partnerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);

  const jsonData = {
    first_name: formData.get("firstName"),
    last_name: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    nationality: formData.get("nationality"),
    languages: formData.getAll("languages"),
    date_of_birth: formData.get("dob"),

    has_bank_account: formData.get("hasBank") === "Yes",
    bank_account_number: formData.get("bankAccountNumber") || null,
    is_student: formData.get("isStudent") === "Yes",
    is_over_26: formData.get("isOver26") === "Yes",
    has_company: formData.get("hasCompany") === "Yes",

    apps: formData.getAll("apps"),

    phoneNumber: {
      countryCode: formData.get("countryCode"),
      number: formData.get("phoneNumber"),
    },

    address: {
      street: formData.get("streetAddress"),
      floorNumber: formData.get("floorNumber") || null,
      postcode: formData.get("postcode"),
      city: formData.get("city"),
    },
  };

  fetch("http://127.0.0.1:8000/api/users/create/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonData),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);
      showSuccessPopup();
    })
    .catch((error) => console.error("Error:", error));
});

function showSuccessPopup() {
  const popup = document.getElementById("successPopup");
  popup.style.display = "flex";

  document.getElementById("closePopup").addEventListener("click", function () {
    popup.style.display = "none";
    location.reload();
  });
}

document.getElementById("phoneNumber").addEventListener("input", function (e) {
  this.value = this.value.replace(/[^0-9]/g, "");
});
document.getElementById("floorNumber").addEventListener("input", function (e) {
  this.value = this.value.replace(/[^0-9]/g, "");
});

document.addEventListener("DOMContentLoaded", function () {
  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"][name="apps"]'
  );

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const label = this.nextElementSibling;
      if (this.checked) {
        label.classList.add("checkbox-checked");
      } else {
        label.classList.remove("checkbox-checked");
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"][name="languages"]'
  );

  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      const label = document.querySelector(`label[for="${checkbox.id}"]`);

      if (checkbox.checked) {
        label.classList.add("labelSelectorActive");
      } else {
        label.classList.remove("labelSelectorActive");
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const radios = document.querySelectorAll('input[type="radio"]');

  radios.forEach(function (radio) {
    radio.addEventListener("change", function () {
      const group = document.querySelectorAll(`input[name="${radio.name}"]`);

      group.forEach(function (item) {
        const label = document.querySelector(`label[for="${item.id}"]`);
        if (label) {
          label.classList.remove("labelSelectorActiveRadio");
        }
      });
      const selectedLabel = document.querySelector(`label[for="${radio.id}"]`);
      if (selectedLabel) {
        selectedLabel.classList.add("labelSelectorActiveRadio");
      }
    });
  });
});
