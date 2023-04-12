const btnEdit = document.querySelector("#btnEdit")

btnEdit.addEventListener('click', ()=>{
    const mode = Mode.Build
    const edit = true

    const params = new URLSearchParams()
    params.append("mode", mode)
    params.append("edit", edit)

    window.location.href = 'view/view.html?' + params.toString();
})