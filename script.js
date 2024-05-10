document.querySelectorAll('.gallery-item').forEach(item => {
			item.addEventListener('click', function (event) {
				const imgSrc = event.target.src; 
				document.getElementById('modal-img').src = imgSrc; 
				document.getElementById('modal').style.display = 'block'; 
			});
		});
		window.onclick = function (event) {
			if (event.target == document.getElementById('modal')) {
				document.getElementById('modal').style.display = 'none';
			}
		};	