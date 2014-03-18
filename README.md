# OPS Widgets #

Customisable HTML widgets which can be added to any page and styled just the way you want.

## Requirements ##
[Jquery](http://jquery.com/, "Javascript library used for dom selection/manipulation and AJAX requests") 1.9+, [handlebars](http://handlebarsjs.com "Handlebars Javascript templating language"), [Purl](https://github.com/allmarkedup/purl, "Javascript URL parser"). Patience. Imagination.

## Templates ##
Use [handlebars](http://handlebarsjs.com "Handlebars Javascript templating language").

## Using the widgets ##
There are 2 ways to use the OPS widgets library, by creating html elements of a specific class and passing the parameters in as HTML5 data-* attributes or using the Javascript API.

### HTML elements with classes and attributes ###
In your HTML head you must set up a script block like the following so that the library knows what api to use and what your app ID and Key is  

`var ldaBaseURL = "http://beta.openphacts.org/1.3";  
var appID = "replaceWithYourAppID";  
var appKey = "replaceWithYourAppKey";`  

And also load the ops-widgets-html-loader.js source.

`<script src="../src/ops-widgets-html-loader.js" type="text/javascript"></script>`  

For an example try loading this in your browser file:///path-to-widgets/test/html-widgets.html?app_id=yourAppID&app_key=yourAppKey&app_url=https://beta.openphacts.org/1.3  

In your html body you can add html elements with specific classes which will then be transformed into rich information sources at run time. The example file is for compound info.

#### Molecule Image ####

`<div class="molecule-viz" data-ops-label="aspirin" style="display: none;"/>`

You could also use a compound-info div and the helper method `{{cs_image_src csURI}}`.

The javascript will find this element when the page loads, find the compound which matches the name 'exactly' and displays it's molecular image from chemspider.  

#### Compound Info ####
Using a URI for a compound it fetches the exact compound and shows the information that you want. Create a div with class compound-info and add display inside it, use handlebars code blocks like {{prefLabel}} to display values. Various Handlebars helper methods are available to do things like get image `{{cs_image_src csURI}}` and format molecule `{{formatMolecularFormula molform}}`. You can style the html any way you want. See the ops.js library for more information on what a compound can contain.

`<div class="compound-info" data-ops-uri="http://www.conceptwiki.org/concept/dd758846-1dac-4f0d-a329-06af9a7fa413" style="display: none;"><div>Preferred Label: {{prefLabel}}</div><div>SMILES: {{smiles}}</div><div>Inchi: {{inchi}}</div></div>`

This block would show the prefLabel, smiles & Inchi.

### Javascript API ###
Load the necessary libraries into your page, including src/ops-widgets-combined.js or src/widgets.js, src/helpers.js and src/*whatever-widgets-you-need* and then create the nodes using javascript anywhere in your application.  See test/js-widgets.html for an example of compound info. 

Firstly, create an element in your page which you want replaced with rich chemical info

`<div id="compound-info-div" style="display: none;"/>`

We style it as *display: none* so that it is hidden while the api fetches the info.
Add the javascript to populate the div with the required information. Like in the HTML version you can style the contents any way you want. Pass the parameters to the widget, here we tell it what the uri for the compound is and what the div is.

`var appID = "replaceWithYourAppID";  
var appKey = "replaceWithYourAppKey";  
var appUrl = "http://beta.openphacts.org/1.3";  
var compoundWidget = new Openphacts.CompoundWidget(appUrl, appID, appKey);  
compoundWidget.infoByURI("http://www.conceptwiki.org/concept/dd758846-1dac-4f0d-a329-06af9a7fa413", "compound-info-div");`

for an example try loading this in your browser file:///path-to-widgets/test/js-widgets.html?app_id=yourAppID&app_key=yourAppKey&app_url=https://beta.openphacts.org/1.3 

## License ##
MIT. See licence.txt file.
