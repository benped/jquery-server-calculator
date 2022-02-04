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
}

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
        dataTest = [];
    }).catch(function(response){
        console.log('sendData Failed',response);
    })
    }

function sendAdd(){
    dataTest.operator = 'add';
}
