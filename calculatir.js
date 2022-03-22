
var nowdigit =0;
var lastdigit =0;
var count = 1
var flag = true;
var resultflag = false;
var limit = 20;
function insert(num)
{
    var res = document.getElementById("result");
    if(count<limit)
    {
        if(resultflag || res.value=='0' && num!='.'){res.value="";count=0;resultflag=false;flag=true;}
        if(num!='.'||flag){res.value+=num;count++;}
        if(num=='.')flag=false;
    }
}
function deletecharacter()
{
   var str = document.getElementById("result").value
   if(!resultflag)
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
function resetcurrentnumber()
{
    flag=true;
    count=1;
    document.getElementById("result").value = 0;
    resErr();
}
function resetallnumbers()
{
    firstdigit =0;
    seconddigit =0;
    resetcurrentnumber();
}
function Operation(op) {
    if(!resultflag)
    {
    var num = document.getElementById("result").value;
    resultflag = true;
    switch (op) {
        case "%":
            $("#temp").text(percent($("#temp").text()));
            return;
        case "sqr":
            document.getElementById("result").value = sqroot(num);
            return;
        case "x^2":
            document.getElementById("result").value = square(num);
            return;
        case "1/x":
            document.getElementById("result").value = inverse(num);
            return;
    }    
    }
    
}
function inverse(num) {
    if(num==0){ return "Division by zero is not possible";}
    return 1 / Number(num);
}
function square(num) {
    return Math.pow(Number(num), 2);
}
function sqroot(num) {
    if(num<0){ return "Invalid input";}
    return Math.sqrt(Number(num));
}
