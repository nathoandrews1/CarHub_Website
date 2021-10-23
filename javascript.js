// JavaScript File
// Associate an event to the button
var search = document.getElementById( "search" );
search.addEventListener( "click", searchCode );
var parser = DOMParser();
// XML file location
var xmlFilename = "project1.xml";

function searchCode() {
  var codeSearch = document.getElementById( "searchCode" ).value;

  var searchResult = document.getElementById( "searchResult" );
  searchResult.innerHTML = "";

  getXMLDocObject( xmlFilename, function ( xmlDoc ) {
    // extract the info from the xmlDoc object
    var products = xmlDoc.getElementsByTagName( "products" )[ 0 ];
    var cars = products.getElementsByTagName( "car" );
    var found = false;
    var i;

    for ( i = 0; i < products.length; i += 1 ) {
      var code = products[ i ].attributes[ 0 ].value;

      if ( searchCode === code ) {
        var pSearchCode = document.createElement( "p" );
        pSearchCode.innerHTML = "Search: " + searchCode;
        searchResult.appendChild( pSearchCode );

        var pAuthor = document.createElement( "p" );
        pAuthor.innerHTML = products[ i ].children[ 0 ].nodeName + ": " + products[ i ].children[ 0 ].innerHTML;
        searchResult.appendChild( pAuthor );

        var pTitle = document.createElement( "p" );
        pTitle.innerHTML = products[ i ].children[ 1 ].nodeName + ": " + products[ i ].children[ 1 ].innerHTML;
        searchResult.appendChild( pTitle );

        found = true;
      }
    }

    if ( !found ) {
      alert( "Product not found" );
    }
  } );
}

// Get file content and parse it to Document Object Model
function getXMLDocObject( xmlFilename, callback ) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if ( ( this.readyState === 4 ) && ( this.status === 200 ) ) {
      var xmlContent = this.responseText;
      var xmlDoc = parseXML( xmlContent );
      callback( xmlDoc );
    }
  };
  xhttp.open( 'GET', xmlFile, true );
  xhttp.send();
}

// Parse a text string into an XML DOM object
function parseXML( xmlContent ) {
  parser = xmlContent;
  var xmlDoc = parser.parseFromString( xmlContent, 'text/xml' );
  return xmlDoc;
}
