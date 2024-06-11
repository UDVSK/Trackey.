document.addEventListener('DOMContentLoaded', () => {
    const itemForm = document.getElementById('item-form');
    const itemNameInput = document.getElementById('item-name');
    const itemDescriptionInput = document.getElementById('item-description');
    const itemLocationInput = document.getElementById('item-location');
    const itemList = document.getElementById('item-list');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    let items = [
        { id: 1, name: 'Estojo', description: 'Estojo preto com bolinhas brancas', location: 'Sala 04' },
        { id: 2, name: 'Caderno', description: 'Caderno preto de 10 matérias', location: 'Sala 32' },
        { id: 3, name: 'Celular', description: 'Samsung', location: 'Refeitório' },
        { id: 4, name: 'Mochila', description: 'Mochila azul com rodinhas', location: 'Biblioteca' },
        { id: 5, name: 'Chaveiro', description: 'Chaveiro com chaves de casa', location: 'Banheiro' },
        { id: 6, name: 'Garrafa', description: 'Garrafa de água vermelha', location: 'Quadra de esportes' },
        { id: 7, name: 'Relógio', description: 'Relógio de pulso preto', location: 'Sala 15' },
        { id: 8, name: 'Óculos', description: 'Óculos de grau com armação preta', location: 'Cantina' },
        { id: 9, name: 'Livro', description: 'Livro de matemática', location: 'Sala 21' },
        { id: 10, name: 'Carteira', description: 'Carteira marrom de couro', location: 'Estacionamento' }
    ];
    let nextId = 11;

    itemForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addItem(itemNameInput.value, itemDescriptionInput.value, itemLocationInput.value);
        itemNameInput.value = '';
        itemDescriptionInput.value = '';
        itemLocationInput.value = '';
    });

    itemList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            deleteItem(e.target.parentElement.parentElement.id);
        } else if (e.target.classList.contains('edit')) {
            editItem(e.target.parentElement.parentElement.id);
        }
    });

    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const foundItem = items.find(item => item.name.toLowerCase() === searchTerm);
        
       
        const highlightedItems = document.querySelectorAll('.highlighted');
        highlightedItems.forEach(item => {
            item.classList.remove('highlighted');
        });

        if (foundItem) {
         
            const foundListItem = document.getElementById(foundItem.id);
            foundListItem.classList.add('highlighted');
        } else {
            alert('Item não encontrado.');
        }
    });

    function generateId() {
        return nextId++; 
    }

    function addItem(name, description, location) {
        const item = {
            id: generateId(),
            name: name,
            description: description,
            location: location
        };
        items.push(item);
        renderItems();
    }

    function deleteItem(id) {
        items = items.filter(item => item.id !== parseInt(id));
        renderItems();
    }

    function editItem(id) {
        const item = items.find(item => item.id === parseInt(id));
        const newName = prompt('Editar nome do item:', item.name);
        const newDescription = prompt('Editar descrição do item:', item.description);
        const newLocation = prompt('Editar local onde foi perdido:', item.location);
        if (newName && newDescription && newLocation) {
            item.name = newName;
            item.description = newDescription;
            item.location = newLocation;
            renderItems();
        }
    }

    function renderItems() {
        itemList.innerHTML = '';
        const currentPage = window.location.pathname.split('/').pop();

        items.forEach(item => {
            const li = document.createElement('li');
            li.id = item.id;
            li.innerHTML = `
                <strong>ID:</strong> ${item.id} <br>
                <strong>Nome:</strong> ${item.name} <br>
                <strong>Descrição:</strong> ${item.description} <br>
                <strong>Local Onde Foi Perdido:</strong> ${item.location}
                <div class="actions">
                    ${currentPage !== 'login2.html' ? `
                        <button class="edit">Editar</button>
                        <button class="delete">Excluir</button>
                    ` : ''}
                </div>
            `;
            itemList.appendChild(li);
        });
    }
    renderItems();
});

document.getElementById('showModal').onclick = function() {
    document.getElementById('myModal').style.display = "block";
}

document.getElementsByClassName('close')[0].onclick = function() {
    document.getElementById('myModal').style.display = "none";
}

window.onclick = function(event) {
    if (event.target == document.getElementById('myModal')) {
        document.getElementById('myModal').style.display = "none";
    }
}
