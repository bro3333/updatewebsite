document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');
    const enterButton = document.getElementById('enter');
    const newAccount = document.getElementById('sign-up1');
    const userImage = document.getElementById('userpng'); // Kullanıcı avatarı

    
    // Toggle registration and login forms
    registerBtn.addEventListener('click', () => {
        container.classList.add("active");
    });

    loginBtn.addEventListener('click', () => {
        container.classList.remove("active");
    });

    // Handle login
    enterButton.addEventListener('click', (e) => {
        e.preventDefault();

        const mail = document.getElementById('textform').value;
        const password = document.getElementById('passwordform').value;

        if (mail === "" || password === "") {
            alert("Hesap bulunamadı, lütfen kayıt olunuz");
        } else {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            if (storedUser && storedUser.email === mail && storedUser.password === password) {
                alert(`Giriş başarılı! Hoş geldiniz, ${storedUser.name}`);
                window.location.href = "index.html";
            } else {
                alert("Hesap bulunamadı, lütfen kayıt olunuz");
            }
        }
    });


     // Kullanıcı giriş kontrol fonksiyonu
     function checkUserLogin() {
        const storedUser = JSON.parse(localStorage.getItem('user')); // Kullanıcı verisini localStorage'dan al
        if (storedUser) {
            alert(`Giriş yapıldı! Hoş geldiniz, ${storedUser.name}`);
        } else {
            alert("Giriş yapılmamış! Lütfen giriş yapınız.");
        }
    }

    // Kullanıcı avatarına tıklandığında giriş durumu kontrolü
    userImage.addEventListener('click', () => {
        checkUserLogin();
    });


    // Handle registration
    newAccount.addEventListener('click', (e) => {
        e.preventDefault();

        const name = document.querySelector('.sign-up input[placeholder="İsim"]').value;
        const email = document.querySelector('.sign-up input[placeholder="E-Posta"]').value;
        const password = document.querySelector('.sign-up input[placeholder="Parola"]').value;

        if (name === "" || email === "" || password === "") {
            alert("Lütfen formu doldurun");
        } else {
            const user = { name, email, password };
            localStorage.setItem("user", JSON.stringify(user));
            alert("Kayıt başarılı!");

            // Switch to login form after registration
            container.classList.remove("active");
        }
    });

});
