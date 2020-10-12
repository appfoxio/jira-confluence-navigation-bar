function isJira() {
    return typeof(window.JIRA) != "undefined";
}

function isCrowd() {
    return typeof(window.Crowd) != "undefined";
}

function isBamboo() {
    return typeof(window.BAMBOO) != "undefined";
}

function isFecru() {
    return typeof(window.FECRU) != "undefined";
}

function isConfluence() {
    return typeof(window.Confluence) != "undefined";
}

function getContextPath() {
    if (typeof(window.contextPath) != "undefined") return window.contextPath;
    if (this.isBamboo()) return window.BAMBOO.contextPath;
    if (this.isFecru()) return window.FECRU.pageContext;
    return AJS.contextPath();
}

function shouldDisplay() {
    var alreadyLoaded = (this.parentObject().find("#navbar-banner").length > 0);
    return (typeof(this.getLinks()) != "undefined" && this.getLinks().length > 0 && !alreadyLoaded);
}

function parentObject() {
    if (isConfluence()) { return AJS.$('#header') }
    if (isJira()) { return AJS.$('#header') }
    if (isBamboo()) { return AJS.$('#header') }
    return AJS.$("body");
}

function getIcon(type) {
    if (type == "jira") {
        return "aui-iconfont-jira";
    } else if(type == "confluence") {
        return "aui-iconfont-confluence";
    } else if(type == "stash" || type == "bitbucket") {
        if(bitbucketIconExists(AJS.version)) {
            return "aui-iconfont-bitbucket";
        } else {
            return "aui-iconfont-devtools-branch";
        }
    } else if(type == "fecru") {
        return "aui-iconfont-admin-fusion";
    } else if(type == "bamboo") {
        return "aui-iconfont-build";
    } else {
        return "aui-iconfont-sidebar-link";
    }
}

// Bitbucket icon was only included in AUI version 5.9.13, return true if current version is higher than this
function bitbucketIconExists(version) {
    var parts = version.split('.'); // Split string "5.9.13" to array [5, 9, 13]
    if(parts[0]>5) {
        return true;
    } else if (parts[0]==5 && parts[1]>9) {
        return true;
    } else return parts[0] == 5 && parts[1] == 9 && parts[2] > 12;
}

// Build and Show the NavBar
function showNavBar(data){
    var elem = document.querySelector('#full-height-container > div.ia-splitter > div.ia-splitter-left > div');
    console.log("elem");
    console.log(elem);
    if(elem!=null && typeof elem !== "undefined") {
        var currentOffset = parseInt(elem.style.top.replace('px', ''));
        console.log("setting height from "+currentOffset);
        elem.style.top = (currentOffset + 32) + "px";
    }
    AJS.$(".app-switcher-trigger").hide();
    var colStyleString = "";
    if(AJS.$("#com-atlassian-confluence").length > 0) {
        // Atlassian handle header CSS differently in Jira and Conf because of course they do
        // so we need an edge case for Confluence
        colStyleString = ' style="background-color: ' + $('#header').css( "background-color" ) + '"';
    }
    var banner = '<div id="navbar-banner" class="aui-header"' + colStyleString + '><ul class="aui-nav" style="display:flex;flex-direction:row;">';
    var icon; var label;
    for (var item = 0; item < data.length; item++) {
        if (data[item].self) {
            label = '<b>' + data[item].label + "</b>";
        } else {
            label = data[item].label;
        }
        icon = getIcon(data[item].applicationType);
        banner += '<li class="aui-header aui-dropdown2-trigger-group"><a href="' + data[item].link + '"><span class="aui-icon aui-icon-small ' + icon + '"></span> ' + label + '</a></li>';
    }
    banner += '</ul></nav>';
    if( AJS.$('#navbar-banner').length ){
        AJS.$('#navbar-banner').replaceWith(banner);
    }else{
        parentObject().prepend(banner);
    }
}

// Launch the NavBar
launch();
