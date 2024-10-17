// document.addEventListener("DOMContentLoaded", () => {
//     // FAQ Toggle
//     const faqQuestions = document.querySelectorAll(".faq-question");
//     faqQuestions.forEach(question => {
//         question.addEventListener("click", () => {
//             const answer = question.nextElementSibling;
//             answer.style.display = answer.style.display === "block" ? "none" : "block";
//         });
//     });

    document.addEventListener('DOMContentLoaded', function() {
        // Function to show alert
        function showAlert(message) {
            const alertBox = document.createElement('div');
            alertBox.id = 'alertBox';
            alertBox.textContent = message;
            document.body.appendChild(alertBox);
            alertBox.style.display = 'block';
    
            setTimeout(() => {
                alertBox.style.display = 'none';
                alertBox.remove();
            }, 3000); // Alert will disappear after 3 seconds
        }
    
        const contactSubmit = document.getElementById('contactSubmit');
        if (contactSubmit) {
            contactSubmit.addEventListener('click', function(event) {
                event.preventDefault(); // Prevent the default form submission
    
                const name = document.getElementById('contactName').value;
                const phone = document.getElementById('contactPhone').value;
                const companyName = document.getElementById('contactCompanyName').value;
                const companyLocation = document.getElementById('contactCompanyLocation').value;
                const email = document.getElementById('contactEmail').value;
                const message = document.getElementById('contactMessage').value;
    
                // Get the current date and time in Indian time zone
                const currentDateTime = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
                const formData = {
                    name: name,
                    phone: phone,
                    companyName: companyName,
                    companyLocation: companyLocation,
                    email: email,
                    message: message,
                    dateTime: currentDateTime
                };
    
                let allInquiries = JSON.parse(localStorage.getItem('contactData')) || {};
                const dateString = currentDateTime.toISOString().split('T')[0]; // Get the date as YYYY-MM-DD
    
                if (!allInquiries[dateString]) {
                    allInquiries[dateString] = []; // Create a new array for each day
                }
                allInquiries[dateString].push(formData);
                localStorage.setItem('contactData', JSON.stringify(allInquiries));
    
                // Display success message
                showAlert('YOUR INQUIRY HAS BEEN SAVED SUCCESSFULLY! 🎉');
    
                // Log inquiries to the console
                getInquiries();
    
                // Clear form fields after submission
                document.getElementById('contactName').value = '';
                document.getElementById('contactPhone').value = '';
                document.getElementById('contactCompanyName').value = '';
                document.getElementById('contactCompanyLocation').value = '';
                document.getElementById('contactEmail').value = '';
                document.getElementById('contactMessage').value = '';
            });
        } else {
            console.error("The element with the ID 'contactSubmit' was not found.");
        }
    
        function getInquiries() {
            let allInquiries = JSON.parse(localStorage.getItem('contactData')) || {};
            console.log(allInquiries);
        }
    
        // Call getInquiries to see the stored inquiries in the console
        getInquiries();
    
        // Detect when the contact section is in view
        const contactSection = document.getElementById('contact-section');
        if (contactSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                    } else {
                        entry.target.classList.remove('in-view');
                    }
                });
            });
            observer.observe(contactSection);
        } else {
            console.error("The element with the ID 'contact-section' was not found.");
        }
    });
    