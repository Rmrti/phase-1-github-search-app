document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("github-form");
    const userList = document.getElementById("user-list");
    const reposList = document.getElementById("repos-list");
  
    form.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const searchQuery = document.getElementById("search").value.trim();
      if (searchQuery === "") return;
  
      fetch(`https://api.github.com/search/users?q=${searchQuery}`, {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      })
        .then((response) => response.json())
        .then((data) => displayUsers(data.items))
        .catch((error) => console.error("Error fetching users:", error));
    });
  
    function displayUsers(users) {
      userList.innerHTML = ""; // Clear previous results
      reposList.innerHTML = ""; // Clear repositories
  
      users.forEach((user) => {
        const userItem = document.createElement("li");
  
        const avatar = document.createElement("img");
        avatar.src = user.avatar_url;
        avatar.alt = `${user.login}'s avatar`;
        avatar.style.width = "50px";
        avatar.style.height = "50px";
        avatar.style.borderRadius = "50%";
  
        const username = document.createElement("a");
        username.href = user.html_url;
        username.textContent = user.login;
        username.target = "_blank";
  
        const viewReposButton = document.createElement("button");
        viewReposButton.textContent = "View Repositories";
        viewReposButton.addEventListener("click", () => {
          fetch(`https://api.github.com/users/${user.login}/repos`, {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          })
            .then((response) => response.json())
            .then((repos) => displayRepos(repos))
            .catch((error) => console.error("Error fetching repos:", error));
        });
  
        userItem.appendChild(avatar);
        userItem.appendChild(username);
        userItem.appendChild(viewReposButton);
        userList.appendChild(userItem);
      });
    }
  
    function displayRepos(repos) {
      reposList.innerHTML = ""; // Clear previous repositories
  
      repos.forEach((repo) => {
        const repoItem = document.createElement("li");
  
        const repoLink = document.createElement("a");
        repoLink.href = repo.html_url;
        repoLink.textContent = repo.name;
        repoLink.target = "_blank";
  
        repoItem.appendChild(repoLink);
        reposList.appendChild(repoItem);
      });
    }
  });
  