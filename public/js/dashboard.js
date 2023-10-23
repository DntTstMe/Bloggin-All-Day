// Function created that allows users to delete blog posts on dashboard page and then redirect them to an updated dashboard
const handleDashboardClick = async (event) => {
    event.preventDefault();
    const target = event.target;
    const blogPostId = target.getAttribute("data-id");
    
    if (target.matches("#editBtn")) {
      // Edit button clicked
      document.location.assign(`/create/${blogPostId}`);
    } else if (target.matches("#deleteBtn")) {
      // Delete button clicked
      console.log("clicked me");
      console.log(target);
  
      const response = await fetch(`/api/blogPost/${blogPostId}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        document.location.assign(`/dashboard`);
      } else {
        alert(response.statusText);
      }
    }
  };
  
  // Attach a single event listener to a common parent element (e.g., the container of these buttons)
  const dashboardContainer = document.getElementById("dashboardContainer");
  dashboardContainer.addEventListener("click", handleDashboardClick);
  