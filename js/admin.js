document.addEventListener('DOMContentLoaded', function () {
    loadLeads();
    setupDeleteButtons();
    setupSettingsButtons();
});

// Load leads from the server
function loadLeads() {
    fetch('/api/get_leads.php')
        .then(response => response.json())
        .then(data => {
            const leadsTableBody = document.querySelector('#leads-table tbody');
            leadsTableBody.innerHTML = '';

            data.forEach(lead => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${lead.id}</td>
                    <td>${lead.name}</td>
                    <td>${lead.email}</td>
                    <td>${lead.phone}</td>
                    <td>${lead.message}</td>
                    <td>${lead.page_url}</td>
                    <td>${lead.timestamp}</td>
                    <td><button class="delete-btn" data-id="${lead.id}">Supprimer</button></td>
                `;

                leadsTableBody.appendChild(row);
            });

            // Setup delete buttons again after loading
            setupDeleteButtons();
        })
        .catch(error => console.error('Erreur lors du chargement des leads:', error));
}

// Setup delete button listeners
function setupDeleteButtons() {
    const deleteButtons = document.querySelectorAll('.delete-btn');

    deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            const leadId = this.getAttribute('data-id');

            fetch(`/api/delete_lead.php?id=${leadId}`, {
                method: 'DELETE'
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert('Lead supprimé avec succès.');
                        loadLeads();
                    } else {
                        alert('Erreur lors de la suppression du lead.');
                    }
                })
                .catch(error => {
                    console.error('Erreur lors de la suppression du lead:', error);
                    alert('Erreur réseau. Veuillez réessayer.');
                });
        });
    });
}

// Setup settings save buttons
function setupSettingsButtons() {
    // Redirect settings
    document.getElementById('save-redirect-settings').addEventListener('click', function () {
        const redirectUrl = document.getElementById('redirect-url').value;
        const redirectDelay = document.getElementById('redirect-delay').value;

        const settings = {
            redirectUrl: redirectUrl,
            redirectDelay: parseInt(redirectDelay)
        };

        fetch('/api/save_redirect_settings.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(settings)
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Paramètres de redirection sauvegardés avec succès.');
                } else {
                    alert('Erreur lors de la sauvegarde des paramètres de redirection.');
                }
            })
            .catch(error => {
                console.error('Erreur lors de la sauvegarde des paramètres de redirection:', error);
                alert('Erreur réseau. Veuillez réessayer.');
            });
    });

    // Autoresponder settings
    document.getElementById('save-autoresponder-settings').addEventListener('click', function () {
        const emailSubject = document.getElementById('autoresponder-subject').value;
        const emailMessage = document.getElementById('autoresponder-message').value;

        const settings = {
            subject: emailSubject,
            message: emailMessage
        };

        fetch('/api/save_autoresponder_settings.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(settings)
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Paramètres de l\'autorépondeur sauvegardés avec succès.');
                } else {
                    alert('Erreur lors de la sauvegarde des paramètres de l\'autorépondeur.');
                }
            })
            .catch(error => {
                console.error('Erreur lors de la sauvegarde des paramètres de l\'autorépondeur:', error);
                alert('Erreur réseau. Veuillez réessayer.');
            });
    });
}
