/***********************/
/*    Widgets Code     */
/***********************/
var ldaBaseURL = "http://beta.openphacts.org/1.3";
var appID = "d46faee5";
var appKey = "99689be2999fc97bfe0219d33d964a5e";
$(document).ready(function () {
    var handlebarsURL = "http://cdnjs.cloudflare.com/ajax/libs/handlebars.js/2.0.0-alpha.1/handlebars.min.js";
    var opsJSURL = "https://raw.github.com/openphacts/ops.js/master/src/combined.js";
    $.getScript(handlebarsURL, function (data, textStatus, jqxhr) {
Handlebars.registerHelper('targetComponentLink', function(component) {
  if (component.label != null && component.uri != null) {
	var aLink = '<a href="' + component.uri +'" target="_blank">' + component.label +'</a>'
    return new Handlebars.SafeString(aLink);
  } else if (component.label != null){
    return new Handlebars.SafeString(component.label);
  } else if (component.uri != null){
    var id = component.uri.split('/').pop();
	var aLink = '<a href="' + component.uri +'" target="_blank" title="No label available for this target component">' + id +'</a>';
    return new Handlebars.SafeString(aLink);
  }
});
Handlebars.registerHelper('targetOrganismLink', function(target) {
  if (target.targetOrganismNames != null && target.uri != null) {
	var aLink = '<a href="' + target.uri +'" target="_blank">' + target.targetOrganismNames +'</a>'
    return new Handlebars.SafeString(aLink);
  } else if (target.targetOrganismNames != null){
    return new Handlebars.SafeString(target.targetOrganismNames);
  } else if (target.uri != null){
    var id = target.uri.split('/').pop();
	var aLink = '<a href="' + target.uri +'" target="_blank" title="No organism name available for this target">' + id +'</a>';
    return new Handlebars.SafeString(aLink);
  }
});
Handlebars.registerHelper('assayOrganismLink', function(pharma) {
  if (pharma.get('assayOrganismName') != null && pharma.get('assayURI') != null) {
	var aLink = '<a href="' + pharma.get('assayURI') +'" target="_blank">' + pharma.get('assayOrganismName') +'</a>'
    return new Handlebars.SafeString(aLink);
  } else if (pharma.get('assayOrganismName') != null){
    return new Handlebars.SafeString(pharma.get('assayOrganismName'));
  } else if (pharma.get('assayURI') != null){
    var id = pharma.get('assayURI').split('/').pop();
	var aLink = '<a href="' + pharma.get('assayURI') +'" target="_blank" title="No organism name available for this assay">' + id +'</a>';
    return new Handlebars.SafeString(aLink);
  }
});
Handlebars.registerHelper('pdbLink', function(link) {
  if (link != null) {
	var id = link.split("/").pop();
	var aLink = '<a href="' + link +'" target="_blank">' + id +'</a>'
    return new Handlebars.SafeString(aLink);
  }
});
Handlebars.registerHelper('insertKetcherIframe', function(structure) {
    if (structure != null) {
      return new Handlebars.SafeString('<iframe src="/ketcher/ketcher.html?smiles=' + structure.smiles + '&path=' + structure.path + '" id="ketcher-iframe"></iframe>');
    } else {
      return new Handlebars.SafeString('<iframe src="/ketcher/ketcher.html" id="ketcher-iframe"></iframe>');
    }
});
Handlebars.registerHelper('structureSearchHasRelevance', function(type) {
  if (type === "substructure" || type === "similarity") {
    return true;
  }
});
Handlebars.registerHelper('pathwayOrganismLink', function(link, label) {
  if (link != null && label != null) {
    return new Handlebars.SafeString('<a href="' + link + '" target="_blank">' + label + '</a>');
  }
});
Handlebars.registerHelper('pathwayRevision', function(link) {
  if (link != null) {
    var text = link.split('/').pop();
    var rev = text.split('_')[1];
    return new Handlebars.SafeString('<a href="' + link + '" target="_blank">' + rev + '</a>');
  }
});
Handlebars.registerHelper('textLink', function(link) {
  if (link != null) {
    var text = link.split('/').pop();
    return new Handlebars.SafeString('<a href="' + link + '" target="_blank">' + text + '</a>');
  }
});
Handlebars.registerHelper('getLabelWithTooltip', function(job) {
  return new Handlebars.SafeString('<td title="' + job.filters + '">' + job.label + '</td>');
});
Handlebars.registerHelper('progressBar', function(percentage) {
  return new Handlebars.SafeString('<div class="progress progress-striped active no-margin" title="' + percentage + '%"><div class="bar" style="width: ' + percentage + '%;"></div></div>');
});
Handlebars.registerHelper('completedJob', function(status, uuid) {
  var html = "";
  if (status == "complete") {
    return new Handlebars.SafeString("<a class='btn' target='_blank' href='" + tsvDownloadUrl + "uuid=" + uuid + "' title='TSV file ready. Click button to download.'>Download</a>");
  } else {
    return new Handlebars.SafeString("<button type='button' class='btn btn-disabled' disabled='disabled' title='TSV file still being created. Download button disabled until ready.'>Download</button>");
  }
});
Handlebars.registerHelper("log", function(context) {
  return console.log(context);
});
Handlebars.registerHelper('pathwayLink', function(uri, label) {
  var link = '<a href="#/pathways?uri=' + uri + '">' + label + '</a>';
  return new Handlebars.SafeString(link);		
});
Handlebars.registerHelper('targetLink', function(uri, label) {
        if (label === "Unchecked") {
            return new Handlebars.SafeString('N/A');
        } else {
  var link = '<a href="#/targets?uri=' + uri + '">' + label + '</a>';
  return new Handlebars.SafeString(link);
}		
});
Handlebars.registerHelper('compoundLink', function(uri, label) {
  var link = '<a href="/compounds?uri=' + uri + '">' + label + '</a>';
  return new Handlebars.SafeString(link);		
});
Handlebars.registerHelper('objectLink', function(type, route, routeLabel, content) {
  var link = '<a href="/' + type + '/' + route + '?uri=' + content.get('URI') + '">' + routeLabel + '</a>';
  return new Handlebars.SafeString(link);		
});

Handlebars.registerHelper('pathwayShortLink', function(pathwayURI) {
	if (pathwayURI) {
		return new Handlebars.SafeString('<a href="' + pathwayURI + '">' + pathwayURI.split('/').pop() + '</a>');		
	}
});

Handlebars.registerHelper('organismLink', function(organism) {
	if (organism) {
		return new Handlebars.SafeString('<a href="' + organism + '">' + organism.split('/').pop() + '</a>');		        
	}
});

Handlebars.registerHelper('revisionLink', function(revision) {
	if (revision) {
		return new Handlebars.SafeString('<a href="' + revision + '">' + revision.split('/').pop() + '</a>');		        
	}
});

Handlebars.registerHelper('ontologyLink', function(ontology) {
	if (ontology) {
		return new Handlebars.SafeString('<a href="' + ontology + '">' + ontology.split('/').pop() + '</a>');		        
	}
});

Handlebars.registerHelper('vocabPart', function(part) {
	if (part) {
		return new Handlebars.SafeString(part.split('#').pop());		        
	}
});

Handlebars.registerHelper('treePharmaLink', function(tree) {
	if (tree) {
		return new Handlebars.SafeString('<a class="enzymeName" href="#/trees/pharmacology?uri=' + tree.get('uri') + '">' + tree.get('name') + '</a>');		
	}
});
Handlebars.registerHelper('getIndentLevel', function(view) {
  if (view) {
    console.log('getIndentLevel');
  }	
});
Handlebars.registerHelper('enzymeECNumber', function(uri) {
  if (uri) {
    return new Handlebars.SafeString(uri.split('/').pop());	
  }	
});
Handlebars.registerHelper('cs_image_src', function(csURL, options) {
  //TODO I'm sure the context can be changed to the actual compound somehow in the view, I'm just not sure how at the moment
  if (options && csURL) {
      return new Handlebars.SafeString('<img width="128" height="128" src="http://ops.rsc.org/' + csURL.split("/").pop() + '/image">');
  }
});
Handlebars.registerHelper('target_image_src', function(target, options) {
  //TODO I'm sure the context can be changed to the actual compound somehow in the view, I'm just not sure how at the moment
  if (options && target && target.length >= 1) {
      return new Handlebars.SafeString('<img width="128" height="128" src="http://www.rcsb.org/pdb/images/' + target[0].split('/').pop() + '_asr_r_250.jpg"&amp;w=128&amp;h=128/>');
  } else {
      return new Handlebars.SafeString('<img width="128" height="128" src="/assets/target_placeholder.png"/>');
  }
});
Handlebars.registerHelper('compoundSource', function(cwCompoundUri, compoundPrefLabel) {
  if (cwCompoundUri && compoundPrefLabel) {
    return new Handlebars.SafeString('<a href="/compounds/' + cwCompoundUri.split('/').pop() + '">' + compoundPrefLabel + '</a>');
  }
});
Handlebars.registerHelper('formatMolecularFormula', function(molform) {
  if (molform) {
    return new Handlebars.SafeString(molform.replace(/(\d+)?\s*/g, "<sub>$1</sub>"));
  }
});
Handlebars.registerHelper('linkablePubmedId', function(pubmedId) {
	if (pubmedId) {
		var justId = pubmedId.split("/").pop();
		return new Handlebars.SafeString('<a href="' + pubmedId + '" target="_blank">' + justId + '</a>');
	}
});
Handlebars.registerHelper('expandableDescription', function(description) {
	if (description) {
	 	var words = new Array();
		words = description.split(" ");
		
		if (words.length > 48) {
			var readmore = '<span class="read-more-content">';
			var position = 230;
			var end = '</span>'
			var output = [description.slice(0, position), readmore, description.slice(position), end].join('');
			//console.log(output);
			return new Handlebars.SafeString(output);
		} else {
			return new Handlebars.SafeString(description);
		}
	}
});
Handlebars.registerHelper('linkableChemspiderID', function(chemspiderId) {
	if (chemspiderId) {
		var id = chemspiderId.split("/").pop();
		//console.log(" ID " + id);
		var fullLink = '<a href="' + chemspiderId +'" target="_blank">' + id +'</a>'
		return new Handlebars.SafeString(fullLink);;
	}
});

Handlebars.registerHelper('linkableOrganism', function(organism) {
	if (organism) {
	var id = organism.split("/").pop();
	var fullLink = '<a href="' + organism +'" target="_blank">' + id +'</a>'
	return new Handlebars.SafeString(fullLink);;
	}
});

Handlebars.registerHelper('linkableExistence', function(existence) {
	if (existence) {
	var id = existence.split("/").pop();
	id = id.replace(/_/g, " ");
	var fullLink = '<a href="' + existence +'" target="_blank">' + id +'</a>'
	return new Handlebars.SafeString(fullLink);;
	}
});

Handlebars.registerHelper('pdbLinkouts', function(pdb) {
	if (pdb) {
		var url = new String();
		
		$.each(pdb, function(i, item) {
			var id = item.split("/").pop();
			var aLink = '<a href="' + item +'" target="_blank">' + id +'</a>   '
			url += aLink;
		});
		return new Handlebars.SafeString(url);
	}
});
        $.getScript(opsJSURL, function (data, textStatus, jqxhr) {
            var moleculeAreas = $('.molecule-viz');
            var compoundInfoAreas = $('.compound-info');
            $.each(moleculeAreas, function (index, moleculeArea) {
                var value = moleculeArea.getAttribute('data-ops-label');
                var cwSearcher = new Openphacts.ConceptWikiSearch(ldaBaseURL, appID, appKey);
                var cwCompoundCallback = function (success, status, response) {
                    if (success && response) {
                        var results = cwSearcher.parseResponse(response);
                        $.each(results, function (index, result) {
                            var found = false;
                            if ($.isArray(result.prefLabel)) {
                                $.each(result.prefLabel, function (index, label) {
                                    if (label.toLowerCase() === value.toLowerCase() && found == false) {
                                        found = true;
                                        var compoundCallback = function (success, status, response) {
                                            if (success) {
                                                compoundResult = compoundSearcher.parseCompoundResponse(response);
                                                var imageHTML = '<img width="128" height="128" src="' + compoundResult.csURI + '/image" title="Molecule image for ' + compoundResult.prefLabel + '">';
                                                var hbsSource = imageHTML + moleculeArea.innerHTML;
                                                var template = Handlebars.compile(hbsSource);
                                                var context = {};
                                                var html = template(context);
                                                $(moleculeArea).replaceWith(html);
                                            }
                                        }
                                        var compoundSearcher = new Openphacts.CompoundSearch(ldaBaseURL, appID, appKey);
                                        compoundSearcher.fetchCompound(result.uri, null, compoundCallback);
                                    }
                                });
                            } else {
                                if (result.prefLabel.toLowerCase() === value.toLowerCase()) {
                                    found = true;
                                    var compoundCallback = function (success, status, response) {
                                        if (success) {
                                            compoundResult = compoundSearcher.parseCompoundResponse(response);
                                            var imageHTML = '<div><img width="128" height="128" src="' + compoundResult.csURI + '/image" title="Molecule image for ' + compoundResult.prefLabel + '"></div>';
                                            var hbsSource = imageHTML + moleculeArea.innerHTML;
                                            var template = Handlebars.compile(hbsSource);
                                            var context = {};
                                            var html = template(context);
                                            $(moleculeArea).replaceWith(html);
                                        }
                                    }
                                    var compoundSearcher = new Openphacts.CompoundSearch(ldaBaseURL, appID, appKey);
                                    compoundSearcher.fetchCompound(result.uri, null, compoundCallback);
                                }
                            }
                        });
                    };
                };
                cwSearcher.freeText(value, 20, '4', cwCompoundCallback);
            });
            $.each(compoundInfoAreas, function (index, compoundInfoArea) {
                var value = compoundInfoArea.getAttribute('data-ops-uri');
                var compoundSearcher = new Openphacts.CompoundSearch(ldaBaseURL, appID, appKey);
                var compoundCallback = function (success, status, response) {
                    if (success) {
                        compoundResult = compoundSearcher.parseCompoundResponse(response);
                        var hbsSource = compoundInfoArea.innerHTML;
                        var template = Handlebars.compile(hbsSource);
                        var html = template(compoundResult);
                        $(compoundInfoArea).replaceWith(html);
                    }
                }
                compoundSearcher.fetchCompound(value, null, compoundCallback);
            });
        });
    });
});
