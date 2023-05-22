let fiNote
let svNote
let count = 0
let li
let li2
let ulState

// Restore ul element from localstorage
document.getElementById('notes-list').innerHTML = JSON.parse(localStorage.getItem('ulState'))
displayLi

// Set default language
let language = localStorage.getItem('language');
if (!language) {
  language = 'swedish';
  localStorage.setItem('language', language);
}

// Update language when the select element changes
const select = document.getElementById('select');
select.addEventListener('change', function() {
  if (select.value === 'finnish') {
    document.getElementById('notes').textContent = 'Muistiinpanot';
    localStorage.setItem('language', 'finnish');
  } else {
    document.getElementById('notes').textContent = 'Anteckningar';
    localStorage.setItem('language', 'swedish');
  }
  displayLi()
});

// Set language from stored value
if (language === 'finnish') {
  document.getElementById('notes').textContent = 'Muistiinpanot';
  select.value = 'finnish';
} else {
  document.getElementById('notes').textContent = 'Anteckningar';
  select.value = 'swedish';
  displayLi()
}

// Store notes in diffrent variables
document.getElementById('save').addEventListener('click', () => {
  if ((document.getElementById('textarea-sv').value) && (document.getElementById('textarea-fi').value)) {
    svNote = document.getElementById('textarea-sv').value
    fiNote = document.getElementById('textarea-fi').value
    document.getElementById('textarea-sv').value = ''
    document.getElementById('textarea-fi').value = ''

    saveNotes(svNote, fiNote)
    createLi(svNote, fiNote)
  } else {
    if (localStorage.getItem('language') == 'swedish') {
      alert('Ej godkänt!')
    } else {
      alert('Ei hyväksytty!')
    }
  }
})

// Store notes in localstorage
function saveNotes(svNote, fiNote) {
  count++
  localStorage.setItem(`svNote${count}`, `${svNote}`)
  localStorage.setItem(`fiNote${count}`, `${fiNote}`)
}

// Create the li elements
function createLi(svNote, fiNote) {
    li = document.createElement('li');
    li2 = document.createElement('li');
    li.style.display = 'none'
    li2.style.display = 'none'
    li.classList = 'sv'
    li2.classList = 'fi'
    li.innerHTML = `<p>${svNote}</p>`
    li2.innerHTML = `<p>${fiNote}</p>`
    document.getElementById('notes-list').appendChild(li);
    document.getElementById('notes-list').appendChild(li2);
    displayLi()
}

function displayLi() {
  const listItems = document.querySelectorAll('ul li');

  for (let i = 0; i < listItems.length; i++) {
    const listItem = listItems[i];

    if ((listItem.classList.contains('sv')) && (localStorage.getItem('language') == 'swedish')) {
      listItem.style.display = 'block'
    } else if ((listItem.classList.contains('fi')) && (localStorage.getItem('language') == 'finnish')) {
      listItem.style.display = 'block'
    } else {
      listItem.style.display = 'none'
    }
    storeUl()
  }
}

// Store the current state of the entire ul element in localstorage
function storeUl() {
  ulState = document.getElementById('notes-list').innerHTML
  ulState = JSON.stringify(ulState)
  localStorage.setItem('ulState', ulState)
}