var fs = require("fs");
var readline = require("readline");
//Array to store the complete data.
var storageArray = [];
//Initializing variables.
var lines;
var head1;
var head2;
var head3;

//Creating Interface
var rlemiiter = readline.createInterface({

  input : fs.createReadStream("FoodFacts.csv"),//Reading data from readable stream.
  output : fs.createWriteStream("Graph1.json")

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
    if(lines[i]=="sugars_100g"){
      head2 = i;
    }
    if(lines[i]=="salt_100g"){
      head3 = i;
    }
  }
  head = true;
}

else{
  var data = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);// extracting data according to headers.
  //Passing country name according to the header index
  var cont = data[head1];
  if(check_cont_avail(cont))
  {
    set_data(cont,Number(data[head2]),Number(data[head3]));
  }
  else {
    create_data(cont,Number(data[head2]),Number(data[head3]));
  }
}
});
rlemiiter.on("close", function(close){
  //Array of the required contries.
  arrayOfCountries = ["Netherlands","Spain","Canada","United Kingdom","Australia","France","Germany","South Africa"];
  var finalArray=[];
  for(var i=0;i<storageArray.length;i++)
  {
    if(exist(arrayOfCountries,storageArray[i]))
    {
      finalArray.push(storageArray[i]);
    }
  }
  console.log(JSON.stringify(finalArray));
  var jsonObj = JSON.stringify(finalArray);
  //Writing into the JSON file.
  fs.appendFile('Graph1.json',jsonObj,function (err) {
    if(err) throw err;
    console.log("done");
  })
});

//Checking whether the requires countries exist.
function exist(arrayOfCountries,item)
{
  for(var i=0;i<arrayOfCountries.length;i++)
  {
  if(item[lines[head1]]==arrayOfCountries[i]){
    return true;
  }
}
return false;
}
//checking whether the Country name is present in the array.
function check_cont_avail(item)
{
  if(storageArray.length==0)
  return false;
  //var key = Object.keys(arr[0]);
  for(var i=0;i<storageArray.length;i++)
  {
    if(item==storageArray[i][lines[head1]])
    {
      return true;
    }
  }
  return false;
}
//Setting the data in the Storage Array.
function set_data(con,su,sa)
{
  //var keys = Object.keys(arr[0]);
  for(var i=0;i<storageArray.length;i++)
  {
    if(storageArray[i][lines[head1]]==con)
    {
      storageArray[i][lines[head2]] += su;
      storageArray[i][lines[head3]] += sa;
    }
  }
}
//Creating the data in the Storage Array.
function create_data(con,su,sa)
{
  var obj = {};
  obj[lines[head1]]=con;
  obj[lines[head2]]=su;
  obj[lines[head3]]=sa;
  storageArray.push(obj);
}
