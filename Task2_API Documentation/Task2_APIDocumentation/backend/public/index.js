document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('nudgeForm');
    const previewBtn = document.querySelector('.preview-btn');
    const publishBtn = document.querySelector('.publish-btn');
  
    previewBtn.addEventListener('click', () => {
      const formData = new FormData(form);
      const previewData = {};
      
      for (const [key, value] of formData.entries()) {
        previewData[key] = value;
      }
  
      alert(JSON.stringify(previewData, null, 2));
    });
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
  
      try {
        const response = await fetch('http://localhost:3000/api/v3/app/submit', {
          method: 'POST',
          body: formData
        });
  
        if (response.ok) {
          alert('Nudge submitted successfully!');
          form.reset();
        } else {
          alert('Failed to submit nudge');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while submitting the nudge');
      }
    });
  });