$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const blogId = urlParams.get("id");

  $.ajax({
    url: `http://127.0.0.1:8000/api/blogs/${blogId}/`,
    method: "GET",
    success: function (blog) {
      $("#blog-title").text(blog.title);
      $("#blog-description").text(blog.description);
      $("#blog-content").html(blog.content);
      const createdAt = new Date(blog.created_at);
      const formattedDate = `${createdAt
        .getDate()
        .toString()
        .padStart(2, "0")}/${(createdAt.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${createdAt.getFullYear()} ${createdAt
        .getHours()
        .toString()
        .padStart(2, "0")}:${createdAt
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
      $("#blog-created-at").text(formattedDate);
      $("#blog-image").attr("src", `http://127.0.0.1:8000${blog.image}`);
    },
    error: function (error) {
      console.error("Error:", error);
    },
  });
});
