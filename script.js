const repoApiUrl = 'https://api.github.com/repos/NightmareShadow4Exploit/web/contents/';

const sections = [
    { folder: 'attendance', listId: 'attendanceFileList' },
    { folder: 'minutes-of-meeting', listId: 'minutesFileList' },
    { folder: 'checklist', listId: 'checklistFileList' },
    { folder: 'planning-achievement', listId: 'planningFileList' },
    { folder: 'reports', listId: 'reportsFileList' },
    { folder: 'books', listId: 'booksFileList' },
    { folder: 'articles', listId: 'articlesFileList' },
    { folder: 'self-assessment', listId: 'selfAssessmentFileList' },
];

sections.forEach(section => fetchFiles(section.folder, section.listId));

function fetchFiles(folder, listId) {
    fetch(`${repoApiUrl}${folder}`)
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch files: ' + response.statusText);
            return response.json();
        })
        .then(data => {
            const fileList = document.getElementById(listId);
            fileList.innerHTML = ''; // Clear previous file list

            data.forEach(file => {
                if (file.type === 'file' && (file.name.endsWith('.pdf') || file.name.endsWith('.xlsx'))) {
                    const listItem = document.createElement('li');
                    const fileLink = document.createElement('a');
                    fileLink.href = file.download_url;
                    fileLink.textContent = file.name;
                    fileLink.target = '_blank'; // Open in a new tab
                    fileLink.rel = 'noopener noreferrer'; // For security reasons

                    listItem.appendChild(fileLink);
                    fileList.appendChild(listItem);
                }
            });
        })
        .catch(error => console.error('Error fetching file list:', error));
}
