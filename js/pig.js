(function ($global) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); },$hxEnums = $hxEnums || {},$_;
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.substr = function(s,pos,len) {
	if(len == null) {
		len = s.length;
	} else if(len < 0) {
		if(pos == 0) {
			len = s.length + len;
		} else {
			return "";
		}
	}
	return s.substr(pos,len);
};
HxOverrides.remove = function(a,obj) {
	var i = a.indexOf(obj);
	if(i == -1) {
		return false;
	}
	a.splice(i,1);
	return true;
};
HxOverrides.now = function() {
	return Date.now();
};
var Main = function() {
	this.dice_textures = ["images/games/dice_0.png","images/games/dice_1.png","images/games/dice_2.png","images/games/dice_3.png","images/games/dice_4.png","images/games/dice_5.png","images/games/dice_6.png"];
	PIXI.Application.call(this,{ width : 480, height : 192, transparent : true, antialias : true, resizeTo : window.document.getElementById("game-pig")});
	window.document.getElementById("game-pig").appendChild(this.view);
	this.loader.add(["images/games/dice_0.png","images/games/dice_1.png","images/games/dice_2.png","images/games/dice_3.png","images/games/dice_4.png","images/games/dice_5.png","images/games/dice_6.png","images/games/restart.png"]);
	this.loader.load($bind(this,this.init));
	this.renderer.view.style.touchAction = 'auto';
	this.renderer.plugins.interaction.autoPreventDefault = false;
	this.ticker.add(function(n) {
		zero_utilities_Timer.update(0.016666666666666666);
		zero_utilities_Tween.update(0.016666666666666666);
	});
};
Main.__name__ = true;
Main.main = function() {
	new Main();
};
Main.__super__ = PIXI.Application;
Main.prototype = $extend(PIXI.Application.prototype,{
	init: function() {
		this.can_roll = true;
		this.can_bank = false;
		this.bankable = 0;
		this.make_dice();
		this.make_bubble();
		this.make_text();
		this.set_player_turn(true);
		this.set_score_p1(0);
		this.set_score_p2(0);
	}
	,make_dice: function() {
		var _gthis = this;
		var min = 1;
		this.dice = PIXI.Sprite.from(this.dice_textures[Math.floor(min + Math.random() * (7 - min))]);
		this.dice.position.set(240,96);
		this.dice.anchor.set(0.5);
		var tmp = Math.PI;
		var tmp1 = Math.random();
		this.dice.rotation = tmp * tmp1;
		this.dice.scale.set(0);
		this.stage.addChild(this.dice);
		this.dice.interactive = this.dice.buttonMode = true;
		this.dice.on("pointertap",function() {
			if(_gthis.player_turn) {
				_gthis.roll_dice();
			}
		});
	}
	,make_bubble: function() {
		var _gthis = this;
		this.bubble = new PIXI.Container();
		this.bubble.position.set(240,96);
		this.bubble.scale.set(0);
		this.bubble.alpha = 0;
		this.bubble_spr = PIXI.Sprite.from("images/games/dice_bubble.png");
		this.bubble_spr.anchor.set(0.5);
		this.bubble_spr.position.set(-48,-48);
		this.bubble_text = new PIXI.Text("+1",{ fontFamily : "'Lilita One', cursive", fontSize : 24, fill : Main.black});
		this.bubble_text.position.set(-2,-2);
		this.bubble_text.anchor.set(0.5);
		this.bubble_spr.addChild(this.bubble_text);
		this.bubble.addChild(this.bubble_spr);
		this.stage.addChild(this.bubble);
		this.bubble.interactive = this.bubble.buttonMode = true;
		this.bubble.on("pointertap",function() {
			if(_gthis.player_turn) {
				_gthis.bank();
			}
		});
	}
	,make_text: function() {
		this.score_p1_text = new PIXI.Text("",{ fontFamily : "'Lilita One', cursive", fontSize : 36, fill : Main.white});
		this.score_p1_text.anchor.set(0.5);
		this.score_p1_text.position.set(96,96);
		this.score_p2_text = new PIXI.Text("",{ fontFamily : "'Lilita One', cursive", fontSize : 36, fill : Main.red});
		this.score_p2_text.anchor.set(0.5);
		this.score_p2_text.position.set(384,96);
		this.stage.addChild(this.score_p1_text);
		this.stage.addChild(this.score_p2_text);
	}
	,roll_dice: function() {
		var _gthis = this;
		if(!this.can_roll) {
			return;
		}
		this.hide_bubble();
		this.can_roll = false;
		var do_zero = true;
		var dice_amt = 0;
		zero_utilities_Timer.get(0.1,function() {
			if(do_zero) {
				dice_amt = 0;
			} else {
				var min = 1;
				dice_amt = Math.floor(min + Math.random() * (7 - min));
			}
			var tmp = Math.PI;
			var tmp1 = Math.random();
			_gthis.dice.rotation = tmp * tmp1;
			_gthis.dice.texture = PIXI.Texture.from(_gthis.dice_textures[dice_amt]);
			do_zero = !do_zero;
			zero_utilities_Tween.tween(_gthis.dice,0.1,{ rotation : _gthis.dice.rotation + Math.PI / 4});
		},4);
		zero_utilities_Tween.tween(this.dice.scale,0.2,{ x : 1.5, y : 1.5},{ ease : zero_utilities_Ease.sineOut, on_complete : function() {
			zero_utilities_Tween.tween(_gthis.dice.scale,0.2,{ x : 1, y : 1},{ ease : zero_utilities_Ease.sineIn});
		}});
		zero_utilities_Timer.get(0.5,function() {
			if(dice_amt == 1) {
				_gthis.show_bubble(0);
				zero_utilities_Timer.get(0.5,$bind(_gthis,_gthis.hide_bubble));
				zero_utilities_Timer.get(0.75,$bind(_gthis,_gthis.switch_players));
				return;
			}
			_gthis.bankable += dice_amt;
			_gthis.show_bubble(_gthis.bankable);
			_gthis.can_roll = true;
		});
	}
	,bank: function() {
		if(!this.can_bank) {
			return;
		}
		this.can_bank = false;
		this.can_roll = false;
		if(this.player_turn) {
			zero_utilities_Tween.tween(this,0.25,{ score_p1 : this.score_p1 + this.bankable});
		} else {
			zero_utilities_Tween.tween(this,0.25,{ score_p2 : this.score_p2 + this.bankable});
		}
		this.hide_bubble();
		zero_utilities_Timer.get(0.5,$bind(this,this.switch_players));
	}
	,switch_players: function() {
		var _gthis = this;
		if(this.score_p1 >= 100) {
			this.win();
			return;
		}
		if(this.score_p2 >= 100) {
			this.lose();
			return;
		}
		this.bankable = 0;
		zero_utilities_Timer.get(0.5,function() {
			_gthis.set_player_turn(!_gthis.player_turn);
			if(!_gthis.player_turn) {
				zero_utilities_Timer.get(0.5,$bind(_gthis,_gthis.ai));
			}
		});
	}
	,hide_bubble: function() {
		zero_utilities_Tween.tween(this.bubble.scale,0.2,{ x : 0, y : 0},{ ease : zero_utilities_Ease.backIn});
		zero_utilities_Tween.tween(this.bubble,0.1,{ alpha : 1});
		this.can_bank = false;
	}
	,show_bubble: function(n) {
		this.bubble_text.text = "+" + n;
		zero_utilities_Tween.tween(this.bubble.scale,0.2,{ x : this.player_turn ? 1 : -1, y : 1},{ ease : zero_utilities_Ease.backOut});
		zero_utilities_Tween.tween(this.bubble,0.1,{ alpha : 1},{ delay : 0.1});
		this.can_bank = true;
	}
	,set_player_turn: function(v) {
		var _gthis = this;
		zero_utilities_Tween.tween(this.dice.scale,0.2,{ x : 0, y : 0},{ ease : zero_utilities_Ease.backIn, on_complete : function() {
			_gthis.dice.tint = _gthis.bubble_spr.tint = v ? Main.white : Main.red;
			var tmp = Math.random();
			_gthis.dice.rotation = tmp * Math.PI;
			var min = 1;
			var _gthis1 = _gthis.dice_textures[Math.floor(min + Math.random() * (7 - min))];
			_gthis.dice.texture = PIXI.Texture.from(_gthis1);
			zero_utilities_Tween.tween(_gthis.dice.scale,0.2,{ x : 1, y : 1},{ ease : zero_utilities_Ease.backOut, on_complete : function() {
				_gthis.can_roll = true;
			}});
		}});
		this.bubble.scale.x = this.bubble_text.scale.x = v ? 1 : -1;
		return this.player_turn = v;
	}
	,set_score_p1: function(v) {
		this.score_p1_text.text = "" + v == 0 ? "" : Math.floor(Math.min(v,100));
		return this.score_p1 = Math.floor(Math.min(v,100));
	}
	,set_score_p2: function(v) {
		this.score_p2_text.text = "" + v == 0 ? "" : Math.floor(Math.min(v,100));
		return this.score_p2 = Math.floor(Math.min(v,100));
	}
	,ai: function() {
		if(this.player_turn) {
			return;
		}
		if(this.bankable < 10) {
			this.roll_dice();
		} else {
			this.bank();
		}
		zero_utilities_Timer.get(0.5,$bind(this,this.ai));
	}
	,win: function() {
		var _gthis = this;
		var screen = new PIXI.Graphics();
		screen.beginFill(Main.black);
		screen.drawRect(128,0,352,192);
		screen.endFill();
		screen.position.set(480,0);
		var end_text = new PIXI.Text("WINNER!",{ fontFamily : "'Lilita One', cursive", fontSize : 40, fill : Main.white});
		end_text.position.set(240,96);
		end_text.anchor.set(0.5);
		screen.addChild(end_text);
		this.stage.addChild(screen);
		zero_utilities_Tween.tween(screen,0.25,{ x : 0},{ ease : zero_utilities_Ease.quadOut});
		zero_utilities_Timer.get(1,function() {
			var restart_btn = PIXI.Sprite.from("images/games/restart.png");
			restart_btn.anchor.set(0.5);
			restart_btn.position.set(384,96);
			restart_btn.scale.set(2);
			restart_btn.alpha = 0;
			restart_btn.tint = Main.white;
			_gthis.stage.addChild(restart_btn);
			zero_utilities_Tween.tween(restart_btn.scale,0.2,{ x : 1, y : 1});
			zero_utilities_Tween.tween(restart_btn,0.2,{ alpha : 1});
			restart_btn.interactive = restart_btn.buttonMode = true;
			restart_btn.on("pointertap",$bind(_gthis,_gthis.restart));
		});
	}
	,lose: function() {
		var _gthis = this;
		var screen = new PIXI.Graphics();
		screen.beginFill(Main.black);
		screen.drawRect(0,0,352,192);
		screen.endFill();
		screen.position.set(-480,0);
		var end_text = new PIXI.Text("LOSER!",{ fontFamily : "'Lilita One', cursive", fontSize : 40, fill : Main.red});
		end_text.position.set(240,96);
		end_text.anchor.set(0.5);
		screen.addChild(end_text);
		this.stage.addChild(screen);
		zero_utilities_Tween.tween(screen,0.25,{ x : 0},{ ease : zero_utilities_Ease.quadOut});
		zero_utilities_Timer.get(1,function() {
			var restart_btn = PIXI.Sprite.from("images/games/restart.png");
			restart_btn.anchor.set(0.5);
			restart_btn.position.set(96,96);
			restart_btn.scale.set(2);
			restart_btn.alpha = 0;
			restart_btn.tint = Main.red;
			_gthis.stage.addChild(restart_btn);
			zero_utilities_Tween.tween(restart_btn.scale,0.2,{ x : 1, y : 1});
			zero_utilities_Tween.tween(restart_btn,0.2,{ alpha : 1});
			restart_btn.interactive = restart_btn.buttonMode = true;
			restart_btn.on("pointertap",$bind(_gthis,_gthis.restart));
		});
	}
	,restart: function() {
		while(this.stage.children.length > 0) this.stage.removeChildAt(0);
		this.init();
	}
	,__properties__: {set_score_p2:"set_score_p2",set_score_p1:"set_score_p1",set_player_turn:"set_player_turn"}
});
Math.__name__ = true;
var Reflect = function() { };
Reflect.__name__ = true;
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( _g ) {
		return null;
	}
};
Reflect.getProperty = function(o,field) {
	var tmp;
	if(o == null) {
		return null;
	} else {
		var tmp1;
		if(o.__properties__) {
			tmp = o.__properties__["get_" + field];
			tmp1 = tmp;
		} else {
			tmp1 = false;
		}
		if(tmp1) {
			return o[tmp]();
		} else {
			return o[field];
		}
	}
};
Reflect.setProperty = function(o,field,value) {
	var tmp;
	var tmp1;
	if(o.__properties__) {
		tmp = o.__properties__["set_" + field];
		tmp1 = tmp;
	} else {
		tmp1 = false;
	}
	if(tmp1) {
		o[tmp](value);
	} else {
		o[field] = value;
	}
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) {
			a.push(f);
		}
		}
	}
	return a;
};
var Std = function() { };
Std.__name__ = true;
Std.parseInt = function(x) {
	if(x != null) {
		var _g = 0;
		var _g1 = x.length;
		while(_g < _g1) {
			var i = _g++;
			var c = x.charCodeAt(i);
			if(c <= 8 || c >= 14 && c != 32 && c != 45) {
				var nc = x.charCodeAt(i + 1);
				var v = parseInt(x,nc == 120 || nc == 88 ? 16 : 10);
				if(isNaN(v)) {
					return null;
				} else {
					return v;
				}
			}
		}
	}
	return null;
};
var StringTools = function() { };
StringTools.__name__ = true;
StringTools.hex = function(n,digits) {
	var s = "";
	while(true) {
		s = "0123456789ABCDEF".charAt(n & 15) + s;
		n >>>= 4;
		if(!(n > 0)) {
			break;
		}
	}
	if(digits != null) {
		while(s.length < digits) s = "0" + s;
	}
	return s;
};
var haxe_ds_StringMap = function() {
	this.h = Object.create(null);
};
haxe_ds_StringMap.__name__ = true;
var haxe_iterators_ArrayIterator = function(array) {
	this.current = 0;
	this.array = array;
};
haxe_iterators_ArrayIterator.__name__ = true;
haxe_iterators_ArrayIterator.prototype = {
	hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return this.array[this.current++];
	}
};
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(o.__enum__) {
			var e = $hxEnums[o.__enum__];
			var con = e.__constructs__[o._hx_index];
			var n = con._hx_name;
			if(con.__params__) {
				s = s + "\t";
				return n + "(" + ((function($this) {
					var $r;
					var _g = [];
					{
						var _g1 = 0;
						var _g2 = con.__params__;
						while(true) {
							if(!(_g1 < _g2.length)) {
								break;
							}
							var p = _g2[_g1];
							_g1 = _g1 + 1;
							_g.push(js_Boot.__string_rec(o[p],s));
						}
					}
					$r = _g;
					return $r;
				}(this))).join(",") + ")";
			} else {
				return n;
			}
		}
		if(((o) instanceof Array)) {
			var str = "[";
			s += "\t";
			var _g = 0;
			var _g1 = o.length;
			while(_g < _g1) {
				var i = _g++;
				str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( _g ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		var k = null;
		for( k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) {
			str += ", \n";
		}
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "string":
		return o;
	default:
		return String(o);
	}
};
var zero_extensions_ArrayExt = function() { };
zero_extensions_ArrayExt.__name__ = true;
zero_extensions_ArrayExt.strings_to_ints = function(array) {
	var _g = [];
	var _g1 = 0;
	while(_g1 < array.length) _g.push(Std.parseInt(array[_g1++]));
	return _g;
};
zero_extensions_ArrayExt.strings2D_to_ints = function(array) {
	var _g = [];
	var _g1 = 0;
	while(_g1 < array.length) {
		var row = array[_g1];
		++_g1;
		var _g2 = [];
		var _g3 = 0;
		while(_g3 < row.length) _g2.push(Std.parseInt(row[_g3++]));
		_g.push(_g2);
	}
	return _g;
};
zero_extensions_ArrayExt.last = function(a) {
	return a[a.length - 1];
};
zero_extensions_ArrayExt.get_random = function(array) {
	var n = array.length;
	return array[Math.random() * n | 0];
};
zero_extensions_ArrayExt.shuffle = function(array) {
	var _g = 0;
	var _g1 = array.length;
	while(_g < _g1) {
		var i = _g++;
		var n = array.length;
		var j = Math.random() * n | 0;
		var a = array[i];
		array[i] = array[j];
		array[j] = a;
	}
	return array;
};
zero_extensions_ArrayExt.merge = function(a1,a2) {
	var _g = 0;
	while(_g < a2.length) a1.push(a2[_g++]);
	return a1;
};
zero_extensions_ArrayExt.flatten = function(a) {
	var _g = [];
	var _g1 = 0;
	while(_g1 < a.length) {
		var row = a[_g1];
		++_g1;
		var _g2 = 0;
		while(_g2 < row.length) _g.push(row[_g2++]);
	}
	return _g;
};
zero_extensions_ArrayExt.expand = function(a,row_width) {
	var out = [];
	var _g = 0;
	var _g1 = a.length;
	while(_g < _g1) {
		var i = _g++;
		if(i % row_width == 0) {
			out.push([]);
		}
		out[out.length - 1].push(a[i]);
	}
	return out;
};
zero_extensions_ArrayExt.flood_fill_2D = function(array,x,y,value) {
	if(x < 0 || y < 0 || y >= array.length || x >= array[y].length) {
		return;
	}
	var target_value = array[y][x];
	var validate = function(x,y) {
		if(!(x < 0 || y < 0 || y >= array.length || x >= array[y].length)) {
			return array[y][x] == target_value;
		} else {
			return false;
		}
	};
	var queue = [{ x : x, y : y}];
	while(queue.length > 0) {
		var point = queue.shift();
		array[point.y][point.x] = value;
		if(validate(point.x,point.y - 1)) {
			queue.push({ x : point.x, y : point.y - 1});
		}
		if(validate(point.x,point.y + 1)) {
			queue.push({ x : point.x, y : point.y + 1});
		}
		if(validate(point.x - 1,point.y)) {
			queue.push({ x : point.x - 1, y : point.y});
		}
		if(validate(point.x + 1,point.y)) {
			queue.push({ x : point.x + 1, y : point.y});
		}
	}
};
zero_extensions_ArrayExt.flood_fill_1D = function(array,pos,value) {
	if(pos < 0 || pos > array.length) {
		return;
	}
	var target_value = array[pos];
	var validate = function(pos) {
		if(!(pos < 0 || pos > array.length)) {
			return array[pos] == target_value;
		} else {
			return false;
		}
	};
	var queue = [pos];
	while(queue.length > 0) {
		var pos = queue.shift();
		array[pos] = value;
		if(validate(pos - 1)) {
			queue.push(pos - 1);
		}
		if(validate(pos + 1)) {
			queue.push(pos + 1);
		}
	}
};
zero_extensions_ArrayExt.heat_map = function(array,x,y,max_value) {
	if(max_value == null) {
		max_value = -1;
	}
	if(x < 0 || y < 0 || y >= array.length || x >= array[y].length) {
		return [];
	}
	var _g = [];
	var _g1 = 0;
	while(_g1 < array.length) {
		var row = array[_g1++];
		var _g2 = [];
		var _g3 = 0;
		while(_g3 < row.length) {
			++_g3;
			_g2.push(0);
		}
		_g.push(_g2);
	}
	var map = _g;
	var min = 0;
	var target_value = array[y][x];
	var validate = function(x,y) {
		if(!(x < 0 || y < 0 || y >= array.length || x >= array[y].length) && array[y][x] == target_value) {
			return map[y][x] == 0;
		} else {
			return false;
		}
	};
	var queue = [{ x : x, y : y, value : -1}];
	while(queue.length > 0) {
		var point = queue.shift();
		map[point.y][point.x] = point.value;
		min = Math.round(Math.min(point.value,min));
		if(validate(point.x,point.y - 1)) {
			queue.push({ x : point.x, y : point.y - 1, value : point.value - 1});
		}
		if(validate(point.x,point.y + 1)) {
			queue.push({ x : point.x, y : point.y + 1, value : point.value - 1});
		}
		if(validate(point.x - 1,point.y)) {
			queue.push({ x : point.x - 1, y : point.y, value : point.value - 1});
		}
		if(validate(point.x + 1,point.y)) {
			queue.push({ x : point.x + 1, y : point.y, value : point.value - 1});
		}
	}
	var diff = max_value < 0 ? -min + 1 : -min + 1 - (-min - max_value);
	var _g = 0;
	var _g1 = map.length;
	while(_g < _g1) {
		var j = _g++;
		var _g2 = 0;
		var _g3 = map[j].length;
		while(_g2 < _g3) {
			var i = _g2++;
			if(map[j][i] != 0) {
				map[j][i] = Math.round(Math.max(map[j][i] + diff,0));
			}
		}
	}
	return map;
};
zero_extensions_ArrayExt.get_xy = function(array,x,y) {
	y = Math.floor(Math.min(Math.max(y,0),array.length - 1));
	x = Math.floor(Math.min(Math.max(x,0),array[y].length - 1));
	return array[y][x];
};
zero_extensions_ArrayExt.set_xy = function(array,x,y,value) {
	y = Math.floor(Math.min(Math.max(y,0),array.length - 1));
	x = Math.floor(Math.min(Math.max(x,0),array[y].length - 1));
	array[y][x] = value;
};
zero_extensions_ArrayExt.median = function(array) {
	return array[Math.floor(array.length * 0.5)];
};
zero_extensions_ArrayExt.equals = function(a1,a2) {
	if(a1.length != a2.length) {
		return false;
	}
	var _g = 0;
	var _g1 = a1.length;
	while(_g < _g1) {
		var i = _g++;
		if(a1[i] != a2[i]) {
			return false;
		}
	}
	return true;
};
zero_extensions_ArrayExt.remove_duplicates = function(arr) {
	var unique = [];
	var _g = 0;
	while(_g < arr.length) {
		var item = arr[_g];
		++_g;
		if(unique.indexOf(item) < 0) {
			unique.push(item);
		}
	}
	return unique;
};
zero_extensions_ArrayExt.chunk = function(arr,x,y,w,h) {
	if(arr.length < y + h || arr[0].length < x + w || x < 0 || y < 0) {
		return [];
	}
	var _g = [];
	var _g1 = 0;
	while(_g1 < h) {
		++_g1;
		_g.push([]);
	}
	var _g1 = 0;
	while(_g1 < h) {
		var j = _g1++;
		var _g2 = 0;
		while(_g2 < w) {
			var i = _g2++;
			_g[j][i] = arr[y + j][x + i];
		}
	}
	return _g;
};
zero_extensions_ArrayExt.fill = function(arr,v) {
	var _g = 0;
	var _g1 = arr.length;
	while(_g < _g1) {
		var j = _g++;
		var _g2 = 0;
		var _g3 = arr[j].length;
		while(_g2 < _g3) arr[j][_g2++] = v;
	}
};
zero_extensions_ArrayExt.push_multi = function(arr) {
	var $l=arguments.length;
	var values = new Array($l>1?$l-1:0);
	for(var $i=1;$i<$l;++$i){values[$i-1]=arguments[$i];}
	var _g_current = 0;
	while(_g_current < values.length) arr.push(values[_g_current++]);
};
var zero_extensions_EnumExt = function() { };
zero_extensions_EnumExt.__name__ = true;
zero_extensions_EnumExt.all = function(e) {
	var _g = [];
	var _g1 = 0;
	var _g2 = e.__empty_constructs__.slice();
	while(_g1 < _g2.length) _g.push(_g2[_g1++]);
	return _g;
};
zero_extensions_EnumExt.get_random = function(e) {
	var _g = [];
	var _g1 = 0;
	var _g2 = e.__empty_constructs__.slice();
	while(_g1 < _g2.length) _g.push(_g2[_g1++]);
	var array = _g;
	var def_max = array.length;
	var max = null;
	return array[Math.random() * (max == null ? def_max : max) | 0];
};
var zero_extensions_FloatExt = function() { };
zero_extensions_FloatExt.__name__ = true;
zero_extensions_FloatExt.rad_to_deg = function(rad) {
	return rad * (180 / Math.PI);
};
zero_extensions_FloatExt.deg_to_rad = function(deg) {
	return deg * (Math.PI / 180);
};
zero_extensions_FloatExt.cycle = function(n,min,max) {
	return ((n - min) % (max - min) + (max - min)) % (max - min) + min;
};
zero_extensions_FloatExt.get_relative_degree = function(n) {
	return (n % 360 + 360) % 360;
};
zero_extensions_FloatExt.translate_to_nearest_angle = function(a1,a2) {
	while(Math.abs(a1 - a2) > 180) {
		var n = a1 - a2;
		a1 -= (n > 0 ? 1 : n < 0 ? -1 : 0) * 360;
	}
	return a1;
};
zero_extensions_FloatExt.degrees_between = function(a1,a2) {
	return Math.abs((Math.max(a2 - a1,a1 - a2) + 180) % 360 - 180);
};
zero_extensions_FloatExt.clamp = function(n,min,max) {
	return Math.min(Math.max(n,min),max);
};
zero_extensions_FloatExt.normalize = function(n,places) {
	return Math.round(n * Math.pow(10,places)) / Math.pow(10,places);
};
zero_extensions_FloatExt.norm = function(t,a,b) {
	return (t - a) / (b - a);
};
zero_extensions_FloatExt.lerp = function(t,a,b) {
	return (1 - t) * a + t * b;
};
zero_extensions_FloatExt.map = function(t,a0,b0,a1,b1) {
	var t1 = (t - a0) / (b0 - a0);
	return (1 - t1) * a1 + t1 * b1;
};
zero_extensions_FloatExt.snap_to_grid = function(n,grid_size,offset,floor) {
	if(floor == null) {
		floor = false;
	}
	if(offset == null) {
		offset = 0;
	}
	return offset + grid_size * (floor ? Math.floor(n / grid_size) : Math.round(n / grid_size));
};
zero_extensions_FloatExt.get_random = function(def_max,min,max,iterations) {
	if(iterations == null) {
		iterations = 1;
	}
	if(min == null) {
		min = 0;
	}
	return min + Math.random() * ((max == null ? def_max : max) - min);
};
zero_extensions_FloatExt.get_random_gaussian = function(max,min,iterations) {
	if(iterations == null) {
		iterations = 2;
	}
	if(min == null) {
		min = 0;
	}
	var r = 0.0;
	var _g = 0;
	while(_g < iterations) {
		++_g;
		r += Math.random();
	}
	r /= iterations;
	return min + r * (max - min);
};
zero_extensions_FloatExt.sign_of = function(n) {
	if(n > 0) {
		return 1;
	} else if(n < 0) {
		return -1;
	} else {
		return 0;
	}
};
zero_extensions_FloatExt.to_int = function(n) {
	return n | 0;
};
zero_extensions_FloatExt.half = function(n) {
	return n * 0.5;
};
zero_extensions_FloatExt.quarter = function(n) {
	return n * 0.25;
};
zero_extensions_FloatExt.to_color = function(n) {
	var this1 = zero_utilities_Color.get();
	var color = n | 0;
	var x = (color >> 16 & 255) / 255;
	var y = (color >> 8 & 255) / 255;
	var z = (color & 255) / 255;
	var w = (color >> 24 & 255) / 255;
	if(w == null) {
		w = 0;
	}
	if(z == null) {
		z = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	zero_utilities_Vec4.arr_set(this1,0,zero_utilities_Color.zero(x));
	zero_utilities_Vec4.arr_set(this1,1,zero_utilities_Color.zero(y));
	zero_utilities_Vec4.arr_set(this1,2,zero_utilities_Color.zero(z));
	zero_utilities_Vec4.arr_set(this1,3,zero_utilities_Color.zero(w));
	return this1;
};
zero_extensions_FloatExt.vector_from_angle = function(a,len) {
	return zero_utilities_Vec2.get(Math.cos(a * (Math.PI / 180)) * len,Math.sin(a * (Math.PI / 180)) * len);
};
zero_extensions_FloatExt.rand = function(n) {
	return Math.sin(n) * 43758.5453123 % 1.0;
};
zero_extensions_FloatExt.parse_time = function(n) {
	var minutes = "" + Math.floor(n / 60);
	var seconds = "" + Math.floor(n % 60);
	var milliseconds = "" + Math.floor(Math.round(n % 1 * Math.pow(10,3)) / Math.pow(10,3) * 100);
	while(seconds.length < 2) seconds = "0" + seconds;
	while(milliseconds.length < 3) milliseconds = "" + milliseconds + "0";
	return "" + minutes + ":" + seconds + "." + milliseconds;
};
zero_extensions_FloatExt.fuzzy = function(n,ratio) {
	if(ratio == null) {
		ratio = 0.5;
	}
	var min = n - n * ratio;
	if(min == null) {
		min = 0;
	}
	var r = 0.0;
	var _g = 0;
	while(_g < 2) {
		++_g;
		r += Math.random();
	}
	r /= 2;
	return min + r * (n + n * ratio - min);
};
var zero_extensions_StringExt = function() { };
zero_extensions_StringExt.__name__ = true;
zero_extensions_StringExt.csv_to_2d_int_array = function(csv) {
	var _g = [];
	var _g1 = 0;
	var _g2 = csv.split("\n");
	while(_g1 < _g2.length) {
		var array = _g2[_g1++].split(",");
		var _g3 = [];
		var _g4 = 0;
		while(_g4 < array.length) _g3.push(Std.parseInt(array[_g4++]));
		_g.push(_g3);
	}
	return _g;
};
zero_extensions_StringExt.csv_to_int_array = function(csv) {
	var _g = [];
	var _g1 = 0;
	var _g2 = csv.split("\n");
	while(_g1 < _g2.length) {
		var array = _g2[_g1++].split(",");
		var _g3 = [];
		var _g4 = 0;
		while(_g4 < array.length) _g3.push(Std.parseInt(array[_g4++]));
		_g.push(_g3);
	}
	var _g1 = [];
	var _g2 = 0;
	while(_g2 < _g.length) {
		var row = _g[_g2];
		++_g2;
		var _g3 = 0;
		while(_g3 < row.length) _g1.push(row[_g3++]);
	}
	return _g1;
};
zero_extensions_StringExt.contains = function(src,value) {
	return src.indexOf(value) >= 0;
};
zero_extensions_StringExt.get_random = function(string,length,ordered) {
	if(ordered == null) {
		ordered = false;
	}
	if(length == null) {
		length = 1;
	}
	if(!ordered) {
		var _g = [];
		var _g1 = 0;
		var _g2 = length;
		while(_g1 < _g2) {
			++_g1;
			var tmp = string.length;
			_g.push(string.charAt(Math.floor(Math.random() * tmp)));
		}
		return _g.join("");
	}
	length = Math.min(length,string.length) | 0;
	var n = Math.min(string.length,string.length - length);
	return HxOverrides.substr(string,Math.random() * n | 0,length);
};
zero_extensions_StringExt.parse_json = function(string) {
	var _g = [];
	var _g1 = 0;
	var _g2 = string.split("\n");
	while(_g1 < _g2.length) _g.push(_g2[_g1++].split("//")[0]);
	return JSON.parse(_g.join("\n"));
};
zero_extensions_StringExt.capitalize_first_letter = function(string) {
	return string.split("").join("");
};
var zero_extensions_Tools = function() { };
zero_extensions_Tools.__name__ = true;
var zero_utilities_Vec4 = {};
zero_utilities_Vec4.__properties__ = {get_wwww:"get_wwww",get_wwwz:"get_wwwz",get_wwwy:"get_wwwy",get_wwwx:"get_wwwx",get_wwzw:"get_wwzw",get_wwzz:"get_wwzz",get_wwzy:"get_wwzy",get_wwzx:"get_wwzx",get_wwyw:"get_wwyw",get_wwyz:"get_wwyz",get_wwyy:"get_wwyy",get_wwyx:"get_wwyx",get_wwxw:"get_wwxw",get_wwxz:"get_wwxz",get_wwxy:"get_wwxy",get_wwxx:"get_wwxx",get_wzww:"get_wzww",get_wzwz:"get_wzwz",get_wzwy:"get_wzwy",get_wzwx:"get_wzwx",get_wzzw:"get_wzzw",get_wzzz:"get_wzzz",get_wzzy:"get_wzzy",get_wzzx:"get_wzzx",get_wzyw:"get_wzyw",get_wzyz:"get_wzyz",get_wzyy:"get_wzyy",get_wzyx:"get_wzyx",get_wzxw:"get_wzxw",get_wzxz:"get_wzxz",get_wzxy:"get_wzxy",get_wzxx:"get_wzxx",get_wyww:"get_wyww",get_wywz:"get_wywz",get_wywy:"get_wywy",get_wywx:"get_wywx",get_wyzw:"get_wyzw",get_wyzz:"get_wyzz",get_wyzy:"get_wyzy",get_wyzx:"get_wyzx",get_wyyw:"get_wyyw",get_wyyz:"get_wyyz",get_wyyy:"get_wyyy",get_wyyx:"get_wyyx",get_wyxw:"get_wyxw",get_wyxz:"get_wyxz",get_wyxy:"get_wyxy",get_wyxx:"get_wyxx",get_wxww:"get_wxww",get_wxwz:"get_wxwz",get_wxwy:"get_wxwy",get_wxwx:"get_wxwx",get_wxzw:"get_wxzw",get_wxzz:"get_wxzz",get_wxzy:"get_wxzy",get_wxzx:"get_wxzx",get_wxyw:"get_wxyw",get_wxyz:"get_wxyz",get_wxyy:"get_wxyy",get_wxyx:"get_wxyx",get_wxxw:"get_wxxw",get_wxxz:"get_wxxz",get_wxxy:"get_wxxy",get_wxxx:"get_wxxx",get_zwww:"get_zwww",get_zwwz:"get_zwwz",get_zwwy:"get_zwwy",get_zwwx:"get_zwwx",get_zwzw:"get_zwzw",get_zwzz:"get_zwzz",get_zwzy:"get_zwzy",get_zwzx:"get_zwzx",get_zwyw:"get_zwyw",get_zwyz:"get_zwyz",get_zwyy:"get_zwyy",get_zwyx:"get_zwyx",get_zwxw:"get_zwxw",get_zwxz:"get_zwxz",get_zwxy:"get_zwxy",get_zwxx:"get_zwxx",get_zzww:"get_zzww",get_zzwz:"get_zzwz",get_zzwy:"get_zzwy",get_zzwx:"get_zzwx",get_zzzw:"get_zzzw",get_zzzz:"get_zzzz",get_zzzy:"get_zzzy",get_zzzx:"get_zzzx",get_zzyw:"get_zzyw",get_zzyz:"get_zzyz",get_zzyy:"get_zzyy",get_zzyx:"get_zzyx",get_zzxw:"get_zzxw",get_zzxz:"get_zzxz",get_zzxy:"get_zzxy",get_zzxx:"get_zzxx",get_zyww:"get_zyww",get_zywz:"get_zywz",get_zywy:"get_zywy",get_zywx:"get_zywx",get_zyzw:"get_zyzw",get_zyzz:"get_zyzz",get_zyzy:"get_zyzy",get_zyzx:"get_zyzx",get_zyyw:"get_zyyw",get_zyyz:"get_zyyz",get_zyyy:"get_zyyy",get_zyyx:"get_zyyx",get_zyxw:"get_zyxw",get_zyxz:"get_zyxz",get_zyxy:"get_zyxy",get_zyxx:"get_zyxx",get_zxww:"get_zxww",get_zxwz:"get_zxwz",get_zxwy:"get_zxwy",get_zxwx:"get_zxwx",get_zxzw:"get_zxzw",get_zxzz:"get_zxzz",get_zxzy:"get_zxzy",get_zxzx:"get_zxzx",get_zxyw:"get_zxyw",get_zxyz:"get_zxyz",get_zxyy:"get_zxyy",get_zxyx:"get_zxyx",get_zxxw:"get_zxxw",get_zxxz:"get_zxxz",get_zxxy:"get_zxxy",get_zxxx:"get_zxxx",get_ywww:"get_ywww",get_ywwz:"get_ywwz",get_ywwy:"get_ywwy",get_ywwx:"get_ywwx",get_ywzw:"get_ywzw",get_ywzz:"get_ywzz",get_ywzy:"get_ywzy",get_ywzx:"get_ywzx",get_ywyw:"get_ywyw",get_ywyz:"get_ywyz",get_ywyy:"get_ywyy",get_ywyx:"get_ywyx",get_ywxw:"get_ywxw",get_ywxz:"get_ywxz",get_ywxy:"get_ywxy",get_ywxx:"get_ywxx",get_yzww:"get_yzww",get_yzwz:"get_yzwz",get_yzwy:"get_yzwy",get_yzwx:"get_yzwx",get_yzzw:"get_yzzw",get_yzzz:"get_yzzz",get_yzzy:"get_yzzy",get_yzzx:"get_yzzx",get_yzyw:"get_yzyw",get_yzyz:"get_yzyz",get_yzyy:"get_yzyy",get_yzyx:"get_yzyx",get_yzxw:"get_yzxw",get_yzxz:"get_yzxz",get_yzxy:"get_yzxy",get_yzxx:"get_yzxx",get_yyww:"get_yyww",get_yywz:"get_yywz",get_yywy:"get_yywy",get_yywx:"get_yywx",get_yyzw:"get_yyzw",get_yyzz:"get_yyzz",get_yyzy:"get_yyzy",get_yyzx:"get_yyzx",get_yyyw:"get_yyyw",get_yyyz:"get_yyyz",get_yyyy:"get_yyyy",get_yyyx:"get_yyyx",get_yyxw:"get_yyxw",get_yyxz:"get_yyxz",get_yyxy:"get_yyxy",get_yyxx:"get_yyxx",get_yxww:"get_yxww",get_yxwz:"get_yxwz",get_yxwy:"get_yxwy",get_yxwx:"get_yxwx",get_yxzw:"get_yxzw",get_yxzz:"get_yxzz",get_yxzy:"get_yxzy",get_yxzx:"get_yxzx",get_yxyw:"get_yxyw",get_yxyz:"get_yxyz",get_yxyy:"get_yxyy",get_yxyx:"get_yxyx",get_yxxw:"get_yxxw",get_yxxz:"get_yxxz",get_yxxy:"get_yxxy",get_yxxx:"get_yxxx",get_xwww:"get_xwww",get_xwwz:"get_xwwz",get_xwwy:"get_xwwy",get_xwwx:"get_xwwx",get_xwzw:"get_xwzw",get_xwzz:"get_xwzz",get_xwzy:"get_xwzy",get_xwzx:"get_xwzx",get_xwyw:"get_xwyw",get_xwyz:"get_xwyz",get_xwyy:"get_xwyy",get_xwyx:"get_xwyx",get_xwxw:"get_xwxw",get_xwxz:"get_xwxz",get_xwxy:"get_xwxy",get_xwxx:"get_xwxx",get_xzww:"get_xzww",get_xzwz:"get_xzwz",get_xzwy:"get_xzwy",get_xzwx:"get_xzwx",get_xzzw:"get_xzzw",get_xzzz:"get_xzzz",get_xzzy:"get_xzzy",get_xzzx:"get_xzzx",get_xzyw:"get_xzyw",get_xzyz:"get_xzyz",get_xzyy:"get_xzyy",get_xzyx:"get_xzyx",get_xzxw:"get_xzxw",get_xzxz:"get_xzxz",get_xzxy:"get_xzxy",get_xzxx:"get_xzxx",get_xyww:"get_xyww",get_xywz:"get_xywz",get_xywy:"get_xywy",get_xywx:"get_xywx",get_xyzw:"get_xyzw",get_xyzz:"get_xyzz",get_xyzy:"get_xyzy",get_xyzx:"get_xyzx",get_xyyw:"get_xyyw",get_xyyz:"get_xyyz",get_xyyy:"get_xyyy",get_xyyx:"get_xyyx",get_xyxw:"get_xyxw",get_xyxz:"get_xyxz",get_xyxy:"get_xyxy",get_xyxx:"get_xyxx",get_xxww:"get_xxww",get_xxwz:"get_xxwz",get_xxwy:"get_xxwy",get_xxwx:"get_xxwx",get_xxzw:"get_xxzw",get_xxzz:"get_xxzz",get_xxzy:"get_xxzy",get_xxzx:"get_xxzx",get_xxyw:"get_xxyw",get_xxyz:"get_xxyz",get_xxyy:"get_xxyy",get_xxyx:"get_xxyx",get_xxxw:"get_xxxw",get_xxxz:"get_xxxz",get_xxxy:"get_xxxy",get_xxxx:"get_xxxx",get_www:"get_www",get_wwz:"get_wwz",get_wwy:"get_wwy",get_wwx:"get_wwx",get_wzw:"get_wzw",get_wzz:"get_wzz",get_wzy:"get_wzy",get_wzx:"get_wzx",get_wyw:"get_wyw",get_wyz:"get_wyz",get_wyy:"get_wyy",get_wyx:"get_wyx",get_wxw:"get_wxw",get_wxz:"get_wxz",get_wxy:"get_wxy",get_wxx:"get_wxx",get_zww:"get_zww",get_zwz:"get_zwz",get_zwy:"get_zwy",get_zwx:"get_zwx",get_zzw:"get_zzw",get_zzz:"get_zzz",get_zzy:"get_zzy",get_zzx:"get_zzx",get_zyw:"get_zyw",get_zyz:"get_zyz",get_zyy:"get_zyy",get_zyx:"get_zyx",get_zxw:"get_zxw",get_zxz:"get_zxz",get_zxy:"get_zxy",get_zxx:"get_zxx",get_yww:"get_yww",get_ywz:"get_ywz",get_ywy:"get_ywy",get_ywx:"get_ywx",get_yzw:"get_yzw",get_yzz:"get_yzz",get_yzy:"get_yzy",get_yzx:"get_yzx",get_yyw:"get_yyw",get_yyz:"get_yyz",get_yyy:"get_yyy",get_yyx:"get_yyx",get_yxw:"get_yxw",get_yxz:"get_yxz",get_yxy:"get_yxy",get_yxx:"get_yxx",get_xww:"get_xww",get_xwz:"get_xwz",get_xwy:"get_xwy",get_xwx:"get_xwx",get_xzw:"get_xzw",get_xzz:"get_xzz",get_xzy:"get_xzy",get_xzx:"get_xzx",get_xyw:"get_xyw",get_xyz:"get_xyz",get_xyy:"get_xyy",get_xyx:"get_xyx",get_xxw:"get_xxw",get_xxz:"get_xxz",get_xxy:"get_xxy",get_xxx:"get_xxx",get_ww:"get_ww",get_wz:"get_wz",get_wy:"get_wy",get_wx:"get_wx",get_zw:"get_zw",get_zz:"get_zz",get_zy:"get_zy",get_zx:"get_zx",get_yw:"get_yw",get_yz:"get_yz",get_yy:"get_yy",get_yx:"get_yx",get_xw:"get_xw",get_xz:"get_xz",get_xy:"get_xy",get_xx:"get_xx",set_w:"set_w",get_w:"get_w",set_z:"set_z",get_z:"get_z",set_y:"set_y",get_y:"get_y",set_x:"set_x",get_x:"get_x"};
zero_utilities_Vec4.zero = function(n) {
	if(Math.abs(n) <= zero_utilities_Vec4.epsilon) {
		return 0;
	} else {
		return n;
	}
};
zero_utilities_Vec4.from_array_float = function(input) {
	return zero_utilities_Vec4.get(input[0],input[1],input[2],input[3]);
};
zero_utilities_Vec4.from_array_int = function(input) {
	return zero_utilities_Vec4.get(input[0],input[1],input[2],input[3]);
};
zero_utilities_Vec4.arr_set = function(this1,n,v) {
	if(n < 0 || n > 3) {
		return;
	} else {
		this1[n] = v;
	}
};
zero_utilities_Vec4.arr_get = function(this1,n) {
	return this1[Math.floor(Math.max(Math.min(n,3),0))];
};
zero_utilities_Vec4.get = function(x,y,z,w) {
	if(w == null) {
		w = 0;
	}
	if(z == null) {
		z = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	if(zero_utilities_Vec4.pool != null && zero_utilities_Vec4.pool.length > 0) {
		var this1 = zero_utilities_Vec4.pool.shift();
		var x1 = x;
		var y1 = y;
		var z1 = z;
		var w1 = w;
		if(w == null) {
			w1 = 0;
		}
		if(z == null) {
			z1 = 0;
		}
		if(y == null) {
			y1 = 0;
		}
		if(x == null) {
			x1 = 0;
		}
		this1[0] = zero_utilities_Vec4.zero(x1);
		this1[1] = zero_utilities_Vec4.zero(y1);
		this1[2] = zero_utilities_Vec4.zero(z1);
		this1[3] = zero_utilities_Vec4.zero(w1);
		return this1;
	} else {
		var x1 = x;
		var y1 = y;
		var z1 = z;
		var w1 = w;
		if(w == null) {
			w1 = 0;
		}
		if(z == null) {
			z1 = 0;
		}
		if(y == null) {
			y1 = 0;
		}
		if(x == null) {
			x1 = 0;
		}
		return [x1,y1,z1,w1];
	}
};
zero_utilities_Vec4.put = function(this1) {
	zero_utilities_Vec4.pool.push(this1);
	this1 = null;
};
zero_utilities_Vec4._new = function(x,y,z,w) {
	if(w == null) {
		w = 0;
	}
	if(z == null) {
		z = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	return [x,y,z,w];
};
zero_utilities_Vec4.set = function(this1,x,y,z,w) {
	if(w == null) {
		w = 0;
	}
	if(z == null) {
		z = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	this1[0] = zero_utilities_Vec4.zero(x);
	this1[1] = zero_utilities_Vec4.zero(y);
	this1[2] = zero_utilities_Vec4.zero(z);
	this1[3] = zero_utilities_Vec4.zero(w);
	return this1;
};
zero_utilities_Vec4.get_x = function(this1) {
	return this1[0];
};
zero_utilities_Vec4.set_x = function(this1,v) {
	return this1[0] = v;
};
zero_utilities_Vec4.get_y = function(this1) {
	return this1[1];
};
zero_utilities_Vec4.set_y = function(this1,v) {
	return this1[1] = v;
};
zero_utilities_Vec4.get_z = function(this1) {
	return this1[2];
};
zero_utilities_Vec4.set_z = function(this1,v) {
	return this1[2] = v;
};
zero_utilities_Vec4.get_w = function(this1) {
	return this1[3];
};
zero_utilities_Vec4.set_w = function(this1,v) {
	return this1[3] = v;
};
zero_utilities_Vec4.copy_from = function(this1,v) {
	var x = v[0];
	var y = v[1];
	var z = v[2];
	var w = v[3];
	if(w == null) {
		w = 0;
	}
	if(z == null) {
		z = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	this1[0] = zero_utilities_Vec4.zero(x);
	this1[1] = zero_utilities_Vec4.zero(y);
	this1[2] = zero_utilities_Vec4.zero(z);
	this1[3] = zero_utilities_Vec4.zero(w);
	return this1;
};
zero_utilities_Vec4.scale = function(this1,n) {
	var x = this1[0] * n;
	var y = this1[1] * n;
	var z = this1[2] * n;
	var w = this1[3] * n;
	if(w == null) {
		w = 0;
	}
	if(z == null) {
		z = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	this1[0] = zero_utilities_Vec4.zero(x);
	this1[1] = zero_utilities_Vec4.zero(y);
	this1[2] = zero_utilities_Vec4.zero(z);
	this1[3] = zero_utilities_Vec4.zero(w);
	return this1;
};
zero_utilities_Vec4.copy = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[1],this1[2],this1[3]);
};
zero_utilities_Vec4.equals = function(this1,v) {
	if(this1[0] == v[0] && this1[1] == v[1] && this1[2] == v[2]) {
		return this1[3] == v[3];
	} else {
		return false;
	}
};
zero_utilities_Vec4.toString = function(this1) {
	return "x: " + this1[0] + " | y: " + this1[1] + " | z: " + this1[2] + " | w: " + this1[3];
};
zero_utilities_Vec4.add = function(v1,v2) {
	return zero_utilities_Vec4.get(v1[0] + v2[0],v1[1] + v2[1],v1[2] + v2[2],v1[3] + v2[3]);
};
zero_utilities_Vec4.add_f = function(v,n) {
	return zero_utilities_Vec4.get(v[0] + n,v[1] + n,v[2] + n,v[3] + n);
};
zero_utilities_Vec4.subtract = function(v1,v2) {
	return zero_utilities_Vec4.get(v1[0] - v2[0],v1[1] - v2[1],v1[2] - v2[2],v1[3] - v2[3]);
};
zero_utilities_Vec4.subtract_f = function(v,n) {
	return zero_utilities_Vec4.get(v[0] - n,v[1] - n,v[2] - n,v[3] - n);
};
zero_utilities_Vec4.multiply = function(v1,v2) {
	return zero_utilities_Vec4.get(v1[0] * v2[0],v1[1] * v2[1],v1[2] * v2[2],v1[3] * v2[3]);
};
zero_utilities_Vec4.multiply_f = function(v,n) {
	return zero_utilities_Vec4.get(v[0] * n,v[1] * n,v[2] * n,v[3] * n);
};
zero_utilities_Vec4.divide = function(v1,v2) {
	return zero_utilities_Vec4.get(v1[0] / v2[0],v1[1] / v2[1],v1[2] / v2[2],v1[3] / v2[3]);
};
zero_utilities_Vec4.divide_f = function(v,n) {
	return zero_utilities_Vec4.get(v[0] / n,v[1] / n,v[2] / n,v[3] / n);
};
zero_utilities_Vec4.mod = function(v1,v2) {
	return zero_utilities_Vec4.get(v1[0] % v2[0],v1[1] % v2[1],v1[2] % v2[2],v1[3] % v2[3]);
};
zero_utilities_Vec4.mod_f = function(v,n) {
	return zero_utilities_Vec4.get(v[0] % n,v[1] % n,v[2] % n,v[3] % n);
};
zero_utilities_Vec4.get_xx = function(this1) {
	return zero_utilities_Vec2.get(this1[0],this1[0]);
};
zero_utilities_Vec4.get_xy = function(this1) {
	return zero_utilities_Vec2.get(this1[0],this1[1]);
};
zero_utilities_Vec4.get_xz = function(this1) {
	return zero_utilities_Vec2.get(this1[0],this1[2]);
};
zero_utilities_Vec4.get_xw = function(this1) {
	return zero_utilities_Vec2.get(this1[0],this1[3]);
};
zero_utilities_Vec4.get_yx = function(this1) {
	return zero_utilities_Vec2.get(this1[1],this1[0]);
};
zero_utilities_Vec4.get_yy = function(this1) {
	return zero_utilities_Vec2.get(this1[1],this1[1]);
};
zero_utilities_Vec4.get_yz = function(this1) {
	return zero_utilities_Vec2.get(this1[1],this1[2]);
};
zero_utilities_Vec4.get_yw = function(this1) {
	return zero_utilities_Vec2.get(this1[1],this1[3]);
};
zero_utilities_Vec4.get_zx = function(this1) {
	return zero_utilities_Vec2.get(this1[2],this1[0]);
};
zero_utilities_Vec4.get_zy = function(this1) {
	return zero_utilities_Vec2.get(this1[2],this1[1]);
};
zero_utilities_Vec4.get_zz = function(this1) {
	return zero_utilities_Vec2.get(this1[2],this1[2]);
};
zero_utilities_Vec4.get_zw = function(this1) {
	return zero_utilities_Vec2.get(this1[2],this1[3]);
};
zero_utilities_Vec4.get_wx = function(this1) {
	return zero_utilities_Vec2.get(this1[3],this1[0]);
};
zero_utilities_Vec4.get_wy = function(this1) {
	return zero_utilities_Vec2.get(this1[3],this1[1]);
};
zero_utilities_Vec4.get_wz = function(this1) {
	return zero_utilities_Vec2.get(this1[3],this1[2]);
};
zero_utilities_Vec4.get_ww = function(this1) {
	return zero_utilities_Vec2.get(this1[3],this1[3]);
};
zero_utilities_Vec4.get_xxx = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[0],this1[0]);
};
zero_utilities_Vec4.get_xxy = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[0],this1[1]);
};
zero_utilities_Vec4.get_xxz = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[0],this1[2]);
};
zero_utilities_Vec4.get_xxw = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[0],this1[3]);
};
zero_utilities_Vec4.get_xyx = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[1],this1[0]);
};
zero_utilities_Vec4.get_xyy = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[1],this1[1]);
};
zero_utilities_Vec4.get_xyz = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[1],this1[2]);
};
zero_utilities_Vec4.get_xyw = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[1],this1[3]);
};
zero_utilities_Vec4.get_xzx = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[2],this1[0]);
};
zero_utilities_Vec4.get_xzy = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[2],this1[1]);
};
zero_utilities_Vec4.get_xzz = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[2],this1[2]);
};
zero_utilities_Vec4.get_xzw = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[2],this1[3]);
};
zero_utilities_Vec4.get_xwx = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[3],this1[0]);
};
zero_utilities_Vec4.get_xwy = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[3],this1[1]);
};
zero_utilities_Vec4.get_xwz = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[3],this1[2]);
};
zero_utilities_Vec4.get_xww = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[3],this1[3]);
};
zero_utilities_Vec4.get_yxx = function(this1) {
	return zero_utilities_Vec3.get(this1[1],this1[0],this1[0]);
};
zero_utilities_Vec4.get_yxy = function(this1) {
	return zero_utilities_Vec3.get(this1[1],this1[0],this1[1]);
};
zero_utilities_Vec4.get_yxz = function(this1) {
	return zero_utilities_Vec3.get(this1[1],this1[0],this1[2]);
};
zero_utilities_Vec4.get_yxw = function(this1) {
	return zero_utilities_Vec3.get(this1[1],this1[0],this1[3]);
};
zero_utilities_Vec4.get_yyx = function(this1) {
	return zero_utilities_Vec3.get(this1[1],this1[1],this1[0]);
};
zero_utilities_Vec4.get_yyy = function(this1) {
	return zero_utilities_Vec3.get(this1[1],this1[1],this1[1]);
};
zero_utilities_Vec4.get_yyz = function(this1) {
	return zero_utilities_Vec3.get(this1[1],this1[1],this1[2]);
};
zero_utilities_Vec4.get_yyw = function(this1) {
	return zero_utilities_Vec3.get(this1[1],this1[1],this1[3]);
};
zero_utilities_Vec4.get_yzx = function(this1) {
	return zero_utilities_Vec3.get(this1[1],this1[2],this1[0]);
};
zero_utilities_Vec4.get_yzy = function(this1) {
	return zero_utilities_Vec3.get(this1[1],this1[2],this1[1]);
};
zero_utilities_Vec4.get_yzz = function(this1) {
	return zero_utilities_Vec3.get(this1[1],this1[2],this1[2]);
};
zero_utilities_Vec4.get_yzw = function(this1) {
	return zero_utilities_Vec3.get(this1[1],this1[2],this1[3]);
};
zero_utilities_Vec4.get_ywx = function(this1) {
	return zero_utilities_Vec3.get(this1[1],this1[3],this1[0]);
};
zero_utilities_Vec4.get_ywy = function(this1) {
	return zero_utilities_Vec3.get(this1[1],this1[3],this1[1]);
};
zero_utilities_Vec4.get_ywz = function(this1) {
	return zero_utilities_Vec3.get(this1[1],this1[3],this1[2]);
};
zero_utilities_Vec4.get_yww = function(this1) {
	return zero_utilities_Vec3.get(this1[1],this1[3],this1[3]);
};
zero_utilities_Vec4.get_zxx = function(this1) {
	return zero_utilities_Vec3.get(this1[2],this1[0],this1[0]);
};
zero_utilities_Vec4.get_zxy = function(this1) {
	return zero_utilities_Vec3.get(this1[2],this1[0],this1[1]);
};
zero_utilities_Vec4.get_zxz = function(this1) {
	return zero_utilities_Vec3.get(this1[2],this1[0],this1[2]);
};
zero_utilities_Vec4.get_zxw = function(this1) {
	return zero_utilities_Vec3.get(this1[2],this1[0],this1[3]);
};
zero_utilities_Vec4.get_zyx = function(this1) {
	return zero_utilities_Vec3.get(this1[2],this1[1],this1[0]);
};
zero_utilities_Vec4.get_zyy = function(this1) {
	return zero_utilities_Vec3.get(this1[2],this1[1],this1[1]);
};
zero_utilities_Vec4.get_zyz = function(this1) {
	return zero_utilities_Vec3.get(this1[2],this1[1],this1[2]);
};
zero_utilities_Vec4.get_zyw = function(this1) {
	return zero_utilities_Vec3.get(this1[2],this1[1],this1[3]);
};
zero_utilities_Vec4.get_zzx = function(this1) {
	return zero_utilities_Vec3.get(this1[2],this1[2],this1[0]);
};
zero_utilities_Vec4.get_zzy = function(this1) {
	return zero_utilities_Vec3.get(this1[2],this1[2],this1[1]);
};
zero_utilities_Vec4.get_zzz = function(this1) {
	return zero_utilities_Vec3.get(this1[2],this1[2],this1[2]);
};
zero_utilities_Vec4.get_zzw = function(this1) {
	return zero_utilities_Vec3.get(this1[2],this1[2],this1[3]);
};
zero_utilities_Vec4.get_zwx = function(this1) {
	return zero_utilities_Vec3.get(this1[2],this1[3],this1[0]);
};
zero_utilities_Vec4.get_zwy = function(this1) {
	return zero_utilities_Vec3.get(this1[2],this1[3],this1[1]);
};
zero_utilities_Vec4.get_zwz = function(this1) {
	return zero_utilities_Vec3.get(this1[2],this1[3],this1[2]);
};
zero_utilities_Vec4.get_zww = function(this1) {
	return zero_utilities_Vec3.get(this1[2],this1[3],this1[3]);
};
zero_utilities_Vec4.get_wxx = function(this1) {
	return zero_utilities_Vec3.get(this1[3],this1[0],this1[0]);
};
zero_utilities_Vec4.get_wxy = function(this1) {
	return zero_utilities_Vec3.get(this1[3],this1[0],this1[1]);
};
zero_utilities_Vec4.get_wxz = function(this1) {
	return zero_utilities_Vec3.get(this1[3],this1[0],this1[2]);
};
zero_utilities_Vec4.get_wxw = function(this1) {
	return zero_utilities_Vec3.get(this1[3],this1[0],this1[3]);
};
zero_utilities_Vec4.get_wyx = function(this1) {
	return zero_utilities_Vec3.get(this1[3],this1[1],this1[0]);
};
zero_utilities_Vec4.get_wyy = function(this1) {
	return zero_utilities_Vec3.get(this1[3],this1[1],this1[1]);
};
zero_utilities_Vec4.get_wyz = function(this1) {
	return zero_utilities_Vec3.get(this1[3],this1[1],this1[2]);
};
zero_utilities_Vec4.get_wyw = function(this1) {
	return zero_utilities_Vec3.get(this1[3],this1[1],this1[3]);
};
zero_utilities_Vec4.get_wzx = function(this1) {
	return zero_utilities_Vec3.get(this1[3],this1[2],this1[0]);
};
zero_utilities_Vec4.get_wzy = function(this1) {
	return zero_utilities_Vec3.get(this1[3],this1[2],this1[1]);
};
zero_utilities_Vec4.get_wzz = function(this1) {
	return zero_utilities_Vec3.get(this1[3],this1[2],this1[2]);
};
zero_utilities_Vec4.get_wzw = function(this1) {
	return zero_utilities_Vec3.get(this1[3],this1[2],this1[3]);
};
zero_utilities_Vec4.get_wwx = function(this1) {
	return zero_utilities_Vec3.get(this1[3],this1[3],this1[0]);
};
zero_utilities_Vec4.get_wwy = function(this1) {
	return zero_utilities_Vec3.get(this1[3],this1[3],this1[1]);
};
zero_utilities_Vec4.get_wwz = function(this1) {
	return zero_utilities_Vec3.get(this1[3],this1[3],this1[2]);
};
zero_utilities_Vec4.get_www = function(this1) {
	return zero_utilities_Vec3.get(this1[3],this1[3],this1[3]);
};
zero_utilities_Vec4.get_xxxx = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[0],this1[0],this1[0]);
};
zero_utilities_Vec4.get_xxxy = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[0],this1[0],this1[1]);
};
zero_utilities_Vec4.get_xxxz = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[0],this1[0],this1[2]);
};
zero_utilities_Vec4.get_xxxw = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[0],this1[0],this1[3]);
};
zero_utilities_Vec4.get_xxyx = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[0],this1[1],this1[0]);
};
zero_utilities_Vec4.get_xxyy = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[0],this1[1],this1[1]);
};
zero_utilities_Vec4.get_xxyz = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[0],this1[1],this1[2]);
};
zero_utilities_Vec4.get_xxyw = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[0],this1[1],this1[3]);
};
zero_utilities_Vec4.get_xxzx = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[0],this1[2],this1[0]);
};
zero_utilities_Vec4.get_xxzy = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[0],this1[2],this1[1]);
};
zero_utilities_Vec4.get_xxzz = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[0],this1[2],this1[2]);
};
zero_utilities_Vec4.get_xxzw = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[0],this1[2],this1[3]);
};
zero_utilities_Vec4.get_xxwx = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[0],this1[3],this1[0]);
};
zero_utilities_Vec4.get_xxwy = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[0],this1[3],this1[1]);
};
zero_utilities_Vec4.get_xxwz = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[0],this1[3],this1[2]);
};
zero_utilities_Vec4.get_xxww = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[0],this1[3],this1[3]);
};
zero_utilities_Vec4.get_xyxx = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[1],this1[0],this1[0]);
};
zero_utilities_Vec4.get_xyxy = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[1],this1[0],this1[1]);
};
zero_utilities_Vec4.get_xyxz = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[1],this1[0],this1[2]);
};
zero_utilities_Vec4.get_xyxw = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[1],this1[0],this1[3]);
};
zero_utilities_Vec4.get_xyyx = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[1],this1[1],this1[0]);
};
zero_utilities_Vec4.get_xyyy = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[1],this1[1],this1[1]);
};
zero_utilities_Vec4.get_xyyz = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[1],this1[1],this1[2]);
};
zero_utilities_Vec4.get_xyyw = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[1],this1[1],this1[3]);
};
zero_utilities_Vec4.get_xyzx = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[1],this1[2],this1[0]);
};
zero_utilities_Vec4.get_xyzy = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[1],this1[2],this1[1]);
};
zero_utilities_Vec4.get_xyzz = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[1],this1[2],this1[2]);
};
zero_utilities_Vec4.get_xyzw = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[1],this1[2],this1[3]);
};
zero_utilities_Vec4.get_xywx = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[1],this1[3],this1[0]);
};
zero_utilities_Vec4.get_xywy = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[1],this1[3],this1[1]);
};
zero_utilities_Vec4.get_xywz = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[1],this1[3],this1[2]);
};
zero_utilities_Vec4.get_xyww = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[1],this1[3],this1[3]);
};
zero_utilities_Vec4.get_xzxx = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[2],this1[0],this1[0]);
};
zero_utilities_Vec4.get_xzxy = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[2],this1[0],this1[1]);
};
zero_utilities_Vec4.get_xzxz = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[2],this1[0],this1[2]);
};
zero_utilities_Vec4.get_xzxw = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[2],this1[0],this1[3]);
};
zero_utilities_Vec4.get_xzyx = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[2],this1[1],this1[0]);
};
zero_utilities_Vec4.get_xzyy = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[2],this1[1],this1[1]);
};
zero_utilities_Vec4.get_xzyz = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[2],this1[1],this1[2]);
};
zero_utilities_Vec4.get_xzyw = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[2],this1[1],this1[3]);
};
zero_utilities_Vec4.get_xzzx = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[2],this1[2],this1[0]);
};
zero_utilities_Vec4.get_xzzy = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[2],this1[2],this1[1]);
};
zero_utilities_Vec4.get_xzzz = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[2],this1[2],this1[2]);
};
zero_utilities_Vec4.get_xzzw = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[2],this1[2],this1[3]);
};
zero_utilities_Vec4.get_xzwx = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[2],this1[3],this1[0]);
};
zero_utilities_Vec4.get_xzwy = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[2],this1[3],this1[1]);
};
zero_utilities_Vec4.get_xzwz = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[2],this1[3],this1[2]);
};
zero_utilities_Vec4.get_xzww = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[2],this1[3],this1[3]);
};
zero_utilities_Vec4.get_xwxx = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[3],this1[0],this1[0]);
};
zero_utilities_Vec4.get_xwxy = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[3],this1[0],this1[1]);
};
zero_utilities_Vec4.get_xwxz = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[3],this1[0],this1[2]);
};
zero_utilities_Vec4.get_xwxw = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[3],this1[0],this1[3]);
};
zero_utilities_Vec4.get_xwyx = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[3],this1[1],this1[0]);
};
zero_utilities_Vec4.get_xwyy = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[3],this1[1],this1[1]);
};
zero_utilities_Vec4.get_xwyz = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[3],this1[1],this1[2]);
};
zero_utilities_Vec4.get_xwyw = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[3],this1[1],this1[3]);
};
zero_utilities_Vec4.get_xwzx = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[3],this1[2],this1[0]);
};
zero_utilities_Vec4.get_xwzy = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[3],this1[2],this1[1]);
};
zero_utilities_Vec4.get_xwzz = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[3],this1[2],this1[2]);
};
zero_utilities_Vec4.get_xwzw = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[3],this1[2],this1[3]);
};
zero_utilities_Vec4.get_xwwx = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[3],this1[3],this1[0]);
};
zero_utilities_Vec4.get_xwwy = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[3],this1[3],this1[1]);
};
zero_utilities_Vec4.get_xwwz = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[3],this1[3],this1[2]);
};
zero_utilities_Vec4.get_xwww = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[3],this1[3],this1[3]);
};
zero_utilities_Vec4.get_yxxx = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[0],this1[0],this1[0]);
};
zero_utilities_Vec4.get_yxxy = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[0],this1[0],this1[1]);
};
zero_utilities_Vec4.get_yxxz = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[0],this1[0],this1[2]);
};
zero_utilities_Vec4.get_yxxw = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[0],this1[0],this1[3]);
};
zero_utilities_Vec4.get_yxyx = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[0],this1[1],this1[0]);
};
zero_utilities_Vec4.get_yxyy = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[0],this1[1],this1[1]);
};
zero_utilities_Vec4.get_yxyz = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[0],this1[1],this1[2]);
};
zero_utilities_Vec4.get_yxyw = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[0],this1[1],this1[3]);
};
zero_utilities_Vec4.get_yxzx = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[0],this1[2],this1[0]);
};
zero_utilities_Vec4.get_yxzy = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[0],this1[2],this1[1]);
};
zero_utilities_Vec4.get_yxzz = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[0],this1[2],this1[2]);
};
zero_utilities_Vec4.get_yxzw = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[0],this1[2],this1[3]);
};
zero_utilities_Vec4.get_yxwx = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[0],this1[3],this1[0]);
};
zero_utilities_Vec4.get_yxwy = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[0],this1[3],this1[1]);
};
zero_utilities_Vec4.get_yxwz = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[0],this1[3],this1[2]);
};
zero_utilities_Vec4.get_yxww = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[0],this1[3],this1[3]);
};
zero_utilities_Vec4.get_yyxx = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[1],this1[0],this1[0]);
};
zero_utilities_Vec4.get_yyxy = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[1],this1[0],this1[1]);
};
zero_utilities_Vec4.get_yyxz = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[1],this1[0],this1[2]);
};
zero_utilities_Vec4.get_yyxw = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[1],this1[0],this1[3]);
};
zero_utilities_Vec4.get_yyyx = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[1],this1[1],this1[0]);
};
zero_utilities_Vec4.get_yyyy = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[1],this1[1],this1[1]);
};
zero_utilities_Vec4.get_yyyz = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[1],this1[1],this1[2]);
};
zero_utilities_Vec4.get_yyyw = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[1],this1[1],this1[3]);
};
zero_utilities_Vec4.get_yyzx = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[1],this1[2],this1[0]);
};
zero_utilities_Vec4.get_yyzy = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[1],this1[2],this1[1]);
};
zero_utilities_Vec4.get_yyzz = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[1],this1[2],this1[2]);
};
zero_utilities_Vec4.get_yyzw = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[1],this1[2],this1[3]);
};
zero_utilities_Vec4.get_yywx = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[1],this1[3],this1[0]);
};
zero_utilities_Vec4.get_yywy = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[1],this1[3],this1[1]);
};
zero_utilities_Vec4.get_yywz = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[1],this1[3],this1[2]);
};
zero_utilities_Vec4.get_yyww = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[1],this1[3],this1[3]);
};
zero_utilities_Vec4.get_yzxx = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[2],this1[0],this1[0]);
};
zero_utilities_Vec4.get_yzxy = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[2],this1[0],this1[1]);
};
zero_utilities_Vec4.get_yzxz = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[2],this1[0],this1[2]);
};
zero_utilities_Vec4.get_yzxw = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[2],this1[0],this1[3]);
};
zero_utilities_Vec4.get_yzyx = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[2],this1[1],this1[0]);
};
zero_utilities_Vec4.get_yzyy = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[2],this1[1],this1[1]);
};
zero_utilities_Vec4.get_yzyz = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[2],this1[1],this1[2]);
};
zero_utilities_Vec4.get_yzyw = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[2],this1[1],this1[3]);
};
zero_utilities_Vec4.get_yzzx = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[2],this1[2],this1[0]);
};
zero_utilities_Vec4.get_yzzy = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[2],this1[2],this1[1]);
};
zero_utilities_Vec4.get_yzzz = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[2],this1[2],this1[2]);
};
zero_utilities_Vec4.get_yzzw = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[2],this1[2],this1[3]);
};
zero_utilities_Vec4.get_yzwx = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[2],this1[3],this1[0]);
};
zero_utilities_Vec4.get_yzwy = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[2],this1[3],this1[1]);
};
zero_utilities_Vec4.get_yzwz = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[2],this1[3],this1[2]);
};
zero_utilities_Vec4.get_yzww = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[2],this1[3],this1[3]);
};
zero_utilities_Vec4.get_ywxx = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[3],this1[0],this1[0]);
};
zero_utilities_Vec4.get_ywxy = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[3],this1[0],this1[1]);
};
zero_utilities_Vec4.get_ywxz = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[3],this1[0],this1[2]);
};
zero_utilities_Vec4.get_ywxw = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[3],this1[0],this1[3]);
};
zero_utilities_Vec4.get_ywyx = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[3],this1[1],this1[0]);
};
zero_utilities_Vec4.get_ywyy = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[3],this1[1],this1[1]);
};
zero_utilities_Vec4.get_ywyz = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[3],this1[1],this1[2]);
};
zero_utilities_Vec4.get_ywyw = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[3],this1[1],this1[3]);
};
zero_utilities_Vec4.get_ywzx = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[3],this1[2],this1[0]);
};
zero_utilities_Vec4.get_ywzy = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[3],this1[2],this1[1]);
};
zero_utilities_Vec4.get_ywzz = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[3],this1[2],this1[2]);
};
zero_utilities_Vec4.get_ywzw = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[3],this1[2],this1[3]);
};
zero_utilities_Vec4.get_ywwx = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[3],this1[3],this1[0]);
};
zero_utilities_Vec4.get_ywwy = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[3],this1[3],this1[1]);
};
zero_utilities_Vec4.get_ywwz = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[3],this1[3],this1[2]);
};
zero_utilities_Vec4.get_ywww = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[3],this1[3],this1[3]);
};
zero_utilities_Vec4.get_zxxx = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[0],this1[0],this1[0]);
};
zero_utilities_Vec4.get_zxxy = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[0],this1[0],this1[1]);
};
zero_utilities_Vec4.get_zxxz = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[0],this1[0],this1[2]);
};
zero_utilities_Vec4.get_zxxw = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[0],this1[0],this1[3]);
};
zero_utilities_Vec4.get_zxyx = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[0],this1[1],this1[0]);
};
zero_utilities_Vec4.get_zxyy = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[0],this1[1],this1[1]);
};
zero_utilities_Vec4.get_zxyz = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[0],this1[1],this1[2]);
};
zero_utilities_Vec4.get_zxyw = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[0],this1[1],this1[3]);
};
zero_utilities_Vec4.get_zxzx = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[0],this1[2],this1[0]);
};
zero_utilities_Vec4.get_zxzy = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[0],this1[2],this1[1]);
};
zero_utilities_Vec4.get_zxzz = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[0],this1[2],this1[2]);
};
zero_utilities_Vec4.get_zxzw = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[0],this1[2],this1[3]);
};
zero_utilities_Vec4.get_zxwx = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[0],this1[3],this1[0]);
};
zero_utilities_Vec4.get_zxwy = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[0],this1[3],this1[1]);
};
zero_utilities_Vec4.get_zxwz = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[0],this1[3],this1[2]);
};
zero_utilities_Vec4.get_zxww = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[0],this1[3],this1[3]);
};
zero_utilities_Vec4.get_zyxx = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[1],this1[0],this1[0]);
};
zero_utilities_Vec4.get_zyxy = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[1],this1[0],this1[1]);
};
zero_utilities_Vec4.get_zyxz = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[1],this1[0],this1[2]);
};
zero_utilities_Vec4.get_zyxw = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[1],this1[0],this1[3]);
};
zero_utilities_Vec4.get_zyyx = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[1],this1[1],this1[0]);
};
zero_utilities_Vec4.get_zyyy = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[1],this1[1],this1[1]);
};
zero_utilities_Vec4.get_zyyz = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[1],this1[1],this1[2]);
};
zero_utilities_Vec4.get_zyyw = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[1],this1[1],this1[3]);
};
zero_utilities_Vec4.get_zyzx = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[1],this1[2],this1[0]);
};
zero_utilities_Vec4.get_zyzy = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[1],this1[2],this1[1]);
};
zero_utilities_Vec4.get_zyzz = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[1],this1[2],this1[2]);
};
zero_utilities_Vec4.get_zyzw = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[1],this1[2],this1[3]);
};
zero_utilities_Vec4.get_zywx = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[1],this1[3],this1[0]);
};
zero_utilities_Vec4.get_zywy = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[1],this1[3],this1[1]);
};
zero_utilities_Vec4.get_zywz = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[1],this1[3],this1[2]);
};
zero_utilities_Vec4.get_zyww = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[1],this1[3],this1[3]);
};
zero_utilities_Vec4.get_zzxx = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[2],this1[0],this1[0]);
};
zero_utilities_Vec4.get_zzxy = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[2],this1[0],this1[1]);
};
zero_utilities_Vec4.get_zzxz = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[2],this1[0],this1[2]);
};
zero_utilities_Vec4.get_zzxw = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[2],this1[0],this1[3]);
};
zero_utilities_Vec4.get_zzyx = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[2],this1[1],this1[0]);
};
zero_utilities_Vec4.get_zzyy = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[2],this1[1],this1[1]);
};
zero_utilities_Vec4.get_zzyz = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[2],this1[1],this1[2]);
};
zero_utilities_Vec4.get_zzyw = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[2],this1[1],this1[3]);
};
zero_utilities_Vec4.get_zzzx = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[2],this1[2],this1[0]);
};
zero_utilities_Vec4.get_zzzy = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[2],this1[2],this1[1]);
};
zero_utilities_Vec4.get_zzzz = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[2],this1[2],this1[2]);
};
zero_utilities_Vec4.get_zzzw = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[2],this1[2],this1[3]);
};
zero_utilities_Vec4.get_zzwx = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[2],this1[3],this1[0]);
};
zero_utilities_Vec4.get_zzwy = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[2],this1[3],this1[1]);
};
zero_utilities_Vec4.get_zzwz = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[2],this1[3],this1[2]);
};
zero_utilities_Vec4.get_zzww = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[2],this1[3],this1[3]);
};
zero_utilities_Vec4.get_zwxx = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[3],this1[0],this1[0]);
};
zero_utilities_Vec4.get_zwxy = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[3],this1[0],this1[1]);
};
zero_utilities_Vec4.get_zwxz = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[3],this1[0],this1[2]);
};
zero_utilities_Vec4.get_zwxw = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[3],this1[0],this1[3]);
};
zero_utilities_Vec4.get_zwyx = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[3],this1[1],this1[0]);
};
zero_utilities_Vec4.get_zwyy = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[3],this1[1],this1[1]);
};
zero_utilities_Vec4.get_zwyz = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[3],this1[1],this1[2]);
};
zero_utilities_Vec4.get_zwyw = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[3],this1[1],this1[3]);
};
zero_utilities_Vec4.get_zwzx = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[3],this1[2],this1[0]);
};
zero_utilities_Vec4.get_zwzy = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[3],this1[2],this1[1]);
};
zero_utilities_Vec4.get_zwzz = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[3],this1[2],this1[2]);
};
zero_utilities_Vec4.get_zwzw = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[3],this1[2],this1[3]);
};
zero_utilities_Vec4.get_zwwx = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[3],this1[3],this1[0]);
};
zero_utilities_Vec4.get_zwwy = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[3],this1[3],this1[1]);
};
zero_utilities_Vec4.get_zwwz = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[3],this1[3],this1[2]);
};
zero_utilities_Vec4.get_zwww = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[3],this1[3],this1[3]);
};
zero_utilities_Vec4.get_wxxx = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[0],this1[0],this1[0]);
};
zero_utilities_Vec4.get_wxxy = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[0],this1[0],this1[1]);
};
zero_utilities_Vec4.get_wxxz = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[0],this1[0],this1[2]);
};
zero_utilities_Vec4.get_wxxw = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[0],this1[0],this1[3]);
};
zero_utilities_Vec4.get_wxyx = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[0],this1[1],this1[0]);
};
zero_utilities_Vec4.get_wxyy = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[0],this1[1],this1[1]);
};
zero_utilities_Vec4.get_wxyz = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[0],this1[1],this1[2]);
};
zero_utilities_Vec4.get_wxyw = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[0],this1[1],this1[3]);
};
zero_utilities_Vec4.get_wxzx = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[0],this1[2],this1[0]);
};
zero_utilities_Vec4.get_wxzy = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[0],this1[2],this1[1]);
};
zero_utilities_Vec4.get_wxzz = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[0],this1[2],this1[2]);
};
zero_utilities_Vec4.get_wxzw = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[0],this1[2],this1[3]);
};
zero_utilities_Vec4.get_wxwx = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[0],this1[3],this1[0]);
};
zero_utilities_Vec4.get_wxwy = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[0],this1[3],this1[1]);
};
zero_utilities_Vec4.get_wxwz = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[0],this1[3],this1[2]);
};
zero_utilities_Vec4.get_wxww = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[0],this1[3],this1[3]);
};
zero_utilities_Vec4.get_wyxx = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[1],this1[0],this1[0]);
};
zero_utilities_Vec4.get_wyxy = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[1],this1[0],this1[1]);
};
zero_utilities_Vec4.get_wyxz = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[1],this1[0],this1[2]);
};
zero_utilities_Vec4.get_wyxw = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[1],this1[0],this1[3]);
};
zero_utilities_Vec4.get_wyyx = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[1],this1[1],this1[0]);
};
zero_utilities_Vec4.get_wyyy = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[1],this1[1],this1[1]);
};
zero_utilities_Vec4.get_wyyz = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[1],this1[1],this1[2]);
};
zero_utilities_Vec4.get_wyyw = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[1],this1[1],this1[3]);
};
zero_utilities_Vec4.get_wyzx = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[1],this1[2],this1[0]);
};
zero_utilities_Vec4.get_wyzy = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[1],this1[2],this1[1]);
};
zero_utilities_Vec4.get_wyzz = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[1],this1[2],this1[2]);
};
zero_utilities_Vec4.get_wyzw = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[1],this1[2],this1[3]);
};
zero_utilities_Vec4.get_wywx = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[1],this1[3],this1[0]);
};
zero_utilities_Vec4.get_wywy = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[1],this1[3],this1[1]);
};
zero_utilities_Vec4.get_wywz = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[1],this1[3],this1[2]);
};
zero_utilities_Vec4.get_wyww = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[1],this1[3],this1[3]);
};
zero_utilities_Vec4.get_wzxx = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[2],this1[0],this1[0]);
};
zero_utilities_Vec4.get_wzxy = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[2],this1[0],this1[1]);
};
zero_utilities_Vec4.get_wzxz = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[2],this1[0],this1[2]);
};
zero_utilities_Vec4.get_wzxw = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[2],this1[0],this1[3]);
};
zero_utilities_Vec4.get_wzyx = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[2],this1[1],this1[0]);
};
zero_utilities_Vec4.get_wzyy = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[2],this1[1],this1[1]);
};
zero_utilities_Vec4.get_wzyz = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[2],this1[1],this1[2]);
};
zero_utilities_Vec4.get_wzyw = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[2],this1[1],this1[3]);
};
zero_utilities_Vec4.get_wzzx = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[2],this1[2],this1[0]);
};
zero_utilities_Vec4.get_wzzy = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[2],this1[2],this1[1]);
};
zero_utilities_Vec4.get_wzzz = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[2],this1[2],this1[2]);
};
zero_utilities_Vec4.get_wzzw = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[2],this1[2],this1[3]);
};
zero_utilities_Vec4.get_wzwx = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[2],this1[3],this1[0]);
};
zero_utilities_Vec4.get_wzwy = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[2],this1[3],this1[1]);
};
zero_utilities_Vec4.get_wzwz = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[2],this1[3],this1[2]);
};
zero_utilities_Vec4.get_wzww = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[2],this1[3],this1[3]);
};
zero_utilities_Vec4.get_wwxx = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[3],this1[0],this1[0]);
};
zero_utilities_Vec4.get_wwxy = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[3],this1[0],this1[1]);
};
zero_utilities_Vec4.get_wwxz = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[3],this1[0],this1[2]);
};
zero_utilities_Vec4.get_wwxw = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[3],this1[0],this1[3]);
};
zero_utilities_Vec4.get_wwyx = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[3],this1[1],this1[0]);
};
zero_utilities_Vec4.get_wwyy = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[3],this1[1],this1[1]);
};
zero_utilities_Vec4.get_wwyz = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[3],this1[1],this1[2]);
};
zero_utilities_Vec4.get_wwyw = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[3],this1[1],this1[3]);
};
zero_utilities_Vec4.get_wwzx = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[3],this1[2],this1[0]);
};
zero_utilities_Vec4.get_wwzy = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[3],this1[2],this1[1]);
};
zero_utilities_Vec4.get_wwzz = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[3],this1[2],this1[2]);
};
zero_utilities_Vec4.get_wwzw = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[3],this1[2],this1[3]);
};
zero_utilities_Vec4.get_wwwx = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[3],this1[3],this1[0]);
};
zero_utilities_Vec4.get_wwwy = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[3],this1[3],this1[1]);
};
zero_utilities_Vec4.get_wwwz = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[3],this1[3],this1[2]);
};
zero_utilities_Vec4.get_wwww = function(this1) {
	return zero_utilities_Vec4.get(this1[3],this1[3],this1[3],this1[3]);
};
var zero_utilities_Color = {};
zero_utilities_Color.__properties__ = {get_aaaa:"get_aaaa",get_aaab:"get_aaab",get_aaag:"get_aaag",get_aaar:"get_aaar",get_aaba:"get_aaba",get_aabb:"get_aabb",get_aabg:"get_aabg",get_aabr:"get_aabr",get_aaga:"get_aaga",get_aagb:"get_aagb",get_aagg:"get_aagg",get_aagr:"get_aagr",get_aara:"get_aara",get_aarb:"get_aarb",get_aarg:"get_aarg",get_aarr:"get_aarr",get_abaa:"get_abaa",get_abab:"get_abab",get_abag:"get_abag",get_abar:"get_abar",get_abba:"get_abba",get_abbb:"get_abbb",get_abbg:"get_abbg",get_abbr:"get_abbr",get_abga:"get_abga",get_abgb:"get_abgb",get_abgg:"get_abgg",get_abgr:"get_abgr",get_abra:"get_abra",get_abrb:"get_abrb",get_abrg:"get_abrg",get_abrr:"get_abrr",get_agaa:"get_agaa",get_agab:"get_agab",get_agag:"get_agag",get_agar:"get_agar",get_agba:"get_agba",get_agbb:"get_agbb",get_agbg:"get_agbg",get_agbr:"get_agbr",get_agga:"get_agga",get_aggb:"get_aggb",get_aggg:"get_aggg",get_aggr:"get_aggr",get_agra:"get_agra",get_agrb:"get_agrb",get_agrg:"get_agrg",get_agrr:"get_agrr",get_araa:"get_araa",get_arab:"get_arab",get_arag:"get_arag",get_arar:"get_arar",get_arba:"get_arba",get_arbb:"get_arbb",get_arbg:"get_arbg",get_arbr:"get_arbr",get_arga:"get_arga",get_argb:"get_argb",get_argg:"get_argg",get_argr:"get_argr",get_arra:"get_arra",get_arrb:"get_arrb",get_arrg:"get_arrg",get_arrr:"get_arrr",get_baaa:"get_baaa",get_baab:"get_baab",get_baag:"get_baag",get_baar:"get_baar",get_baba:"get_baba",get_babb:"get_babb",get_babg:"get_babg",get_babr:"get_babr",get_baga:"get_baga",get_bagb:"get_bagb",get_bagg:"get_bagg",get_bagr:"get_bagr",get_bara:"get_bara",get_barb:"get_barb",get_barg:"get_barg",get_barr:"get_barr",get_bbaa:"get_bbaa",get_bbab:"get_bbab",get_bbag:"get_bbag",get_bbar:"get_bbar",get_bbba:"get_bbba",get_bbbb:"get_bbbb",get_bbbg:"get_bbbg",get_bbbr:"get_bbbr",get_bbga:"get_bbga",get_bbgb:"get_bbgb",get_bbgg:"get_bbgg",get_bbgr:"get_bbgr",get_bbra:"get_bbra",get_bbrb:"get_bbrb",get_bbrg:"get_bbrg",get_bbrr:"get_bbrr",get_bgaa:"get_bgaa",get_bgab:"get_bgab",get_bgag:"get_bgag",get_bgar:"get_bgar",get_bgba:"get_bgba",get_bgbb:"get_bgbb",get_bgbg:"get_bgbg",get_bgbr:"get_bgbr",get_bgga:"get_bgga",get_bggb:"get_bggb",get_bggg:"get_bggg",get_bggr:"get_bggr",get_bgra:"get_bgra",get_bgrb:"get_bgrb",get_bgrg:"get_bgrg",get_bgrr:"get_bgrr",get_braa:"get_braa",get_brab:"get_brab",get_brag:"get_brag",get_brar:"get_brar",get_brba:"get_brba",get_brbb:"get_brbb",get_brbg:"get_brbg",get_brbr:"get_brbr",get_brga:"get_brga",get_brgb:"get_brgb",get_brgg:"get_brgg",get_brgr:"get_brgr",get_brra:"get_brra",get_brrb:"get_brrb",get_brrg:"get_brrg",get_brrr:"get_brrr",get_gaaa:"get_gaaa",get_gaab:"get_gaab",get_gaag:"get_gaag",get_gaar:"get_gaar",get_gaba:"get_gaba",get_gabb:"get_gabb",get_gabg:"get_gabg",get_gabr:"get_gabr",get_gaga:"get_gaga",get_gagb:"get_gagb",get_gagg:"get_gagg",get_gagr:"get_gagr",get_gara:"get_gara",get_garb:"get_garb",get_garg:"get_garg",get_garr:"get_garr",get_gbaa:"get_gbaa",get_gbab:"get_gbab",get_gbag:"get_gbag",get_gbar:"get_gbar",get_gbba:"get_gbba",get_gbbb:"get_gbbb",get_gbbg:"get_gbbg",get_gbbr:"get_gbbr",get_gbga:"get_gbga",get_gbgb:"get_gbgb",get_gbgg:"get_gbgg",get_gbgr:"get_gbgr",get_gbra:"get_gbra",get_gbrb:"get_gbrb",get_gbrg:"get_gbrg",get_gbrr:"get_gbrr",get_ggaa:"get_ggaa",get_ggab:"get_ggab",get_ggag:"get_ggag",get_ggar:"get_ggar",get_ggba:"get_ggba",get_ggbb:"get_ggbb",get_ggbg:"get_ggbg",get_ggbr:"get_ggbr",get_ggga:"get_ggga",get_gggb:"get_gggb",get_gggg:"get_gggg",get_gggr:"get_gggr",get_ggra:"get_ggra",get_ggrb:"get_ggrb",get_ggrg:"get_ggrg",get_ggrr:"get_ggrr",get_graa:"get_graa",get_grab:"get_grab",get_grag:"get_grag",get_grar:"get_grar",get_grba:"get_grba",get_grbb:"get_grbb",get_grbg:"get_grbg",get_grbr:"get_grbr",get_grga:"get_grga",get_grgb:"get_grgb",get_grgg:"get_grgg",get_grgr:"get_grgr",get_grra:"get_grra",get_grrb:"get_grrb",get_grrg:"get_grrg",get_grrr:"get_grrr",get_raaa:"get_raaa",get_raab:"get_raab",get_raag:"get_raag",get_raar:"get_raar",get_raba:"get_raba",get_rabb:"get_rabb",get_rabg:"get_rabg",get_rabr:"get_rabr",get_raga:"get_raga",get_ragb:"get_ragb",get_ragg:"get_ragg",get_ragr:"get_ragr",get_rara:"get_rara",get_rarb:"get_rarb",get_rarg:"get_rarg",get_rarr:"get_rarr",get_rbaa:"get_rbaa",get_rbab:"get_rbab",get_rbag:"get_rbag",get_rbar:"get_rbar",get_rbba:"get_rbba",get_rbbb:"get_rbbb",get_rbbg:"get_rbbg",get_rbbr:"get_rbbr",get_rbga:"get_rbga",get_rbgb:"get_rbgb",get_rbgg:"get_rbgg",get_rbgr:"get_rbgr",get_rbra:"get_rbra",get_rbrb:"get_rbrb",get_rbrg:"get_rbrg",get_rbrr:"get_rbrr",get_rgaa:"get_rgaa",get_rgab:"get_rgab",get_rgag:"get_rgag",get_rgar:"get_rgar",get_rgba:"get_rgba",get_rgbb:"get_rgbb",get_rgbg:"get_rgbg",get_rgbr:"get_rgbr",get_rgga:"get_rgga",get_rggb:"get_rggb",get_rggg:"get_rggg",get_rggr:"get_rggr",get_rgra:"get_rgra",get_rgrb:"get_rgrb",get_rgrg:"get_rgrg",get_rgrr:"get_rgrr",get_rraa:"get_rraa",get_rrab:"get_rrab",get_rrag:"get_rrag",get_rrar:"get_rrar",get_rrba:"get_rrba",get_rrbb:"get_rrbb",get_rrbg:"get_rrbg",get_rrbr:"get_rrbr",get_rrga:"get_rrga",get_rrgb:"get_rrgb",get_rrgg:"get_rrgg",get_rrgr:"get_rrgr",get_rrra:"get_rrra",get_rrrb:"get_rrrb",get_rrrg:"get_rrrg",get_rrrr:"get_rrrr",get_bbb:"get_bbb",get_bbg:"get_bbg",get_bbr:"get_bbr",get_bgb:"get_bgb",get_bgg:"get_bgg",get_bgr:"get_bgr",get_brb:"get_brb",get_brg:"get_brg",get_brr:"get_brr",get_gbb:"get_gbb",get_gbg:"get_gbg",get_gbr:"get_gbr",get_ggb:"get_ggb",get_ggg:"get_ggg",get_ggr:"get_ggr",get_grb:"get_grb",get_grg:"get_grg",get_grr:"get_grr",get_rbb:"get_rbb",get_rbg:"get_rbg",get_rbr:"get_rbr",get_rgb:"get_rgb",get_rgg:"get_rgg",get_rgr:"get_rgr",get_rrb:"get_rrb",get_rrg:"get_rrg",get_rrr:"get_rrr",set_brightness:"set_brightness",get_brightness:"get_brightness",set_lightness:"set_lightness",get_lightness:"get_lightness",set_saturation:"set_saturation",get_saturation:"get_saturation",set_hue:"set_hue",get_hue:"get_hue",set_alpha_int:"set_alpha_int",get_alpha_int:"get_alpha_int",set_blue_int:"set_blue_int",get_blue_int:"get_blue_int",set_green_int:"set_green_int",get_green_int:"get_green_int",set_red_int:"set_red_int",get_red_int:"get_red_int",set_alpha:"set_alpha",get_alpha:"get_alpha",set_blue:"set_blue",get_blue:"get_blue",set_green:"set_green",get_green:"get_green",set_red:"set_red",get_red:"get_red"};
zero_utilities_Color.zero = function(n) {
	if(Math.abs(n) <= zero_utilities_Color.epsilon) {
		return 0;
	} else {
		return n;
	}
};
zero_utilities_Color.get = function(red,green,blue,alpha) {
	if(alpha == null) {
		alpha = 1;
	}
	if(blue == null) {
		blue = 0;
	}
	if(green == null) {
		green = 0;
	}
	if(red == null) {
		red = 0;
	}
	if(zero_utilities_Color.pool != null && zero_utilities_Color.pool.length > 0) {
		var this1 = zero_utilities_Color.pool.shift();
		var x = red;
		var y = green;
		var z = blue;
		var w = alpha;
		if(alpha == null) {
			w = 0;
		}
		if(blue == null) {
			z = 0;
		}
		if(green == null) {
			y = 0;
		}
		if(red == null) {
			x = 0;
		}
		zero_utilities_Vec4.arr_set(this1,0,zero_utilities_Color.zero(x));
		zero_utilities_Vec4.arr_set(this1,1,zero_utilities_Color.zero(y));
		zero_utilities_Vec4.arr_set(this1,2,zero_utilities_Color.zero(z));
		zero_utilities_Vec4.arr_set(this1,3,zero_utilities_Color.zero(w));
		return this1;
	} else {
		var x = red;
		var y = green;
		var z = blue;
		var w = alpha;
		if(alpha == null) {
			w = 0;
		}
		if(blue == null) {
			z = 0;
		}
		if(green == null) {
			y = 0;
		}
		if(red == null) {
			x = 0;
		}
		return zero_utilities_Vec4.from_array_float([x,y,z,w]);
	}
};
zero_utilities_Color.put = function(this1) {
	zero_utilities_Color.pool.push(this1);
	this1 = null;
};
zero_utilities_Color.from_array_float = function(input) {
	return zero_utilities_Color.get(input[0],input[1],input[2],input[3]);
};
zero_utilities_Color.from_array_int = function(input) {
	return zero_utilities_Color.get(input[0],input[1],input[2],input[3]);
};
zero_utilities_Color.arr_set = function(this1,n,v) {
	if(n < 0 || n > 3) {
		return;
	} else {
		zero_utilities_Vec4.arr_set(this1,n,v);
	}
};
zero_utilities_Color.arr_get = function(this1,n) {
	return zero_utilities_Vec4.arr_get(this1,Math.floor(Math.max(Math.min(n,3),0)));
};
zero_utilities_Color.get_red = function(this1) {
	return this1[0];
};
zero_utilities_Color.set_red = function(this1,v) {
	return this1[0] = Math.min(Math.max(v,0),1);
};
zero_utilities_Color.get_green = function(this1) {
	return this1[1];
};
zero_utilities_Color.set_green = function(this1,v) {
	return this1[1] = Math.min(Math.max(v,0),1);
};
zero_utilities_Color.get_blue = function(this1) {
	return this1[2];
};
zero_utilities_Color.set_blue = function(this1,v) {
	return this1[2] = Math.min(Math.max(v,0),1);
};
zero_utilities_Color.get_alpha = function(this1) {
	return this1[3];
};
zero_utilities_Color.set_alpha = function(this1,v) {
	return this1[3] = Math.min(Math.max(v,0),1);
};
zero_utilities_Color.get_red_int = function(this1) {
	return Math.round(this1[0] * 255);
};
zero_utilities_Color.set_red_int = function(this1,v) {
	this1[0] = v / 255;
	return v;
};
zero_utilities_Color.get_green_int = function(this1) {
	return Math.round(this1[1] * 255);
};
zero_utilities_Color.set_green_int = function(this1,v) {
	this1[1] = v / 255;
	return v;
};
zero_utilities_Color.get_blue_int = function(this1) {
	return Math.round(this1[2] * 255);
};
zero_utilities_Color.set_blue_int = function(this1,v) {
	this1[2] = v / 255;
	return v;
};
zero_utilities_Color.get_alpha_int = function(this1) {
	return Math.round(this1[3] * 255);
};
zero_utilities_Color.set_alpha_int = function(this1,v) {
	this1[3] = v / 255;
	return v;
};
zero_utilities_Color.get_hue = function(this1) {
	if(Math.atan2(Math.sqrt(3) * (this1[1] - this1[2]),2 * this1[0] - this1[1] - this1[2]) != 0) {
		return (180 / Math.PI * Math.atan2(Math.sqrt(3) * (this1[1] - this1[2]),2 * this1[0] - this1[1] - this1[2]) + 360) % 360;
	} else {
		return 0;
	}
};
zero_utilities_Color.set_hue = function(this1,hue) {
	zero_utilities_Color.set_HSL(this1,hue,(Math.max(this1[0],Math.max(this1[1],this1[2])) - Math.min(this1[0],Math.min(this1[1],this1[2]))) / Math.max(this1[0],Math.max(this1[1],this1[2])),(Math.max(this1[0],Math.max(this1[1],this1[2])) + Math.min(this1[0],Math.min(this1[1],this1[2]))) / 2);
	return hue;
};
zero_utilities_Color.get_saturation = function(this1) {
	return (Math.max(this1[0],Math.max(this1[1],this1[2])) - Math.min(this1[0],Math.min(this1[1],this1[2]))) / Math.max(this1[0],Math.max(this1[1],this1[2]));
};
zero_utilities_Color.set_saturation = function(this1,saturation) {
	zero_utilities_Color.set_HSL(this1,Math.atan2(Math.sqrt(3) * (this1[1] - this1[2]),2 * this1[0] - this1[1] - this1[2]) != 0 ? (180 / Math.PI * Math.atan2(Math.sqrt(3) * (this1[1] - this1[2]),2 * this1[0] - this1[1] - this1[2]) + 360) % 360 : 0,saturation,(Math.max(this1[0],Math.max(this1[1],this1[2])) + Math.min(this1[0],Math.min(this1[1],this1[2]))) / 2);
	return saturation;
};
zero_utilities_Color.get_lightness = function(this1) {
	return (Math.max(this1[0],Math.max(this1[1],this1[2])) + Math.min(this1[0],Math.min(this1[1],this1[2]))) / 2;
};
zero_utilities_Color.set_lightness = function(this1,lightness) {
	zero_utilities_Color.set_HSL(this1,Math.atan2(Math.sqrt(3) * (this1[1] - this1[2]),2 * this1[0] - this1[1] - this1[2]) != 0 ? (180 / Math.PI * Math.atan2(Math.sqrt(3) * (this1[1] - this1[2]),2 * this1[0] - this1[1] - this1[2]) + 360) % 360 : 0,(Math.max(this1[0],Math.max(this1[1],this1[2])) - Math.min(this1[0],Math.min(this1[1],this1[2]))) / Math.max(this1[0],Math.max(this1[1],this1[2])),lightness);
	return lightness;
};
zero_utilities_Color.get_brightness = function(this1) {
	return Math.max(this1[0],Math.max(this1[1],this1[2]));
};
zero_utilities_Color.set_brightness = function(this1,brightness) {
	zero_utilities_Color.set_HSV(this1,Math.atan2(Math.sqrt(3) * (this1[1] - this1[2]),2 * this1[0] - this1[1] - this1[2]) != 0 ? (180 / Math.PI * Math.atan2(Math.sqrt(3) * (this1[1] - this1[2]),2 * this1[0] - this1[1] - this1[2]) + 360) % 360 : 0,(Math.max(this1[0],Math.max(this1[1],this1[2])) - Math.min(this1[0],Math.min(this1[1],this1[2]))) / Math.max(this1[0],Math.max(this1[1],this1[2])),brightness);
	return brightness;
};
zero_utilities_Color._new = function(x,y,z,w) {
	if(w == null) {
		w = 0;
	}
	if(z == null) {
		z = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	return zero_utilities_Vec4.from_array_float([x,y,z,w]);
};
zero_utilities_Color.set = function(this1,x,y,z,w) {
	if(w == null) {
		w = 0;
	}
	if(z == null) {
		z = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	zero_utilities_Vec4.arr_set(this1,0,zero_utilities_Color.zero(x));
	zero_utilities_Vec4.arr_set(this1,1,zero_utilities_Color.zero(y));
	zero_utilities_Vec4.arr_set(this1,2,zero_utilities_Color.zero(z));
	zero_utilities_Vec4.arr_set(this1,3,zero_utilities_Color.zero(w));
	return this1;
};
zero_utilities_Color.max_color = function(this1) {
	return Math.max(this1[0],Math.max(this1[1],this1[2]));
};
zero_utilities_Color.min_color = function(this1) {
	return Math.min(this1[0],Math.min(this1[1],this1[2]));
};
zero_utilities_Color.to_hex = function(this1) {
	return (Math.round(this1[3] * 255) & 255) << 24 | (Math.round(this1[0] * 255) & 255) << 16 | (Math.round(this1[1] * 255) & 255) << 8 | Math.round(this1[2] * 255) & 255;
};
zero_utilities_Color.to_hex_24 = function(this1) {
	return (Math.round(this1[0] * 255) & 255) << 16 | (Math.round(this1[1] * 255) & 255) << 8 | Math.round(this1[2] * 255) & 255;
};
zero_utilities_Color.from_int32 = function(this1,color) {
	var x = (color >> 16 & 255) / 255;
	var y = (color >> 8 & 255) / 255;
	var z = (color & 255) / 255;
	var w = (color >> 24 & 255) / 255;
	if(w == null) {
		w = 0;
	}
	if(z == null) {
		z = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	zero_utilities_Vec4.arr_set(this1,0,zero_utilities_Color.zero(x));
	zero_utilities_Vec4.arr_set(this1,1,zero_utilities_Color.zero(y));
	zero_utilities_Vec4.arr_set(this1,2,zero_utilities_Color.zero(z));
	zero_utilities_Vec4.arr_set(this1,3,zero_utilities_Color.zero(w));
	return this1;
};
zero_utilities_Color.equals = function(this1,color) {
	if(this1[0] == color[0] && this1[1] == color[1] && this1[2] == color[2]) {
		return this1[3] == color[3];
	} else {
		return false;
	}
};
zero_utilities_Color.toString = function(this1) {
	return "r: " + this1[0] + " | g: " + this1[1] + " | b: " + this1[2] + " | a: " + this1[3] + " | #" + StringTools.hex((Math.round(this1[3] * 255) & 255) << 24 | (Math.round(this1[0] * 255) & 255) << 16 | (Math.round(this1[1] * 255) & 255) << 8 | Math.round(this1[2] * 255) & 255);
};
zero_utilities_Color.set_HSL = function(this1,h,s,l) {
	h /= 360;
	zero_utilities_Color.set_from_hue(this1,h);
	var C = (1 - Math.abs(2 * l - 1)) * s;
	return zero_utilities_Vec4.add_f(zero_utilities_Vec4.multiply_f(zero_utilities_Vec4.subtract_f(this1,0.5),C),l);
};
zero_utilities_Color.set_HSV = function(this1,h,s,v) {
	zero_utilities_Color.set_from_hue(this1,Math.atan2(Math.sqrt(3) * (this1[1] - this1[2]),2 * this1[0] - this1[1] - this1[2]) != 0 ? (180 / Math.PI * Math.atan2(Math.sqrt(3) * (this1[1] - this1[2]),2 * this1[0] - this1[1] - this1[2]) + 360) % 360 : 0);
	this1[0] = Math.min(Math.max(((this1[0] - 1) * s + 1) * v,0),1);
	this1[1] = Math.min(Math.max(((this1[1] - 1) * s + 1) * v,0),1);
	this1[2] = Math.min(Math.max(((this1[2] - 1) * s + 1) * v,0),1);
	return this1;
};
zero_utilities_Color.set_from_hue = function(this1,hue) {
	this1[0] = Math.min(Math.max(Math.abs(hue * 6 - 3) - 1,0),1);
	this1[1] = Math.min(Math.max(2 - Math.abs(hue * 6 - 2),0),1);
	this1[2] = Math.min(Math.max(2 - Math.abs(hue * 6 - 4),0),1);
	return this1;
};
zero_utilities_Color.add = function(v1,v2) {
	return zero_utilities_Color.get(v1[0] + v2[0],v1[1] + v2[1],v1[2] + v2[2],v1[3] + v2[3]);
};
zero_utilities_Color.add_f = function(v,n) {
	return zero_utilities_Color.get(v[0] + n,v[1] + n,v[2] + n,v[3] + n);
};
zero_utilities_Color.subtract = function(v1,v2) {
	return zero_utilities_Color.get(v1[0] - v2[0],v1[1] - v2[1],v1[2] - v2[2],v1[3] - v2[3]);
};
zero_utilities_Color.subtract_f = function(v,n) {
	return zero_utilities_Color.get(v[0] - n,v[1] - n,v[2] - n,v[3] - n);
};
zero_utilities_Color.multiply = function(v1,v2) {
	return zero_utilities_Color.get(v1[0] * v2[0],v1[1] * v2[1],v1[2] * v2[2],v1[3] * v2[3]);
};
zero_utilities_Color.multiply_f = function(v,n) {
	return zero_utilities_Color.get(v[0] * n,v[1] * n,v[2] * n,v[3] * n);
};
zero_utilities_Color.divide = function(v1,v2) {
	return zero_utilities_Color.get(v1[0] / v2[0],v1[1] / v2[1],v1[2] / v2[2],v1[3] / v2[3]);
};
zero_utilities_Color.divide_f = function(v,n) {
	return zero_utilities_Color.get(v[0] / n,v[1] / n,v[2] / n,v[3] / n);
};
zero_utilities_Color.mod = function(v1,v2) {
	return zero_utilities_Color.get(v1[0] % v2[0],v1[1] % v2[1],v1[2] % v2[2],v1[3] % v2[3]);
};
zero_utilities_Color.mod_f = function(v,n) {
	return zero_utilities_Color.get(v[0] % n,v[1] % n,v[2] % n,v[3] % n);
};
zero_utilities_Color.get_rrr = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[0],this1[0]);
};
zero_utilities_Color.get_rrg = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[0],this1[1]);
};
zero_utilities_Color.get_rrb = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[0],this1[2]);
};
zero_utilities_Color.get_rgr = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[1],this1[0]);
};
zero_utilities_Color.get_rgg = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[1],this1[1]);
};
zero_utilities_Color.get_rgb = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[1],this1[2]);
};
zero_utilities_Color.get_rbr = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[2],this1[0]);
};
zero_utilities_Color.get_rbg = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[2],this1[1]);
};
zero_utilities_Color.get_rbb = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[2],this1[2]);
};
zero_utilities_Color.get_grr = function(this1) {
	return zero_utilities_Vec3.get(this1[1],this1[0],this1[0]);
};
zero_utilities_Color.get_grg = function(this1) {
	return zero_utilities_Vec3.get(this1[1],this1[0],this1[1]);
};
zero_utilities_Color.get_grb = function(this1) {
	return zero_utilities_Vec3.get(this1[1],this1[0],this1[2]);
};
zero_utilities_Color.get_ggr = function(this1) {
	return zero_utilities_Vec3.get(this1[1],this1[1],this1[0]);
};
zero_utilities_Color.get_ggg = function(this1) {
	return zero_utilities_Vec3.get(this1[1],this1[1],this1[1]);
};
zero_utilities_Color.get_ggb = function(this1) {
	return zero_utilities_Vec3.get(this1[1],this1[1],this1[2]);
};
zero_utilities_Color.get_gbr = function(this1) {
	return zero_utilities_Vec3.get(this1[1],this1[2],this1[0]);
};
zero_utilities_Color.get_gbg = function(this1) {
	return zero_utilities_Vec3.get(this1[1],this1[2],this1[1]);
};
zero_utilities_Color.get_gbb = function(this1) {
	return zero_utilities_Vec3.get(this1[1],this1[2],this1[2]);
};
zero_utilities_Color.get_brr = function(this1) {
	return zero_utilities_Vec3.get(this1[2],this1[0],this1[0]);
};
zero_utilities_Color.get_brg = function(this1) {
	return zero_utilities_Vec3.get(this1[2],this1[0],this1[1]);
};
zero_utilities_Color.get_brb = function(this1) {
	return zero_utilities_Vec3.get(this1[2],this1[0],this1[2]);
};
zero_utilities_Color.get_bgr = function(this1) {
	return zero_utilities_Vec3.get(this1[2],this1[1],this1[0]);
};
zero_utilities_Color.get_bgg = function(this1) {
	return zero_utilities_Vec3.get(this1[2],this1[1],this1[1]);
};
zero_utilities_Color.get_bgb = function(this1) {
	return zero_utilities_Vec3.get(this1[2],this1[1],this1[2]);
};
zero_utilities_Color.get_bbr = function(this1) {
	return zero_utilities_Vec3.get(this1[2],this1[2],this1[0]);
};
zero_utilities_Color.get_bbg = function(this1) {
	return zero_utilities_Vec3.get(this1[2],this1[2],this1[1]);
};
zero_utilities_Color.get_bbb = function(this1) {
	return zero_utilities_Vec3.get(this1[2],this1[2],this1[2]);
};
zero_utilities_Color.get_rrrr = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[0],this1[0],this1[0]);
};
zero_utilities_Color.get_rrrg = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[0],this1[0],this1[1]);
};
zero_utilities_Color.get_rrrb = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[0],this1[0],this1[2]);
};
zero_utilities_Color.get_rrra = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[0],this1[0],this1[3]);
};
zero_utilities_Color.get_rrgr = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[0],this1[1],this1[0]);
};
zero_utilities_Color.get_rrgg = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[0],this1[1],this1[1]);
};
zero_utilities_Color.get_rrgb = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[0],this1[1],this1[2]);
};
zero_utilities_Color.get_rrga = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[0],this1[1],this1[3]);
};
zero_utilities_Color.get_rrbr = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[0],this1[2],this1[0]);
};
zero_utilities_Color.get_rrbg = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[0],this1[2],this1[1]);
};
zero_utilities_Color.get_rrbb = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[0],this1[2],this1[2]);
};
zero_utilities_Color.get_rrba = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[0],this1[2],this1[3]);
};
zero_utilities_Color.get_rrar = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[0],this1[3],this1[0]);
};
zero_utilities_Color.get_rrag = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[0],this1[3],this1[1]);
};
zero_utilities_Color.get_rrab = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[0],this1[3],this1[2]);
};
zero_utilities_Color.get_rraa = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[0],this1[3],this1[3]);
};
zero_utilities_Color.get_rgrr = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[1],this1[0],this1[0]);
};
zero_utilities_Color.get_rgrg = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[1],this1[0],this1[1]);
};
zero_utilities_Color.get_rgrb = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[1],this1[0],this1[2]);
};
zero_utilities_Color.get_rgra = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[1],this1[0],this1[3]);
};
zero_utilities_Color.get_rggr = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[1],this1[1],this1[0]);
};
zero_utilities_Color.get_rggg = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[1],this1[1],this1[1]);
};
zero_utilities_Color.get_rggb = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[1],this1[1],this1[2]);
};
zero_utilities_Color.get_rgga = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[1],this1[1],this1[3]);
};
zero_utilities_Color.get_rgbr = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[1],this1[2],this1[0]);
};
zero_utilities_Color.get_rgbg = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[1],this1[2],this1[1]);
};
zero_utilities_Color.get_rgbb = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[1],this1[2],this1[2]);
};
zero_utilities_Color.get_rgba = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[1],this1[2],this1[3]);
};
zero_utilities_Color.get_rgar = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[1],this1[3],this1[0]);
};
zero_utilities_Color.get_rgag = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[1],this1[3],this1[1]);
};
zero_utilities_Color.get_rgab = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[1],this1[3],this1[2]);
};
zero_utilities_Color.get_rgaa = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[1],this1[3],this1[3]);
};
zero_utilities_Color.get_rbrr = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[2],this1[0],this1[0]);
};
zero_utilities_Color.get_rbrg = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[2],this1[0],this1[1]);
};
zero_utilities_Color.get_rbrb = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[2],this1[0],this1[2]);
};
zero_utilities_Color.get_rbra = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[2],this1[0],this1[3]);
};
zero_utilities_Color.get_rbgr = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[2],this1[1],this1[0]);
};
zero_utilities_Color.get_rbgg = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[2],this1[1],this1[1]);
};
zero_utilities_Color.get_rbgb = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[2],this1[1],this1[2]);
};
zero_utilities_Color.get_rbga = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[2],this1[1],this1[3]);
};
zero_utilities_Color.get_rbbr = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[2],this1[2],this1[0]);
};
zero_utilities_Color.get_rbbg = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[2],this1[2],this1[1]);
};
zero_utilities_Color.get_rbbb = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[2],this1[2],this1[2]);
};
zero_utilities_Color.get_rbba = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[2],this1[2],this1[3]);
};
zero_utilities_Color.get_rbar = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[2],this1[3],this1[0]);
};
zero_utilities_Color.get_rbag = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[2],this1[3],this1[1]);
};
zero_utilities_Color.get_rbab = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[2],this1[3],this1[2]);
};
zero_utilities_Color.get_rbaa = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[2],this1[3],this1[3]);
};
zero_utilities_Color.get_rarr = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[3],this1[0],this1[0]);
};
zero_utilities_Color.get_rarg = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[3],this1[0],this1[1]);
};
zero_utilities_Color.get_rarb = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[3],this1[0],this1[2]);
};
zero_utilities_Color.get_rara = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[3],this1[0],this1[3]);
};
zero_utilities_Color.get_ragr = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[3],this1[1],this1[0]);
};
zero_utilities_Color.get_ragg = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[3],this1[1],this1[1]);
};
zero_utilities_Color.get_ragb = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[3],this1[1],this1[2]);
};
zero_utilities_Color.get_raga = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[3],this1[1],this1[3]);
};
zero_utilities_Color.get_rabr = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[3],this1[2],this1[0]);
};
zero_utilities_Color.get_rabg = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[3],this1[2],this1[1]);
};
zero_utilities_Color.get_rabb = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[3],this1[2],this1[2]);
};
zero_utilities_Color.get_raba = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[3],this1[2],this1[3]);
};
zero_utilities_Color.get_raar = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[3],this1[3],this1[0]);
};
zero_utilities_Color.get_raag = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[3],this1[3],this1[1]);
};
zero_utilities_Color.get_raab = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[3],this1[3],this1[2]);
};
zero_utilities_Color.get_raaa = function(this1) {
	return zero_utilities_Color.get(this1[0],this1[3],this1[3],this1[3]);
};
zero_utilities_Color.get_grrr = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[0],this1[0],this1[0]);
};
zero_utilities_Color.get_grrg = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[0],this1[0],this1[1]);
};
zero_utilities_Color.get_grrb = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[0],this1[0],this1[2]);
};
zero_utilities_Color.get_grra = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[0],this1[0],this1[3]);
};
zero_utilities_Color.get_grgr = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[0],this1[1],this1[0]);
};
zero_utilities_Color.get_grgg = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[0],this1[1],this1[1]);
};
zero_utilities_Color.get_grgb = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[0],this1[1],this1[2]);
};
zero_utilities_Color.get_grga = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[0],this1[1],this1[3]);
};
zero_utilities_Color.get_grbr = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[0],this1[2],this1[0]);
};
zero_utilities_Color.get_grbg = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[0],this1[2],this1[1]);
};
zero_utilities_Color.get_grbb = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[0],this1[2],this1[2]);
};
zero_utilities_Color.get_grba = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[0],this1[2],this1[3]);
};
zero_utilities_Color.get_grar = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[0],this1[3],this1[0]);
};
zero_utilities_Color.get_grag = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[0],this1[3],this1[1]);
};
zero_utilities_Color.get_grab = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[0],this1[3],this1[2]);
};
zero_utilities_Color.get_graa = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[0],this1[3],this1[3]);
};
zero_utilities_Color.get_ggrr = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[1],this1[0],this1[0]);
};
zero_utilities_Color.get_ggrg = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[1],this1[0],this1[1]);
};
zero_utilities_Color.get_ggrb = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[1],this1[0],this1[2]);
};
zero_utilities_Color.get_ggra = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[1],this1[0],this1[3]);
};
zero_utilities_Color.get_gggr = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[1],this1[1],this1[0]);
};
zero_utilities_Color.get_gggg = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[1],this1[1],this1[1]);
};
zero_utilities_Color.get_gggb = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[1],this1[1],this1[2]);
};
zero_utilities_Color.get_ggga = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[1],this1[1],this1[3]);
};
zero_utilities_Color.get_ggbr = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[1],this1[2],this1[0]);
};
zero_utilities_Color.get_ggbg = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[1],this1[2],this1[1]);
};
zero_utilities_Color.get_ggbb = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[1],this1[2],this1[2]);
};
zero_utilities_Color.get_ggba = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[1],this1[2],this1[3]);
};
zero_utilities_Color.get_ggar = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[1],this1[3],this1[0]);
};
zero_utilities_Color.get_ggag = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[1],this1[3],this1[1]);
};
zero_utilities_Color.get_ggab = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[1],this1[3],this1[2]);
};
zero_utilities_Color.get_ggaa = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[1],this1[3],this1[3]);
};
zero_utilities_Color.get_gbrr = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[2],this1[0],this1[0]);
};
zero_utilities_Color.get_gbrg = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[2],this1[0],this1[1]);
};
zero_utilities_Color.get_gbrb = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[2],this1[0],this1[2]);
};
zero_utilities_Color.get_gbra = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[2],this1[0],this1[3]);
};
zero_utilities_Color.get_gbgr = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[2],this1[1],this1[0]);
};
zero_utilities_Color.get_gbgg = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[2],this1[1],this1[1]);
};
zero_utilities_Color.get_gbgb = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[2],this1[1],this1[2]);
};
zero_utilities_Color.get_gbga = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[2],this1[1],this1[3]);
};
zero_utilities_Color.get_gbbr = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[2],this1[2],this1[0]);
};
zero_utilities_Color.get_gbbg = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[2],this1[2],this1[1]);
};
zero_utilities_Color.get_gbbb = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[2],this1[2],this1[2]);
};
zero_utilities_Color.get_gbba = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[2],this1[2],this1[3]);
};
zero_utilities_Color.get_gbar = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[2],this1[3],this1[0]);
};
zero_utilities_Color.get_gbag = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[2],this1[3],this1[1]);
};
zero_utilities_Color.get_gbab = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[2],this1[3],this1[2]);
};
zero_utilities_Color.get_gbaa = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[2],this1[3],this1[3]);
};
zero_utilities_Color.get_garr = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[3],this1[0],this1[0]);
};
zero_utilities_Color.get_garg = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[3],this1[0],this1[1]);
};
zero_utilities_Color.get_garb = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[3],this1[0],this1[2]);
};
zero_utilities_Color.get_gara = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[3],this1[0],this1[3]);
};
zero_utilities_Color.get_gagr = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[3],this1[1],this1[0]);
};
zero_utilities_Color.get_gagg = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[3],this1[1],this1[1]);
};
zero_utilities_Color.get_gagb = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[3],this1[1],this1[2]);
};
zero_utilities_Color.get_gaga = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[3],this1[1],this1[3]);
};
zero_utilities_Color.get_gabr = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[3],this1[2],this1[0]);
};
zero_utilities_Color.get_gabg = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[3],this1[2],this1[1]);
};
zero_utilities_Color.get_gabb = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[3],this1[2],this1[2]);
};
zero_utilities_Color.get_gaba = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[3],this1[2],this1[3]);
};
zero_utilities_Color.get_gaar = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[3],this1[3],this1[0]);
};
zero_utilities_Color.get_gaag = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[3],this1[3],this1[1]);
};
zero_utilities_Color.get_gaab = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[3],this1[3],this1[2]);
};
zero_utilities_Color.get_gaaa = function(this1) {
	return zero_utilities_Color.get(this1[1],this1[3],this1[3],this1[3]);
};
zero_utilities_Color.get_brrr = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[0],this1[0],this1[0]);
};
zero_utilities_Color.get_brrg = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[0],this1[0],this1[1]);
};
zero_utilities_Color.get_brrb = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[0],this1[0],this1[2]);
};
zero_utilities_Color.get_brra = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[0],this1[0],this1[3]);
};
zero_utilities_Color.get_brgr = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[0],this1[1],this1[0]);
};
zero_utilities_Color.get_brgg = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[0],this1[1],this1[1]);
};
zero_utilities_Color.get_brgb = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[0],this1[1],this1[2]);
};
zero_utilities_Color.get_brga = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[0],this1[1],this1[3]);
};
zero_utilities_Color.get_brbr = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[0],this1[2],this1[0]);
};
zero_utilities_Color.get_brbg = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[0],this1[2],this1[1]);
};
zero_utilities_Color.get_brbb = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[0],this1[2],this1[2]);
};
zero_utilities_Color.get_brba = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[0],this1[2],this1[3]);
};
zero_utilities_Color.get_brar = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[0],this1[3],this1[0]);
};
zero_utilities_Color.get_brag = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[0],this1[3],this1[1]);
};
zero_utilities_Color.get_brab = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[0],this1[3],this1[2]);
};
zero_utilities_Color.get_braa = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[0],this1[3],this1[3]);
};
zero_utilities_Color.get_bgrr = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[1],this1[0],this1[0]);
};
zero_utilities_Color.get_bgrg = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[1],this1[0],this1[1]);
};
zero_utilities_Color.get_bgrb = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[1],this1[0],this1[2]);
};
zero_utilities_Color.get_bgra = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[1],this1[0],this1[3]);
};
zero_utilities_Color.get_bggr = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[1],this1[1],this1[0]);
};
zero_utilities_Color.get_bggg = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[1],this1[1],this1[1]);
};
zero_utilities_Color.get_bggb = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[1],this1[1],this1[2]);
};
zero_utilities_Color.get_bgga = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[1],this1[1],this1[3]);
};
zero_utilities_Color.get_bgbr = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[1],this1[2],this1[0]);
};
zero_utilities_Color.get_bgbg = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[1],this1[2],this1[1]);
};
zero_utilities_Color.get_bgbb = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[1],this1[2],this1[2]);
};
zero_utilities_Color.get_bgba = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[1],this1[2],this1[3]);
};
zero_utilities_Color.get_bgar = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[1],this1[3],this1[0]);
};
zero_utilities_Color.get_bgag = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[1],this1[3],this1[1]);
};
zero_utilities_Color.get_bgab = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[1],this1[3],this1[2]);
};
zero_utilities_Color.get_bgaa = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[1],this1[3],this1[3]);
};
zero_utilities_Color.get_bbrr = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[2],this1[0],this1[0]);
};
zero_utilities_Color.get_bbrg = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[2],this1[0],this1[1]);
};
zero_utilities_Color.get_bbrb = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[2],this1[0],this1[2]);
};
zero_utilities_Color.get_bbra = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[2],this1[0],this1[3]);
};
zero_utilities_Color.get_bbgr = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[2],this1[1],this1[0]);
};
zero_utilities_Color.get_bbgg = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[2],this1[1],this1[1]);
};
zero_utilities_Color.get_bbgb = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[2],this1[1],this1[2]);
};
zero_utilities_Color.get_bbga = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[2],this1[1],this1[3]);
};
zero_utilities_Color.get_bbbr = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[2],this1[2],this1[0]);
};
zero_utilities_Color.get_bbbg = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[2],this1[2],this1[1]);
};
zero_utilities_Color.get_bbbb = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[2],this1[2],this1[2]);
};
zero_utilities_Color.get_bbba = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[2],this1[2],this1[3]);
};
zero_utilities_Color.get_bbar = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[2],this1[3],this1[0]);
};
zero_utilities_Color.get_bbag = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[2],this1[3],this1[1]);
};
zero_utilities_Color.get_bbab = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[2],this1[3],this1[2]);
};
zero_utilities_Color.get_bbaa = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[2],this1[3],this1[3]);
};
zero_utilities_Color.get_barr = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[3],this1[0],this1[0]);
};
zero_utilities_Color.get_barg = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[3],this1[0],this1[1]);
};
zero_utilities_Color.get_barb = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[3],this1[0],this1[2]);
};
zero_utilities_Color.get_bara = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[3],this1[0],this1[3]);
};
zero_utilities_Color.get_bagr = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[3],this1[1],this1[0]);
};
zero_utilities_Color.get_bagg = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[3],this1[1],this1[1]);
};
zero_utilities_Color.get_bagb = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[3],this1[1],this1[2]);
};
zero_utilities_Color.get_baga = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[3],this1[1],this1[3]);
};
zero_utilities_Color.get_babr = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[3],this1[2],this1[0]);
};
zero_utilities_Color.get_babg = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[3],this1[2],this1[1]);
};
zero_utilities_Color.get_babb = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[3],this1[2],this1[2]);
};
zero_utilities_Color.get_baba = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[3],this1[2],this1[3]);
};
zero_utilities_Color.get_baar = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[3],this1[3],this1[0]);
};
zero_utilities_Color.get_baag = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[3],this1[3],this1[1]);
};
zero_utilities_Color.get_baab = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[3],this1[3],this1[2]);
};
zero_utilities_Color.get_baaa = function(this1) {
	return zero_utilities_Color.get(this1[2],this1[3],this1[3],this1[3]);
};
zero_utilities_Color.get_arrr = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[0],this1[0],this1[0]);
};
zero_utilities_Color.get_arrg = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[0],this1[0],this1[1]);
};
zero_utilities_Color.get_arrb = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[0],this1[0],this1[2]);
};
zero_utilities_Color.get_arra = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[0],this1[0],this1[3]);
};
zero_utilities_Color.get_argr = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[0],this1[1],this1[0]);
};
zero_utilities_Color.get_argg = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[0],this1[1],this1[1]);
};
zero_utilities_Color.get_argb = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[0],this1[1],this1[2]);
};
zero_utilities_Color.get_arga = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[0],this1[1],this1[3]);
};
zero_utilities_Color.get_arbr = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[0],this1[2],this1[0]);
};
zero_utilities_Color.get_arbg = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[0],this1[2],this1[1]);
};
zero_utilities_Color.get_arbb = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[0],this1[2],this1[2]);
};
zero_utilities_Color.get_arba = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[0],this1[2],this1[3]);
};
zero_utilities_Color.get_arar = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[0],this1[3],this1[0]);
};
zero_utilities_Color.get_arag = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[0],this1[3],this1[1]);
};
zero_utilities_Color.get_arab = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[0],this1[3],this1[2]);
};
zero_utilities_Color.get_araa = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[0],this1[3],this1[3]);
};
zero_utilities_Color.get_agrr = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[1],this1[0],this1[0]);
};
zero_utilities_Color.get_agrg = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[1],this1[0],this1[1]);
};
zero_utilities_Color.get_agrb = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[1],this1[0],this1[2]);
};
zero_utilities_Color.get_agra = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[1],this1[0],this1[3]);
};
zero_utilities_Color.get_aggr = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[1],this1[1],this1[0]);
};
zero_utilities_Color.get_aggg = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[1],this1[1],this1[1]);
};
zero_utilities_Color.get_aggb = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[1],this1[1],this1[2]);
};
zero_utilities_Color.get_agga = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[1],this1[1],this1[3]);
};
zero_utilities_Color.get_agbr = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[1],this1[2],this1[0]);
};
zero_utilities_Color.get_agbg = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[1],this1[2],this1[1]);
};
zero_utilities_Color.get_agbb = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[1],this1[2],this1[2]);
};
zero_utilities_Color.get_agba = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[1],this1[2],this1[3]);
};
zero_utilities_Color.get_agar = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[1],this1[3],this1[0]);
};
zero_utilities_Color.get_agag = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[1],this1[3],this1[1]);
};
zero_utilities_Color.get_agab = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[1],this1[3],this1[2]);
};
zero_utilities_Color.get_agaa = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[1],this1[3],this1[3]);
};
zero_utilities_Color.get_abrr = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[2],this1[0],this1[0]);
};
zero_utilities_Color.get_abrg = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[2],this1[0],this1[1]);
};
zero_utilities_Color.get_abrb = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[2],this1[0],this1[2]);
};
zero_utilities_Color.get_abra = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[2],this1[0],this1[3]);
};
zero_utilities_Color.get_abgr = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[2],this1[1],this1[0]);
};
zero_utilities_Color.get_abgg = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[2],this1[1],this1[1]);
};
zero_utilities_Color.get_abgb = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[2],this1[1],this1[2]);
};
zero_utilities_Color.get_abga = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[2],this1[1],this1[3]);
};
zero_utilities_Color.get_abbr = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[2],this1[2],this1[0]);
};
zero_utilities_Color.get_abbg = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[2],this1[2],this1[1]);
};
zero_utilities_Color.get_abbb = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[2],this1[2],this1[2]);
};
zero_utilities_Color.get_abba = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[2],this1[2],this1[3]);
};
zero_utilities_Color.get_abar = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[2],this1[3],this1[0]);
};
zero_utilities_Color.get_abag = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[2],this1[3],this1[1]);
};
zero_utilities_Color.get_abab = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[2],this1[3],this1[2]);
};
zero_utilities_Color.get_abaa = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[2],this1[3],this1[3]);
};
zero_utilities_Color.get_aarr = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[3],this1[0],this1[0]);
};
zero_utilities_Color.get_aarg = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[3],this1[0],this1[1]);
};
zero_utilities_Color.get_aarb = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[3],this1[0],this1[2]);
};
zero_utilities_Color.get_aara = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[3],this1[0],this1[3]);
};
zero_utilities_Color.get_aagr = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[3],this1[1],this1[0]);
};
zero_utilities_Color.get_aagg = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[3],this1[1],this1[1]);
};
zero_utilities_Color.get_aagb = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[3],this1[1],this1[2]);
};
zero_utilities_Color.get_aaga = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[3],this1[1],this1[3]);
};
zero_utilities_Color.get_aabr = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[3],this1[2],this1[0]);
};
zero_utilities_Color.get_aabg = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[3],this1[2],this1[1]);
};
zero_utilities_Color.get_aabb = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[3],this1[2],this1[2]);
};
zero_utilities_Color.get_aaba = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[3],this1[2],this1[3]);
};
zero_utilities_Color.get_aaar = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[3],this1[3],this1[0]);
};
zero_utilities_Color.get_aaag = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[3],this1[3],this1[1]);
};
zero_utilities_Color.get_aaab = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[3],this1[3],this1[2]);
};
zero_utilities_Color.get_aaaa = function(this1) {
	return zero_utilities_Color.get(this1[3],this1[3],this1[3],this1[3]);
};
var zero_utilities_Ease = function() { };
zero_utilities_Ease.__name__ = true;
zero_utilities_Ease.linear = function(t) {
	return t;
};
zero_utilities_Ease.quadIn = function(t) {
	return t * t;
};
zero_utilities_Ease.quadOut = function(t) {
	return -t * (t - 2);
};
zero_utilities_Ease.quadInOut = function(t) {
	if(t <= .5) {
		return t * t * 2;
	} else {
		return 1 - --t * t * 2;
	}
};
zero_utilities_Ease.cubeIn = function(t) {
	return t * t * t;
};
zero_utilities_Ease.cubeOut = function(t) {
	return 1 + --t * t * t;
};
zero_utilities_Ease.cubeInOut = function(t) {
	if(t <= .5) {
		return t * t * t * 4;
	} else {
		return 1 + --t * t * t * 4;
	}
};
zero_utilities_Ease.quartIn = function(t) {
	return t * t * t * t;
};
zero_utilities_Ease.quartOut = function(t) {
	return 1 - --t * t * t * t;
};
zero_utilities_Ease.quartInOut = function(t) {
	if(t <= .5) {
		return t * t * t * t * 8;
	} else {
		t = t * 2 - 2;
		return (1 - t * t * t * t) / 2 + .5;
	}
};
zero_utilities_Ease.quintIn = function(t) {
	return t * t * t * t * t;
};
zero_utilities_Ease.quintOut = function(t) {
	return --t * t * t * t * t + 1;
};
zero_utilities_Ease.quintInOut = function(t) {
	if((t *= 2) < 1) {
		return t * t * t * t * t / 2;
	} else {
		return ((t -= 2) * t * t * t * t + 2) / 2;
	}
};
zero_utilities_Ease.smoothStepIn = function(t) {
	var t1 = t / 2;
	return 2 * (t1 * t1 * (t1 * -2 + 3));
};
zero_utilities_Ease.smoothStepOut = function(t) {
	var t1 = t / 2 + 0.5;
	return 2 * (t1 * t1 * (t1 * -2 + 3)) - 1;
};
zero_utilities_Ease.smoothStepInOut = function(t) {
	return t * t * (t * -2 + 3);
};
zero_utilities_Ease.smootherStepIn = function(t) {
	var t1 = t / 2;
	return 2 * (t1 * t1 * t1 * (t1 * (t1 * 6 - 15) + 10));
};
zero_utilities_Ease.smootherStepOut = function(t) {
	var t1 = t / 2 + 0.5;
	return 2 * (t1 * t1 * t1 * (t1 * (t1 * 6 - 15) + 10)) - 1;
};
zero_utilities_Ease.smootherStepInOut = function(t) {
	return t * t * t * (t * (t * 6 - 15) + 10);
};
zero_utilities_Ease.sineIn = function(t) {
	return -Math.cos(zero_utilities_Ease.PI2 * t) + 1;
};
zero_utilities_Ease.sineOut = function(t) {
	return Math.sin(zero_utilities_Ease.PI2 * t);
};
zero_utilities_Ease.sineInOut = function(t) {
	return -Math.cos(Math.PI * t) / 2 + .5;
};
zero_utilities_Ease.bounceIn = function(t) {
	t = 1 - t;
	if(t < zero_utilities_Ease.B1) {
		return 1 - 7.5625 * t * t;
	}
	if(t < zero_utilities_Ease.B2) {
		return 1 - (7.5625 * (t - zero_utilities_Ease.B3) * (t - zero_utilities_Ease.B3) + .75);
	}
	if(t < zero_utilities_Ease.B4) {
		return 1 - (7.5625 * (t - zero_utilities_Ease.B5) * (t - zero_utilities_Ease.B5) + .9375);
	}
	return 1 - (7.5625 * (t - zero_utilities_Ease.B6) * (t - zero_utilities_Ease.B6) + .984375);
};
zero_utilities_Ease.bounceOut = function(t) {
	if(t < zero_utilities_Ease.B1) {
		return 7.5625 * t * t;
	}
	if(t < zero_utilities_Ease.B2) {
		return 7.5625 * (t - zero_utilities_Ease.B3) * (t - zero_utilities_Ease.B3) + .75;
	}
	if(t < zero_utilities_Ease.B4) {
		return 7.5625 * (t - zero_utilities_Ease.B5) * (t - zero_utilities_Ease.B5) + .9375;
	}
	return 7.5625 * (t - zero_utilities_Ease.B6) * (t - zero_utilities_Ease.B6) + .984375;
};
zero_utilities_Ease.bounceInOut = function(t) {
	if(t < .5) {
		t = 1 - t * 2;
		if(t < zero_utilities_Ease.B1) {
			return (1 - 7.5625 * t * t) / 2;
		}
		if(t < zero_utilities_Ease.B2) {
			return (1 - (7.5625 * (t - zero_utilities_Ease.B3) * (t - zero_utilities_Ease.B3) + .75)) / 2;
		}
		if(t < zero_utilities_Ease.B4) {
			return (1 - (7.5625 * (t - zero_utilities_Ease.B5) * (t - zero_utilities_Ease.B5) + .9375)) / 2;
		}
		return (1 - (7.5625 * (t - zero_utilities_Ease.B6) * (t - zero_utilities_Ease.B6) + .984375)) / 2;
	}
	t = t * 2 - 1;
	if(t < zero_utilities_Ease.B1) {
		return 7.5625 * t * t / 2 + .5;
	}
	if(t < zero_utilities_Ease.B2) {
		return (7.5625 * (t - zero_utilities_Ease.B3) * (t - zero_utilities_Ease.B3) + .75) / 2 + .5;
	}
	if(t < zero_utilities_Ease.B4) {
		return (7.5625 * (t - zero_utilities_Ease.B5) * (t - zero_utilities_Ease.B5) + .9375) / 2 + .5;
	}
	return (7.5625 * (t - zero_utilities_Ease.B6) * (t - zero_utilities_Ease.B6) + .984375) / 2 + .5;
};
zero_utilities_Ease.circIn = function(t) {
	return -(Math.sqrt(1 - t * t) - 1);
};
zero_utilities_Ease.circOut = function(t) {
	return Math.sqrt(1 - (t - 1) * (t - 1));
};
zero_utilities_Ease.circInOut = function(t) {
	if(t <= .5) {
		return (Math.sqrt(1 - t * t * 4) - 1) / -2;
	} else {
		return (Math.sqrt(1 - (t * 2 - 2) * (t * 2 - 2)) + 1) / 2;
	}
};
zero_utilities_Ease.expoIn = function(t) {
	return Math.pow(2,10 * (t - 1));
};
zero_utilities_Ease.expoOut = function(t) {
	return -Math.pow(2,-10 * t) + 1;
};
zero_utilities_Ease.expoInOut = function(t) {
	if(t < .5) {
		return Math.pow(2,10 * (t * 2 - 1)) / 2;
	} else {
		return (-Math.pow(2,-10 * (t * 2 - 1)) + 2) / 2;
	}
};
zero_utilities_Ease.backIn = function(t) {
	return t * t * (2.70158 * t - 1.70158);
};
zero_utilities_Ease.backOut = function(t) {
	return 1 - --t * t * (-2.70158 * t - 1.70158);
};
zero_utilities_Ease.backInOut = function(t) {
	t *= 2;
	if(t < 1) {
		return t * t * (2.70158 * t - 1.70158) / 2;
	}
	--t;
	return (1 - --t * t * (-2.70158 * t - 1.70158)) / 2 + .5;
};
zero_utilities_Ease.elasticIn = function(t) {
	return -(zero_utilities_Ease.ELASTIC_AMPLITUDE * Math.pow(2,10 * --t) * Math.sin((t - zero_utilities_Ease.ELASTIC_PERIOD / (2 * Math.PI) * Math.asin(1 / zero_utilities_Ease.ELASTIC_AMPLITUDE)) * (2 * Math.PI) / zero_utilities_Ease.ELASTIC_PERIOD));
};
zero_utilities_Ease.elasticOut = function(t) {
	return zero_utilities_Ease.ELASTIC_AMPLITUDE * Math.pow(2,-10 * t) * Math.sin((t - zero_utilities_Ease.ELASTIC_PERIOD / (2 * Math.PI) * Math.asin(1 / zero_utilities_Ease.ELASTIC_AMPLITUDE)) * (2 * Math.PI) / zero_utilities_Ease.ELASTIC_PERIOD) + 1;
};
zero_utilities_Ease.elasticInOut = function(t) {
	if(t < 0.5) {
		return -0.5 * (Math.pow(2,10 * (t -= 0.5)) * Math.sin((t - zero_utilities_Ease.ELASTIC_PERIOD / 4) * (2 * Math.PI) / zero_utilities_Ease.ELASTIC_PERIOD));
	}
	return Math.pow(2,-10 * (t -= 0.5)) * Math.sin((t - zero_utilities_Ease.ELASTIC_PERIOD / 4) * (2 * Math.PI) / zero_utilities_Ease.ELASTIC_PERIOD) * 0.5 + 1;
};
var zero_utilities_IntPoint = {};
zero_utilities_IntPoint.__properties__ = {get_angle:"get_angle",get_length:"get_length",set_y:"set_y",get_y:"get_y",set_x:"set_x",get_x:"get_x"};
zero_utilities_IntPoint.from_array_int = function(input) {
	return zero_utilities_IntPoint.get(input[0],input[1]);
};
zero_utilities_IntPoint.arr_set = function(this1,n,v) {
	if(n < 0 || n > 1) {
		return;
	} else {
		this1[n] = v;
	}
};
zero_utilities_IntPoint.arr_get = function(this1,n) {
	return this1[Math.floor(Math.max(Math.min(n,1),0))];
};
zero_utilities_IntPoint.get = function(x,y) {
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	if(zero_utilities_IntPoint.pool != null && zero_utilities_IntPoint.pool.length > 0) {
		var this1 = zero_utilities_IntPoint.pool.shift();
		var x1 = x;
		var y1 = y;
		if(y == null) {
			y1 = 0;
		}
		if(x == null) {
			x1 = 0;
		}
		this1[0] = x1;
		this1[1] = y1;
		return this1;
	} else {
		var x1 = x;
		var y1 = y;
		if(y == null) {
			y1 = 0;
		}
		if(x == null) {
			x1 = 0;
		}
		return [x1,y1];
	}
};
zero_utilities_IntPoint.put = function(this1) {
	zero_utilities_IntPoint.pool.push(this1);
	this1 = null;
};
zero_utilities_IntPoint._new = function(x,y) {
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	return [x,y];
};
zero_utilities_IntPoint.set = function(this1,x,y) {
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	this1[0] = x;
	this1[1] = y;
	return this1;
};
zero_utilities_IntPoint.get_x = function(this1) {
	return this1[0];
};
zero_utilities_IntPoint.set_x = function(this1,v) {
	return this1[0] = v;
};
zero_utilities_IntPoint.get_y = function(this1) {
	return this1[1];
};
zero_utilities_IntPoint.set_y = function(this1,v) {
	return this1[1] = v;
};
zero_utilities_IntPoint.get_length = function(this1) {
	return Math.sqrt(this1[0] * this1[0] + this1[1] * this1[1]);
};
zero_utilities_IntPoint.get_angle = function(this1) {
	return (Math.atan2(this1[1],this1[0]) * (180 / Math.PI) % 360 + 360) % 360;
};
zero_utilities_IntPoint.copy_from = function(this1,p) {
	var x = p[0];
	var y = p[1];
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	this1[0] = x;
	this1[1] = y;
	return this1;
};
zero_utilities_IntPoint.copy = function(this1) {
	return zero_utilities_IntPoint.get(this1[0],this1[1]);
};
zero_utilities_IntPoint.equals = function(this1,p) {
	if(this1[0] == p[0]) {
		return this1[1] == p[1];
	} else {
		return false;
	}
};
zero_utilities_IntPoint.distance = function(this1,p) {
	var this2 = zero_utilities_IntPoint.subtract(p,zero_utilities_IntPoint.from_array_int(this1));
	return Math.sqrt(this2[0] * this2[0] + this2[1] * this2[1]);
};
zero_utilities_IntPoint.toString = function(this1) {
	return "x: " + this1[0] + " | y: " + this1[1];
};
zero_utilities_IntPoint.add = function(v1,v2) {
	return zero_utilities_IntPoint.get(v1[0] + v2[0],v1[1] + v2[1]);
};
zero_utilities_IntPoint.add_int = function(v,n) {
	return zero_utilities_IntPoint.get(v[0] + n,v[1] + n);
};
zero_utilities_IntPoint.subtract = function(v1,v2) {
	return zero_utilities_IntPoint.get(v1[0] - v2[0],v1[1] - v2[1]);
};
zero_utilities_IntPoint.subtract_int = function(v,n) {
	return zero_utilities_IntPoint.get(v[0] - n,v[1] - n);
};
zero_utilities_IntPoint.multiply = function(v1,v2) {
	return zero_utilities_IntPoint.get(v1[0] * v2[0],v1[1] * v2[1]);
};
zero_utilities_IntPoint.multiply_int = function(v,n) {
	return zero_utilities_IntPoint.get(v[0] * n,v[1] * n);
};
zero_utilities_IntPoint.mod = function(v1,v2) {
	return zero_utilities_IntPoint.get(v1[0] % v2[0],v1[1] % v2[1]);
};
zero_utilities_IntPoint.mod_int = function(v,n) {
	return zero_utilities_IntPoint.get(v[0] % n,v[1] % n);
};
var zero_utilities_Timer = function() {
};
zero_utilities_Timer.__name__ = true;
zero_utilities_Timer.get = function(time,fn,repeat) {
	if(repeat == null) {
		repeat = 1;
	}
	var timer = zero_utilities_Timer.pool.length > 0 ? zero_utilities_Timer.pool.shift() : new zero_utilities_Timer();
	timer.time = time;
	timer.fn = fn;
	timer.repeat = repeat;
	timer.paused = false;
	timer.elapsed = 0;
	zero_utilities_Timer.timers.push(timer);
	return timer;
};
zero_utilities_Timer.update = function(dt) {
	var _g = 0;
	var _g1 = zero_utilities_Timer.timers;
	while(_g < _g1.length) _g1[_g++].run(dt);
};
zero_utilities_Timer.cancel_all = function() {
	var _g = 0;
	var _g1 = zero_utilities_Timer.timers;
	while(_g < _g1.length) _g1[_g++].cancel();
};
zero_utilities_Timer.prototype = {
	get_active: function() {
		return zero_utilities_Timer.timers.indexOf(this) >= 0;
	}
	,reset: function() {
		this.elapsed = 0;
	}
	,cancel: function() {
		if(HxOverrides.remove(zero_utilities_Timer.timers,this)) {
			zero_utilities_Timer.pool.push(this);
		}
	}
	,pause: function() {
		this.paused = true;
	}
	,unpause: function() {
		this.paused = false;
	}
	,get_remaining: function() {
		return this.time - this.elapsed;
	}
	,run: function(dt) {
		if(this.paused) {
			return;
		}
		this.elapsed += dt;
		if(this.time - this.elapsed > zero_utilities_Timer.epsilon) {
			return;
		}
		this.fn();
		this.elapsed = 0;
		this.repeat--;
		if(this.repeat != 0) {
			return;
		}
		this.cancel();
	}
	,toString: function() {
		return "time left: " + this.get_remaining();
	}
	,__properties__: {get_active:"get_active"}
};
var zero_utilities_Tween = function() {
	this.active = true;
};
zero_utilities_Tween.__name__ = true;
zero_utilities_Tween.get = function(target) {
	var tween = zero_utilities_Tween.pool.shift();
	if(tween == null) {
		tween = new zero_utilities_Tween();
	}
	tween.init(target);
	tween.active = true;
	zero_utilities_Tween.active_tweens.push(tween);
	return tween;
};
zero_utilities_Tween.tween = function(target,duration,properties,options) {
	var t = zero_utilities_Tween.get(target).duration(duration).prop(properties);
	if(options == null) {
		return t;
	}
	if(options.delay != null) {
		t.delay(options.delay);
	}
	if(options.ease != null) {
		t.ease(options.ease);
	}
	if(options.type != null) {
		t.type(options.type);
	}
	if(options.on_complete != null) {
		t.on_complete(options.on_complete);
	}
	return t;
};
zero_utilities_Tween.update = function(dt) {
	var _g = 0;
	var _g1 = zero_utilities_Tween.active_tweens;
	while(_g < _g1.length) _g1[_g++].update_tween(dt);
};
zero_utilities_Tween.prototype = {
	duration: function(time) {
		this.data.duration = time;
		return this;
	}
	,prop: function(properties) {
		var _g = 0;
		var _g1 = Reflect.fields(properties);
		while(_g < _g1.length) {
			var field = _g1[_g];
			++_g;
			var start = Reflect.getProperty(this.data.target,field);
			if(((this.data.target) instanceof Array)) {
				switch(field) {
				case "g":case "y":
					start = this.data.target[1];
					break;
				case "a":case "height":case "w":
					start = this.data.target[3];
					break;
				case "b":case "width":case "z":
					start = this.data.target[2];
					break;
				case "r":case "x":
					start = this.data.target[0];
					break;
				}
			}
			this.data.properties.push({ field : field, start : start == null ? 0 : start, end : Reflect.field(properties,field)});
		}
		return this;
	}
	,from_to: function(field,from,to) {
		this.data.properties.push({ field : field, start : from, end : to});
		return this;
	}
	,ease: function(ease) {
		this.data.ease = ease;
		return this;
	}
	,delay: function(time) {
		this.data.delay = time;
		this.data.delay_ref = time;
		return this;
	}
	,on_complete: function(fn) {
		this.data.on_complete = fn;
		return this;
	}
	,type: function(type) {
		this.data.type = type;
		var tmp;
		switch(type._hx_index) {
		case 1:case 3:
			tmp = true;
			break;
		case 0:case 2:case 4:
			tmp = false;
			break;
		}
		this.reverse = tmp;
		return this;
	}
	,get_period: function() {
		return this.period;
	}
	,set_period: function(period) {
		this.period = Math.max(Math.min(period,1),0);
		return this;
	}
	,get_duration: function() {
		if(this.data == null) {
			return -1;
		}
		return this.data.duration;
	}
	,set_duration: function(duration) {
		if(this.data == null) {
			return;
		}
		this.data.duration = duration;
	}
	,destroy: function() {
		this.data = null;
		HxOverrides.remove(zero_utilities_Tween.active_tweens,this);
		this.active = false;
		zero_utilities_Tween.pool.push(this);
	}
	,init: function(target) {
		this.data = this.get_default_data(target);
		this.period = 0;
		this.reverse = false;
	}
	,get_default_data: function(target) {
		return { target : target, duration : 1, properties : [], ease : function(f) {
			return f;
		}, delay : 0, delay_ref : 0, on_complete : function() {
		}, type : zero_utilities_TweenType.SINGLE_SHOT_FORWARDS};
	}
	,update_tween: function(dt) {
		if(!this.active) {
			return;
		}
		dt = this.update_dt(dt);
		this.update_period(dt);
	}
	,update_dt: function(dt) {
		if(this.data.delay > 0) {
			this.data.delay -= dt;
			if(this.data.delay > 0) {
				return 0;
			}
			dt = -this.data.delay;
		}
		return dt;
	}
	,update_period: function(dt) {
		if(dt == 0) {
			return;
		}
		var d = dt / this.data.duration;
		this.period += this.reverse ? -d : d;
		this.period = Math.max(Math.min(this.period,1),0);
		if(this.period == 0 || this.period == 1) {
			this.complete();
		} else {
			this.apply();
		}
	}
	,complete: function() {
		this.apply();
		this.data.on_complete();
		switch(this.data.type._hx_index) {
		case 0:case 1:
			this.destroy();
			break;
		case 2:case 3:case 4:
			this.reset();
			break;
		}
	}
	,reset: function() {
		if(this.data.type == zero_utilities_TweenType.PING_PONG) {
			this.reverse = !this.reverse;
		}
		this.data.delay = this.data.delay_ref;
		this.period = this.reverse ? 1 : 0;
	}
	,apply: function() {
		if(this.data == null) {
			return;
		}
		var eased_period = this.data.ease(this.period);
		var _g = 0;
		var _g1 = this.data.properties;
		while(_g < _g1.length) {
			var property = _g1[_g];
			++_g;
			var t1 = eased_period / 1;
			var val = (1 - t1) * property.start + t1 * property.end;
			if(((this.data.target) instanceof Array)) {
				switch(property.field) {
				case "g":case "y":
					this.data.target[1] = val;
					break;
				case "a":case "height":case "w":
					this.data.target[3] = val;
					break;
				case "b":case "width":case "z":
					this.data.target[2] = val;
					break;
				case "r":case "x":
					this.data.target[0] = val;
					break;
				}
			} else {
				Reflect.setProperty(this.data.target,property.field,val);
			}
		}
	}
};
var zero_utilities_TweenType = $hxEnums["zero.utilities.TweenType"] = { __ename__:true,__constructs__:null
	,SINGLE_SHOT_FORWARDS: {_hx_name:"SINGLE_SHOT_FORWARDS",_hx_index:0,__enum__:"zero.utilities.TweenType",toString:$estr}
	,SINGLE_SHOT_BACKWARDS: {_hx_name:"SINGLE_SHOT_BACKWARDS",_hx_index:1,__enum__:"zero.utilities.TweenType",toString:$estr}
	,LOOP_FORWARDS: {_hx_name:"LOOP_FORWARDS",_hx_index:2,__enum__:"zero.utilities.TweenType",toString:$estr}
	,LOOP_BACKWARDS: {_hx_name:"LOOP_BACKWARDS",_hx_index:3,__enum__:"zero.utilities.TweenType",toString:$estr}
	,PING_PONG: {_hx_name:"PING_PONG",_hx_index:4,__enum__:"zero.utilities.TweenType",toString:$estr}
};
zero_utilities_TweenType.__constructs__ = [zero_utilities_TweenType.SINGLE_SHOT_FORWARDS,zero_utilities_TweenType.SINGLE_SHOT_BACKWARDS,zero_utilities_TweenType.LOOP_FORWARDS,zero_utilities_TweenType.LOOP_BACKWARDS,zero_utilities_TweenType.PING_PONG];
zero_utilities_TweenType.__empty_constructs__ = [zero_utilities_TweenType.SINGLE_SHOT_FORWARDS,zero_utilities_TweenType.SINGLE_SHOT_BACKWARDS,zero_utilities_TweenType.LOOP_FORWARDS,zero_utilities_TweenType.LOOP_BACKWARDS,zero_utilities_TweenType.PING_PONG];
var zero_utilities_Vec2 = {};
zero_utilities_Vec2.__properties__ = {set_degrees:"set_degrees",get_degrees:"get_degrees",set_angle:"set_angle",get_angle:"get_angle",set_y:"set_y",get_y:"get_y",set_x:"set_x",get_x:"get_x",set_length:"set_length",get_length:"get_length",set_radians:"set_radians",get_radians:"get_radians"};
zero_utilities_Vec2.get = function(x,y) {
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	if(zero_utilities_Vec2.pool.length > 0) {
		return zero_utilities_Vec2.set(zero_utilities_Vec2.pool.shift(),x,y);
	}
	return zero_utilities_Vec2._new(x,y);
};
zero_utilities_Vec2.zero = function(v) {
	if(Math.abs(v) <= 1e-8) {
		return 0;
	} else {
		return v;
	}
};
zero_utilities_Vec2._new = function(x,y) {
	return [Math.atan2(y,x),Math.sqrt(x * x + y * y)];
};
zero_utilities_Vec2.set = function(this1,x,y) {
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	zero_utilities_Vec2.set_length(this1,Math.sqrt(x * x + y * y));
	zero_utilities_Vec2.set_radians(this1,Math.atan2(y,x));
	return this1;
};
zero_utilities_Vec2.put = function(this1) {
	this1 = [];
	zero_utilities_Vec2.pool.push(this1);
};
zero_utilities_Vec2.normalize = function(this1) {
	return zero_utilities_Vec2.set(this1,zero_utilities_Vec2.get_x(this1) / zero_utilities_Vec2.get_length(this1),zero_utilities_Vec2.get_y(this1) / zero_utilities_Vec2.get_length(this1));
};
zero_utilities_Vec2.scale = function(this1,scalar) {
	return zero_utilities_Vec2.set(this1,zero_utilities_Vec2.get_x(this1) * scalar,zero_utilities_Vec2.get_y(this1) * scalar);
};
zero_utilities_Vec2.dot = function(this1,v) {
	return zero_utilities_Vec2.zero(zero_utilities_Vec2.get_x(this1) * zero_utilities_Vec2.get_x(v) + zero_utilities_Vec2.get_y(this1) * zero_utilities_Vec2.get_y(v));
};
zero_utilities_Vec2.cross = function(this1,v) {
	return zero_utilities_Vec2.zero(zero_utilities_Vec2.get_x(this1) * zero_utilities_Vec2.get_y(v) - zero_utilities_Vec2.get_y(this1) * zero_utilities_Vec2.get_x(v));
};
zero_utilities_Vec2.distance = function(this1,v) {
	return Math.sqrt(Math.pow(zero_utilities_Vec2.get_x(this1) - zero_utilities_Vec2.get_x(v),2) + Math.pow(zero_utilities_Vec2.get_y(this1) - zero_utilities_Vec2.get_y(v),2));
};
zero_utilities_Vec2.rad_between = function(this1,v) {
	return Math.atan2(zero_utilities_Vec2.get_y(v) - zero_utilities_Vec2.get_y(this1),zero_utilities_Vec2.get_x(v) - zero_utilities_Vec2.get_x(this1));
};
zero_utilities_Vec2.deg_between = function(this1,v) {
	return Math.atan2(zero_utilities_Vec2.get_y(v) - zero_utilities_Vec2.get_y(this1),zero_utilities_Vec2.get_x(v) - zero_utilities_Vec2.get_x(this1)) * (180 / Math.PI);
};
zero_utilities_Vec2.angle_between = function(this1,v) {
	if(zero_utilities_Vec2.use_radians) {
		return Math.atan2(zero_utilities_Vec2.get_y(v) - zero_utilities_Vec2.get_y(this1),zero_utilities_Vec2.get_x(v) - zero_utilities_Vec2.get_x(this1));
	} else {
		return Math.atan2(zero_utilities_Vec2.get_y(v) - zero_utilities_Vec2.get_y(this1),zero_utilities_Vec2.get_x(v) - zero_utilities_Vec2.get_x(this1)) * (180 / Math.PI);
	}
};
zero_utilities_Vec2.in_circle = function(this1,cx,cy,cr) {
	return Math.sqrt(Math.pow(zero_utilities_Vec2.get_x(this1) - cx,2) + Math.pow(zero_utilities_Vec2.get_y(this1) - cy,2)) <= cr;
};
zero_utilities_Vec2.copy_from = function(this1,v) {
	return zero_utilities_Vec2.set(this1,zero_utilities_Vec2.get_x(v),zero_utilities_Vec2.get_y(v));
};
zero_utilities_Vec2.copy = function(this1) {
	return zero_utilities_Vec2.get(zero_utilities_Vec2.get_x(this1),zero_utilities_Vec2.get_y(this1));
};
zero_utilities_Vec2.toString = function(this1) {
	return "x:" + zero_utilities_Vec2.get_x(this1) + ", y:" + zero_utilities_Vec2.get_y(this1) + ", length:" + zero_utilities_Vec2.get_length(this1) + ", angle:" + zero_utilities_Vec2.get_angle(this1);
};
zero_utilities_Vec2.get_radians = function(this1) {
	return this1[0];
};
zero_utilities_Vec2.get_length = function(this1) {
	return Math.abs(this1[1]);
};
zero_utilities_Vec2.get_x = function(this1) {
	return zero_utilities_Vec2.zero(zero_utilities_Vec2.get_length(this1) * Math.cos(zero_utilities_Vec2.get_radians(this1)));
};
zero_utilities_Vec2.get_y = function(this1) {
	return zero_utilities_Vec2.zero(zero_utilities_Vec2.get_length(this1) * Math.sin(zero_utilities_Vec2.get_radians(this1)));
};
zero_utilities_Vec2.get_angle = function(this1) {
	if(zero_utilities_Vec2.use_radians) {
		return zero_utilities_Vec2.get_radians(this1);
	} else {
		return zero_utilities_Vec2.get_degrees(this1);
	}
};
zero_utilities_Vec2.get_degrees = function(this1) {
	return zero_utilities_Vec2.get_radians(this1) * (180 / Math.PI);
};
zero_utilities_Vec2.set_radians = function(this1,v) {
	return this1[0] = v;
};
zero_utilities_Vec2.set_length = function(this1,v) {
	if(v < 0.0) {
		zero_utilities_Vec2.set_radians(this1,zero_utilities_Vec2.get_radians(this1) + Math.PI);
	}
	return this1[1] = Math.abs(v);
};
zero_utilities_Vec2.set_x = function(this1,v) {
	if(this1[2] == v) {
		return v;
	}
	this1[2] = v;
	var y = zero_utilities_Vec2.get_y(this1);
	zero_utilities_Vec2.set_length(this1,Math.sqrt(v * v + y * y));
	zero_utilities_Vec2.set_radians(this1,Math.atan2(y,v));
	return v;
};
zero_utilities_Vec2.set_y = function(this1,v) {
	if(this1[3] == v) {
		return v;
	}
	this1[3] = v;
	var x = zero_utilities_Vec2.get_x(this1);
	zero_utilities_Vec2.set_length(this1,Math.sqrt(x * x + v * v));
	zero_utilities_Vec2.set_radians(this1,Math.atan2(v,x));
	return v;
};
zero_utilities_Vec2.set_degrees = function(this1,v) {
	zero_utilities_Vec2.set_radians(this1,v * (Math.PI / 180));
	return v;
};
zero_utilities_Vec2.set_angle = function(this1,v) {
	zero_utilities_Vec2.set_radians(this1,zero_utilities_Vec2.use_radians ? v : v * (Math.PI / 180));
	return v;
};
zero_utilities_Vec2.add = function(v1,v2) {
	return zero_utilities_Vec2.get(zero_utilities_Vec2.get_x(v1) + zero_utilities_Vec2.get_x(v2),zero_utilities_Vec2.get_y(v1) + zero_utilities_Vec2.get_y(v2));
};
zero_utilities_Vec2.subtract = function(v1,v2) {
	return zero_utilities_Vec2.get(zero_utilities_Vec2.get_x(v1) - zero_utilities_Vec2.get_x(v2),zero_utilities_Vec2.get_y(v1) - zero_utilities_Vec2.get_y(v2));
};
zero_utilities_Vec2.dot_product = function(v1,v2) {
	return zero_utilities_Vec2.zero(zero_utilities_Vec2.get_x(v1) * zero_utilities_Vec2.get_x(v2) + zero_utilities_Vec2.get_y(v1) * zero_utilities_Vec2.get_y(v2));
};
zero_utilities_Vec2.cross_product = function(v1,v2) {
	return zero_utilities_Vec2.zero(zero_utilities_Vec2.get_x(v1) * zero_utilities_Vec2.get_y(v2) - zero_utilities_Vec2.get_y(v1) * zero_utilities_Vec2.get_x(v2));
};
zero_utilities_Vec2.is_equal = function(v1,v2) {
	if(zero_utilities_Vec2.get_radians(v1) == zero_utilities_Vec2.get_radians(v2)) {
		return zero_utilities_Vec2.get_length(v1) == zero_utilities_Vec2.get_length(v2);
	} else {
		return false;
	}
};
zero_utilities_Vec2.add_float = function(v1,f) {
	return zero_utilities_Vec2.get(zero_utilities_Vec2.get_x(v1) + f,zero_utilities_Vec2.get_y(v1) + f);
};
zero_utilities_Vec2.subtract_float = function(v1,f) {
	return zero_utilities_Vec2.get(zero_utilities_Vec2.get_x(v1) - f,zero_utilities_Vec2.get_y(v1) - f);
};
zero_utilities_Vec2.multiply_float = function(v1,f) {
	return zero_utilities_Vec2.get(zero_utilities_Vec2.get_x(v1) * f,zero_utilities_Vec2.get_y(v1) * f);
};
zero_utilities_Vec2.divide_float = function(v1,f) {
	return zero_utilities_Vec2.get(zero_utilities_Vec2.get_x(v1) / f,zero_utilities_Vec2.get_y(v1) / f);
};
var zero_utilities_Vec3 = {};
zero_utilities_Vec3.__properties__ = {get_zzzz:"get_zzzz",get_zzzy:"get_zzzy",get_zzzx:"get_zzzx",get_zzyz:"get_zzyz",get_zzyy:"get_zzyy",get_zzyx:"get_zzyx",get_zzxz:"get_zzxz",get_zzxy:"get_zzxy",get_zzxx:"get_zzxx",get_zyzz:"get_zyzz",get_zyzy:"get_zyzy",get_zyzx:"get_zyzx",get_zyyz:"get_zyyz",get_zyyy:"get_zyyy",get_zyyx:"get_zyyx",get_zyxz:"get_zyxz",get_zyxy:"get_zyxy",get_zyxx:"get_zyxx",get_zxzz:"get_zxzz",get_zxzy:"get_zxzy",get_zxzx:"get_zxzx",get_zxyz:"get_zxyz",get_zxyy:"get_zxyy",get_zxyx:"get_zxyx",get_zxxz:"get_zxxz",get_zxxy:"get_zxxy",get_zxxx:"get_zxxx",get_yzzz:"get_yzzz",get_yzzy:"get_yzzy",get_yzzx:"get_yzzx",get_yzyz:"get_yzyz",get_yzyy:"get_yzyy",get_yzyx:"get_yzyx",get_yzxz:"get_yzxz",get_yzxy:"get_yzxy",get_yzxx:"get_yzxx",get_yyzz:"get_yyzz",get_yyzy:"get_yyzy",get_yyzx:"get_yyzx",get_yyyz:"get_yyyz",get_yyyy:"get_yyyy",get_yyyx:"get_yyyx",get_yyxz:"get_yyxz",get_yyxy:"get_yyxy",get_yyxx:"get_yyxx",get_yxzz:"get_yxzz",get_yxzy:"get_yxzy",get_yxzx:"get_yxzx",get_yxyz:"get_yxyz",get_yxyy:"get_yxyy",get_yxyx:"get_yxyx",get_yxxz:"get_yxxz",get_yxxy:"get_yxxy",get_yxxx:"get_yxxx",get_xzzz:"get_xzzz",get_xzzy:"get_xzzy",get_xzzx:"get_xzzx",get_xzyz:"get_xzyz",get_xzyy:"get_xzyy",get_xzyx:"get_xzyx",get_xzxz:"get_xzxz",get_xzxy:"get_xzxy",get_xzxx:"get_xzxx",get_xyzz:"get_xyzz",get_xyzy:"get_xyzy",get_xyzx:"get_xyzx",get_xyyz:"get_xyyz",get_xyyy:"get_xyyy",get_xyyx:"get_xyyx",get_xyxz:"get_xyxz",get_xyxy:"get_xyxy",get_xyxx:"get_xyxx",get_xxzz:"get_xxzz",get_xxzy:"get_xxzy",get_xxzx:"get_xxzx",get_xxyz:"get_xxyz",get_xxyy:"get_xxyy",get_xxyx:"get_xxyx",get_xxxz:"get_xxxz",get_xxxy:"get_xxxy",get_xxxx:"get_xxxx",get_zzz:"get_zzz",get_zzy:"get_zzy",get_zzx:"get_zzx",get_zyz:"get_zyz",get_zyy:"get_zyy",get_zyx:"get_zyx",get_zxz:"get_zxz",get_zxy:"get_zxy",get_zxx:"get_zxx",get_yzz:"get_yzz",get_yzy:"get_yzy",get_yzx:"get_yzx",get_yyz:"get_yyz",get_yyy:"get_yyy",get_yyx:"get_yyx",get_yxz:"get_yxz",get_yxy:"get_yxy",get_yxx:"get_yxx",get_xzz:"get_xzz",get_xzy:"get_xzy",get_xzx:"get_xzx",get_xyz:"get_xyz",get_xyy:"get_xyy",get_xyx:"get_xyx",get_xxz:"get_xxz",get_xxy:"get_xxy",get_xxx:"get_xxx",get_zz:"get_zz",get_zy:"get_zy",get_zx:"get_zx",get_yz:"get_yz",get_yy:"get_yy",get_yx:"get_yx",get_xz:"get_xz",get_xy:"get_xy",get_xx:"get_xx",set_length:"set_length",get_length:"get_length",set_z:"set_z",get_z:"get_z",set_y:"set_y",get_y:"get_y",set_x:"set_x",get_x:"get_x"};
zero_utilities_Vec3.zero = function(n) {
	if(Math.abs(n) <= zero_utilities_Vec3.epsilon) {
		return 0;
	} else {
		return n;
	}
};
zero_utilities_Vec3.from_array_float = function(input) {
	return zero_utilities_Vec3.get(input[0],input[1],input[2]);
};
zero_utilities_Vec3.from_array_int = function(input) {
	return zero_utilities_Vec3.get(input[0],input[1],input[2]);
};
zero_utilities_Vec3.arr_set = function(this1,n,v) {
	if(n < 0 || n > 2) {
		return;
	} else {
		this1[n] = v;
	}
};
zero_utilities_Vec3.arr_get = function(this1,n) {
	return this1[Math.floor(Math.max(Math.min(n,2),0))];
};
zero_utilities_Vec3.get = function(x,y,z) {
	if(z == null) {
		z = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	if(zero_utilities_Vec3.pool != null && zero_utilities_Vec3.pool.length > 0) {
		var this1 = zero_utilities_Vec3.pool.pop();
		var x1 = x;
		var y1 = y;
		var z1 = z;
		if(z == null) {
			z1 = 0;
		}
		if(y == null) {
			y1 = 0;
		}
		if(x == null) {
			x1 = 0;
		}
		this1[0] = zero_utilities_Vec3.zero(x1);
		this1[1] = zero_utilities_Vec3.zero(y1);
		this1[2] = zero_utilities_Vec3.zero(z1);
		return this1;
	}
	var x1 = x;
	var y1 = y;
	var z1 = z;
	if(z == null) {
		z1 = 0;
	}
	if(y == null) {
		y1 = 0;
	}
	if(x == null) {
		x1 = 0;
	}
	return [x1,y1,z1];
};
zero_utilities_Vec3.put = function(this1) {
	zero_utilities_Vec3.pool.push(zero_utilities_Vec3.from_array_float(this1));
	this1 = null;
};
zero_utilities_Vec3._new = function(x,y,z) {
	if(z == null) {
		z = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	return [x,y,z];
};
zero_utilities_Vec3.set = function(this1,x,y,z) {
	if(z == null) {
		z = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	this1[0] = zero_utilities_Vec3.zero(x);
	this1[1] = zero_utilities_Vec3.zero(y);
	this1[2] = zero_utilities_Vec3.zero(z);
	return this1;
};
zero_utilities_Vec3.get_x = function(this1) {
	return this1[0];
};
zero_utilities_Vec3.set_x = function(this1,v) {
	return this1[0] = v;
};
zero_utilities_Vec3.get_y = function(this1) {
	return this1[1];
};
zero_utilities_Vec3.set_y = function(this1,v) {
	return this1[1] = v;
};
zero_utilities_Vec3.get_z = function(this1) {
	return this1[2];
};
zero_utilities_Vec3.set_z = function(this1,v) {
	return this1[2] = v;
};
zero_utilities_Vec3.get_length = function(this1) {
	return Math.sqrt(this1[0] * this1[0] + this1[1] * this1[1] + this1[2] * this1[2]);
};
zero_utilities_Vec3.set_length = function(this1,v) {
	var n = 1 / Math.sqrt(this1[0] * this1[0] + this1[1] * this1[1] + this1[2] * this1[2]);
	var x = this1[0] * n;
	var y = this1[1] * n;
	var z = this1[2] * n;
	if(z == null) {
		z = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	this1[0] = zero_utilities_Vec3.zero(x);
	this1[1] = zero_utilities_Vec3.zero(y);
	this1[2] = zero_utilities_Vec3.zero(z);
	var x = this1[0] * v;
	var y = this1[1] * v;
	var z = this1[2] * v;
	if(z == null) {
		z = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	this1[0] = zero_utilities_Vec3.zero(x);
	this1[1] = zero_utilities_Vec3.zero(y);
	this1[2] = zero_utilities_Vec3.zero(z);
	return v;
};
zero_utilities_Vec3.copy_from = function(this1,v) {
	var x = v[0];
	var y = v[1];
	var z = v[2];
	if(z == null) {
		z = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	this1[0] = zero_utilities_Vec3.zero(x);
	this1[1] = zero_utilities_Vec3.zero(y);
	this1[2] = zero_utilities_Vec3.zero(z);
	return this1;
};
zero_utilities_Vec3.scale = function(this1,n) {
	var x = this1[0] * n;
	var y = this1[1] * n;
	var z = this1[2] * n;
	if(z == null) {
		z = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	this1[0] = zero_utilities_Vec3.zero(x);
	this1[1] = zero_utilities_Vec3.zero(y);
	this1[2] = zero_utilities_Vec3.zero(z);
	return this1;
};
zero_utilities_Vec3.normalize = function(this1) {
	var n = 1 / Math.sqrt(this1[0] * this1[0] + this1[1] * this1[1] + this1[2] * this1[2]);
	var x = this1[0] * n;
	var y = this1[1] * n;
	var z = this1[2] * n;
	if(z == null) {
		z = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	this1[0] = zero_utilities_Vec3.zero(x);
	this1[1] = zero_utilities_Vec3.zero(y);
	this1[2] = zero_utilities_Vec3.zero(z);
	return this1;
};
zero_utilities_Vec3.copy = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[1],this1[2]);
};
zero_utilities_Vec3.equals = function(this1,v) {
	if(this1[0] == v[0] && this1[1] == v[1]) {
		return this1[2] == v[2];
	} else {
		return false;
	}
};
zero_utilities_Vec3.to_hex = function(this1) {
	return (Math.round(this1[0] * 255) & 255) << 16 | (Math.round(this1[1] * 255) & 255) << 8 | Math.round(this1[2] * 255) & 255;
};
zero_utilities_Vec3.toString = function(this1) {
	return "x: " + this1[0] + " | y: " + this1[1] + " | z: " + this1[2];
};
zero_utilities_Vec3.dot = function(this1,v) {
	return this1[0] * v[0] + this1[1] * v[1] + this1[2] * v[2];
};
zero_utilities_Vec3.cross = function(this1,v) {
	return zero_utilities_Vec3.get(this1[1] * v[2] - this1[2] * v[1],this1[2] * v[0] - this1[0] * v[2],this1[0] * v[1] - this1[1] * v[0]);
};
zero_utilities_Vec3.distance = function(this1,v) {
	return Math.sqrt(Math.pow(v.x - this1[0],2) + Math.pow(v.y - this1[1],2) + Math.pow(v.z - this1[2],2));
};
zero_utilities_Vec3.add = function(v1,v2) {
	return zero_utilities_Vec3.get(v1[0] + v2[0],v1[1] + v2[1],v1[2] + v2[2]);
};
zero_utilities_Vec3.add_f = function(v,n) {
	return zero_utilities_Vec3.get(v[0] + n,v[1] + n,v[2] + n);
};
zero_utilities_Vec3.subtract = function(v1,v2) {
	return zero_utilities_Vec3.get(v1[0] - v2[0],v1[1] - v2[1],v1[2] - v2[2]);
};
zero_utilities_Vec3.subtract_f = function(v,n) {
	return zero_utilities_Vec3.get(v[0] - n,v[1] - n,v[2] - n);
};
zero_utilities_Vec3.multiply = function(v1,v2) {
	return zero_utilities_Vec3.get(v1[0] * v2[0],v1[1] * v2[1],v1[2] * v2[2]);
};
zero_utilities_Vec3.multiply_f = function(v,n) {
	return zero_utilities_Vec3.get(v[0] * n,v[1] * n,v[2] * n);
};
zero_utilities_Vec3.divide = function(v1,v2) {
	return zero_utilities_Vec3.get(v1[0] / v2[0],v1[1] / v2[1],v1[2] / v2[2]);
};
zero_utilities_Vec3.divide_f = function(v,n) {
	return zero_utilities_Vec3.get(v[0] / n,v[1] / n,v[2] / n);
};
zero_utilities_Vec3.mod = function(v1,v2) {
	return zero_utilities_Vec3.get(v1[0] % v2[0],v1[1] % v2[1],v1[2] % v2[2]);
};
zero_utilities_Vec3.mod_f = function(v,n) {
	return zero_utilities_Vec3.get(v[0] % n,v[1] % n,v[2] % n);
};
zero_utilities_Vec3.get_xx = function(this1) {
	return zero_utilities_Vec2.get(this1[0],this1[0]);
};
zero_utilities_Vec3.get_xy = function(this1) {
	return zero_utilities_Vec2.get(this1[0],this1[1]);
};
zero_utilities_Vec3.get_xz = function(this1) {
	return zero_utilities_Vec2.get(this1[0],this1[2]);
};
zero_utilities_Vec3.get_yx = function(this1) {
	return zero_utilities_Vec2.get(this1[1],this1[0]);
};
zero_utilities_Vec3.get_yy = function(this1) {
	return zero_utilities_Vec2.get(this1[1],this1[1]);
};
zero_utilities_Vec3.get_yz = function(this1) {
	return zero_utilities_Vec2.get(this1[1],this1[2]);
};
zero_utilities_Vec3.get_zx = function(this1) {
	return zero_utilities_Vec2.get(this1[2],this1[0]);
};
zero_utilities_Vec3.get_zy = function(this1) {
	return zero_utilities_Vec2.get(this1[2],this1[1]);
};
zero_utilities_Vec3.get_zz = function(this1) {
	return zero_utilities_Vec2.get(this1[2],this1[2]);
};
zero_utilities_Vec3.get_xxx = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[0],this1[0]);
};
zero_utilities_Vec3.get_xxy = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[0],this1[1]);
};
zero_utilities_Vec3.get_xxz = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[0],this1[2]);
};
zero_utilities_Vec3.get_xyx = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[1],this1[0]);
};
zero_utilities_Vec3.get_xyy = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[1],this1[1]);
};
zero_utilities_Vec3.get_xyz = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[1],this1[2]);
};
zero_utilities_Vec3.get_xzx = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[2],this1[0]);
};
zero_utilities_Vec3.get_xzy = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[2],this1[1]);
};
zero_utilities_Vec3.get_xzz = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[2],this1[2]);
};
zero_utilities_Vec3.get_yxx = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[0],this1[0]);
};
zero_utilities_Vec3.get_yxy = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[0],this1[1]);
};
zero_utilities_Vec3.get_yxz = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[0],this1[2]);
};
zero_utilities_Vec3.get_yyx = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[1],this1[0]);
};
zero_utilities_Vec3.get_yyy = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[1],this1[1]);
};
zero_utilities_Vec3.get_yyz = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[1],this1[2]);
};
zero_utilities_Vec3.get_yzx = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[2],this1[0]);
};
zero_utilities_Vec3.get_yzy = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[2],this1[1]);
};
zero_utilities_Vec3.get_yzz = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[2],this1[2]);
};
zero_utilities_Vec3.get_zxx = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[0],this1[0]);
};
zero_utilities_Vec3.get_zxy = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[0],this1[1]);
};
zero_utilities_Vec3.get_zxz = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[0],this1[2]);
};
zero_utilities_Vec3.get_zyx = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[1],this1[0]);
};
zero_utilities_Vec3.get_zyy = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[1],this1[1]);
};
zero_utilities_Vec3.get_zyz = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[1],this1[2]);
};
zero_utilities_Vec3.get_zzx = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[2],this1[0]);
};
zero_utilities_Vec3.get_zzy = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[2],this1[1]);
};
zero_utilities_Vec3.get_zzz = function(this1) {
	return zero_utilities_Vec3.get(this1[0],this1[2],this1[2]);
};
zero_utilities_Vec3.get_xxxx = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[0],this1[0],this1[0]);
};
zero_utilities_Vec3.get_xxxy = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[0],this1[0],this1[1]);
};
zero_utilities_Vec3.get_xxxz = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[0],this1[0],this1[2]);
};
zero_utilities_Vec3.get_xxyx = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[0],this1[1],this1[0]);
};
zero_utilities_Vec3.get_xxyy = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[0],this1[1],this1[1]);
};
zero_utilities_Vec3.get_xxyz = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[0],this1[1],this1[2]);
};
zero_utilities_Vec3.get_xxzx = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[0],this1[2],this1[0]);
};
zero_utilities_Vec3.get_xxzy = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[0],this1[2],this1[1]);
};
zero_utilities_Vec3.get_xxzz = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[0],this1[2],this1[2]);
};
zero_utilities_Vec3.get_xyxx = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[1],this1[0],this1[0]);
};
zero_utilities_Vec3.get_xyxy = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[1],this1[0],this1[1]);
};
zero_utilities_Vec3.get_xyxz = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[1],this1[0],this1[2]);
};
zero_utilities_Vec3.get_xyyx = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[1],this1[1],this1[0]);
};
zero_utilities_Vec3.get_xyyy = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[1],this1[1],this1[1]);
};
zero_utilities_Vec3.get_xyyz = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[1],this1[1],this1[2]);
};
zero_utilities_Vec3.get_xyzx = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[1],this1[2],this1[0]);
};
zero_utilities_Vec3.get_xyzy = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[1],this1[2],this1[1]);
};
zero_utilities_Vec3.get_xyzz = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[1],this1[2],this1[2]);
};
zero_utilities_Vec3.get_xzxx = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[2],this1[0],this1[0]);
};
zero_utilities_Vec3.get_xzxy = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[2],this1[0],this1[1]);
};
zero_utilities_Vec3.get_xzxz = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[2],this1[0],this1[2]);
};
zero_utilities_Vec3.get_xzyx = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[2],this1[1],this1[0]);
};
zero_utilities_Vec3.get_xzyy = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[2],this1[1],this1[1]);
};
zero_utilities_Vec3.get_xzyz = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[2],this1[1],this1[2]);
};
zero_utilities_Vec3.get_xzzx = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[2],this1[2],this1[0]);
};
zero_utilities_Vec3.get_xzzy = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[2],this1[2],this1[1]);
};
zero_utilities_Vec3.get_xzzz = function(this1) {
	return zero_utilities_Vec4.get(this1[0],this1[2],this1[2],this1[2]);
};
zero_utilities_Vec3.get_yxxx = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[0],this1[0],this1[0]);
};
zero_utilities_Vec3.get_yxxy = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[0],this1[0],this1[1]);
};
zero_utilities_Vec3.get_yxxz = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[0],this1[0],this1[2]);
};
zero_utilities_Vec3.get_yxyx = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[0],this1[1],this1[0]);
};
zero_utilities_Vec3.get_yxyy = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[0],this1[1],this1[1]);
};
zero_utilities_Vec3.get_yxyz = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[0],this1[1],this1[2]);
};
zero_utilities_Vec3.get_yxzx = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[0],this1[2],this1[0]);
};
zero_utilities_Vec3.get_yxzy = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[0],this1[2],this1[1]);
};
zero_utilities_Vec3.get_yxzz = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[0],this1[2],this1[2]);
};
zero_utilities_Vec3.get_yyxx = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[1],this1[0],this1[0]);
};
zero_utilities_Vec3.get_yyxy = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[1],this1[0],this1[1]);
};
zero_utilities_Vec3.get_yyxz = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[1],this1[0],this1[2]);
};
zero_utilities_Vec3.get_yyyx = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[1],this1[1],this1[0]);
};
zero_utilities_Vec3.get_yyyy = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[1],this1[1],this1[1]);
};
zero_utilities_Vec3.get_yyyz = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[1],this1[1],this1[2]);
};
zero_utilities_Vec3.get_yyzx = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[1],this1[2],this1[0]);
};
zero_utilities_Vec3.get_yyzy = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[1],this1[2],this1[1]);
};
zero_utilities_Vec3.get_yyzz = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[1],this1[2],this1[2]);
};
zero_utilities_Vec3.get_yzxx = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[2],this1[0],this1[0]);
};
zero_utilities_Vec3.get_yzxy = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[2],this1[0],this1[1]);
};
zero_utilities_Vec3.get_yzxz = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[2],this1[0],this1[2]);
};
zero_utilities_Vec3.get_yzyx = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[2],this1[1],this1[0]);
};
zero_utilities_Vec3.get_yzyy = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[2],this1[1],this1[1]);
};
zero_utilities_Vec3.get_yzyz = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[2],this1[1],this1[2]);
};
zero_utilities_Vec3.get_yzzx = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[2],this1[2],this1[0]);
};
zero_utilities_Vec3.get_yzzy = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[2],this1[2],this1[1]);
};
zero_utilities_Vec3.get_yzzz = function(this1) {
	return zero_utilities_Vec4.get(this1[1],this1[2],this1[2],this1[2]);
};
zero_utilities_Vec3.get_zxxx = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[0],this1[0],this1[0]);
};
zero_utilities_Vec3.get_zxxy = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[0],this1[0],this1[1]);
};
zero_utilities_Vec3.get_zxxz = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[0],this1[0],this1[2]);
};
zero_utilities_Vec3.get_zxyx = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[0],this1[1],this1[0]);
};
zero_utilities_Vec3.get_zxyy = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[0],this1[1],this1[1]);
};
zero_utilities_Vec3.get_zxyz = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[0],this1[1],this1[2]);
};
zero_utilities_Vec3.get_zxzx = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[0],this1[2],this1[0]);
};
zero_utilities_Vec3.get_zxzy = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[0],this1[2],this1[1]);
};
zero_utilities_Vec3.get_zxzz = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[0],this1[2],this1[2]);
};
zero_utilities_Vec3.get_zyxx = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[1],this1[0],this1[0]);
};
zero_utilities_Vec3.get_zyxy = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[1],this1[0],this1[1]);
};
zero_utilities_Vec3.get_zyxz = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[1],this1[0],this1[2]);
};
zero_utilities_Vec3.get_zyyx = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[1],this1[1],this1[0]);
};
zero_utilities_Vec3.get_zyyy = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[1],this1[1],this1[1]);
};
zero_utilities_Vec3.get_zyyz = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[1],this1[1],this1[2]);
};
zero_utilities_Vec3.get_zyzx = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[1],this1[2],this1[0]);
};
zero_utilities_Vec3.get_zyzy = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[1],this1[2],this1[1]);
};
zero_utilities_Vec3.get_zyzz = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[1],this1[2],this1[2]);
};
zero_utilities_Vec3.get_zzxx = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[2],this1[0],this1[0]);
};
zero_utilities_Vec3.get_zzxy = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[2],this1[0],this1[1]);
};
zero_utilities_Vec3.get_zzxz = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[2],this1[0],this1[2]);
};
zero_utilities_Vec3.get_zzyx = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[2],this1[1],this1[0]);
};
zero_utilities_Vec3.get_zzyy = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[2],this1[1],this1[1]);
};
zero_utilities_Vec3.get_zzyz = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[2],this1[1],this1[2]);
};
zero_utilities_Vec3.get_zzzx = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[2],this1[2],this1[0]);
};
zero_utilities_Vec3.get_zzzy = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[2],this1[2],this1[1]);
};
zero_utilities_Vec3.get_zzzz = function(this1) {
	return zero_utilities_Vec4.get(this1[2],this1[2],this1[2],this1[2]);
};
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
String.__name__ = true;
Array.__name__ = true;
js_Boot.__toStr = ({ }).toString;
Main.white = 14417917;
Main.red = 16740507;
Main.black = 6297560;
zero_utilities_Vec4.epsilon = 1e-8;
zero_utilities_Vec4.pool = [];
zero_utilities_Color.RED = zero_utilities_Color.from_array_int([1,0,0,1]);
zero_utilities_Color.YELLOW = zero_utilities_Color.from_array_int([1,1,0,1]);
zero_utilities_Color.GREEN = zero_utilities_Color.from_array_int([0,1,0,1]);
zero_utilities_Color.CYAN = zero_utilities_Color.from_array_int([0,1,1,1]);
zero_utilities_Color.BLUE = zero_utilities_Color.from_array_int([0,0,1,1]);
zero_utilities_Color.MAGENTA = zero_utilities_Color.from_array_int([1,0,1,1]);
zero_utilities_Color.WHITE = zero_utilities_Color.from_array_int([1,1,1,1]);
zero_utilities_Color.BLACK = zero_utilities_Color.from_array_int([0,0,0,1]);
zero_utilities_Color.TRANSPARENT = zero_utilities_Color.from_array_int([1,1,1,0]);
zero_utilities_Color.GREY = zero_utilities_Color.from_array_float([0.5,0.5,0.5,1]);
zero_utilities_Color.PICO_8_BLACK = zero_utilities_Color.from_array_int([0,0,0,1]);
zero_utilities_Color.PICO_8_DARK_BLUE = zero_utilities_Color.from_array_float([0.11372549019607843,0.16862745098039217,0.32549019607843138,1]);
zero_utilities_Color.PICO_8_DARK_PURPLE = zero_utilities_Color.from_array_float([0.49411764705882355,0.14509803921568629,0.32549019607843138,1]);
zero_utilities_Color.PICO_8_DARK_GREEN = zero_utilities_Color.from_array_float([0,0.52941176470588236,0.31764705882352939,1]);
zero_utilities_Color.PICO_8_BROWN = zero_utilities_Color.from_array_float([0.6705882352941176,0.32156862745098042,0.21176470588235294,1]);
zero_utilities_Color.PICO_8_DARK_GREY = zero_utilities_Color.from_array_float([0.37254901960784315,0.3411764705882353,0.30980392156862746,1]);
zero_utilities_Color.PICO_8_LIGHT_GREY = zero_utilities_Color.from_array_float([0.76078431372549016,0.76470588235294112,0.7803921568627451,1]);
zero_utilities_Color.PICO_8_WHITE = zero_utilities_Color.from_array_float([1,0.94509803921568625,0.90980392156862744,1]);
zero_utilities_Color.PICO_8_RED = zero_utilities_Color.from_array_float([1,0,0.30196078431372547,1]);
zero_utilities_Color.PICO_8_ORANGE = zero_utilities_Color.from_array_float([1,0.63921568627450975,0,1]);
zero_utilities_Color.PICO_8_YELLOW = zero_utilities_Color.from_array_float([1,0.92549019607843142,0.15294117647058825,1]);
zero_utilities_Color.PICO_8_GREEN = zero_utilities_Color.from_array_float([0,0.89411764705882357,0.21176470588235294,1]);
zero_utilities_Color.PICO_8_BLUE = zero_utilities_Color.from_array_float([0.16078431372549021,0.67843137254901964,1,1]);
zero_utilities_Color.PICO_8_INDIGO = zero_utilities_Color.from_array_float([0.51372549019607838,0.46274509803921571,0.611764705882353,1]);
zero_utilities_Color.PICO_8_PINK = zero_utilities_Color.from_array_float([1,0.46666666666666667,0.6588235294117647,1]);
zero_utilities_Color.PICO_8_PEACH = zero_utilities_Color.from_array_float([1,0.8,0.66666666666666663,1]);
zero_utilities_Color.PALETTE = new haxe_ds_StringMap();
zero_utilities_Color.epsilon = 1e-8;
zero_utilities_Color.pool = [];
zero_utilities_Ease.PI2 = Math.PI / 2;
zero_utilities_Ease.EL = 2 * Math.PI / .45;
zero_utilities_Ease.B1 = 0.36363636363636365;
zero_utilities_Ease.B2 = 0.72727272727272729;
zero_utilities_Ease.B3 = 0.54545454545454541;
zero_utilities_Ease.B4 = 0.90909090909090906;
zero_utilities_Ease.B5 = 0.81818181818181823;
zero_utilities_Ease.B6 = 0.95454545454545459;
zero_utilities_Ease.ELASTIC_AMPLITUDE = 1;
zero_utilities_Ease.ELASTIC_PERIOD = 0.4;
zero_utilities_IntPoint.pool = [];
zero_utilities_Timer.timers = [];
zero_utilities_Timer.pool = [];
zero_utilities_Timer.epsilon = 1e-8;
zero_utilities_Tween.active_tweens = [];
zero_utilities_Tween.pool = [];
zero_utilities_Vec2.pool = [];
zero_utilities_Vec2.UP = zero_utilities_Vec2.get(0,-1);
zero_utilities_Vec2.DOWN = zero_utilities_Vec2.get(0,1);
zero_utilities_Vec2.LEFT = zero_utilities_Vec2.get(-1,0);
zero_utilities_Vec2.RIGHT = zero_utilities_Vec2.get(1,0);
zero_utilities_Vec2.use_radians = false;
zero_utilities_Vec3.epsilon = 1e-8;
zero_utilities_Vec3.pool = [];
Main.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
