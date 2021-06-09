let classes = {
    enable:{
        cell : [],
        text : ["text-format-align-left","text-format-align-right","text-format-align-center","text-format-align-justify"]
    },
    toggle : {
        cell : ["cell-format-all-border","cell-format-clear-border","cell-format-horizontal-border","cell-format-inner-border","cell-format-left-border","cell-format-bottom-border","cell-format-vertical-border","cell-format-right-border","cell-format-top-border"],
        text : ["text-format-bold","text-format-italic","text-format-strikethrough","text-format-underline"]
    }
}

$(document).ready(function(){
    setAddressBars(); 
    setSheetCells();

    $('.title').on("keydown", function(){
        seperator();
        console.log("Key Down Function on Title Encountered")
        updateMetaTitle();
    });

    $('.sheet-cell').dblclick(function(e) {
        seperator();
        console.log("Double Click Function on cell Encountered " + e.target.id)
        activateCell(e)
    });

    $('.sheet-cell').click(function(e) {
        seperator();
        console.log("Click Function on cell Encountered " + e.target.id)
        if($(".sheet-cell.active")[0]?.id != e.target.id){
            selectCell(e, false);
        }
    });

    $('.sheet-cell').on("keyup",function(e) {
        seperator();
        if(e.keyCode === 13){
            selectCell(e, true);
        }
    });

    $(".enable-class").click(function(e){
        seperator();
        console.log("ENABLE : Click Function on cell Format Option Encountered : " + e.target.id);
        if(e.target.id.split("-")[0] == "cell"){
            enableFormatting(e, classes.enable.cell);
        }
        else{
            enableFormatting(e, classes.enable.text);
        }
    });

    $(".toggle-class").click(function(e){
        seperator();
        console.log("TOGGLE : Click Function on cell Format Option Encountered : " + e.target.id);
        if(e.target.id.split("-")[0] == "cell"){
            toggleFormatting(e, classes.toggle.cell);
        }
        else{
            toggleFormatting(e, classes.toggle.text);
        }
    });
});

function seperator(){
    console.log("___________________________________________________________");
}

function updateMetaTitle(){
    console.log("Updating the Meta Tile");
    document.querySelector('title').textContent = document.querySelector('.title').innerHTML.replace(/<\/?[^>]+>/gi, " ").replace('&nbsp;',' ');
}

function setAddressBars(){
    console.log("Setting Address Bar Cells");
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

function setSheetCells(){
    console.log("Setting Sheet Cells");
    for(let i = 0; i < 21; i++){
        let row = `<div class="sheet-row sheet-row-${i + 1}">`;
        for(let j = 0; j < 9; j++){
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

function selectCell(e, next){
    deactivateActiveCells(e);
    console.log("Selecting Cell : " + e.target.id);
    let cellToSelect = `${e.target.id}`;
    if(next){
        cellToSelect = `row-${(e.target.id.split("-")[1]).charCodeAt() + 1}-${e.target.id.split("-")[3]}`
    }
    select([`#${cellToSelect}`])
    activateCorrespondingRowCol(e);
    updateToolBar($(`#${e.target.id}`));
}

function activateCell(e){
    deactivateActiveCells(e);
    console.log("Activating Cell : " + e.target.id);
    activate([`#${e.target.id}`])
    select([`#${e.target.id}`])
    $(`#${e.target.id}`).attr("contenteditable","true")
    activateCorrespondingRowCol(e);
    updateToolBar($(`#${e.target.id}`));
}

function activateCorrespondingRowCol(e){
    let cellID = `${e.target.id}`;
    let rowID = cellID.split("-")[1];
    let colID = cellID.split("-")[3];
    activate([`#row-${rowID}`, `#col-${colID}`])    
}

function deactivateCorrespondingRowCol(e){
    let cellID = `${e.target.id}`;
    let rowID = cellID.split("-")[1];
    let colID = cellID.split("-")[3];
    deactivate([`#row-${rowID}`, `#col-${colID}`])    
}

function deactivateActiveCells(e){
    console.log("Deactivating Cells Other Than : " + e.target.id);
    $(".sheet-cell.selected").each(function(){
        deselect([`#${this.id}`])
        $(`#${this.id}`).attr("contenteditable","false");
        deactivate([`#row-${this.id.split("-")[1]}`,`#col-${this.id.split("-")[3]}`,`#${this.id}`])
    });
    $(".sheet-cell.active").each(function(){
        $(`#${this.id}`).attr("contenteditable","false");
        deactivate([`#row-${this.id.split("-")[1]}`,`#col-${this.id.split("-")[3]}`,`#${this.id}`])
    });
}

function toggleFormatting(e, toggleClasses){
    console.log("Toggling Cell Classes : " + e.target.id);
    $(".sheet-cell.selected").each(function(){
        toggleClasses.forEach((toggleClass) => {
            if(e.target.id == toggleClass){
                $(`#${this.id}`).toggleClass(toggleClass);
            }
        });
    });
    updateToolBar($(".sheet-cell.selected"));

    $(".sheet-cell.activate").each(function(){
        toggleClasses.forEach((toggleClass) => {
            if(e.target.id == toggleClass){
                $(`#${this.id}`).toggleClass(toggleClass);
            }
        });
    });
    updateToolBar($(".sheet-cell.activate"));
}

function enableFormatting(e, enableClasses){
    console.log("Enabeling Cell Classes : " + e.target.id);
    $(".sheet-cell.selected").each(function(){
        enableClasses.forEach((enableClass) => {
            if(e.target.id == enableClass){
                $(`#${this.id}`).toggleClass(enableClass);
            }
            else{
                $(`#${this.id}`).removeClass(enableClass);
            }
        });
    });
    updateToolBar( $(".sheet-cell.selected"));

    $(".sheet-cell.activate").each(function(){
        enableClasses.forEach((enableClass) => {
            if(e.target.id == enableClass){
                $(`#${this.id}`).toggleClass(enableClass);
            }
            else{
                $(`#${this.id}`).removeClass(enableClass);
            }
        });
    });
    updateToolBar( $(".sheet-cell.activate"));
}

function updateToolBar(elements){
    console.log("Updating Toold Bar");
    elements.each((index) => {
        element = elements[index];
        let classes = element.classList;
        var listItems = $(".tool-bar-container .item-list").children();
        listItems.each((index) => {
            childElement = listItems[index]
            if(childElement.id != undefined && childElement.id != ""){
                if(classes != undefined && classes.contains(childElement.id)){
                    activate([`#${childElement.id}`]);
                }
                else{
                    deactivate([`#${childElement.id}`]);
                }
            }
        });
    });
}

function activate(querySelectorExpressions){
    // console.log("Activating : " + querySelectorExpressions);
    querySelectorExpressions.forEach((querySelectorExpression) => {
        $(`${querySelectorExpression}`).addClass("active")
    });
}

function deactivate(querySelectorExpressions){
    // console.log("Deactivating : " + querySelectorExpressions);
    querySelectorExpressions.forEach((querySelectorExpression) => {
        $(`${querySelectorExpression}`).removeClass("active")
    });
}

function select(querySelectorExpressions){
    // console.log("Selecting : " + (querySelectorExpressions));
    querySelectorExpressions.forEach((querySelectorExpression) => {
        $(`${querySelectorExpression}`).addClass("selected")
    });
}

function deselect(querySelectorExpressions){
    // console.log("Deselecting : " + querySelectorExpressions);
    querySelectorExpressions.forEach((querySelectorExpression) => {
        $(`${querySelectorExpression}`).removeClass("selected")
    });
}