document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('posts-container');
    const newPostBtn = document.getElementById('new-post-btn');
    let posts = []; // To store posts in memory

    // Function to display posts
    function displayPosts(postsToDisplay) {
        postsContainer.innerHTML = ''; // Clear existing posts
        postsToDisplay.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <small>Posted on: ${post.date}</small>
            `;
            postsContainer.appendChild(postElement);
        });
    }

    // Function to fetch posts
    async function fetchPosts() {
        try {
            const response = await fetch('posts.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            posts = await response.json(); // Store fetched posts
            displayPosts(posts);
        } catch (error) {
            console.error('Error fetching posts:', error);
            postsContainer.innerHTML = '<p>Could not load posts.</p>';
        }
    }

    // Event listener for the New Post button
    newPostBtn.addEventListener('click', () => {
        const title = prompt("Enter post title:");
        const content = prompt("Enter post content:");

        if (title && content) {
            const newPost = {
                title: title,
                content: content,
                date: new Date().toISOString().split('T')[0] // Get YYYY-MM-DD format
            };
            posts.push(newPost); // Add to the local array
            displayPosts(posts); // Re-display posts including the new one

            // Note: This only adds the post to the current view.
            // Saving permanently to posts.json requires a server-side implementation.
            console.log("New post added to the view:", newPost);
            console.log("To save permanently, implement server-side logic to update posts.json.");
        } else {
            alert("Post title and content cannot be empty.");
        }
    });

    // Initial fetch and display of posts
    fetchPosts();
});