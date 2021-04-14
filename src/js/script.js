const base_api = "https://api.github.com/users";
const cardBody = document.getElementById('card-body');

cardBody.innerHTML = `<p>Welcome to my project 'Github profile'.</p>`;

function getUser() {
    let search = document.getElementById('search');

    console.log("Click: " + search.value);

    if (search.value === '') {
        let anjinglah = 'Mohon untuk memasukan nama username';
        show404(anjinglah);
    } else {
        fetch(`${base_api}/${search.value}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.message === "Not Found") {
                    let text = `Username "${search.value}" tidak ditemukan!`;
                    show404(text);
                } else {
                    showUser(data);
                }
            })
            .catch(error => console.log(error));
    }

    // search.value = '';
}

function showUser(user) {
    let userInfo = '';
    cardBody.innerHTML = '';
    let bio = '';

    if (user.bio !== null) {
        bio = user.bio;
    } else if(user.bio === null && user.blog !== ""){
        bio = user.blog;
    } else {
        bio = `Bio or Blog`;
    }

    userInfo = `
        <img src="${user.avatar_url}" alt="${user.login}" class="w-30">
        <div class="flex flex-column justify-between text-center w-full " style="height: 150px;">
            <div>
                <h3>${user.name}</h3>
                <p>${user.html_url}</p>
            </div>
            <div class="info flex justify-around b-">
                <div class="flex flex-column ">
                    <strong>
                        ${user.followers}
                        <br>
                        <small>Followers</small>
                    </strong>
                </div>
                <div class="flex flex-column ">
                    <strong>
                        ${user.following}
                        <br>
                        <small>Following</small>
                    </strong>
                </div>
            </div>
            <small><i>"${bio}"</i></small>
        </div>
    `;

    cardBody.innerHTML = userInfo;
    document.getElementById('id-user').innerHTML = `ID : ${user.id}`;
}

function show404(message = "???") {
    cardBody.innerHTML = '';

    let notFound = `
        <h4>${message}</h4>
    `;

    cardBody.innerHTML = notFound;
}