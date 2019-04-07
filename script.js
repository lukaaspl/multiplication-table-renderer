let renderBtn = document.querySelector("button.renderBtn");
let rowsInput = document.querySelector("input#rows");
let columnsInput = document.querySelector("input#columns");
let tableDisplay = document.querySelector("main");
let fcToggler = document.querySelector(".fullscreen-toggler");
let fullscreen = document.querySelector(".fullscreen");
let footer = document.querySelector("footer");

let hasToStop = false;

renderBtn.addEventListener("click", function () {
    if (Number(rowsInput.value)) {
        wrongInputValue(rowsInput, true);
        hasToStop = false;
    } else {
        wrongInputValue(rowsInput);
        hasToStop = true;
        console.log("Invalid rows value!");
    }

    if (Number(columnsInput.value)) {
        wrongInputValue(columnsInput, true);
        hasToStop = false;
    } else {
        wrongInputValue(columnsInput);
        hasToStop = true;
        console.log("Invalid columns value!");
    }

    if (!hasToStop) {
        let tableRows = rowsInput.value;
        let tableColumns = columnsInput.value;
        let renderedArray = renderMultiplicationTable(tableRows, tableColumns);
        let renderedTime = (renderedArray[2]).toFixed(1);
        tableDisplay.innerHTML = "";
        tableDisplay.appendChild(renderedArray[0]);
        footer.innerHTML = `table rendered in <b>${renderedTime}</b> ms`;

        console.log(renderedArray[1]);
        console.log(renderedArray[2]);

        if (tableRows > 10 && tableColumns > 10) {
            fcToggler.classList.add("active");

            fcToggler.addEventListener("click", function () {
                fullscreen.classList.add("active");

                if (fullscreen.classList.contains("active")) {
                    fullscreen.innerHTML = "";
                    fullscreen.appendChild(renderedArray[0]);

                    let closeFullScreenBtn = document.createElement('div');
                    closeFullScreenBtn.classList.add("close-button");
                    closeFullScreenBtn.innerHTML = "<i class=\"fas fa-times-circle\"></i>";
                    fullscreen.appendChild(closeFullScreenBtn);

                    closeFullScreenBtn.addEventListener("click", function () {
                        fullscreen.classList.remove("active");
                        tableDisplay.appendChild(renderedArray[0]);
                    });
                }
            })
        } else
            fcToggler.classList.remove("active");
    }
});



function wrongInputValue(input, clear = false) {
    if (!clear) {
        input.classList.add("invalid");
        input.setAttribute("placeholder", "###");
    } else {
        if (input.classList.contains("invalid") && input.hasAttribute("placeholder")) {
            input.classList.remove("invalid");
            input.removeAttribute("placeholder");
        }
    }
}

function renderMultiplicationTable(rows, columns) {
    let renderedTable = document.createElement("table");
    let renderedForConsole = "";
    let startRendering = performance.now();
    renderedTable.setAttribute("cellspacing", "4");

    for (let i = 1; i <= rows; i++) {
        let renderedRow = renderedTable.appendChild(document.createElement("tr"));

        for (let j = 1; j <= columns; j++) {
            let tableElementRole = "td";

            if (j === 1 || i === 1)
                tableElementRole = "th";

            let renderedColumn = renderedRow.appendChild(document.createElement(tableElementRole));

            if (j === 1) // cols
                renderedColumn.setAttribute("data-value", "col" + j * i);

            if (i === 1) // rows
                renderedColumn.setAttribute("data-value", "row" + j * i);

            if (j !== 1 && i !== 1) {
                renderedColumn.addEventListener("click", function () {
                    this.setAttribute("data-content", `${j} * ${i} = ${i * j}`);


                    let currentColumnAndRow = document.querySelectorAll(
                        `[data-value='col${i}'], [data-value='row${j}']`);

                    document.querySelectorAll("th, td").forEach(function (item) {
                        item.classList.remove("picked");
                    });

                    this.classList.add("picked");

                    currentColumnAndRow.forEach(function (item) {
                        item.classList.add("picked");
                    });
                });
            }

            renderedColumn.innerHTML = i * j;

            renderedForConsole += (i * j) + "\t";
        }

        renderedForConsole += "\n";
    }

    let renderingTime = performance.now() - startRendering;
    return [renderedTable, renderedForConsole, renderingTime];
}

tableDisplay.appendChild(renderMultiplicationTable(10, 10)[0]);