let search = document.getElementById("search");

search.addEventListener("keyup", searchFunction);

//  Function to search
function searchFunction() {
  let searchToUpper = search.value.toUpperCase();
  let table = document.getElementById("table");

  let items = table.querySelectorAll("tr.items");
  console.log(items);
  for (let i = 0; i < items.length; i++) {
    const word = items[i].innerText;
    if (word.toUpperCase().indexOf(searchToUpper) > -1) {
      items[i].style.display = "";
    } else {
      items[i].style.display = "none";
    }
  }
}

// Function to generate the sorted table based on column
function sortTable(n) {
  console.log(n);
  let res = [];
  let heading = document.querySelectorAll("th");
  let title = [];
  for (let i = 0; i < heading.length; i++) {
    title.push(heading[i].innerText);
  }
  console.log(title);
  let rows = document.querySelectorAll("tr");
  console.log(rows);
  for (let i = 0; i < rows.length; i++) {
    let column = [];
    let cells = rows[i].querySelectorAll("td");
    for (let j = 0; j < cells.length; j++) {
      column.push(cells[j].innerText);
    }
    res.push(column);
  }

  res = sortByColumn(res, n);
  let table = document.getElementById("table");
  let tableData = "";
  tableData += "<tr>";
  for (let i = 0; i < title.length; i++) {
    tableData += `<th onclick="sortTable(${i})">${title[i]}</th>`;
  }
  tableData += `</tr>`;
  for (let i = 1; i < res.length; i++) {
    tableData += '<tr class="items">';
    for (let j = 0; j < res[i].length; j++) {
      tableData += `<td>${res[i][j]}</td>`;
    }
    tableData += `</tr>`;
  }
  table.innerHTML = tableData;
}
let asc = true;

//  Function to sort
function sortByColumn(a, colIndex) {
  console.log(a[1][colIndex]);
  console.log(isNaN(a[1][colIndex]));
  if (isNaN(a[1][colIndex])) {
    a.sort(sortFunction);
  } else {
    a.sort(sortNumber);
  }

  function sortFunction(a, b) {
    if (a[colIndex] === b[colIndex]) {
      return 0;
    } else if (asc === true) {
      return a[colIndex] < b[colIndex] ? -1 : 1;
    } else {
      return a[colIndex] < b[colIndex] ? 1 : -1;
    }
  }

  function sortNumber(a, b) {
    if (parseInt(a[colIndex]) === parseInt(b[colIndex])) {
      return 0;
    } else if (asc === true) {
      return parseInt(a[colIndex]) < parseInt(b[colIndex]) ? -1 : 1;
    } else {
      return parseInt(a[colIndex]) < parseInt(b[colIndex]) ? 1 : -1;
    }
  }

  if (asc === true) asc = false;
  else asc = true;
  return a;
}
