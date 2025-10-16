// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Select all reminder buttons
    const reminderButtons = document.querySelectorAll(".reminder-btn");

    reminderButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Toggle clicked class
            button.classList.toggle("clicked");
            if (button.classList.contains("clicked")) {
                button.textContent = "✔ Reminder Set";
            } else {
                button.textContent = "⏰ Set Reminder";
            }
        });
    });
});
