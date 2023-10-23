// Allows the user to edit blog posts from the blogPost page
const submitEdit = async (event) => {
    event.preventDefault();
    
    const title = document.getElementById("titleInput").value;
    const description = document.getElementById("bodyInput").value;
  
    if (title && description) {
      const blogPostId = window.location.pathname.split("/").pop();
  
      const response = await fetch(`/api/blogPost/${blogPostId}`, {
        method: "PUT",
        body: JSON.stringify({ title, description }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        document.location.assign("/dashboard");
      } else {
        alert(response.statusText);
      }
    }
  };
  
  const submitButton = document.getElementById("submitEdit");
  
  // Event Listener
  submitButton.addEventListener("click", submitEdit);
  