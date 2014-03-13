# OPS Widgets #

Customisable HTML widgets which can be added to any page and styled just the way you want.

## Requirements ##
Jquery 1.9+. Patience. Imagination.

## Templates ##
Use [handlebars](http://handlebarsjs.com "Handlebars Javascript templating language").

## Compounds ##

### Molecule Image ###

`<div class="molecule-viz" data-ops-label="aspirin" style="display: none;"/>`

You could also use a compound-info div and the helper method `{{cs_image_src csURI}}`.

Finds the compound which matches the name 'exactly' and displays it's molecular image from chemspider.  

### Compound Info ###
Using a URI for a compound it fetches the exact compound and shows the information that you want.Create a div with class compound-info and add display inside it, use handlebars code blocks like {{prefLabel}} to display values. Various Handlebars helper methods are available to do things like get image `{{cs_image_src csURI}}` and format molecule `{{formatMolecularFormula molform}}`. You can style the html any way you want.

`<div class="compound-info" data-ops-uri="http://www.conceptwiki.org/concept/dd758846-1dac-4f0d-a329-06af9a7fa413" style="display: none;"><div>Preferred Label: {{prefLabel}}</div><div>SMILES: {{smiles}}</div><div>Inchi: {{inchi}}</div></div>`

This block would show the prefLabel, smiles & Inchi.

## License ##
MIT. See licence.txt file.
