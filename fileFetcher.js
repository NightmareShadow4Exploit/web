document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const tabSections = document.querySelectorAll('.tab-section');

    // Set up tab click event listeners
    tabs.forEach(tab => {
        tab.addEventListener('click', () => handleTabClick(tab));
    });

    // Initial fetch for the first tab
    handleTabClick(tabs[0]);
});

// Handle tab clicks
function handleTabClick(selectedTab) {
    const tabs = document.querySelectorAll('.tab');
    const tabSections = document.querySelectorAll('.tab-section');

    tabs.forEach(tab => tab.classList.remove('active'));
    tabSections.forEach(section => section.classList.remove('active'));

    selectedTab.classList.add('active');
    const tabId = selectedTab.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');

    fetchFiles(tabId);
}

// Fetch files from GitHub
function fetchFiles(folder) {
    const apiUrl = `https://api.github.com/repos/NightmareShadow4Exploit/web/contents/${folder}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => displayFiles(data, folder))
        .catch(error => console.error('Error fetching files:', error));
}

// Display files in the appropriate list
function displayFiles(files, folder) {
    const fileList = document.getElementById(`${folder}FileList`);
    fileList.innerHTML = ''; // Clear previous list

    if (!files || files.length === 0) {
        fileList.innerHTML = '<li>No files found</li>';
        return;
    }

    files.forEach(file => {
        if (file.type === 'file' && (file.name.endsWith('.xlsx') || file.name.endsWith('.pdf'))) {
            const listItem = document.createElement('li');

            const fileLink = document.createElement('a');
            fileLink.href = file.download_url;
            fileLink.textContent = file.name;
            fileLink.target = '_blank';
            fileLink.rel = 'noopener noreferrer'; // Security best practice

            listItem.appendChild(fileLink);
            fileList.appendChild(listItem);
        }
    });
}
