$(document).ready(onReady);

let dataTest = {
    input1: '',
    operator: '',
    input2: ''
};

function onReady(){
    console.log('JS UP');
    $('#calculate').on('click',sendData);
    $('.calculator-keys').on('click','button',addInputValue)
    // $('#add').on('click',sendAdd);
    // $('#sub').on('click',sendSub);
    // $('#div').on('click',sendDiv);
    // $('#mul').on('click',sendMul);
    $('#clear').on('click',clear);
}

// Sends neccessary data to the server in an object to get maths done. 
function sendData(){
    dataTest.input1 = ($('#input1').val());
    dataTest.input2 = ($('#input2').val());

    if (dataTest.input1 === ''){
        alert('Enter Number!');
        return false;
    }
    if (dataTest.operator === ''){
        alert("input operation!")
        return false; 
    }

    console.log(dataTest);
    $.ajax({
        method: 'POST',
        url: '/calculate',
        data: {
            dataTest
        }
    }).then(function(response){
        console.log('sendData success!', response);
        clearDataTest();
        console.log('Get answer back is', getAnswerBack());

    }).catch(function(response){
        console.log('sendData Failed',response);
    })
    }

// Puts Add in the object that is sent to the dom. 
function sendAdd(){
    dataTest.operator = '+';
}

function sendSub(){
    dataTest.operator = '-';
}

function sendDiv(){
    dataTest.operator = '/';
    // $('#div').toggle(.addClass('shadow'),.removeClass('shadow'));
}

function sendMul(){
    dataTest.operator = '*';
}


// Clears our output object
function clearDataTest(){
    dataTest = {
        input1: '',
        operator: '',
        input2: ''
    };
}


function renderToDom(response){
    $('#response').empty();

    for (let mathObject of response){
        $('#response').append(`<p>${mathObject.input1} ${mathObject.operator} ${mathObject.input2} 
        = ${mathObject.answer}</p>`);
        $('#lastAnswer').empty();
        $('#lastAnswer').append(`${mathObject.answer}`);
    }
 
}


// Get to server to get all of our calculations back
function getAnswerBack(){
$.ajax({
    method: 'GET',
    url: '/answers'
}).then(function(response){
    console.log('getAnswerBack success!', response);
    renderToDom(response);
}).catch(function(response){
    console.log('getAnswerBack Failed',response);
})

};

function clear(){
    $('#input1').val('');
    $('#input2').val('');
}

function addInputValue(){
    console.log($(this).val());
    console.log('This is input val', $('#input1').val());
    console.log(isNaN($(this).val()));
    console.log(isNaN($('#input1').val()));
    let inputString = ($('#input1').val()).toString() + ($(this).val()).toString();
    console.log('This is inputString',inputString);
    console.log('NaN for inputString',isNaN(inputString));
    
    
    $('#input1').val(`${inputString}`);
    // $('#input1').val('DOES IT TAKE ANYTHING?');
    console.log($('#input1').val());
    
}