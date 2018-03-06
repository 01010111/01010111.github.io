function Site(){}

/**
 * This creates a nav-bar that can bring a user back to the previous page
 * @param {*} pre			should be a carat indicating "Back to"
 * @param {*} prev_page 	The Previous Page to link to
 */
Site.get_nav = function (pre, prev_page)
{
	document.write(
			"<a href='" 
		+	prev_page 
		+	".html'><div class='navbar'>&nbsp;&nbsp;"
		+	pre 
		+	Util.underscore_to_spaces(prev_page, true) 
		+	"</div></a>"
	);
};

/**
 * Writes the content of the header to the page.
 * @param {*} title		The title of the page
 */
Site.get_head = function (title)
{
	title = title === undefined ? '01010111' : '01010111 - ' + title;
	document.write(
			'<script src="../js/marked.js"></script>'
		+	'<script src="../js/highlight.js"></script>'
		+	'<link rel = "stylesheet" type = "text/css" href = "../include/monokai.css">'
		+	'<link rel = "stylesheet" type = "text/css" href = "../include/style.css">'
		+	'<meta charset="utf-8">'
		+	'<meta name="viewport" content="width=device-width, initial-scale=1">'
		+	'<title>' + title + '</title>'
	);
};

/**
 * Writes the desired content to the page
 * @param {*} page	the name of the markdown file with the desired content
 */
Site.get_content = function (page)
{
	document.write('<div id="content" class="content_container"></div>');
	var content = new XMLHttpRequest();
	content.open('GET', '../md/' + page + '.md');
	var _this = this;
	content.onreadystatechange = function() {
		document.getElementById('content').innerHTML = marked(content.responseText, {
			highlight: function(code) {
				return hljs.highlightAuto(code).value;
			}
		});
		_this.parsed_callback();
	};
	content.send();
};

/** 
 * Runs after the page's content has been translated from markdown
*/
Site.parsed_callback = function ()
{
	this.make_code_copyable();
};

/** 
 * Gets all code blocks within document and adds a button to copy the text within the block
*/
Site.make_code_copyable = function ()
{
	var code_blocks = document.getElementsByTagName('pre');
	for (var i = 0; i < code_blocks.length; i++) this.add_copy_button_to_code_block(code_blocks[i]);
};

/**
 * Adds a button to copy all the content within a code block
 * @param {*} code	HTMLPreElement code block
 */
Site.add_copy_button_to_code_block = function (code)
{
	var copy_div = document.createElement('div');
	copy_div.className = 'copy_tooltip';
	copy_div.innerHTML = 'COPY';
	code.insertBefore(copy_div, code.children[0]);
	copy_div.onclick = function() {
		var text = document.createElement('textarea');
		text.value = code.textContent.slice(4);
		document.body.appendChild(text);
		text.select();
		document.execCommand('Copy');
		console.log(text.value);
		text.remove();
	};
};

function Util(){}
	
/**
 * Replaces all underscores within input with spaces
 * @param {*} input 		The input text to parse
 * @param {*} capitalize 	Whether or not to capitalize the first letter of each word
 */
Util.underscore_to_spaces = function (input, capitalize)
{
	var words = input.split('_');
	var output = '';
	for (var i = 0; i < words.length; i++)
	{
		output += capitalize ? this.first_char_uppercase(words[i]) : words[i];
		if (i !== words.length - 1) output += ' ';
	}
	return output;
};

/**
 * Returns the input with the first character capitalized
 * @param {*} input 
 */
Util.first_char_uppercase = function (input)
{
	return input.charAt(0).toUpperCase() + input.slice(1);
};

/**
 * A little function to get copyable text!
 * @param {*} title 		The Title of the webpage
 * @param {*} content 		The name of the markdown file with the content for the webpage
 * @param {*} prev_page 	The previous page to add navigation back to
 */
Util.generate_html = function (title, content, prev_page)
{
	var html =
			"<!doctype html>\n"
		+	"\n"
		+	"<html>\n"
		+	"\n"
		+	"	<head>\n"
		+	"		<script src='../js/site.js'></script>\n"
		+	"		<script>Site.get_head('" + title + "');</script>\n"
		+	"	</head>\n"
		+	"	\n"
		+	"	<body>\n";
	if (prev_page) html += "		<script>Site.get_nav('< ', '" + prev_page + "');</script>\n";
	html +=
			"		<script>Site.get_content('" + content + "')</script>\n"
		+	"	</body>\n"
		+	"	\n"
		+	"</html>\n";

	return html;
};