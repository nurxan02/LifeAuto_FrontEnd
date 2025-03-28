// const API_BASE_URL = "http://127.0.0.1:8000";
// const MEDIA_BASE_URL = "http://127.0.0.1:8000/";
// $(document).ready(function () {
//   $.ajax({
//     url: "http://127.0.0.1:8000/api/blogs/",
//     method: "GET",
//     success: function (data) {
//       data.forEach(function (blog) {
//         $("#blog-list").append(`
//                     <div class="col-xl-4 col-md-6">
//                         <a href="blog-detail.html?id=${
//                           blog.id
//                         }" class="mil-blog-card mil-mb-30 mil-up">
//                             <div class="mil-card-cover">
//                                 <img src="${MEDIA_BASE_URL}${blog.image}" alt="cover" class="mil-scale-img" />
//                             </div>
//                             <div class="mil-descr">
//                                 <p class="mil-text-xs mil-accent mil-mb-15 ">${new Date(
//                                   blog.created_at
//                                 ).toLocaleDateString()}</p>
//                                 <h4 class="color4">${blog.title}</h4>
//                             </div>
//                         </a>
//                     </div>
//                 `);
//       });
//     },
//     error: function (error) {
//       console.error("Error:", error);
//     },
//   });
// });
const API_BASE_URL = "http://127.0.0.1:8000";
const MEDIA_BASE_URL = "http://127.0.0.1:8000/";
let currentPage = 1;

function loadBlogs(page) {
  $.ajax({
    url: `${API_BASE_URL}/api/blogs/?page=${page}`,
    method: "GET",
    success: function (data) {
      if (data.length === 0) {
        $("#load-more-btn").hide();
        return;
      }

      data.forEach(function (blog) {
        // Check if the blog already exists in the DOM
        if ($(`#blog-${blog.id}`).length === 0) {
          // Prepend the blog to the top of the list
          $("#blog-list").prepend(`
            <div class="col-xl-4 col-md-6" id="blog-${blog.id}">
                <a href="blog-detail.html?id=${
                  blog.id
                }" class="mil-blog-card mil-mb-30 mil-up">
                    <div class="mil-card-cover">
                        <img src="${MEDIA_BASE_URL}${
            blog.image
          }" alt="cover" class="mil-scale-img" />
                    </div>
                    <div class="mil-descr">
                        <p class="mil-text-xs mil-accent mil-mb-15 ">${new Date(
                          blog.created_at
                        ).toLocaleDateString()}</p>
                        <h4 class="color4">${blog.title}</h4>
                    </div>
                </a>
            </div>
          `);
        }
      });
    },
    error: function (error) {
      console.error("Error:", error);
    },
  });
}

$(document).ready(function () {
  // Load the first page of blogs on page load
  loadBlogs(currentPage);

  // Add click event for the "Load More" button
  $("#load-more-btn").on("click", function (e) {
    e.preventDefault();
    currentPage++; // Increment the page number
    loadBlogs(currentPage); // Load the next page
  });
});
