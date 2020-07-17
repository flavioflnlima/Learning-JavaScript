function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]");

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => {
      return res.json();
    })
    .then((states) => {
      for (state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
      }
    });
}
populateUFs();

function getCities(event) {
  const citySelect = document.querySelector("select[name=city]");

  const stateInput = document.querySelector("input[name=state]");

  const ufValue = event.target.value;

  const indexOfSelectedEstate = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedEstate].text;

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/distritos`;

  citySelect.innerHTML = "<option value>Selecione a cidade</option>";
  citySelect.disabled = true;

  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((cities) => {
      for (city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
      }

      citySelect.disabled = false;
    });
}

document.querySelector("select[name=uf]").addEventListener("change", getCities);

const itemsToCollect = document.querySelectorAll(".items-grid li");

for (const item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items");
let selectedItems = []

function handleSelectedItem(event) {
  const itemLi = event.target
  
  //toggle: add ou remove uma classe
  itemLi.classList.toggle("selected")  
  
  const itemId = itemLi.dataset.id
  
  //verificar se existem itens selecionados, se sim
  //pegar os itens selecionados
  const alreadySelected = selectedItems.findIndex(item => {
    return item == itemId
  })

  // se ja estiver selecionado, retirar da seleção
  // se não, retirar da seleção
  if (alreadySelected >= 0) {
    const filteredItems = selectedItems.filter((item) => {
      return (itemsIsDifferent = item != itemId);
    });
    selectedItems = filteredItems;
  } 
  else {
    selectedItems.push(itemId)
  }
  
  collectedItems.value = selectedItems
}