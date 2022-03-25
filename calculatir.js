
var nowdigit =0;
var lastdigit =0;
var count = 1
var oper = "";
var err = false;
var fa = true;
var f = true;
var clickbut=false;
var flag = true;
var finishednumber = false;
var limit = 20;
document.addEventListener("keydown", function(event){
    var key= event.key;
    if(event.keyCode == 8)key="clear";else 
    if(event.keyCode == 27)key="C";
    document.getElementById(key).click();
});
function insert(num)
{
    var res = document.getElementById("result");
    if(err){unerror();resetallnumbers()}
    if(count<limit)
    {
        if(finishednumber || res.value=='0' && num!='.'||finishednumber){res.value="";count=0;finishednumber=false;flag=true;}
        if(num!='.'||flag){res.value+=num;count++;}
        if(num=='.')flag=false;
    }
}
function deletecharacter()
{
   var str = document.getElementById("result").value
   if(err){unerror();resetallnumbers()}
   if(!finishednumber)
   {
    str = str.split("");
    if(str[str.length - 1]=='.')flag=true;
    str.pop();
    str = str.join("");
    count--;
    str = str == "" ? "0" : str == "-" ? "0" : str;
    document.getElementById("result").value = str;
   }else resetcurrentnumber();
}
function changesign()
{
    var str = document.getElementById("result").value
    str = str.split("");
    if(str[0]=='-')str.shift();else if(str!="0") str.unshift('-');
    str = str.join("");
 
    document.getElementById("result").value = str;
}
function dellast()
{
    var str = document.getElementById("result2").value
    if(str!="")
    {
    str = str.split(" ");
    str.pop();
    str = str.join(" ");
    document.getElementById("result2").value = str;
    }
}
function reset()
{clickbut=true;resetcurrentnumber();clickbut=false}
function resetcurrentnumber()
{
    if(err){unerror();resetallnumbers()}
    if(finishednumber&&!fa&&clickbut){dellast();finishednumber=false;fa = true;}
    flag=true;
    count=1;
    nowdigit = 0;
    document.getElementById("result").value = 0;
}
function resetallnumbers()
{
    oper="+";
    lastdigit =0;
    document.getElementById("result2").value= "";
    resetcurrentnumber();
}
function Operation(op) {
    nowdigit = document.getElementById("result").value;
    if(finishednumber == true && fa)oper = "";
    finishednumber = true;
    if(oper==""||!fa)document.getElementById("result2").value = "";
    switch (op) {
        case "%":
            document.getElementById("result2").value+= ' ' +document.getElementById("result").value+'%';fa=false;
            document.getElementById("result").value = percent();
            return;
        case "sqr":
            document.getElementById("result2").value+= ' sqr('+document.getElementById("result").value+')';fa=false;
            document.getElementById("result").value = sqroot(nowdigit);
            return;
        case "x^2":
            document.getElementById("result2").value+= ' ' +document.getElementById("result").value+'^2';fa=false;
            document.getElementById("result").value = square(nowdigit);
            return;
        case "1/x":
            document.getElementById("result2").value+= ' 1/'+document.getElementById("result").value;fa=false;
            document.getElementById("result").value = inverse(nowdigit);
            return;
        case "atan":
            document.getElementById("result2").value+= ' atan('+document.getElementById("result").value+')';fa=false;
            document.getElementById("result").value = atan(nowdigit);
            return;
        case "cosh":
            document.getElementById("result2").value+= ' cosh('+document.getElementById("result").value+')';fa=false;
            document.getElementById("result").value = cosh(nowdigit);
            return;
        case "degrees_to_radians":
            document.getElementById("result2").value+= ' degrees_to_radians('+document.getElementById("result").value+')';fa=false;
            document.getElementById("result").value = degrees_to_radians(nowdigit);
            return;
        case "ceil":
            document.getElementById("result2").value+= ' ceil('+document.getElementById("result").value+')';fa=false;
            document.getElementById("result").value = ceil(nowdigit);
            return;
        case "exp":
            document.getElementById("result2").value+= ' exp('+document.getElementById("result").value+')';fa=false;
            document.getElementById("result").value = exp(nowdigit);
            return;
    } 
    if(oper!=""){savedigit(operationOnTwoNumbers(oper));}else savedigit(nowdigit);
    document.getElementById("result").value = lastdigit;
    fa = true;
    oper = op;
    document.getElementById("result2").value+= ' ' + oper;
}
function savedigit(num)
{
    lastdigit = Number(num);
    if(!err)
    {
    if(f)document.getElementById("result2").value= lastdigit;else f=true;
    resetcurrentnumber();
    }{lastdigit = num;f=true;}
}

function operationOnTwoNumbers(op)
{
    switch (op) {
        case "+":
            return sum();
        case "-":
            return difference();
        case "*":
            return multiply();
        case "/":
            return division();
    } 
}
function percent()
{
    var res = (lastdigit*nowdigit)/100;
    if(res=="Infinity" || res=="-Infinity"){error(); return "overflow";}
    return res;
}
function equals()
{
    
    nowdigit = document.getElementById("result").value;
    var num = nowdigit;
    finishednumber = true;
    if(oper!=""){f=false;savedigit(operationOnTwoNumbers(oper));
        if(fa)document.getElementById("result2").value+= ' ' + num + ' =';else {document.getElementById("result2").value+= ' =';fa=true;}
    oper = "";
    document.getElementById("result").value = lastdigit;}
}
function sum() {
    var res = Number(lastdigit) + Number(nowdigit);
    if(res=="Infinity" || res=="-Infinity"){error(); return "overflow";}
    return res;
}
function difference()
{
    var res = lastdigit - nowdigit;
    if(res=="Infinity" || res=="-Infinity"){error(); return "overflow";}
    return res;
}
function multiply()
{
    var res = lastdigit * nowdigit;
    if(res=="Infinity" || res=="-Infinity"){error(); return "overflow";}
    return res;
}
function division()
{
    if(nowdigit==0){error(); return "Division by zero is not possible";}
    return lastdigit / nowdigit;
}
function inverse(num) {
    if(num==0){error(); return "Division by zero is not possible";}
    return 1 / Number(num);
}
function square(num) {
    var res = Math.pow(Number(num), 2);
    if(res=="Infinity" || res=="-Infinity"){error(); return "overflow";}
    return res;
}
function sqroot(num) {
    if(num<0){error(); return "Invalid input";}
    return Math.sqrt(Number(num));
}
function atan(num)
{
   return Math.atan(num);
}
function cosh(num)
{
    var res = Math.cosh(num);
    if(res=="Infinity" || res=="-Infinity"){error(); return "overflow";}
    return res;
}
function degrees_to_radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}
function ceil(num)
{
    return Math.ceil(num);
}
function exp(num)
{
    var res = Math.exp(num);
    if(res=="Infinity" || res=="-Infinity"){error(); return "overflow";}
    return res;
}
function error()
{
    err = true;
    var els = document.getElementsByClassName('operation');
    Array.prototype.forEach.call(els, function(el) {
        el.disabled = true;
    });
}
function unerror()
{
    err=false;
    var els = document.getElementsByClassName('operation');
    Array.prototype.forEach.call(els, function(el) {
        el.disabled = false;
    });
}
