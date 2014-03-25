/**
 * @constructor
 * @memberOf Openphacts
 */
Openphacts.TargetWidget = function(baseURL, appID, appKey) {
    this.baseURL = baseURL;
    this.appID = appID;
    this.appKey = appKey;
}
/**
 * Display target information for targetURI by replacing the element at replacementNodeID
 * and populating the template contained within it
 * @method
 */
Openphacts.TargetWidget.prototype.infoByURI = function(targetURI, replacementNodeID) {
    var targetInfoArea = $('#' + replacementNodeID)[0];
    var targetSearcher = new Openphacts.TargetSearch(this.baseURL, this.appID, this.appKey);
    var targetCallback = function (success, status, response) {
        if (success) {
            var targetResult = targetSearcher.parseTargetResponse(response);
            var hbsSource = targetInfoArea.innerHTML;
            var template = Handlebars.compile(hbsSource);
            var html = template(targetResult);
            $(targetInfoArea).replaceWith(html);
        }
    }
    targetSearcher.fetchTarget(targetURI, null, targetCallback);
}
