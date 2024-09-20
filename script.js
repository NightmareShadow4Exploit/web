const repoApiUrl = 'https://api.github.com/repos/NightmareShadow4Exploit/web/contents/';

// Fetch files for each section
const sections = [
    { folder: 'Attendance', listId: 'attendanceFileList' },
    { folder: 'MinutesOfMeeting', listId: 'minutesFileList' },
    { folder: 'CheckList', listId: 'checklistFileList' },
    { folder: 'PlanningAchievement', listId: 'planningFileList' },
    { folder: 'Reports', listId: 'reportsFileList' },
    { folder: 'Books', listId: 'booksFileList' },
    { folder: 'Articles', listId: 'articlesFileList' },
    { folder: 'SelfAssessment', listId: 'selfAssessmentFileList' },
];

// Fetch files for each section
sections.forEach(section => fetchFiles(section.folder, section.listId));

// Fetch files from GitHub
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

                    // Create the file link
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
