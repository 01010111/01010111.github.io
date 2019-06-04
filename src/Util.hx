import js.html.LinkElement;
import js.Browser;

class Util
{

	static var commands:Array<{cmd:Array<String> -> Void, args:Array<String>}> = [];

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
		return slug.length == 0 ? ['index'] : parse_slug(slug);
	}

	static function parse_slug(slug:String):Array<String>
	{
		var path = slug.split('/');
		while (path[path.length - 1].indexOf('=') >= 0) parse_command(path.pop());
		return path;
	}

	static function parse_command(cmd:String)
	{
		var command:String = cmd.split('=')[0];
		var options:Array<String> = cmd.split('=')[1].split(',');
		switch (command)
		{
			default: return;
			case 'tag':
				commands.push({
					cmd: show_only_tags,
					args: options
				});
			case 'style':
				commands.push({
					cmd: special_style,
					args: options
				});
		}
	}

	static function show_only_tags(tags:Array<String>)
	{
		var divs = Browser.document.getElementById('content').getElementsByTagName('div');
		for (div in divs)
		{
			var div_tags = div.getElementsByClassName('tag');
			var hide_div = true;
			for (tag in div_tags) if (tags.indexOf(tag.innerText) >= 0) hide_div = false;
			if (hide_div) div.style.display = 'none';
		}
	}

	static function special_style(classes:Array<String>)
	{
		for (c in classes) Browser.document.getElementById('content').classList.add(c);
	}

	static function get_current_page(path:Array<String>):String
	{
		return path.length == 0 ? 'index' : path[path.length - 1];
	}

	public static function get_text(src:String, callback:String -> Void)
	{
		var q = new haxe.Http(src);
		q.onData = (s) -> {
			callback(s);
			for (command in commands) command.cmd(command.args);
		}
		q.request();
	}

	public static function parse_markdown(md:String):Markdown
	{
		if (md.charAt(0) == '?')
		{
			var cmd = md.split('\n')[0];
			md = md.substr(cmd.length);
			cmd = cmd.substr(1);
			parse_command(cmd);
		}
		return new Markdown(md, { highlight: (code) -> Highlight.highlightAuto(code).value });
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
		for (a in links) 
		{
			var link:LinkElement = cast a;
			if (is_local(link.href))
			{
				if (link.href.indexOf('#') >= 0) continue;
				var href = link.href.split('/').pop();
				link.href = '${path_to_link(path)}/$href';
			}
			else
			{
				link.classList.add('external_link');
				if (link.href.indexOf('youtube') >= 0) link.classList.add('youtube');
			}
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

	public static function treat_tags()
	{
		var tags = Browser.document.getElementsByClassName('tag');
		for (tag in tags) tag.onclick = () -> Browser.window.location.href = Browser.window.location.href + '/tag=${tag.innerText}';
	}

}