//import Math from 

let energyConso = document.getElementById('energy');
let myResult = document.getElementById('feur');
let calcButton = document.querySelector('button')
let checkBox = document.getElementById('checkbox')
checkBox.checked = false
let yx_normal
let yx_SC

function setUp(fuelJSON) {
    fuel_normal = fuelJSON["normal"]
    fuel_SC = fuelJSON["superCruise"]
    yx_normal = linReg(fuel_normal)
    yx_SC = linReg(fuel_SC)
    console.log(yx_normal)
    console.log(yx_SC)
}



function linReg(dataList) {
    let y_vector = []
    let x_matrix = []
    for (i=0; i<dataList.length; ++i) {
        y_vector.push([dataList[i][0]])
        x_matrix.push([1, dataList[i][1]])
    }
    console.log(y_vector.length)
    console.log(x_matrix.length)
    let x_transpose = []
    for (j=0; j < x_matrix[0].length; ++j) {
        let newLine = []
        for (i=0; i<x_matrix.length; ++i) {
            newLine.push(x_matrix[i][j])
        }
        x_transpose.push(newLine)
    }
    ATA = multiply(x_transpose, x_matrix)
    ATb = multiply(x_transpose, y_vector)
    console.log(ATA)
    console.log(ATb)
    let yx = solveSystem(ATA, ATb)
    return yx
}


function solveSystem(mat, vect) {
    for(i=0; i<mat.length; ++i) {
        //a = mat[i][j]
        for(j=0; j<mat.length; j++) {
            let coeff_temp = mat[j][i]/mat[i][i]
            if(j!= i) {
                for(z=0; z<mat[j].length; ++z) {
                    mat[j][z] = mat[j][z] - coeff_temp*mat[i][z]
                }
                vect[j] = vect[j] - coeff_temp*vect[i]
            }
        }
    }
    for(i=0; i<mat.length; ++i) {
        vect[i] = vect[i]/mat[i][i]
        mat[i][i] = 1
    }
    
    return [vect[0], vect[1]]
}

function multiply(a, b) {
  var aNumRows = a.length, aNumCols = a[0].length,
      bNumRows = b.length, bNumCols = b[0].length,
      m = new Array(aNumRows);  // initialize array of rows
  for (var r = 0; r < aNumRows; ++r) {
    m[r] = new Array(bNumCols); // initialize the current row
    for (var c = 0; c < bNumCols; ++c) {
      m[r][c] = 0;             // initialize the current cell
      for (var i = 0; i < aNumCols; ++i) {
        m[r][c] += a[r][i] * b[i][c];
      }
    }
  }
  return m;
}

function buildDateString(quote) {
    let date = ""
    if(quote[4] != 0) { date += quote[4]+"/"}
    if(quote[3] != 0) { date += quote[3]+"/"}
    if(quote[2] != 0) { date += quote[2]}
    return date
    
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

fetch('data/fuel.json')
    .then((response) => response.json())
    .then((json) => setUp(json))

calcButton.addEventListener("click", () => {
    if(energyConso.value == '') {
        myResult.innerHTML = "Please input a value"
    }
    else{
        energyConso.value = energyConso.value.replace(',', '.')
        if(energyConso.value == 0) {
            myResult.innerHTML = 0
        }
        else {
            if(checkBox.checked) {
                let rez = yx_SC[1]*parseFloat(energyConso.value) + yx_SC[0]
                rez = Math.ceil(rez*100) 
                myResult.innerHTML = rez/100 + " t/hr"
            } else {
                let rez = yx_normal[1]*parseFloat(energyConso.value) + yx_normal[0]
                rez = Math.ceil(rez*100) 
                myResult.innerHTML = rez/100 + " t/hr"
            }
        }
    }
});