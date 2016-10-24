var fs = require("fs");
var readline = require("readline");
//Arrays accordingto the regions.
var NorthEuro = ["United Kingdom","Denmark","Sweden","Norway"];
var CentralEuro = ["France","Belgium","Germany","Switzerland","Netherlands"];
var SouthEuro = ["Portugal", "Greece", "Italy","Spain","Croatia","Albania"];
var lines;
var head1;
var head2;
var head3;
var head4;
//Storing data of Central Europe.
var arrayCentral = [];
//Storing data of South Europe.
var arraySouth = [];
//Storing data of North Europe.
var arrayNorth = [];

//Creating Interface
var rlemiiter = readline.createInterface({

  input : fs.createReadStream("FoodFacts.csv"),//Reading data from readable stream.
  output : fs.createWriteStream("app.json")

});
var head = false;
rlemiiter.on("line", function(line){

//Loop to extract Headers Indexes.
  if(!head)
  {
    lines=line.split(",");

    for(i=0;i<lines.length;i++){

      if(lines[i]=="countries"){
        head1 = i;
      }
      if(lines[i]=="fat_100g"){
        head2 = i;
      }
      if(lines[i]=="proteins_100g"){
        head3 = i;
      }
      if(lines[i]=="carbohydrates_100g"){
        head4 = i;
      }
    }
    head = true;
  }
  else{
    var data = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);// extracting data according to headers.
    //Passing country name according to the header index
    var cont = data[head1];
    for(i=0;i<6;i++){
      //checking whether the country is of South Europe Region.
      if(SouthEuro.indexOf(cont)>-1){
        cont="South Europe";
        if(check_cont_avail1(cont))
        {
          set_data1(cont,Number(data[head2]),Number(data[head3]),Number(data[head4]));
        }
        else {
          create_data1(cont,Number(data[head2]),Number(data[head3]),Number(data[head4]));
        }
      }
        //checking whether the country is of Central Europe Region.
      if(CentralEuro.indexOf(cont)>-1){
        cont="Central Europe";
        if(check_cont_avail(cont))
        {
          set_data(cont,Number(data[head2]),Number(data[head3]),Number(data[head4]));
        }
        else {
          create_data(cont,Number(data[head2]),Number(data[head3]),Number(data[head4]));
        }
      }
        //checking whether the country is of North Europe Region.
      if(NorthEuro.indexOf(cont)>-1){
        cont="North Europe";
        if(check_cont_avail2(cont))
        {
          set_data2(cont,Number(data[head2]),Number(data[head3]),Number(data[head4]));
        }
        else {
          create_data2(cont,Number(data[head2]),Number(data[head3]),Number(data[head4]));
        }
      }
    }
  }
});
rlemiiter.on("close", function(close){

  var finalArray = [];
  finalArray.push(arrayCentral);
  finalArray.push(arraySouth);
  finalArray.push(arrayNorth);
  console.log(JSON.stringify(finalArray));
  var jsonObj = JSON.stringify(finalArray);
  fs.appendFile('Graph2.json',jsonObj,function (err) {
    if(err) throw err;
    console.log("done");
  })
});

function exist(finalArray,item)
{
  for(var i=0;i<finalArray.length;i++)
  {
  if(item[lines[head1]]==finalArray[i]){
    return true;
  }
}
return false;
}
//checking whether the Country name is present in the array.
function check_cont_avail(item)
{
  if(arrayCentral.length==0)
  return false;
  //var key = Object.keys(arr[0]);
  for(var i=0;i<arrayCentral.length;i++)
  {
    if(item.trim() == "Central Europe"){
      return true;
    }
  }
  return false;
}
//checking whether the Country name is present in the array.
function check_cont_avail1(item)
{
  if(arraySouth.length==0)
  return false;
  //var key = Object.keys(arr[0]);
  for(var i=0;i<arraySouth.length;i++)
  {
    if (item.trim() == "South Europe") {
      return true;
    }
  }
  return false;
}
//checking whether the Country name is present in the array.
function check_cont_avail2(item)
{
  if(arrayNorth.length==0)
  return false;
  //var key = Object.keys(arr[0]);
  for(var i=0;i<arrayNorth.length;i++)
  {
    if (item.trim() == "North Europe") {
      return true;
    }
  }
  return false;
}
//Setting the data in the Storage Array.
function set_data(con,fat,protein,carb)
{
  //var keys = Object.keys(arr[0]);
  for(var i=0;i<arrayCentral.length;i++)
  {
    if(arrayCentral[i]["Region"]==con)
    {
      arrayCentral[i][lines[head2]] += fat;
      arrayCentral[i][lines[head3]] += protein;
      arrayCentral[i][lines[head4]] += carb;
    }
  }
}
//Creating the data in the Storage Array.
function create_data(con,fat,protein,carb)
{
  var obj = {};
  obj["Region"]=con;
  obj[lines[head2]]=fat;
  obj[lines[head3]]=protein;
  obj[lines[head4]]=carb;
  arrayCentral.push(obj);
}
//Setting the data in the Storage Array.
function set_data1(con,fat,protein,carb)
{
  //var keys = Object.keys(arr[0]);
  for(var i=0;i<arraySouth.length;i++)
  {
    if(arraySouth[i]["Region"]==con)
    {
      arraySouth[i][lines[head2]] += fat;
      arraySouth[i][lines[head3]] += protein;
      arraySouth[i][lines[head4]] += carb;
    }
  }
}
//Creating the data in the Storage Array.
function create_data1(con,fat,protein,carb)
{
  var obj = {};
  obj["Region"]=con;
  obj[lines[head2]]=fat;
  obj[lines[head3]]=protein;
  obj[lines[head4]]=carb;
  arraySouth.push(obj);
}
//Setting the data in the Storage Array.
function set_data2(con,fat,protein,carb)
{
  //var keys = Object.keys(arr[0]);
  for(var i=0;i<arrayNorth.length;i++)
  {
    if(arrayNorth[i]["Region"]==con)
    {
      arrayNorth[i][lines[head2]] += fat;
      arrayNorth[i][lines[head3]] += protein;
      arrayNorth[i][lines[head4]] += carb;
    }
  }
}
//Creating the data in the Storage Array.
function create_data2(con,fat,protein,carb)
{
  var obj = {};
  obj["Region"]=con;
  obj[lines[head2]]=fat;
  obj[lines[head3]]=protein;
  obj[lines[head4]]=carb;
  arrayNorth.push(obj);
}
