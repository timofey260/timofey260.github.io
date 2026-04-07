const base_head = `

<meta charset="UTF-8">
<link rel="stylesheet" href="/style.css">
<link rel="stylesheet" href="/blog/blogstyle.css">

<link rel="stylesheet" href="hlstyle.css">
<title id="pagetitle">%title%</title>
`;

const base_body = `
<div id="titleholder">
    <h1 id="title">%title%</h1>
</div>
<div id="info">
    <p id="author">By %author%</p>
    <p id="date">%date%</p>
</div>

<iframe id="markdown" src="/blog/articles/%page%" style="position: absolute;width:0;height:0;border:0;" onload="convert()"></iframe>

<div id="around">
    <div id="content">
        <div id="buttons">
            <a href="?"> <<< Back</a>
        </div>
        <div id="wall">
        </div>
    </div>
</div>
`;

function add_script ( script ) {
    var cool = document.createElement("script");
    cool.setAttribute("src", script);
    document.head.appendChild(cool);
    return cool;
}

function create_page(page) {
    var hl = add_script("/scripts/highlight.min.js");
    hl.onload = function() {
        add_script("/scripts/c.min.js");
        add_script("/scripts/highlight.ln.js/index.min.js");
    }
    var showdown = add_script("/scripts/showdown.min.js");
    showdown.onload = function(){
        add_script("converter.js");
        document.head.innerHTML = base_head;
        document.body.innerHTML = base_body.replace("%page%", page);
    }
}

function check_page() {
    let params = new URLSearchParams(window.location.search);
    let page = params.get("page");
    if (page == null) {
        return;
    }
    console.log(page);
    create_page(page);
}