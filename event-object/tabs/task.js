const tabsContainers = document.querySelectorAll(".tabs");

tabsContainers.forEach(container => {
    const tabs = container.querySelectorAll(".tab");
    const contents = container.querySelectorAll(".tab__content");

    tabs.forEach((tab, tabIndex) => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('tab_active'));
            tab.classList.add('tab_active');
            contents.forEach(content => {
                content.classList.remove('tab__content_active');
            });
            contents[tabIndex].classList.add('tab__content_active');
        });
    });
});
