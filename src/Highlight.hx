@:native("hljs")
extern abstract Highlight (String) {
	static function highlightAuto(content:String):{ value:String }
}