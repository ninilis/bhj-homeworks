const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const dropdownValue = dropdown.querySelector('.dropdown__value');
    const dropdownList = dropdown.querySelector('.dropdown__list');
    const dropdownLinks = dropdownList.querySelectorAll('.dropdown__link');

    dropdownValue.addEventListener('click', function() {
        dropdownList.classList.toggle('dropdown__list_active');
    });

    dropdownLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            dropdownList.classList.remove('dropdown__list_active');
            dropdownValue.textContent = this.textContent;
            event.preventDefault();
        });
    });
});
