function Tabs() {
   let tabs = document.querySelectorAll('.catalog__tab');
   let tabContent = document.querySelectorAll('.catalog__content');
   if (tabs.length > 0) {
      tabs.forEach((tabLink) => {
         tabLink.addEventListener('click', e => {
            const dataTab = e.currentTarget.dataset.tab;
            const dataContent = document.querySelector(`[data-content=${dataTab}]`);
            let tabLinkActive = e.currentTarget;
            for (let i = 0; i < tabs.length; i++) {
               tabs[i].classList.remove('active');
               tabContent[i].classList.remove('active');
            }
            tabLinkActive.classList.add('active');
            dataContent.classList.add('active');
         });
      });
   }
}
Tabs();






