// Add all your JS code here
var nameError = document.getElementById('username_notification');
var pass1Error = document.getElementById('password1_notification');
var pass2Error = document.getElementById('password2_notification');
var emailError = document.getElementById('email_notification');
var phoneError = document.getElementById('phone_notification');
var notif = document.getElementById('notification');
var nameFlag = false;
var pass1Flag = false;
var pass2Flag = false;
var emailFlag = false;
var phoneFlag = false;
var paraNum = 1;
var fetchFlag = true;
window.onload = init;
function init(){
    nameError = document.getElementById('username_notification');
    pass1Error = document.getElementById('password1_notification');
    pass2Error = document.getElementById('password2_notification');
    emailError = document.getElementById('email_notification');
    phoneError = document.getElementById('phone_notification');
    notif = document.getElementById('notification');
    const userLis = document.getElementById("username");
    userLis.addEventListener('keyup', validateNameWait);
    userLis.addEventListener('paste', validateNameWait);
    const pass1Lis = document.getElementById("password1");
    pass1Lis.addEventListener('keyup', validatePass1Wait);
    pass1Lis.addEventListener('keyup', validatePass2Wait);
    pass1Lis.addEventListener('paste', validatePass1Wait);
    pass1Lis.addEventListener('paste', validatePass2Wait);
    const pass2Lis = document.getElementById("password2");
    pass2Lis.addEventListener('keyup', validatePass2Wait);
    pass2Lis.addEventListener('paste', validatePass2Wait);
    const emailLis = document.getElementById("email");
    emailLis.addEventListener('keyup', validateEmailWait);
    emailLis.addEventListener('paste', validateEmailWait);
    const phoneLis = document.getElementById("phone");
    phoneLis.addEventListener('keyup', validatePhoneWait);
    phoneLis.addEventListener('paste', validatePhoneWait);
    const regLis = document.getElementById("register");
    regLis.addEventListener('click', submitCheckWait);
    const addLis = document.getElementById("add_update_item");
    addLis.addEventListener('click', addWait);
    fetchWait(paraNum);
    paraNum = paraNum + 5;

}
window.onscroll = scroller;

function scroller(){
    if (((window.innerHeight + window.scrollY)>= document.documentElement.scrollHeight) && fetchFlag){
        fetchWait(paraNum);
        paraNum = paraNum + 5;
    }
}

function fetchWait(pnum){
    setTimeout(()=>{fetch(pnum)},10);
}

function addWait(){
    setTimeout(() => {addCart()},10);
}

function validateNameWait(){
    setTimeout(()=>{validateName()},10);
}
function validatePass1Wait(){
    setTimeout(()=>{validatePass1()},10);
}
function validatePass2Wait(){
    setTimeout(()=>{validatePass2()}, 10);
}
function validateEmailWait(){
    setTimeout(()=>{validateEmail()}, 10);
}
function validatePhoneWait(){
    setTimeout(()=>{validatePhone()},10);
}
function submitCheckWait(){
    setTimeout(()=>{submitCheck()},10);
}

function validateName(){
    var name = document.getElementById("username").value;
    if (invalidWord(name) || name.length < 6){
        nameFlag = false;
        nameError.innerHTML = 'Username is invalid';
        document.getElementById("username").style.backgroundColor = "#ff0000";
    }
    else{
        nameFlag = true;
        nameError.innerHTML = '';
        document.getElementById("username").style.backgroundColor = "#ffffff";
    }
}
function validatePass1(){
    var pass = document.getElementById("password1").value;
    if ( invalidPass(pass)){
        pass1Flag = false;
        pass1Error.innerHTML = 'Password is invalid';
        document.getElementById("password1").style.backgroundColor = "#ff0000";
    }
    else{
        pass1Flag = true;
        pass1Error.innerHTML = '';
        document.getElementById("password1").style.backgroundColor = "#ffffff";
    }
}
function validatePass2(){
    var pass1 = document.getElementById("password1").value;
    var pass2 = document.getElementById("password2").value;
    if(pass1 == pass2){
        pass2Flag = true;
        pass2Error.innerHTML = '';
        document.getElementById("password2").style.backgroundColor = "#ffffff";
    }
    else{
        pass2Flag = false;
        pass2Error.innerHTML = 'Passwords don\'t match';
        document.getElementById("password2").style.backgroundColor = "#ff0000";
    }
}
function validateEmail(){
    var email = document.getElementById("email").value;
    if (invalidEmail(email)){
        emailFlag = false;
        emailError.innerHTML = 'Email is invalid';
        document.getElementById("email").style.backgroundColor = "#ff0000";
    }
    else{
        emailFlag = true;
        emailError.innerHTML = '';
        document.getElementById("email").style.backgroundColor = "#ffffff";
    }
}
function validatePhone(){
    var phone = document.getElementById("phone").value;
    if (invalidPhone(phone)){
        phoneFlag = false;
        phoneError.innerHTML = 'Phone is invalid';
        document.getElementById("phone").style.backgroundColor = "#ff0000";
    }
    else{
        phoneFlag = true;
        phoneError.innerHTML = '';
        document.getElementById("phone").style.backgroundColor = "#ffffff";
    }
}
function submitCheck(){
    if(nameFlag && pass1Flag && pass2Flag && emailFlag && phoneFlag ){
        notif.innerHTML = '';
        sendJSON();
    }
    else{
        validateEmail();
        validateName();
        validatePass1();
        validatePass2();
        validatePhone();
        notif.innerHTML = 'At least one field is invalid. Please correct it before proceeding';
    }
    
}

function invalidWord(name){
    return !(/^\w+$/.test(name));
}
function invalidPass(pass){
    var low = pass.match(/[a-z]/g);
    var cap = pass.match(/[A-Z]/g);
    var num = pass.match(/[0-9]/g);
    var spec = pass.match(/[!@#$%^&* ]/g);
    if(low == null || cap == null || num == null || spec == null || pass.length < 8){
        return true;
    }
    return false;
}
function invalidEmail(email){
    var check = email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ );
    if (check == null){
        return true;
    }
    return false;
}
function invalidPhone(phone){
    var p = phone.match(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/);
    if (p == null){
        return true;
    }
    return false;
}

function reqLike(event){
    var tar = event.target;
    var xhr = new XMLHttpRequest();
    var url = "https://ibs.utm.utoronto.ca/csc309/a3/text/likes";
    xhr.open("POST", url, true);

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            tar.innerHTML = "Likes: "+JSON.parse(xhr.response).data.likes;

        }
        if(xhr.readyState === 4 && xhr.status === 404){
            console.log("Unknown error occurred");
        }
    };
    var data = JSON.stringify({ "paragraph" : tar.parentElement.id.replaceAll("paragraph_",'') });

    xhr.send(data);

}

function fetch(pnum){
    if(!fetchFlag){
        return;
    }
    var xhr = new XMLHttpRequest();
    var url = "https://ibs.utm.utoronto.ca/csc309/a3/text/data?paragraph="+pnum;
    xhr.open("GET", url);
    xhr.onload = ()=>{
        var load = JSON.parse(xhr.response);
        var area = document.getElementById('data');
        fetchFlag = load.next;
        var par = [];
        for(var i = 0; i<load.data.length; i++){
            par[i] = document.createElement('div');
            par[i].id = "paragraph_"+load.data[i].paragraph;
            var section = document.createElement('p');
            section.innerHTML = load.data[i].content +"<b>(Paragraph: "+load.data[i].paragraph+")</b>";
            par[i].append(section);
            var butty = document.createElement('button');
            butty.className = "like";
            butty.innerHTML = "Likes: " + load.data[i].likes;
            var bpnum = load.data[i].paragraph;
            butty.addEventListener('click', reqLike);
            par[i].append(butty);
            area.append(par[i]);
        }
        if(!load.next){
            var endSent = document.createElement('p');
            endSent.innerHTML = "<b>You have reached the end</b>";
            area.append(endSent);
        }
    };
    xhr.send();
    
}

function sendJSON(){
              
    var userR = document.getElementById('username');
    var pass1R = document.getElementById('password1');
    var pass2R = document.getElementById('password2');
    var emailR = document.getElementById('email');
    var phoneR = document.getElementById('phone');
      
    // Creating a XHR object
    var xhr = new XMLHttpRequest();
    var url = "https://ibs.utm.utoronto.ca/csc309/a3/register";

    xhr.open("POST", url, true);

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

           notif.innerHTML = "User added";

        }
        if(xhr.readyState === 4 && xhr.status === 404){

            notif.innerHTML = "Unknown error occurred";

        }
        if(xhr.readyState === 4 && xhr.status === 409){

            notif.innerHTML = "Username has already been taken";

        }
    };

    var data = JSON.stringify({ "username" : userR.value, "password1": pass1R.value, "password2": pass2R.value, "email": emailR.value, "phone" : phoneR.value });

    xhr.send(data);
    
}
function updateCart(cells){
    var price = document.getElementById("price"); 
    var quantity = document.getElementById("quantity");
    cells[1].innerHTML = Math.round(parseFloat(price.value)*100)/100;
    cells[2].innerHTML = Math.round(parseInt(quantity.value)*100)/100;
    cells[3].innerHTML = Math.round(parseInt(quantity.value)*parseFloat(price.value)*100)/100;
    updateTotals();

}
function addCart(){
    var name = document.getElementById("name"); 
    var ID = name.value.replaceAll(/ /g,"_");
    var price = document.getElementById("price"); 
    var quantity = document.getElementById("quantity");
    if(name.value == '' || price.value == ''||quantity.value == ''){
        return;
    } 
    var allRows = document.getElementById('cart-items').children[1].children;
    for (var i = 0; i<allRows.length;i++){
        if(allRows[i].id == ID){
            updateCart(allRows[i].children);
            return;
        }
    }
    items = new Item (name.value, Math.round(parseFloat(price.value)*100)/100, Math.round(100*parseInt(quantity.value))/100); 
    var rowCart = document.createElement('tr');
    rowCart.id = ID;
    var rowTitle = document.createElement('td');
    rowTitle.innerHTML = items.name;
    rowCart.append(rowTitle);
    var rowPrice = document.createElement('td');
    rowPrice.innerHTML = Math.round(items.price*100)/100;
    rowCart.append(rowPrice);
    var rowQuan = document.createElement('td');
    rowQuan.innerHTML = items.quantity;
    rowCart.append(rowQuan);
    var rowTot = document.createElement('td');
    rowTot.innerHTML = Math.round(items.total*100)/100;
    rowCart.append(rowTot);


    var dec = document.createElement('td');
    var decButton = document.createElement('button');
    decButton.className = "decrease";
    decButton.innerHTML = '-';
    decButton.addEventListener('click', decClicked);
    dec.append(decButton);
    rowCart.append(dec);
    var inc = document.createElement('td');
    var incButton = document.createElement('button');
    incButton.className = "increase";
    incButton.innerHTML = '+';
    incButton.addEventListener('click', incClicked);
    inc.append(incButton);
    rowCart.append(inc);
    var del = document.createElement('td');
    var delButton = document.createElement('button');
    delButton.className = "delete";
    delButton.innerHTML = 'delete';
    delButton.addEventListener('click', delClicked);
    del.append(delButton);
    rowCart.append(del);


    var cartBody = document.getElementById('cart-items').children[1];
    cartBody.append(rowCart);
    updateTotals();

}
function decClicked(event){
    var button = event.target;
    var row =document.getElementById(button.parentElement.parentElement.id);
    if(row.children[3].innerHTML>0){
        row.children[2].innerHTML = parseInt(row.children[2].innerHTML)-1;
        row.children[3].innerHTML = Math.round(parseInt(row.children[2].innerHTML)*parseFloat(row.children[1].innerHTML)*100)/100;
    }
    updateTotals();

}
function incClicked(event){
    var button = event.target;
    var row =document.getElementById(button.parentElement.parentElement.id);
    row.children[2].innerHTML = parseInt(row.children[2].innerHTML)+1;
    row.children[3].innerHTML = Math.round(parseInt(row.children[2].innerHTML)*parseFloat(row.children[1].innerHTML)*100)/100;
    updateTotals();

}
function delClicked(event){
    var button = event.target;
    var row =document.getElementById(button.parentElement.parentElement.id);
    row.remove();
    updateTotals();

}
function updateTotals(){
    var total = 0;
    var allRows = document.getElementById('cart-items').children[1].children;
    for (var i = 0; i<allRows.length;i++){
        total = total + parseFloat(allRows[i].children[3].innerHTML);
    }
    var subtot = document.getElementById('subtotal');
    subtot.innerHTML = (Math.round(total*100)/100).toFixed(2);
    var tax = Math.round(total*0.13*100)/100;
    var taxSpot = document.getElementById('taxes');
    taxSpot.innerHTML = tax.toFixed(2);
    var grandTotal = document.getElementById('grand_total');
    var grand = Math.round(total*1.13*100)/100;
    grandTotal.innerHTML = grand.toFixed(2);
}
