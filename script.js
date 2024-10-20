document.addEventListener('DOMContentLoaded', function() {
    const board = document.getElementById('board');
    const addListBtn = document.getElementById('add-list-btn');
    const newListName = document.getElementById('new-list-name');
    
    let draggedCard = null;

    addListBtn.addEventListener('click', function() {
        const listTitle = newListName.value.trim();
        if (listTitle) {
            addList(listTitle);
            newListName.value = '';
        }
    });

    
    function addList(title) {
        const list = document.createElement('div');
        list.classList.add('list');
        list.innerHTML = `
            <h3>${title}</h3>
            <div class="add-card-container">
                <input type="text" class="new-card-name" placeholder="Enter card title">
                <button class="add-card-btn">Add Card</button>
            </div>
        `;
        board.appendChild(list);

        list.addEventListener('dragover', handleDragOver);
        list.addEventListener('dragenter', handleDragEnter);
        list.addEventListener('dragleave', handleDragLeave);
        list.addEventListener('drop', handleDrop);

        const addCardBtn = list.querySelector('.add-card-btn');
        const newCardName = list.querySelector('.new-card-name');
        
       
        addCardBtn.addEventListener('click', function() {
            const cardTitle = newCardName.value.trim();
            if (cardTitle) {
                addCard(list, cardTitle);
                newCardName.value = '';
            }
        });
    }

    
    function addCard(list, title) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.textContent = title;
        card.setAttribute('draggable', 'true');
        list.insertBefore(card, list.querySelector('.add-card-container'));

        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
    }

    
    function handleDragStart(e) {
        draggedCard = this;
        setTimeout(() => {
            this.style.display = 'none';
        }, 0);
    }

    function handleDragEnd() {
        setTimeout(() => {
            this.style.display = 'block';
            draggedCard = null;
        }, 0);
    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    function handleDragEnter() {
        this.classList.add('over');
    }

    function handleDragLeave() {
        this.classList.remove('over');
    }

    function handleDrop() {
        this.classList.remove('over');
        if (draggedCard) {
            this.insertBefore(draggedCard, this.querySelector('.add-card-container'));
        }
    }

    
    addList('To Do');
    addList('In Progress');
    addList('Done');
});





