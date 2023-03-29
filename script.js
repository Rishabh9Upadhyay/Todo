if(localStorage!=null){
    shownotes();
}
// if user adds a notes, add it to the local storage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById('addTxt')
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes)
    }
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj))
    addTxt.value = ''
    console.log(notesObj)
    shownotes();
})
function shownotes() {
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes)
    }
    let html = ''
    notesObj.forEach(function (element, index) {
        html += `
        <div class="notecard my-2 mx-2 card" style="width: 18rem;">
			<div class="card-body">
				<h5 class="card-title">Note ${index+1}</h5>
				<p class="card-text">${element}</p>
				<button id="${index}" onclick='deleteNote(this.id)' class="btn btn-primary">Delete Node</button>
			</div>
		</div>`
    })
    let noteElm=document.getElementById('notes')
     if(notesObj.length!=0){
        noteElm.innerHTML=html
     }else{
        noteElm.innerHTML='<h2>Nothing, Use above section to add note</h2>'
     }
}
// function to delete a note
function deleteNote(index){
    console.log('I am deleting: ',index)
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes)
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj))
    shownotes()
}

let search = document.getElementById('searchTxt');
search.addEventListener('input',function(){
    // let inputVal = search.value.toLowerCase()
    let inputVal = search.value
    // console.log('Input event fired ',inputVal)
    let noteCards = document.getElementsByClassName('notecard')
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName('p')[0].innerText; //to get string to use includes
        // if(cardTxt.include)
        // console.log(cardTxt)
        if(cardTxt.includes(inputVal)){
            element.style.display='block'
        }else{
            element.style.display='none'
        }
    })
})