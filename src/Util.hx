import js.html.LinkElement;
import js.Browser;

class Util
{

	public static function get_page():PageObject
	{
		var slug = get_slug();
		var path = get_path(slug);
		return {
			slug: slug,
			path: path,
			current_page: get_current_page(path),
		};
	}

	static function get_slug():String
	{
		var split_href = Browser.location.href.split('?');
		return split_href.length == 1 ? '' : split_href[1];
	}

	static function get_path(slug:String):Array<String>
	{
		return slug.length == 0 ? ['index'] : slug.split('/');
	}

	static function get_current_page(path:Array<String>):String
	{
		return path.length == 0 ? 'index' : path[path.length - 1];
	}

	public static function get_text(src:String, callback:String -> Void)
	{
		var q = new haxe.Http(src);
		q.onData = callback;
		q.request();
	}

	public static function parse_markdown(md:String):Markdown
	{
		return new Markdown(md);
	}

	public static function build_breadcrumbs(path:Array<String>):String
	{
		var bc = '';
		var arr = [];
		for (link in path)
		{
			arr.push(link);
			bc += '<a href="${path_to_link(arr)}">${first_char_uppercase(link)}</a> > ';
		}
		bc = bc.substr(0, bc.length - 3);
		return bc;
	}

	public static function path_to_link(path:Array<String>)
	{
		return '?' + path.join('/');
	}

	public static function treat_links(path:Array<String>)
	{
		var links = Browser.document.getElementById('content').getElementsByTagName('a');
		trace(links);
		for (a in links) 
		{
			var link:LinkElement = cast a;
			if (!is_local(link.href)) continue;
			if (link.href.indexOf('#') >= 0) continue;
			var href = link.href.split('/').pop();
			link.href = '${path_to_link(path)}/$href';
		}
	}

	public static function is_local(link:String):Bool
	{
		return (Browser.document.location.href.split('/')[0] == link.split('/')[0]);
	}

	public static function first_char_uppercase(s:String):String
	{
		return s.substr(0, 1).toUpperCase() + s.substr(1, s.length - 1);
	}

	public static function clean_text(s:String):String
	{
		return s.split('_').join(' ').split('-').join(' ');
	}

}