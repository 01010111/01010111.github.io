import js.Browser;

using Util;

class Site {
	var page:PageObject;

	public function new() {
		page = Util.get_page();
		'md/${page.current_page}.md'.get_text(build_out);
	}

	function build_out(content:String) {
		Browser.document.getElementById('header').innerHTML = Util.build_breadcrumbs(page.path.slice(0, page.path.length - 1));
		Browser.document.getElementById('content').innerHTML = cast content.parse_markdown();
		Util.treat_links(page.path);
		Browser.document.title = '01010111 - ${page.current_page.clean_text().first_char_uppercase()}';
	}
}
