Openphacts.CompoundWidget = function(baseURL, appID, appKey) {
    this.baseURL = baseURL;
    this.appID = appID;
    this.appKey = appKey;
}

Openphacts.CompoundWidget.prototype.infoByURI = function(compoundURI, replacementNodeID) {
    var compoundInfoArea = $('#' + replacementNodeID)[0];
    var compoundSearcher = new Openphacts.CompoundSearch(this.baseURL, this.appID, this.appKey);
    var compoundCallback = function (success, status, response) {
        if (success) {
            compoundResult = compoundSearcher.parseCompoundResponse(response);
            var hbsSource = compoundInfoArea.innerHTML;
            var template = Handlebars.compile(hbsSource);
            var html = template(compoundResult);
            $(compoundInfoArea).replaceWith(html);
        }
    }
    compoundSearcher.fetchCompound(compoundURI, null, compoundCallback);
}
