document.addEventListener('DOMContentLoaded', () => {
    const chatBody = document.querySelector('.chat-body');
    const sendMessageBtn = document.getElementById('send-message');
    const messageInput = document.querySelector('.message-input');


    const enterButton = document.getElementById('button');
    
    
    if (enterButton) {
        enterButton.addEventListener('click', (e) => {
            e.preventDefault();
            console.log("Enter butonuna tıklandı.");
            window.location.href = 'login.html'; // Yönlendirme
        });
    } else {
        console.error("Enter butonu bulunamadı. 'enter' ID'sini kontrol edin.");
    }

    const API_KEY = "AIzaSyARHBU6dyvVEp71zvrsdRSexZ2z_wl9QD4"; 
    const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    sendMessageBtn.addEventListener('click', async (event) => {
        event.preventDefault();

        // Kullanıcı mesajını al
        const userMessage = messageInput.value.trim();
        if (userMessage === '') return; // Mesaj yoksa işlemi durdur

        // Kullanıcı mesajını chat alanına ekle
        const userMessageDiv = document.createElement('div');
        userMessageDiv.classList.add('message', 'user-message');
        userMessageDiv.innerHTML = `<div class="message-text">${userMessage}</div>`;
        chatBody.appendChild(userMessageDiv);

        const botMessageDiv = document.createElement('div');
        botMessageDiv.classList.add('message', 'bot-message');
        botMessageDiv.innerHTML = `
            <div class="message-text">
                <div class="thinking-indicator">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>`;
        chatBody.appendChild(botMessageDiv);

        // Mesaj alanını temizle
        messageInput.value = '';

        // Bot yanıtını al
        await generateBotResponse(botMessageDiv, userMessage);
        chatBody.scrollTop = chatBody.scrollHeight;
    });

    // Bot yanıtını oluşturma fonksiyonu
    const generateBotResponse = async (botMessageDiv, userMessage) => {
        const messageElement = botMessageDiv.querySelector(".message-text");

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: userMessage }]
                }]
            })
        };

        try {
            const response = await fetch(API_URL, requestOptions);
            const data = await response.json();
            if (!response.ok) throw new Error(data.error.message);

            const apiResponseText = data.candidates[0]?.content?.parts[0]?.text?.trim() || "Yanıt alınamadı.";
            messageElement.innerText = apiResponseText;

            // Mesaj alanını temizle (Yanıt alındıktan sonra)
            messageInput.value = '';

        } catch (error) {
            messageElement.innerText = "Hata: " + error.message;
            console.log(error);
        }
    };
});


document.addEventListener('DOMContentLoaded', () => {
    const chatBody = document.querySelector('.chat-body');
    const sendMessageBtn = document.getElementById('send-message');
    const messageInput = document.querySelector('.message-input');

    // Elements for login functionality
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');
    const enterButton = document.getElementById('enter');
    const newAccount = document.getElementById('sign-up1');
    const profileImage = document.getElementById('profile');
    const loginButton = document.getElementById('btn');
    const avatar = document.getElementById('avatar'); // Avatar öğesi
    const userNameDisplay = document.getElementById('user'); // ID: user
    const storedUserName = localStorage.getItem("userName"); // localStorage'dan isim alınıyor


    // Toggle registration and login forms
    if (registerBtn) {
        registerBtn.addEventListener('click', () => {
            container.classList.add("active");
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            container.classList.remove("active");
        });
    }

    // Handle login
    if (enterButton) {
        enterButton.addEventListener('click', (e) => {
            e.preventDefault();

            const mail = document.getElementById('textform').value;
            const password = document.getElementById('passwordform').value;

            if (mail === "" || password === "") {
                alert("Hesap bulunamadı, lütfen kayıt olunuz");
            } else {
                // Retrieve user info from localStorage
                const storedUser = JSON.parse(localStorage.getItem("user"));

                // Verify login details
                if (storedUser && storedUser.email === mail && storedUser.password === password) {
                    // Redirect to main page
                    alert("Giriş başarılı!");
                    window.location.href = "index.html";
                } else {
                    alert("Hesap bulunamadı, lütfen kayıt olunuz");
                }
            }
        });
    }

    // Handle registration
    if (newAccount) {
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
    }

    if (avatar) {
        avatar.addEventListener('click', () => {
            const storedUser = JSON.parse(localStorage.getItem("user")); // Kullanıcı bilgilerini getir
    
            if (storedUser) {
                const userNameDisplay = document.querySelector('h2#user'); // h2 etiketi
                if (userNameDisplay) {
                    userNameDisplay.textContent = `Hoş geldiniz, ${storedUser.name}!`;
                } else {
                    console.error("H2 etiketi bulunamadı.");
                }
    
                const subMenu = document.getElementById("subMenu");
                if (subMenu) {
                    subMenu.classList.toggle("open-menu");
                } else {
                    console.error("SubMenu bulunamadı.");
                }
            } else {
                alert("Giriş yapmamışsınız, lütfen giriş yapın.");
                window.location.href = 'login.html';
            }
        });
    } else {
        console.error("Avatar bulunamadı. 'avatar' ID'sini kontrol edin.");
    }
    
});

// Profili silme işlemi
document.addEventListener('DOMContentLoaded', () => {
    const deleteProfileLink = document.getElementById('delete-profile');
    const userNameDisplay = document.getElementById('user');

    if (deleteProfileLink) {
        deleteProfileLink.addEventListener('click', (e) => {
            e.preventDefault(); // Sayfanın yeniden yüklenmesini önler

            // Kullanıcı bilgilerini kontrol et
            const storedUser = JSON.parse(localStorage.getItem("user"));

            if (storedUser) {
                // Kullanıcı bilgilerini sil
                localStorage.removeItem("user");
                localStorage.removeItem("userName");

                // Ekranda mesaj göster
                alert("Profil silindi.");
                if (userNameDisplay) {
                    userNameDisplay.textContent = ""; // İsmi ekrandan kaldır
                }
            } else {
                alert("Silinecek bir profil bulunamadı.");
            }
        });
    } else {
        console.error("'delete-profile' ID'sine sahip bir öğe bulunamadı.");
    }
});



document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout-button');
    const userNameDisplay = document.getElementById('user');

    if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault(); // Sayfanın yeniden yüklenmesini önler

            // Oturum bilgilerini sil
            localStorage.removeItem("user");
            localStorage.removeItem("userName");

            // Kullanıcıya bilgi ver ve yönlendir
            alert("Oturumunuz kapatıldı.");
            if (userNameDisplay) {
                userNameDisplay.textContent = ""; // Ekrandaki ismi temizle
            }

            // Login sayfasına yönlendir
            window.location.href = 'login.html';
        });
    } else {
        console.error("'logout-button' ID'sine sahip bir öğe bulunamadı.");
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const editLink = document.getElementById('edit-link');
    const userNameDisplay = document.querySelector('h2#user'); // h2 etiketi

    // Kullanıcı bilgilerini ekrana yazdır
    const displayUserName = () => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser && userNameDisplay) {
            userNameDisplay.textContent = `Hoş geldiniz, ${storedUser.name}!`;
        }
    };

    // Sayfa yüklendiğinde kullanıcı ismini göster
    displayUserName();

    if (editLink) {
        editLink.addEventListener('click', (e) => {
            e.preventDefault(); // Sayfanın yeniden yüklenmesini önler

            // Kullanıcı bilgilerini al
            const storedUser = JSON.parse(localStorage.getItem("user"));

            if (storedUser) {
                // Mevcut bilgileri göster ve kullanıcıdan yeni değerler iste
                const newName = prompt("İsim düzenle:", storedUser.name || "");
                const newEmail = prompt("E-posta düzenle:", storedUser.email || "");
                const newPassword = prompt("Şifre düzenle:", storedUser.password || "");

                // Eğer herhangi bir alan boş bırakılırsa eski değer korunur
                const updatedUser = {
                    name: newName || storedUser.name,
                    email: newEmail || storedUser.email,
                    password: newPassword || storedUser.password,
                };

                // Güncellenmiş bilgileri kaydet
                localStorage.setItem("user", JSON.stringify(updatedUser));

                // Kullanıcıya bilgi ver
                alert("Bilgiler başarıyla güncellendi.");

                // h2 etiketindeki ismi güncelle
                displayUserName();
            } else {
                alert("Düzenlenecek bir profil bulunamadı.");
            }
        });
    } else {
        console.error("'edit-link' ID'sine sahip bir öğe bulunamadı.");
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const downloadButton = document.getElementById('button');

    if (downloadButton) {
        downloadButton.addEventListener('click', (e) => {
            e.preventDefault(); // Sayfanın yeniden yüklenmesini önler

            // Kullanıcı oturum bilgilerini kontrol et
            const storedUser = JSON.parse(localStorage.getItem("user"));

            if (storedUser) {
                // Kullanıcı giriş yapmışsa APK indirme işlemi
                const apkUrl = "https://1drv.ms/u/c/8434a32d63a8833c/EdXE1WGk2Y9LpMqe3EwUSJUBhA0WW39vWl02rME92aaDBg?e=B8b0cx"; // APK dosyasının URL'sini buraya yazın
                window.location.href = apkUrl; // İndirme başlatılır
            } else {
                // Kullanıcı giriş yapmamışsa uyarı göster
                alert("Lütfen giriş yapın.");
                window.location.href = 'login.html'; // Giriş sayfasına yönlendir (isteğe bağlı)
            }
        });
    } else {
        console.error("'download-button' ID'sine sahip bir öğe bulunamadı.");
    }
});
