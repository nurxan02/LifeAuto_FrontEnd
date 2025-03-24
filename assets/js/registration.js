// Show/hide bank account field based on selection
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

// Form submission handler
document.getElementById("partnerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form data
  const formData = new FormData(this);

  // Create JSON object
  const jsonData = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    phoneNumber: {
      countryCode: formData.get("countryCode"),
      number: formData.get("phoneNumber"),
    },
    nationality: formData.get("nationality"),
    languages: Array.from(formData.getAll("languages")),
    dateOfBirth: formData.get("dob"),
    address: {
      street: formData.get("streetAddress"),
      floorNumber: formData.get("floorNumber"),
      postcode: formData.get("postcode"),
      city: formData.get("city"),
    },
    hasBankAccount: formData.get("hasBank"),
    bankAccountNumber:
      formData.get("hasBank") === "Yes"
        ? formData.get("bankAccountNumber")
        : null,
    isStudent: formData.get("isStudent"),
    isOver26: formData.get("isOver26"),
    hasCompany: formData.get("hasCompany"),
    apps: Array.from(formData.getAll("apps")),
  };

  // Display the JSON data
  document.getElementById("jsonResult").textContent = JSON.stringify(
    jsonData,
    null,
    2
  );
  document.getElementById("resultContainer").style.display = "block";

  // Here you would typically send the JSON data to your API
  // Example:
  // fetch('your-api-endpoint', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(jsonData)
  // })
  // .then(response => response.json())
  // .then(data => console.log('Success:', data))
  // .catch(error => console.error('Error:', error));
});
document.getElementById("phoneNumber").addEventListener("input", function (e) {
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
