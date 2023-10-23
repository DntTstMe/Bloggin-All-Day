const formSubmitHandler = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();
  
    if (email && password) {
      const url = event.target.classList.contains("login-form")
        ? "/api/users/login"
        : "/api/users";
  
      const data = {
        email,
        password,
      };
  
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        document.location.replace("/");
      } else {
        alert(response.statusText);
      }
    }
  };
  
  // Event Listeners
  document.querySelector(".login-form").addEventListener("submit", formSubmitHandler);
  document.querySelector(".signup-form").addEventListener("submit", formSubmitHandler);
  