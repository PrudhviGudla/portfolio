document.addEventListener('DOMContentLoaded', function() {
    fetch('assets/projects.json')
      .then(response => response.json())
      .then(data => {
        const projectsContainer = document.getElementById('projects-container');
        
        data.projects.forEach(project => {
          const projectCard = createProjectCard(project);
          projectsContainer.appendChild(projectCard);
        });
      })
      .catch(error => console.error('Error loading projects:', error));
  });
  
  function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'col-lg-4 col-md-6 d-flex align-items-stretch';
    
    let statusHtml = project.status.toLowerCase() === 'ongoing' 
      ? `<p class="project-status">Ongoing</p>` 
      : '<div class="project-status-placeholder"></div>';

    let buttonHtml = project.showButton
      ? `<div class="project-link">
           <a href="${project.link}" class="btn-project">${project.buttonText || 'Learn More'}</a>
         </div>`
      : '';
    
    card.innerHTML = `
      <div class="project-item">
        <div class="project-image">
          <img src="${project.image}" class="img-fluid" alt="${project.title}">
        </div>
        <h3 class="text-center">${project.title}</h3>
        ${statusHtml}
        <p class="project-description">${project.description}</p>
        ${buttonHtml}
      </div>
    `;
    
    return card;
  }
