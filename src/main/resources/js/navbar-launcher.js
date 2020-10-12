var currentPage = window.location.href;

function fromProductContext(contextPath) {
    return window.location['protocol'] + "//" + window.location['host'] + contextPath;
}

function launch() {
    AJS.toInit(function() {
        var baseUrl;
        if(AJS.params.baseURL) {
            baseUrl = AJS.params.baseURL;
        } else if(AJS.contextPath) {
            // Get Base URL from AJS
            baseUrl = fromProductContext(AJS.contextPath());
        } else if(AJS.$("meta[name='application-base-url']").length) {
            // Get Base URL from Data Attribute
            baseUrl = AJS.$("meta[name='application-base-url']").attr("content");
        }else{
            // Cannot find Base URL
            return;
        }
        if(AJS.$(".aui-header").length > 0) {
            getLinks(baseUrl);
        }
    });
}


function getLinks(baseUrl) {
    console.info("Nav Bar Loading...");
    AJS.$.ajax({
        url: baseUrl + "/rest/menu/latest/appswitcher",
        dataType: "json",
        success: function(data) {
            console.info("Data Retrieved, Showing Nav Bar...");
            showNavBar(data);
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.error("NavBar Banner Failed with Status " + textStatus);
            console.error(errorThrown);
            console.error(jqXHR);
        }
    });
}
