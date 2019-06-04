@:native("marked")
extern abstract Markdown (String)
{
	@:pure @:selfCall function new(?md:String, ?opt:Dynamic);
}