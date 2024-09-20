document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const tabSections = document.querySelectorAll('.tab-section');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tabSections.forEach(section => section.classList.remove('active'));

            tab.classList.add('active');
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');

            fetchFiles(tabId);
        });
    });

    // Initial fetch for the first tab
    fetchFiles('attendance');
});

function fetchFiles(folder) {
    const apiUrl = `https://api.github.com/repos/NightmareShadow4Exploit/Papa/contents/${folder}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const fileList = document.getElementById(folder);
            fileList.innerHTML = ''; // Clear previous list

            data.forEach(file => {
                if (file.type === 'file' && (file.name.endsWith('.xlsx') || file.name.endsWith('.pdf'))) {
                    const listItem = document.createElement('li');

                    const fileLink = document.createElement('a');
                    fileLink.href = file.download_url;
                    fileLink.textContent = file.name;
                    fileLink.target = '_blank';

                    listItem.appendChild(fileLink);
                    fileList.appendChild(listItem);
                }
            });
        })
        .catch(error => console.error('Error fetching files:', error));
}
