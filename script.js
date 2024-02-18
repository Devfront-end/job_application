document.addEventListener('DOMContentLoaded', function() {
    const addJobForm = document.getElementById('add-job-form');
    const jobTableBody = document.getElementById('job-table-body');
    const markCompleteForm = document.getElementById('mark-complete-form');
    const completionDateInput = document.getElementById('completion-date');
    const completionNotesTextarea = document.getElementById('completion-notes');
    const resetJobsButton = document.getElementById('reset-jobs'); // Get the reset button
  
    let jobs = JSON.parse(localStorage.getItem('jobs')) || [];
  
    function displayJobs() {
      jobTableBody.innerHTML = ''; // Clear the table
      jobs.forEach(job => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${job.title}</td><td>${job.company}</td><td>${job.appliedDate}</td><td>${job.status}</td>`;
        jobTableBody.appendChild(row);
      });
    }
  
    // Function to clear all jobs
    function resetJobs() {
      jobs = []; // Clear the jobs array
      localStorage.removeItem('jobs'); // Clear jobs from localStorage
      displayJobs(); // Update the display
    }
  
    addJobForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const newJob = {
        title: document.getElementById('job-title').value,
        company: document.getElementById('company').value,
        appliedDate: document.getElementById('applied-date').value,
        status: document.getElementById('status').value,
        id: Date.now()
      };
      jobs.push(newJob);
      localStorage.setItem('jobs', JSON.stringify(jobs));
      displayJobs();
      addJobForm.reset(); // Reset form fields
    });
  
    markCompleteForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const completionDate = completionDateInput.value;
      const completionNotes = completionNotesTextarea.value;
      if (jobs.length > 0) {
        const lastJob = jobs[jobs.length - 1];
        lastJob.status = 'Completed';
        lastJob.completionDate = completionDate;
        lastJob.completionNotes = completionNotes;
        localStorage.setItem('jobs', JSON.stringify(jobs));
        displayJobs();
      }
      markCompleteForm.reset(); // Reset form fields
    });
  
    // Event listener for the reset button
    resetJobsButton.addEventListener('click', function() {
      resetJobs(); // Call the resetJobs function when the button is clicked
    });
  
    displayJobs(); // Initial display
  });
  