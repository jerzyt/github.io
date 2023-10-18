function requestObject() {
	if(window.XMLHttpRequest)
		return new XMLHttpRequest();
	else
		throw new Error("Could not create HTTP request object.");
}

function sortChars(word) {
	var charArr = word.split('');
	var key = charArr.sort().join('');
	return key;
}

function findAnagrams(words) {
	var anagramHash = {};
	var wordArr = words.toString().split('\n');
	for(var i in wordArr) {
		var word = wordArr[i];
		if(word) {
			key = sortChars(word);
			if((key in anagramHash) == false) {
				anagramHash[key] = [];
			}
			anagramHash[key].push(word);
		}
	}
	return anagramHash;
}

function printAnagrams(anagramHash) {
	var anagrams = '<table>';
	for(var x in anagramHash) {
		if(x) {
			var a = anagramHash[x];
			if(a.length > 3) {
				anagrams += '<tr><td class="key">' + x + '</td><td><img src="images/arrow.gif"></td><td>' + a.join(', ') + '</td></tr>';
			}
		}
	}
	anagrams += '</table>';
	return anagrams;
}

$(document).ready(function() {
	setTimeout(function() {
		var request = requestObject();
		request.open("GET", "words", false);
		request.send(null);
		var words = request.responseText;
		var startT = new Date();
		var anagramHash = findAnagrams(words);
		var text = printAnagrams(anagramHash);
		var endT = new Date();
		var elapsed = endT.getTime() - startT.getTime();
		text += '<p><strong> elapsed time: ' + elapsed + ' milliseconds</strong></p>';
		$('#anagrams').prepend(text);
	}, 100);
});
