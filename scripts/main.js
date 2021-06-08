$(document).ready(function(){
    setAddressBars(); 
    setSheetCells();

    $('.title').on("keydown", function(){
        updateMetaTitle();
    });

    $('.sheet-cell').dblclick(function(e) {
        activateCell(e)
    });

    $('.sheet-cell').click(function(e) {
        deactivateActiveCells(e)
    });
});

function updateMetaTitle(){
    document.querySelector('title').textContent = document.querySelector('.title').innerHTML.replace(/<\/?[^>]+>/gi, " ").replace('&nbsp;',' ');
}

function setAddressBars(){
    for(let n = 0; n < 100; n++){
        let address = '';
        let num = n;
        first = true;
        while(num >= 0){
            address = String.fromCharCode(65 + num % 26) + address;
            num = num / 26 - 1;
            first = false;
        }
        let colAddress = `<div id="col-${address}" class="col-address-cell">${address}</div>`;
        $('.col-address-bar').append(colAddress);
        let rowAddress = `<div id="row-${n + 1}" class="row-address-cell">${n + 1}</div>`;
        $('.row-address-bar').append(rowAddress);
    }
}

function  setSheetCells(){
    for(let i = 0; i < 20; i++){
        let row = `<div class="sheet-row">`;
        for(let j = 0; j < 13; j++){
            let address = '';
            let num = j;
            first = true;
            while(num >= 0){
                address = String.fromCharCode(65 + num % 26) + address;
                num = num / 26 - 1;
                first = false;
            }
            let cell = `<div id="row-${i + 1}-col-${address}" class="sheet-cell" contenteditable="false"></div>`;
            row += cell;
        }
        row += `</div>`;
        $('.sheet-container .sheet').append(row)
    }
}

function activateCell(e){
    deactivateActiveCells(e);
    let cellID = `${e.target.id}`;
    document.getElementById(cellID).classList.add("active");
    $(`#${cellID}`).attr("contenteditable","true")
    let rowID = cellID.split("-")[1];
    let colID = cellID.split("-")[3];
    document.getElementById(`row-${rowID}`).classList.add("active");
    document.getElementById(`col-${colID}`).classList.add("active");
}

function deactivateActiveCells(e){
    $(".sheet-cell.active").each(function(){
        let rowID = this.id.split("-")[1];
        let colID = this.id.split("-")[3];
        $(`#${this.id}`).attr("contenteditable","false");
        document.getElementById(`row-${rowID}`).classList.remove("active");
        document.getElementById(`col-${colID}`).classList.remove("active");
    });
    $(".sheet-cell.active").removeClass("active")
}