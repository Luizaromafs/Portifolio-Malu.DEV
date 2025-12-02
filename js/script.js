document.addEventListener('DOMContentLoaded', function() {
    
    const mainNav = document.getElementById('mainNav');
    if (mainNav) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                mainNav.classList.add('navbar-shrink');
            } else {
                mainNav.classList.remove('navbar-shrink');
            }
        });
    }

    const filterButtons = document.querySelectorAll('.btn-filter');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault(); 

            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'btn-primary');
                btn.classList.add('btn-outline-primary');
            });

            this.classList.add('active', 'btn-primary');
            this.classList.remove('btn-outline-primary');

            const filterValue = this.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === itemCategory) {
                    item.style.display = 'block'; 
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });


    const contactForm = document.getElementById('contactForm');
    const feedbackContainer = document.getElementById('contact-feedback');
    const submitButton = document.getElementById('submitButton');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            if (!contactForm.checkValidity()) {
                event.stopPropagation();
                contactForm.classList.add('was-validated');
                return;
            }

            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...';

            setTimeout(function() {
                contactForm.reset();
                submitButton.disabled = false;
                submitButton.innerHTML = 'Enviar Mensagem';
                contactForm.classList.remove('was-validated');

                const successAlert = `
                    <div class="alert alert-success alert-dismissible fade show text-center" role="alert">
                        <strong>Mensagem Enviada!</strong> Em breve entrarei em contato.
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                `;

                feedbackContainer.innerHTML = successAlert;
                feedbackContainer.scrollIntoView({ behavior: 'smooth' });

            }, 2500); 
        });
    }
});
