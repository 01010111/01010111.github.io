var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Game;
(function (Game_1) {
    var Game = Play.Game;
    var Framework = Play.Framework;
    var Tweens = Play.Tweeens;
    var trans = Play.game_text;
    var Util = Play.Util;
    var Sprite = PIXI.Sprite;
    var Texture = PIXI.Texture;
    var TilingSprite = PIXI.extras.TilingSprite;
    var Graphics = PIXI.Graphics;
    var Container = PIXI.Container;
    var Surabikku = /** @class */ (function (_super) {
        __extends(Surabikku, _super);
        function Surabikku(config) {
            var _this = _super.call(this) || this;
            _this.config = config;
            _this.shapes = 'memphis_bg.png';
            _this.arrow = 'bendyarrow.png';
            _this.mouse_down = false;
            _this.wait = false;
            _this.onMakeGame = function () {
                _this.squares = [];
                _this.G = Framework.gw;
                _this.STATE = Framework.play_state;
                _this.wait = false;
                _this.make_background();
                _this.make_field();
                _this.make_squares();
                _this.make_buttons();
                _this.make_ui();
                _this.new_round();
            };
            _this.onGameUpdate = function () {
                //this.bg_shapes.tilePosition.x += 0.2;
                //this.bg_shapes.tilePosition.y += 0.1;
                _this.displacement_map.x = (_this.displacement_map.x + 0.5) % _this.displacement_map.width;
                _this.displacement_map.y = (_this.displacement_map.y + 0.5) % _this.displacement_map.height;
                _this.inspect_squares();
                for (var _i = 0, _a = _this.squares; _i < _a.length; _i++) {
                    var square = _a[_i];
                    square.update();
                }
            };
            _this.onGameOver = function () {
                _this.wait = true;
                Tweens.easy_to(_this.ui, 0, -80, 2, true);
                Tweens.fade_to(_this.field, 0, 1, 1);
                Tweens.easy_timer(2, function () {
                    _this.STATE.addChild(new Play.EndScreen(["".concat(trans.raw_score[_this.config.language], ": ").concat(Framework.ui_container.score.pts)], Math.round(Framework.ui_container.score.pts / 1500), Framework.ui_container.score.pts));
                });
            };
            _this.version = '0.2';
            if (config.title == undefined)
                config.title = 'Shapeshifter';
            if (config.subtitle == undefined)
                config.subtitle = 'Focus';
            if (config.instructions == undefined)
                config.instructions = 'Shift the large squares using the arrow buttons or by sliding them to match the pattern shown beneath them.';
            if (config.timer == undefined)
                config.timer = 150;
            if (config.preload == undefined)
                config.preload = [];
            // config.show_version = true;
            config.preload.push('displacement_map.jpg');
            config.preload.push('sp_bg.png');
            config.preload.push(_this.shapes);
            config.preload.push(_this.arrow);
            Framework.config = config;
            Framework.config.graphic = 'title/surabikku.png';
            Framework.config.timer_ends_game = true;
            Framework.config.use_score = true;
            Framework.config.is_teaser = false;
            Framework.config.show_ui = false;
            return _this;
        }
        Surabikku.prototype.make_background = function () {
            this.displacement_map = PIXI.Sprite.fromImage('displacement_map.jpg');
            this.displacement_map.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
            var displacement_filter = new PIXI.filters.DisplacementFilter(this.displacement_map);
            displacement_filter.scale.set(200);
            Framework.play_state.addChild(this.displacement_map);
            this.background = PIXI.Sprite.fromImage('sp_bg.png');
            var s = Math.max(Framework.gw.height / 1280, Framework.gw.width / 1280);
            this.background.alpha = 0;
            this.background.scale.set(s * 1.1, s * 1.1);
            this.background.anchor.set(0.5, 0.5);
            this.background.position.set(Framework.gw.width * 0.5, Framework.gw.height * 0.5);
            Framework.play_state.addChild(this.background);
            this.background.filters = [displacement_filter];
            Tweens.fade_to(this.background, 1, 1);
            return;
            var bg = new Container();
            var bg_flat = new Graphics();
            bg_flat.beginFill(0x9D50DA);
            bg_flat.drawRect(0, 0, this.G.width, this.G.height);
            bg_flat.endFill();
            bg.addChild(bg_flat);
            var size = Math.max(this.G.width, this.G.height) * 2;
            this.bg_shapes = new TilingSprite(Texture.from(this.shapes), size, size);
            this.bg_shapes.anchor.set(0.5);
            this.bg_shapes.position.set(this.G.width / 2, this.G.height / 2);
            this.bg_shapes.rotation = Math.PI / 8;
            bg.addChild(this.bg_shapes);
            this.STATE.addChild(bg);
            bg.alpha = 0;
            Tweens.fade_to(bg, 1, 1);
        };
        Surabikku.prototype.make_field = function () {
            var _this = this;
            this.field = new Container();
            this.field.position.set(this.G.width / 2, this.G.height / 2 - 16);
            var game_bg = new Graphics();
            game_bg.beginFill(0xFFFFFF, 0.33);
            game_bg.drawRoundedRect(-112, -112, 224, 224, 6);
            this.field.addChild(game_bg);
            var hint_bg = new Graphics();
            hint_bg.position.set(0, 236);
            hint_bg.beginFill(0xFFFFFF, 0.33);
            hint_bg.drawRoundedRect(-32, -32, 64, 64, 6);
            this.field.addChild(hint_bg);
            this.hint_graphic = new Graphics();
            hint_bg.addChild(this.hint_graphic);
            this.STATE.addChild(this.field);
            this.field.alpha = 0;
            Tweens.fade_to(this.field, 1, 1, 1);
            this.field.interactive = true;
            this.field.on('pointermove', function (e) { return _this.on_mouse_drag(e.data.global.x, e.data.global.y); });
            this.field.on('pointerup', function (e) { return _this.on_mouse_up(); });
            this.field.on('pointerout', function (e) { return _this.on_mouse_up(); });
        };
        Surabikku.prototype.make_squares = function () {
            var _this = this;
            var square_group = new Container();
            var square_mask = new Graphics();
            square_mask.beginFill(0xFFFFFF);
            square_mask.drawRect(-100, -100, 200, 200);
            square_mask.endFill();
            square_group.addChild(square_mask);
            square_group.mask = square_mask;
            var bool_map = [true, true, true, true, true, false, false, false, false];
            Util.shuffle_array(bool_map);
            for (var j = 0; j < 3; j++) {
                var _loop_1 = function (i) {
                    var square_1 = new Square(i, j);
                    square_1.set(bool_map.shift());
                    square_1.interactive = true;
                    square_1.on('pointerdown', function (e) { return _this.on_mouse_down(square_1, e.data.global.x, e.data.global.y); });
                    square_group.addChild(square_1);
                    this_1.squares.push(square_1);
                };
                var this_1 = this;
                for (var i = 0; i < 3; i++) {
                    _loop_1(i);
                }
            }
            var square = new Square(-1, 0);
            square.interactive = true;
            square.on('pointerdown', function (e) { return _this.on_mouse_down(square, e.data.global.x, e.data.global.y); });
            square_group.addChild(square);
            this.squares.push(square);
            this.spare_square = square;
            this.field.addChild(square_group);
        };
        Surabikku.prototype.make_buttons = function () {
            var buttons = new Container();
            this.field.addChild(buttons);
            for (var i = 0; i < 3; i++) {
                buttons.addChild(this.make_arrow(-68 + i * 68, 0, -Math.PI / 2, false, i, false));
                buttons.addChild(this.make_arrow(-68 + i * 68, 0, Math.PI / 2, false, i, true));
                buttons.addChild(this.make_arrow(0, -68 + i * 68, -Math.PI, true, i, false));
                buttons.addChild(this.make_arrow(0, -68 + i * 68, 0, true, i, true));
            }
        };
        Surabikku.prototype.make_arrow = function (x, y, a, row, i, d) {
            var _this = this;
            var arrow = new Container();
            var graphic = Sprite.from(this.arrow);
            graphic.anchor.set(0.5);
            graphic.position.set(144, 0);
            arrow.addChild(graphic);
            arrow.rotation = a;
            arrow.position.set(x, y);
            arrow.interactive = arrow.buttonMode = true;
            arrow.hitArea = new PIXI.Rectangle(144 - 32, -32, 64, 64);
            arrow.on('pointerdown', function (e) {
                row ? _this.shift_row(i, d) : _this.shift_col(i, d);
                Tweens.pulse(graphic, 1, 1.15);
            });
            return arrow;
        };
        Surabikku.prototype.make_ui = function () {
            this.ui = new Container();
            this.ui.position.set(this.G.width / 2, 32);
            var ui_bg = new Graphics();
            ui_bg.position.set(0, -32);
            ui_bg.beginFill(0xFFFFFF, 0.33);
            ui_bg.drawRoundedRect(-144, -64, 288, 128, 32);
            ui_bg.endFill();
            this.ui.addChild(ui_bg);
            Framework.ui_container.score.position.set(80, 4);
            Framework.ui_container.score.label.position.set(80, -20);
            Framework.ui_container.score.scale.set(0.75);
            Framework.ui_container.score.label.scale.set(0.5);
            this.ui.addChild(Framework.ui_container.score);
            this.ui.addChild(Framework.ui_container.score.label);
            Framework.ui_container.timer.position.set(-80, 4);
            Framework.ui_container.timer.label.position.set(-80, -20);
            Framework.ui_container.timer.scale.set(0.75);
            Framework.ui_container.timer.label.scale.set(0.5);
            this.ui.addChild(Framework.ui_container.timer);
            this.ui.addChild(Framework.ui_container.timer.label);
            var pause_container = new Container();
            Framework.ui_container.pause_btn.position.set(0, 0);
            pause_container.addChild(Framework.ui_container.pause_btn);
            pause_container.scale.set(0.75);
            this.ui.addChild(pause_container);
            this.STATE.addChild(this.ui);
        };
        Surabikku.prototype.shift_col = function (col, asc) {
            if (this.wait)
                return;
            // console.log('shifting col', col, asc);
            this.spare_square.set(this.get_square(col, asc ? 2 : 0).get());
            this.spare_square.set_pos(col, asc ? -1 : 3);
            for (var _i = 0, _a = this.squares; _i < _a.length; _i++) {
                var square = _a[_i];
                if (square.i == col)
                    square.j += asc ? 1 : -1;
            }
            this.spare_square = this.get_square(col, asc ? 3 : -1);
            this.check();
        };
        Surabikku.prototype.shift_row = function (row, asc) {
            if (this.wait)
                return;
            // console.log('shifting row', row, asc);
            this.spare_square.set(this.get_square(asc ? 2 : 0, row).get());
            this.spare_square.set_pos(asc ? -1 : 3, row);
            for (var _i = 0, _a = this.squares; _i < _a.length; _i++) {
                var square = _a[_i];
                if (square.j == row)
                    square.i += asc ? 1 : -1;
            }
            this.spare_square = this.get_square(asc ? 3 : -1, row);
            this.check();
        };
        Surabikku.prototype.get_square = function (i, j) {
            for (var _i = 0, _a = this.squares; _i < _a.length; _i++) {
                var square = _a[_i];
                if (square.i == i && square.j == j)
                    return square;
            }
            return null;
        };
        Surabikku.prototype.check = function () {
            if (this.compare_states(this.round, this.get_state()))
                this.complete_round();
        };
        Surabikku.prototype.get_state = function () {
            var state = [];
            for (var j = 0; j < 3; j++)
                for (var i = 0; i < 3; i++) {
                    state.push(this.get_square(i, j).get());
                }
            return state;
        };
        Surabikku.prototype.compare_states = function (round, state) {
            // console.log(round, state);
            for (var i = 0; i < round.length; i++) {
                if (state[i] != round[i])
                    return false;
            }
            return true;
        };
        Surabikku.prototype.complete_round = function () {
            var _this = this;
            this.wait = true;
            Framework.ui_container.score.give_pts(500);
            for (var i = 0; i < 16; i++) {
                Tweens.easy_timer(i * 0.025, function () { _this.new_round(); });
            }
            Tweens.easy_timer(16 * 0.025, function () { _this.wait = false; });
            Framework.ui_container.shoot_confetti();
        };
        Surabikku.prototype.new_round = function () {
            var new_round = [true, true, true, true, true, false, false, false, false];
            Util.shuffle_array(new_round);
            var state = this.get_state();
            while (this.compare_states(new_round, state))
                Util.shuffle_array(new_round);
            this.round = new_round;
            this.hint_graphic.clear();
            for (var n = 0; n < new_round.length; n++) {
                var i = n % 3;
                var j = Math.floor(n / 3);
                this.hint_graphic.beginFill(new_round[n] ? Square.on_color : Square.off_color);
                this.hint_graphic.drawRect(-24 + i * 16, -24 + j * 16, 16, 16);
                this.hint_graphic.endFill();
            }
            var graphics_clone = this.hint_graphic.clone();
            this.hint_graphic.parent.addChild(graphics_clone);
        };
        Surabikku.prototype.on_mouse_down = function (square, x, y) {
            // console.log(square.i, square.j);
            this.mouse_i = square.i;
            this.mouse_j = square.j;
            this.mouse_x = x;
            this.mouse_y = y;
            this.mouse_down = true;
        };
        Surabikku.prototype.on_mouse_up = function () {
            this.mouse_down = false;
        };
        Surabikku.prototype.on_mouse_drag = function (x, y) {
            if (!this.mouse_down)
                return;
            this.mouse_down = false;
            if (Math.abs(this.mouse_x - x) > 16)
                return this.shift_row(this.mouse_j, x > this.mouse_x);
            else if (Math.abs(this.mouse_y - y) > 16)
                return this.shift_col(this.mouse_i, y > this.mouse_y);
            this.mouse_down = true;
        };
        Surabikku.prototype.inspect_squares = function () {
            var num_on = 0;
            var unset;
            for (var _i = 0, _a = this.squares; _i < _a.length; _i++) {
                var square = _a[_i];
                if (square === this.spare_square)
                    continue;
                if (!square.check())
                    unset = square;
                else if (square.get())
                    num_on++;
            }
            if (!unset)
                return;
            unset.set(num_on < 5);
        };
        return Surabikku;
    }(Game));
    Game_1.Surabikku = Surabikku;
    var Square = /** @class */ (function (_super) {
        __extends(Square, _super);
        function Square(i, j) {
            var _this = _super.call(this) || this;
            _this.beginFill(0xFFFFFF);
            _this.drawRoundedRect(-32, -32, 64, 64, 4);
            _this.endFill();
            _this.set_pos(i, j);
            return _this;
        }
        Square.prototype.set_pos = function (i, j) {
            this.i = i;
            this.j = j;
            this.position.set(this.grid_to_pos(i), this.grid_to_pos(j));
        };
        Square.prototype.set = function (active) {
            this.tint = active ? Square.on_color : Square.off_color;
            this.active = active;
            return active;
        };
        Square.prototype.get = function () {
            return this.active || this.tint != Square.off_color;
        };
        Square.prototype.check = function () {
            return this.tint === Square.on_color || this.tint === Square.off_color;
        };
        Square.prototype.update = function () {
            this.x += (this.grid_to_pos(this.i) - this.x) * 0.4;
            this.y += (this.grid_to_pos(this.j) - this.y) * 0.4;
        };
        Square.prototype.grid_to_pos = function (n) {
            return n * 68 - 68;
        };
        Square.on_color = 0xEAFEFF;
        Square.off_color = 0x2A4F1D;
        return Square;
    }(Graphics));
})(Game || (Game = {}));
//# sourceMappingURL=Surabikku.js.map