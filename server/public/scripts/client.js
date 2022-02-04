$(document).ready(onReady);

function onReady(){
    console.log('JS UP');
    $('#calculate').on('click',sendData);
}

function sendData(){
    dataTest = [1,2,3,4,5];
    $.ajax({
        method: 'POST',
        url: '/calculate',
        data: {
            dataTest
        }
    }).then(function(response){
        console.log('sendData success!', response);
    }).catch(function(response){
        console.log('sendData Failed',response);
    })
    }

