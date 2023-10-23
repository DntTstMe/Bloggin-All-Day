// Function created allowing user to edit blog posts from the individual blog post page
const editPost = async (event) => {
    event.preventDefault();
  
    // Get the parent element of the button and find the corresponding blog post ID
    const blogPostId = event.currentTarget.getAttribute("data-id");
  
    document.location.assign(`/create/${blogPostId}`);
  };
  
  const editButtons = document.querySelectorAll(".editBtn");
  
  // Iterate over all edit buttons on the page and allow for edit functionality
  editButtons.forEach((button) => {
    button.addEventListener("click", editPost);
  });
  