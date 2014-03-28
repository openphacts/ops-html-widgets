/**
 * @method
 * @memberOf OpenphactsWidgets
 */
OpenphactsWidgets.prototype.setAPIParameters = function(baseURL, appID, appKey) {
    this.baseURL = baseURL;
    this.appID = appID;
    this.appKey = appKey;
}
/**
 * Display compound information for compoundURI by replacing the element at replacementNodeID
 * and populating the template contained within it
 * @method
 */
OpenphactsWidgets.prototype.compoundInfoByURI = function(compoundURI, replacementNodeID) {
    var compoundInfoArea = $('#' + replacementNodeID)[0];
    var compoundSearcher = new Openphacts.CompoundSearch(this.baseURL, this.appID, this.appKey);
    var compoundCallback = function (success, status, response) {
        if (success) {
            var compoundResult = compoundSearcher.parseCompoundResponse(response);
            var hbsSource = compoundInfoArea.innerHTML;
            var template = Handlebars.compile(hbsSource);
            var html = template(compoundResult);
            $(compoundInfoArea).replaceWith(html);
        }
    }
    compoundSearcher.fetchCompound(compoundURI, null, compoundCallback);
}
