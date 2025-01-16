// Initialize Lucide icons
lucide.createIcons();

// Sample job data
const jobs = [
    {
        id: 1,
        title: 'Senior Frontend Developer',
        company: 'TechCorp Inc.',
        location: 'Pune, IN',
        type: 'Full Time',
        salary: '$90k-$150k',
        posted: '2d ago',
        description: 'We are looking for a Senior Frontend Developer with experience in React.js, JavaScript, and CSS.'
    },
    {
        id: 2,
        title: 'UX Designer',
        company: 'Design Studio',
        location: 'Remote',
        type: 'Contract',
        salary: '$80k - $100k',
        posted: '1d ago',
        description: 'Join our design studio as a UX Designer. We value creativity and user-centric designs.'
    },
    {
        id: 3,
        title: 'Backend Engineer',
        company: 'StartupX',
        location: 'Bangalore , IN',
        type: 'Full Time',
        salary: '$130k - $160k',
        posted: '3d ago',
        description: 'Looking for a Backend Engineer proficient in Node.js, Express, and database management.'
    }
];

// Sample applications data (stored in localStorage)
let applications = JSON.parse(localStorage.getItem('applications')) || [];

// Handle job application
function applyForJob(jobId) {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return alert('Job not found.');

    const newApplication = {
        id: Date.now(),
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        status: 'Applied',
        appliedDate: new Date().toLocaleDateString(),
        lastUpdated: new Date().toLocaleDateString()
    };

    applications.push(newApplication);
    localStorage.setItem('applications', JSON.stringify(applications));
    alert(`Application submitted for ${job.title} at ${job.company}`);
    renderApplications();
}

// Handle "View Description" button click
function viewJobDescription(jobId) {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
        alert(`Job Description for ${job.title}: \n\n${job.description}`);
    } else {
        alert('Job not found.');
    }
}

// Render applications
function renderApplications() {
    const applicationsList = document.getElementById('applicationsList');
    if (!applicationsList) return;

    const statusFilter = document.getElementById('statusFilter').value;
    const filteredApplications = statusFilter === 'All' 
        ? applications 
        : applications.filter(app => app.status === statusFilter);

    applicationsList.innerHTML = filteredApplications.map(app => `
        <div class="application-card">
            <div class="application-header">
                <div>
                    <h3 class="job-title">${app.jobTitle}</h3>
                    <p class="job-company">${app.company}</p>
                </div>
                <div class="application-status ${app.status.toLowerCase()}">${app.status}</div>
            </div>
            <div class="application-meta">
                <div class="application-meta-item">
                    <i data-lucide="calendar"></i>
                    Applied: ${app.appliedDate}
                </div>
                <div class="application-meta-item">
                    <i data-lucide="clock"></i>
                    Last Updated: ${app.lastUpdated}
                </div>
            </div>
            <div class="application-actions">
                <select onchange="updateApplicationStatus(${app.id}, this.value)">
                    <option value="Applied" ${app.status === 'Applied' ? 'selected' : ''}>Applied</option>
                    <option value="Interview" ${app.status === 'Interview' ? 'selected' : ''}>Interview</option>
                    <option value="Rejected" ${app.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
                    <option value="Accepted" ${app.status === 'Accepted' ? 'selected' : ''}>Accepted</option>
                </select>
                <button class="delete-btn" onclick="deleteApplication(${app.id})">
                    <i data-lucide="trash-2"></i>
                </button>
            </div>
        </div>
    `).join('');

    lucide.createIcons();

    // Update application counts
    document.getElementById('totalApplications').textContent = applications.length;
    document.getElementById('interviewCount').textContent = 
        applications.filter(app => app.status === 'Interview').length;
    document.getElementById('acceptedCount').textContent = 
        applications.filter(app => app.status === 'Accepted').length;
}

// Update application status
function updateApplicationStatus(applicationId, newStatus) {
    const application = applications.find(app => app.id === applicationId);
    if (application) {
        application.status = newStatus;
        application.lastUpdated = new Date().toLocaleDateString();
        localStorage.setItem('applications', JSON.stringify(applications));
        renderApplications();
    } else {
        alert('Application not found.');
    }
}

// Delete application
function deleteApplication(applicationId) {
    if (confirm('Are you sure you want to delete this application?')) {
        applications = applications.filter(app => app.id !== applicationId);
        localStorage.setItem('applications', JSON.stringify(applications));
        renderApplications();
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    const jobsList = document.getElementById('jobsList');
    if (!jobsList) return;

    // Render jobs dynamically
    jobsList.innerHTML = jobs.map(job => `
        <div class="job-card">
            <div class="job-header">
                <div>
                    <h3 class="job-title">${job.title}</h3>
                    <p class="job-company">${job.company}</p>
                </div>
                <div class="job-posted">${job.posted}</div>
            </div>
            <div class="job-meta">
                <div class="job-meta-item">
                    <i data-lucide="map-pin"></i>
                    ${job.location}
                </div>
                <div class="job-meta-item">
                    <i data-lucide="clock"></i>
                    ${job.type}
                </div>
                <div class="job-meta-item">
                    <i data-lucide="dollar-sign"></i>
                    ${job.salary}
                </div>
            </div>
            <div class="job-actions">
                <!-- View Description button -->
                <button class="desc-btn" onclick="viewJobDescription(${job.id})">View Description</button>
                <!-- Apply Now button -->
                <button class="apply-btn" onclick="applyForJob(${job.id})">Apply Now</button>
            </div>
        </div>
    `).join('');

    lucide.createIcons();
    renderApplications();
});
