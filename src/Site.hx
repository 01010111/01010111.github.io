import js.Browser;

using Util;

class Site {

	var page:PageObject;

	public function new() {
		page = Util.get_page();
		'md/${page.current_page}.md'.get_text(build_out);
	}

	function build_out(content:String) {
		build_header();
		build_content(content);
		Browser.document.title = '01010111 - ${page.current_page.clean_text().first_char_uppercase()}';
	}

	function build_header() {
		var breadcrumbs = Util.build_breadcrumbs(page.path.slice(0, page.path.length - 1));
		breadcrumbs.length == 0 ? 
			Browser.document.getElementById('header').style.display = 'none' :
			Browser.document.getElementById('header').innerHTML = Util.build_breadcrumbs(page.path.slice(0, page.path.length - 1));
	}

	function build_content(content:String) {
		Browser.document.getElementById('content').innerHTML = cast content.parse_markdown();
		Util.treat_links(page.path);
		Util.treat_tags();
	}

}
