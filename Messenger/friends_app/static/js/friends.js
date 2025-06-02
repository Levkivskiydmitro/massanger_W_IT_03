document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".left-links .link");
    const sections = document.querySelectorAll(".tab-section");

    links.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const target = link.getAttribute("data-target");

            links.forEach(l => l.classList.remove("active"));
            link.classList.add("active");

            if (target === "all") {
                sections.forEach(s => s.style.display = "block");
            } else {
                sections.forEach(s => {
                    s.style.display = (s.id === target) ? "block" : "none";
                });
            }
        });
    });

    document.querySelector(".container").addEventListener("click", (e) => {
        const target = e.target;

        if (target.classList.contains("confirm")) {
            const card = target.closest(".profile-card");
            if (card) {
                card.querySelector(".action-buttons").innerHTML = `<span style="color:green; font-weight:bold;">Додано</span>`;
            }
        }

        if (target.classList.contains("add")) {
            const card = target.closest(".profile-card");
            if (card) {
                card.querySelector(".action-buttons").innerHTML = `<span style="color:green; font-weight:bold;">Запит надіслано</span>`;
            }
        }

        if (target.classList.contains("delete")) {
            const card = target.closest(".profile-card");
            if (card) {
                card.remove();
            }
        }

        if (target.classList.contains("message")) {
            alert("Перехід до чату...");
        }
    });
});

document.querySelectorAll(".edit-button").forEach(button => {
    button.addEventListener("click", () => {
        const targetId = button.getAttribute("data-target");
        const targetLink = document.querySelector(`.left-links .link[data-target="${targetId}"]`);
        if (targetLink) {
            targetLink.click();
        }
    });
});