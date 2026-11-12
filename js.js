document.addEventListener("DOMContentLoaded", function () {
            const menuBtn = document.getElementById("menuBtn");
            const mobileMenu = document.getElementById("mobileMenu");

            if (menuBtn && mobileMenu) {
                menuBtn.addEventListener("click", function () {
                    const isOpen = mobileMenu.classList.toggle("active");
                    menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
                });

                mobileMenu.querySelectorAll("a").forEach(function (link) {
                    link.addEventListener("click", function () {
                        mobileMenu.classList.remove("active");
                        menuBtn.setAttribute("aria-expanded", "false");
                    });
                });
            }

            const eventFilter = document.getElementById("eventFilter");
            const eventCards = document.querySelectorAll(".event-card[data-category]");

            if (eventFilter) {
                eventFilter.addEventListener("change", function () {
                    const selected = this.value;
                    eventCards.forEach(function (card) {
                        card.hidden = selected !== "all" && card.dataset.category !== selected;
                    });
                });
            }

            document.querySelectorAll(".carousel-wrap").forEach(function (carousel) {
                const track = carousel.querySelector(".carousel-track");
                const prev = carousel.querySelector(".carousel-prev");
                const next = carousel.querySelector(".carousel-next");

                if (!track || !prev || !next) return;

                function getStep() {
                    const card = track.querySelector(":scope > *");
                    if (!card) return track.clientWidth;
                    const gap = parseFloat(getComputedStyle(track).gap) || 0;
                    return card.getBoundingClientRect().width + gap;
                }

                prev.addEventListener("click", function () {
                    track.scrollBy({ left: -getStep(), behavior: "smooth" });
                });

                next.addEventListener("click", function () {
                    track.scrollBy({ left: getStep(), behavior: "smooth" });
                });
            });
        });