//document.getElementById(아이디).onclick = function(){ 실행할 코드 }

function onKeyDown()
{
     if(event.keyCode == 13)
     {   
        //var input_list = document.getElementsByTagName('input')
        var pos_str = document.activeElement.id;
        var pos_int = parseInt(pos_str.substring(1));
        pos_int++;
        pos_str = "r" + pos_int;
        document.getElementById(pos_str).focus();
     }
}

function valid_float(str)
{
   var set = [];
   var firstf, secondf, lastf;
   var flag1 = true;
   var flag2 = true;
   for(var i in str){
      if(flag1){
         if(str[i] != "0" && str[i] !=".") {
            firstf = i;
            flag1 = false;
         }
      }
      if(flag2){
         if(str[i] == "."){
            secondf = i;
            lastf = i;
            flag2 = false;
         }
      }
      if(!flag1 && !flag2){
         lastf = i;
      }
   }

   if(flag1){
      set[0] = 0;
      set[1] = 0;
   }
   else if(flag2){
      set[0] = str.length;
      set[1] = 0;
   }
   else{
      if(firstf<secondf){
         set[0] = lastf - firstf;
         set[1] = lastf - secondf;
      }
      else{
         set[0] = lastf - firstf + 1;
         set[1] = lastf - firstf + 1;
      }
   }

   return set;
}

function compare_min(n1, n2)
{
   if(n1 >= n2) return n2;
   else return n1;
}

function calculate(n1, n2, mode){
   var str_n1 = String(n1);
   var str_n2 = String(n2);

   var n1_set = valid_float(str_n1);
   var n2_set = valid_float(str_n2);

   var result;
   switch(mode){
      case "+":
         var max_float = compare_min(n1_set[1], n2_set[1]);
         var temp = n1 + n2;
         result = temp.toFixed(max_float);
         break;
      case "-":
         var max_float = compare_min(n1_set[1], n2_set[1]);
         var temp = n1 - n2;
         result = temp.toFixed(max_float);
         break;
      case "*":
         var max_valid = compare_min(n1_set[0], n2_set[0]);
         var temp = n1 * n2;
         result = temp.toPrecision(max_valid);
         break;
      case "/":
         var max_valid = compare_min(n1_set[0], n2_set[0]);
         var temp = n1 / n2;
         result = temp.toPrecision(max_valid);
         break;
   }
   return result
}

function is_val_num(str){
   var count = 0;
   if(str[0] == '.' || str[str.length-1] == '.') return false;
   for(var i in str){
      if(str[i] == '.'){
         count++;
      }
      else{
         if(isNaN(parseInt(str[i]))) return false;
      }
   }
   if(count <= 1) return true
   else return false;
}

function has_that_num(str, ch){
   for(var i in str){
      if(str[i] == ch) return true;
   }
   return false;
}

function val_to_cor(str, vnum){
   var admit = vnum;
   if(has_that_num(str,'.')) admit++;
   if(admit != str.length) return false;
   else return true;
}

function table_check(num)
{
   var t = document.getElementsByTagName('table');
   var tq = t[num].getElementsByTagName('input');
   var tablequeue = [];
   var lastpos = 0;
   var invalid = false;
   var col = parseInt(t[num].id.substring(1));
   var row = (tq.length) / col;
   var table_temp = 0;

   for(var i = 0; i<tq.length; i++){
      if(table_temp >= row*col) table_temp -= (row*col-1);
      tablequeue[i] = tq[table_temp];
      table_temp += col;
   }
   
   for(var i = 0; i<tablequeue.length; i++){
      pos_int = parseInt(tablequeue[i].id.substring(1));
      if(tablequeue[i].value != ""){
         if(pos_int > lastpos) lastpos = pos_int;
      }
   }
   
   if(lastpos == 0) { 
      invalid = true; 
      tablequeue[0].focus();
   }
   else{
      for(var i = 0; i<lastpos; i++){
         if(!is_val_num(tablequeue[i].value) || tablequeue[i].value == ""){
            tablequeue[i].style.boxShadow = '0 0 0 3px #ff0000 inset';
            if(!invalid) tablequeue[i].focus();
            invalid = true;
         }
         /*
         else if(val_to_cor(tablequeue[i].value,vnum)){
            tablequeue[i].style.boxShadow = '0 0 0 3px orange inset'
         }*/
      }
   }
   /*
   if(!invalid){
      for(var i = 0; i<lastpos; i++){
         
      }
   }*/
   console.log(invalid);
   return invalid;
}

function essential_check()
{ 
   var invalid = false;
   var band = document.getElementsByClassName('essential');

   for(var i = 0; i<band.length; i++) {
      if(!is_val_num(band[i].value) || band[i].value == ""){
         band[i].style.boxShadow = '0 0 0 3px #ff0000 inset';
         if(!invalid) band[i].focus();
         invalid = true;
      }
   }
   
   return invalid;
}

function clear_all(){
   init();
   var pn = document.getElementById('pagenum');
   var pnum = pn.name;
   var allinput = document.getElementsByTagName('input')
   for(var i in localStorage){
      if(i[0] == pnum) localStorage.removeItem(i);
   }
   for(var i = 0; i<allinput.length; i++){
      allinput[i].value = "";
   }
}

function init(){
   var cha = document.getElementById('chart');
   if(cha != null) cha.style.display = "none";

   var allinput = document.getElementsByTagName('input')
   var alloutput = document.getElementsByClassName('output');
   for(var i = 0; i<allinput.length; i++){
      allinput[i].style.boxShadow = '0 0 0 0px';
   }
   for(var i = 0; i<alloutput.length; i++){
      alloutput[i].textContent = "?";
   }

   var mod_yield = document.getElementsByName('m_yield')
   var mod_amp = document.getElementsByName('m_amp')
   for(var i in mod_yield){ mod_yield[i].textContent = "$$수득률(\\%) = \\frac{실제로 얻은양}{이론상 얻은양} \\ast 100 $$";}
   //for(var i in mod_amp){ mod_amp[i].textContent = "$$전하량(C) = 전류(A) \\ast 시간(sec) $$";}

   MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}

function stack_storage(){
   var pn = document.getElementById('pagenum');
   var pnum = pn.name;
   for(var i in localStorage){
      if(i[0] == pnum) localStorage.removeItem(i);
   }
   var allin = document.getElementsByTagName('input');
   for(var i in allin){
      if(allin[i].value !="") localStorage[String(pnum) + allin[i].id] = allin[i].value;
   }
}

window.onload = function() {
   var temp = document.getElementsByTagName('input');
   var pn = document.getElementById('pagenum');
   var pnum = pn.name;
   var allen = temp.length;
   for(var i = 0; i<allen; i++){
      var t = localStorage[String(pnum) + temp[i].id];
      if(t != null){
         temp[i].value = t;
      }
   }
}

function drawChart(id, num, title){
   var ctx = document.getElementById(id).getContext('2d');

   var t = document.getElementsByTagName('table');
   var tq = t[num].getElementsByTagName('input');
   var vq = t[num].getElementsByTagName('td');
   var thq = t[num].getElementsByTagName('th');
   var dataset = [];

   var col = parseInt(t[0].id.substring(1));
   var row = (tq.length) / col;
   var table_temp1 = 0;
   var max_num = 0;

   x_index = thq[0].textContent;
   y_index = thq[1].textContent;

   for(var i = 0; i<tq.length; i++){
      if(table_temp1 >= row*col) table_temp1 -= (row*col-1);
      if(tq[table_temp1].value != ''){
         dataset[i] = tq[table_temp1].value;
      }
      else {
         max_num = i;
         break;
      }
      table_temp1 += col;
   }

   var x_axis = [];
   var val = [];
   var count = 0;
   for(var i = 0; i<vq.length; i++){
      var temp = vq[i].textContent;
      if(temp!=""){
         val[count] = temp;
         count++;
      } 
   }
   
   var table_temp2 = 0;
   for(var i = 0; i<max_num; i++){
      if(table_temp2 >= row*col) table_temp2 -= (row*col-1);
      x_axis[i] = val[table_temp2];
      table_temp2 += col;
   }

   var myChart = new Chart(ctx, {
      type: 'line',
      data: {
         labels: x_axis,
         datasets: [{
            label: y_index,
            data: dataset,
            backgroundColor: 'black',
            borderColor: 'black',
            //borderWidth: 1,
            fill: false,
        }]
    },
    options: {
        responsive: false,
        title:{
           display: true,
           text: title,
           fontSize: 20
        },
        tooltips:{
           mode: 'index',
           intersect: true,
        },
        hover: {
           mode: 'nearest',
           intersect: true
        },
        scales: {
            yAxes: [{
               display: true,
               ticks: {
                  beginAtZero:true
               },
               scaleLabel: {
                  display: true,
                  labelString: y_index,
                  fontSize: 15,
                  //lineheight: ,
                  fontStyle: 'normal',
               },

            }],   

            xAxes: [{
               display: true,
               scaleLabel: {
                  display: true,
                  labelString: x_index,
                  fontSize: 15,
                  padding: 20,
               },
            }]
        }
    }
});
}

function pow(str, exp){
   //var str = String(num);
   var firstf, secondf, lastf;
   var flag1 = true;
   var flag2 = true;
   for(var i in str){
      if(flag1){
         if(str[i] != "0" && str[i] !=".") {
            firstf = i;
            flag1 = false;
         }
      }
      if(flag2){
         if(str[i] == "."){
            secondf = i;
            flag2 = false;
         }
      }
      if(str[i] != "0"){
         lastf = i;
      }
   }

   if(flag1){
      return "0";
   }
   else if(flag2){
      exp += --str.length;
      var result = str[firstf]
      if(str.length != 1) result += "." ;
      result += str.substring(1) + "*10^{" + exp + "}";
      return result;
   }
   else{
      if(firstf<secondf){
         exp += secondf - firstf - 1;
         var result = str[firstf]
         if(str.length != 1) result += "." ;
         result += str.substring(1,secondf) + str.substring(++secondf) + "*10^{" + exp + "}";
         return result;
      }
      else{
         exp -= firstf - secondf
         var result = str[firstf];
         if(str.length != 1) result += "." ;
         result += str.substring(++firstf) + "*10^{" + exp + "}";
         return result;
      }
   }
   
}


function submit1_1()
{  
   init();
   
   if(table_check(0)) {
      alert("유효하지않은 값입니다."); 
      return;
   }

   if(essential_check()) {
      alert("유효하지않은 값입니다.");
      return;
   } 

   var allgram = document.getElementById('r58');
   var gram = document.getElementById('r59');

   var n1 = parseFloat(allgram.value);
   var n2 = parseFloat(gram.value);

   if(n1 < n2){
      alert("유효하지않은 값입니다.");
      allgram.style.boxShadow = '0 0 0 3px orange inset';
      gram.style.boxShadow = '0 0 0 3px orange inset';
      allgram.focus();
      return;
   }

   var result1 = (n1 - n2).toFixed(3);
   var tag_r1 = document.getElementById('o_gram');
   tag_r1.innerText = result1;

   var temper = document.getElementById('r60');
   n3 = parseFloat(temper.value);
   n3 += 273.15
   if(n3<191 || n3>513){
      alert("유효하지않은 값입니다.");
      temper.style.boxShadow = '0 0 0 3px orange inset';
      temper.focus();
      return;
   }

   var tag_r2 = document.getElementById('o_ethanol_den');
   var result2 = (0.0993974/(0.310729**(1+((1-(n3/513.18))**0.305143)))).toFixed(6);
   tag_r2.innerText = result2;
   var ori = document.getElementsByClassName('origin');
   ori[0].style.display = "inline";
   var url = "http://ddbonline.ddbst.de/DIPPR105DensityCalculation/DIPPR105CalculationCGI.exe?component=Ethanol&tunit=%C2%B0C&punit=g%2Fcm3&TemperaturesEdit=" + temper.value + "&calculate=Calculate"
   var site = document.getElementById("den_site");
   site.innerText = url;

   var mod = "$$수득률=";
   mod += ("\\frac{" + result1 + "(g)}{5(ml)\\ast"+ result2 + "(g/ml)}\\ast100$$");
   var tar_r3 = document.getElementsByClassName("modi");
   tar_r3[0].textContent = mod;
   MathJax.Hub.Queue(["Typeset",MathJax.Hub]);

   var tar_r3 = document.getElementById("o_yield");
   var result3 = ( result1 / (5 * result2) ) * 100;
   tar_r3.textContent = result3.toFixed(1);

   stack_storage();
   
   var chart1 = document.getElementById('chart');
   drawChart('chart', 0, "알코올의 증류곡선");
   chart1.style.display = "inline";
}

function submit2_1(){
   init();
   if(essential_check()) {
      alert("유효하지않은 값입니다.");
      return;
   } 

   var result1, result2,
      a1, a2,
      b1, b2,
      tar_r1, tar_r2,
      mod1, mod2,
      temp;
   var allinput = document.getElementsByTagName('input');
   var alloutput = document.getElementsByClassName('output');
   var allmodi = document.getElementsByClassName('modi');
   a1 = allinput[0].value;
   temp = parseFloat(a1);
   a1 = temp.toFixed(3);
   a2 = allinput[1].value;
   temp = parseFloat(a2);
   a2 = temp.toFixed(3);
   b1 = allinput[2].value;
   temp = parseFloat(b1);
   b1 = temp.toFixed(3);
   b2 = allinput[3].value;
   temp = parseFloat(b2);
   b2 = temp.toFixed(3);
   tar_r1 = alloutput[0];
   tar_r2 = alloutput[1];
   mod1 = allmodi[0];
   mod2 = allmodi[1];

   if(parseFloat(a1) < parseFloat(a2)){
      alert("유효하지않은 값입니다.");
      allinput[0].style.boxShadow = '0 0 0 3px orange inset';
      allinput[1].style.boxShadow = '0 0 0 3px orange inset';
      allinput[0].focus();
      return;
   }

   if(parseFloat(b1) < parseFloat(b2)){
      alert("유효하지않은 값입니다.");
      allinput[2].style.boxShadow = '0 0 0 3px orange inset';
      allinput[3].style.boxShadow = '0 0 0 3px orange inset';
      allinput[2].focus();
      return;
   }
   
   result1 = (a2 / a1) * 100;
   result2 = (b2 / b1) * 100;
   tar_r1.textContent = result1.toFixed(1);
   tar_r2.textContent = result2.toFixed(1);

   var tempmod = "$$수득률=";
   tempmod += ("\\frac{" + a2 + "(g)}{"+ a1 + "(g)}\\ast100$$");
   mod1.textContent = tempmod;
   var tempmod = "$$수득률=";
   tempmod += ("\\frac{" + b2 + "(g)}{"+ b1 + "(g)}\\ast100$$");
   mod2.textContent = tempmod;
   MathJax.Hub.Queue(["Typeset",MathJax.Hub]);

   stack_storage();
}

function submit3_1(){
   init();
   if(essential_check()) {
      alert("유효하지않은 값입니다.");
      return;
   } 
   var a, b, c, d;
   var allin = document.getElementsByTagName('input');
   var allout = document.getElementsByClassName('output');
   var allmodi = document.getElementsByName('outmod');
   for(var i=0; i<3; i++){
      a = allin[0+i].value;
      b = allin[3+i].value;
      c = allin[6+i].value;
      d = allin[9+i].value;

      if(parseFloat(a) < parseFloat(b)){
         alert("유효하지않은 값입니다.");
         allin[0+i].style.boxShadow = '0 0 0 3px orange inset';
         allin[3+i].style.boxShadow = '0 0 0 3px orange inset';
         allinput[0+i].focus();
         return;
      }
      var res1 = calculate(a,b,'-');
      allout[i].textContent = res1;

      var res2 = calculate(c,d,'*');
      allout[3+i].textContent = res2;
      
      var modi1 = "$"+c+"(A) \\ast"+d+"(sec) = $";
      allmodi[i].textContent = modi1;
      allmodi[i].style.display = "inline";
      
      var res3 = calculate(res2,"1.602", '/');
      allout[6+i].textContent = pow(res3, 19);

      var modi2 = "$\\frac{"+res2+"}{1.602*10^{-19}} = $";
      allmodi[3+i].textContent = modi2;
      allmodi[3+i].style.display = "inline";

      var res4 = (res3 / 2);
      var prnum = valid_float(res3)[0];
      var tempo = res4.toPrecision(prnum);
      allout[9+i].textContent = pow(tempo,19);

      var res5 = calculate(res1, res4.toPrecision(prnum), '/');
      allout[12+i].textContent = pow(res5, 19);

      var modi3 = "$\\frac{"+res1+"}{"+pow(tempo,19)+"} = $";
      allmodi[6+i].textContent = modi3;
      allmodi[6+i].style.display = "inline";

      var res6 = calculate("0.006355", res5, '/');
      allout[15+2*i].textContent = pow(res6, 23);
      var res7_t = 6.022 - res6;
      var res7_tt = Math.abs(res7_t);
      var res7 = res7_tt / 6.022;
      var p_7_t = compare_min(valid_float("6.022")[1], valid_float(res6)[1])
      var p_7 = compare_min(p_7_t, 4);
      allout[16+2*i].textContent = res7.toPrecision(p_7);

      var modi4 = "$\\frac{63.55}{"+pow(res5, -19)+"} = $";
      allmodi[9+2*i].textContent = modi4;
      allmodi[9+2*i].style.display = "inline";

      var modi5 = "$\\frac{6.022}{"+pow(res5, -19)+"} = $";

      allmodi[10+2*i].style.display = "inline";

      MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
   }
   
   stack_storage();
}

function submit4_1(){
   init();
   if(essential_check()) {
      alert("유효하지않은 값입니다."); 
      return;
   }
   var t = document.getElementsByTagName('table');
   var tb1in = t[0].getElementsByTagName('input');
   var tb1out = t[1].getElementsByClassName('output');
   var tb1modi = t[1].getElementsByName('outmod');
   var tb2in = t[2].getElementsByTagName('input');
   var tb2out = t[3].getElementsByClassName('output');
   var tb2modi = t[3].getElementsByName('outmod');
   var tb3in = t[4].getElementsByTagName('input');
   var tb3out = t[5].getElementsByClassName('output');
   var tb3modi = t[5].getElementsByName('outmod');

   for(var i; i<2; i++){
      
   }

   stack_storage();
}