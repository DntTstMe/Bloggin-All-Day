async function newCommentHandler(event) {
    event.preventDefault();
  
    const commentBody = document.getElementById("comment").value.trim();
    const url = window.location.toString();
    const blogPostId = url.substring(url.lastIndexOf("/") + 1);
  
    if (commentBody) {
      const response = await fetch("/api/comment", {
        method: "POST",
        body: JSON.stringify({
          blogPost_id: blogPostId,
          comment_body: commentBody,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    }
  }
  
  // Event Listener
  const commentForm = document.getElementById("comment-form");
  
  if (commentForm) {
    commentForm.addEventListener("submit", newCommentHandler);
  }
  