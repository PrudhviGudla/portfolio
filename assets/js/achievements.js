document.addEventListener('DOMContentLoaded', function() {
    fetch('assets/achievements.json')
      .then(response => response.json())
      .then(data => {
        const achievementsContainer = document.getElementById('achievements-container');
        
        data.achievements.forEach(achievement => {
          const achievementCard = createachievementCard(achievement);
          achievementsContainer.appendChild(achievementCard);
        });
      })
      .catch(error => console.error('Error loading achievements:', error));
  });
  
  function createachievementCard(achievement) {
    const card = document.createElement('div');
    card.className = 'col-lg-4 col-md-6 d-flex align-items-stretch';
    
    let statusHtml = achievement.status.toLowerCase() === 'ongoing' 
      ? `<p class="achievement-status">Ongoing</p>` 
      : '<div class="achievement-status-placeholder"></div>';

    let buttonHtml = achievement.showButton
      ? `<div class="achievement-link">
           <a href="${achievement.link}" class="btn-achievement">${achievement.buttonText || 'Learn More'}</a>
         </div>`
      : '';
    
    card.innerHTML = `
      <div class="achievement-item">
        <div class="achievement-image">
          <img src="${achievement.image}" class="img-fluid" alt="${achievement.title}">
        </div>
        <h3 class="text-center">${achievement.title}</h3>
        ${statusHtml}
        <p class="achievement-description">${achievement.description}</p>
        ${buttonHtml}
      </div>
    `;
    
    return card;
  }
