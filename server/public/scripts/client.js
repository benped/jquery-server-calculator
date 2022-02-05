$(document).ready(onReady);

let dataTest = {
    input1: '',
    operator: '',
    input2: ''
};

function onReady(){
    console.log('JS UP');
    $('#calculate').on('click',sendData);
    $('#add').on('click',sendAdd);
    $('#sub').on('click',sendSub);
    $('#div').on('click',sendDiv);
    $('#mul').on('click',sendMul);
}

// Sends neccessary data to the server in an object to get maths done. 
function sendData(){

    dataTest.input1 = ($('#input1').val());
    dataTest.input2 = ($('#input2').val());
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
    dataTest.operator = 'add';
}

function sendSub(){
    dataTest.operator = 'sub';
}

function sendDiv(){
    dataTest.operator = 'div';
}

function sendMul(){
    dataTest.operator = 'mul';
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

    for (let answer of response){
        $('#response').append(`<p>${answer}</p>`);
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
