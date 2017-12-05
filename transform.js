var fs = require('fs');
var parse = require('csv-parse');
var inputFile='merged.csv';

var myFunctions = require("./helpers")


var parser = parse({delimiter: ','},  (err, data) => {


	// First Transformation 
	let dataToBeSorted = [];
	data.forEach((element, index) => {
		let toStringRow = element.toString();
		 let toArray = toStringRow.split(',');	
		 dataToBeSorted.push(toArray)
	});

	let sorted = dataToBeSorted.sort(myFunctions.multiLayerSort);

	let firstOutput = sorted.join('\n');
	

	// Second Trans
	let outPutTwo = data.sort(((index) => {
	    return (rowOne, rowTwo) => {
	 	var dateA = new Date(rowOne[index]), dateB = new Date(rowTwo[index]);
	   		return dateA - dateB;	
	    };
	})(3));



   let secondoutput = []
   outPutTwo.forEach( function(element, index) {
      let commaRemoved  = element.join(' ')
      secondoutput.push(commaRemoved)
   });
   
   let chunked = secondoutput.join('\n');

  let logStream = fs.createWriteStream('main.csv', {'flags': 'a'});
  logStream.write(firstOutput);
  logStream.write(chunked);
 	



})




fs.createReadStream(inputFile).pipe(parser);
