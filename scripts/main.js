$(document).ready(function(){
    $('.title').on("keydown", function(){
        //action you want taken
        document.querySelector('title').textContent = document.querySelector('.title').innerHTML.replace(/<\/?[^>]+>/gi, " ").replace('&nbsp;',' ');
    });
    setAddressBars();  
    setSheetCells();
    $('.sheet-cell').dblclick(function(e) {
        document.getElementsByClassName(`.sheet-cell.active`)[0]?.classList.remove("active")
        document.getElementById(`${e.target.id}`).classList.add("active");
        document.getElementById(`${e.target.id}`).setAttribute("contenteditable","true");
    });
    $('.sheet-cell').click(function() {
        $('.sheet-cell.active').removeClass(".active")
    });
});

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
    for(let i = 0; i < 10; i++){
        let row = `<div class="sheet-row">`;
        for(let j = 0; j < 10; j++){
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