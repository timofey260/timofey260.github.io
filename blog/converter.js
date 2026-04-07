// ABANDON ALL HOPE YE WHO READS THIS

// import("/scripts/showdown.min")
// import("/scripts/highlight.min")

// showdown.setFlavor('github')
showdown.setOption("parseImgDimensions", true);
showdown.setOption("ghCompatibleHeaderId", true);
const converter = new showdown.Converter();

const parser = /^@([\w ]+)\|([\w ]+)\|([\d\/ ]+)\n([.\s]+)/

function convert() {
    var text = document.getElementById("markdown").contentWindow.document.body.textContent
    // console.log(text);

    const parsed = parser.exec(text);
    var page = converter.makeHtml(parsed.at(4));
    console.log(new URLSearchParams(window.location.search));
    document.getElementById("title").textContent = parsed.at(1);
    document.getElementById("pagetitle").textContent = parsed.at(1);
    document.getElementById("author").textContent = parsed.at(2);
    document.getElementById("date").textContent = parsed.at(3);
    document.getElementById('wall').innerHTML = page;
    document.getElementById("markdown").remove();
    hljs.highlightAll();
    post_parse()
}

function post_parse() {
    // adding parse things
    var body = document.getElementById("wall");
    var elements = body.getElementsByTagName("h1");
    var elements2 = body.getElementsByTagName("h2");
    var elementos = [].slice.call(elements).concat([].slice.call(elements2));

    for (let i = 0; i < elementos.length; i++) {
        let element = elementos[i];
        let link = document.createElement("a");
        link.textContent = "¶";
        link.href = "#" + element.id;
        link.title = "Link to this definition";
        element.append(link);
    }
    // remembering where to go back
    var hash = window.location.hash.substring(1);
    if (hash !== "") {
        document.getElementById(hash).scrollIntoView();
    }
}