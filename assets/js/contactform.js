document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    const jsonData = JSON.stringify(data);
    console.log(jsonData);

    fetch("http://127.0.0.1:8000/api/contact/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
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
      .catch((error) => {
        console.error("Error:", error);
        showErrorPopup();
      });
  });

function showSuccessPopup() {
  const popup = document.getElementById("successPopup");
  popup.style.display = "flex";

  document.getElementById("closePopup").addEventListener("click", function () {
    popup.style.display = "none";
    location.reload();
  });
}
