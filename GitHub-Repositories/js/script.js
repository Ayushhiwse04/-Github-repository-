
// var user = document.domain.split('.', 1); 
// window.onload = genRepo(user);

function genRepo(user) {
    const testuser = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

    if (testuser.test(user) == false || user == "" || user == null) {
        window.location.href = "index.html";
        alert("Sorry, the GitHub username appears to be invalid.");
    }

    else {

        var requestURL = 'https://api.github.com/users/' + user + '/repos';
        var request = $.get(requestURL, function () {
        })
            .done(function () {
                request = request.responseJSON;
                if (!Array.isArray(request) || !request.length) {
                    window.location.href = "index.html";
                    alert("Sorry, the GitHub username appears to be invalid.");
                }
                else {

                    for (i = 0; i < request.length; i++) {
                        var repo_url = request[i].html_url;
                        var username = request[i].owner.login;
                        var repo_name = request[i].name;
                        var repo_description = request[i].description;
                        var repo_language = request[i].language;
                        var repo_stars = request[i].stargazers_count;
                        var repo_forks = request[i].forks;

                        if (repo_description == null) {
                            repo_description = "<i>~</i>";
                        }
                        if (repo_language == null) {
                            repo_language = "-";
                        }

                        $("#repo-box").append("<a href='" + repo_url + "' target='_blank'><div class='repo-item'><h1 class='title'>" +
                            username + "/" +
                            repo_name + "</h1><p class='description'>" +
                            repo_description + "</p>" +
                            "<div class='bottom'><div class='language'><span class='fa-solid fa-code' style='color: #ffffff;'></span>" + " " + repo_language + 
                            "</div> <div class='star'><span class='fa-regular fa-star' style='color: #ffffff;'></span>" + " " + repo_stars +
                            "</div> <div class='fork'><span class='fa-solid fa-code-fork' style='color: #ffffff;'></span>" + " " + repo_forks +
                            "</div></div></div>");
                    }
                }
            });
    }
}


function showUserInfo(user) {
    document.getElementById("title").style.display = "none";
    document.getElementById("repo-box").style.display = "block";
    document.getElementById("back").style.display = "block";

    $("#repo-box").append(
        "<div class='user-info'>" +
        "<img src='" + user.avatar_url + "' alt='User Avatar'>" +
        "<h1 class='title'>" + user.name + " (" + user.login + ")</h1>" +
        "<p class='bio'>" + user.bio + "</p>" +
        "<div class='user-stats'>" +
        "<div class='repos'>Repos: " + user.public_repos + "</div>" +
        "<div class='followers'>Followers: " + user.followers + "</div>" +
        "<div class='following'>Following: " + user.following + "</div>" +
        "</div>" +
        "</div>"
    );
}



