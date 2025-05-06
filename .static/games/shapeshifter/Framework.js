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
var Play;
(function (Play) {
    var AudioControls = /** @class */ (function () {
        function AudioControls(x) {
            this.mute_callback = function () { };
            this.unmute_callback = function () { };
            if (!x)
                x = Play.Framework.gw.width - Play.Framework.gw.width * Play.Framework.ui_element_offset;
            this.muted = Play.Framework.gw.muted;
            this.mute_btn = this.make_btn('audio_unmuted.png', true, x);
            this.unmute_btn = this.make_btn('audio_muted.png', false, x);
            this.muted ? this.mute() : this.unmute();
        }
        AudioControls.prototype.make_btn = function (_image_src, _mute_btn, _x) {
            var _this = this;
            //let _y = Framework.gw.mobile ? 60 : 50;
            var _y = Play.Framework.ui_container.ry;
            var btn = PIXI.Sprite.fromImage(_image_src);
            btn.anchor.set(0.5);
            btn.interactive = true;
            btn.buttonMode = true;
            btn.position.set(_x, _y);
            btn.alpha = 0.5;
            btn.on('pointerover', function () {
                Play.Tweeens.fade_to(btn, 1);
            });
            btn.on('pointerout', function () {
                Play.Tweeens.fade_to(btn, 0.5);
            });
            btn.on('pointertap', function () {
                _mute_btn ? _this.mute() : _this.unmute();
            });
            return btn;
        };
        AudioControls.prototype.load = function () {
            this.mute_btn.y -= 150;
            this.unmute_btn.y -= 150;
            Play.Tweeens.easy_to(this.mute_btn, 0, 150, 0.8, true);
            Play.Tweeens.easy_to(this.unmute_btn, 0, 150, 0.8, true);
        };
        AudioControls.prototype.mute = function () {
            var _this = this;
            Play.Framework.gw.muted = true;
            Play.Tweeens.pop_out(this.mute_btn, 0, function () {
                Play.Tweeens.pop_in(_this.unmute_btn);
            });
            this.mute_callback();
        };
        AudioControls.prototype.unmute = function () {
            var _this = this;
            Play.Framework.gw.muted = false;
            Play.Tweeens.pop_out(this.unmute_btn, 0, function () {
                Play.Tweeens.pop_in(_this.mute_btn);
            });
            this.unmute_callback();
        };
        return AudioControls;
    }());
    Play.AudioControls = AudioControls;
})(Play || (Play = {}));
var Play;
(function (Play) {
    var AudioManager = /** @class */ (function () {
        function AudioManager() {
            this.sounds = [];
            // this.sounds['tick'] = new Howl({ src: this.make_audio_path_array('tick'), volume: 0.4 });
            // this.sounds['alert_pos'] = new Howl({ src: this.make_audio_path_array('alert_pos'), volume: 1.0 });
            // this.sounds['alert_neg'] = new Howl({ src: this.make_audio_path_array('alert_neg'), volume: 1.0 });
            // this.sounds['correct'] = new Howl({ src: this.make_audio_path_array('correct'), volume: 0.8 });
            // this.sounds['incorrect'] = new Howl({ src: this.make_audio_path_array('incorrect'), volume: 0.8 });
            // this.sounds['shif'] = new Howl({ src: this.make_audio_path_array('shift'), volume: 0.4 });
            // this.sounds['select'] = new Howl({ src: this.make_audio_path_array('select'), volume: 0.7 });
            // if (Play.Framework.config.audio_source)
            //     this.sounds[Play.Framework.config.audio_source] = new Howl({ src: this.make_audio_path_array(Play.Framework.config.audio_source), volume: 0.8, loop: true });
        }
        AudioManager.prototype.make_audio_path_array = function (sound) {
            return [
                Play.Framework.audio_path + '' + sound + '.wav',
                Play.Framework.audio_path + '' + sound + '.mp3',
                Play.Framework.audio_path + '' + sound + '.ogg',
            ];
        };
        AudioManager.prototype.begin = function () {
            if (Play.Framework.gw.muted)
                return;
        };
        AudioManager.prototype.start = function () {
            if (Play.Framework.gw.muted)
                return;
        };
        AudioManager.prototype.tick_down = function () {
            if (Play.Framework.gw.muted)
                return;
            this.sounds['tick'].play();
        };
        AudioManager.prototype.alert_positive = function () {
            if (Play.Framework.gw.muted)
                return;
            this.sounds['alert_pos'].play();
        };
        AudioManager.prototype.alert_negative = function () {
            if (Play.Framework.gw.muted)
                return;
            this.sounds['alert_neg'].play();
        };
        AudioManager.prototype.correct = function () {
            if (Play.Framework.gw.muted)
                return;
            this.sounds['correct'].play();
        };
        AudioManager.prototype.incorrect = function () {
            if (Play.Framework.gw.muted)
                return;
            this.sounds['incorrect'].play();
        };
        AudioManager.prototype.win = function () {
            if (Play.Framework.gw.muted)
                return;
            this.alert_positive();
        };
        AudioManager.prototype.game_over = function () {
            if (Play.Framework.gw.muted)
                return;
            this.alert_positive();
        };
        AudioManager.prototype.jump_up = function () {
            if (Play.Framework.gw.muted)
                return;
        };
        AudioManager.prototype.jump_down = function () {
            if (Play.Framework.gw.muted)
                return;
        };
        AudioManager.prototype.shift = function () {
            if (Play.Framework.gw.muted)
                return;
            this.sounds['shif'].play();
        };
        AudioManager.prototype.select = function () {
            if (Play.Framework.gw.muted)
                return;
            this.sounds['select'].play();
        };
        return AudioManager;
    }());
    Play.AudioManager = AudioManager;
})(Play || (Play = {}));
var Play;
(function (Play) {
    var Card = /** @class */ (function () {
        function Card(graphic, front, back, pos) {
            this.pulse = false;
            this.to_flip = 0;
            this.hold = false;
            this.update = function () { };
            this.front = front;
            this.back = back;
            this.objectFactory = new Play.ObjectFactory();
            this.styles = new Play.Styles();
            this.g = graphic;
            this.g.addChild(front);
            this.g.addChild(back);
        }
        Object.defineProperty(Card.prototype, "scale", {
            get: function () {
                return this._scale;
            },
            set: function (scale) {
                this._scale = scale;
                this.g.scale.x = scale;
                this.front.visible = scale > 0;
                this.back.visible = scale < 0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Card.prototype, "rot", {
            get: function () {
                return this.g.rotation;
            },
            set: function (n) {
                this.g.rotation = n;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Card.prototype, "x", {
            get: function () {
                return this.g.x;
            },
            set: function (n) {
                this.g.x = n;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Card.prototype, "y", {
            get: function () {
                return this.g.y;
            },
            set: function (n) {
                this.g.y = n;
            },
            enumerable: false,
            configurable: true
        });
        Card.prototype.flip = function () {
            this.to_flip++;
            this.do_flip();
        };
        Card.prototype.do_flip = function () {
            var _this = this;
            if (this.hold)
                return;
            this.hold = true;
            if (this.pulse) {
                var g_1 = this.g;
                TweenMax.to(g_1.scale, 0.1, {
                    y: 1.1,
                    onComplete: function () {
                        TweenMax.to(g_1.scale, 0.2, { y: 1 });
                    }
                });
                TweenMax.to(this, 0.3, {
                    scale: this.scale * -1,
                    ease: Back.easeOut,
                    onComplete: function () {
                        _this.hold = false;
                        _this.to_flip -= 1;
                        if (_this.to_flip > 0) {
                            _this.do_flip();
                        }
                    }
                });
                return;
            }
            TweenMax.to(this, 0.2, {
                scale: this.scale * -1,
                onComplete: function () {
                    _this.hold = false;
                    _this.to_flip -= 1;
                    if (_this.to_flip > 0) {
                        _this.do_flip();
                    }
                }
            });
        };
        return Card;
    }());
    Play.Card = Card;
})(Play || (Play = {}));
var Play;
(function (Play) {
    var Config = /** @class */ (function () {
        function Config() {
            this.timer_ends_game = false; //
            this.use_score = true; //
            this.is_teaser = false; //
            this.allow_reveal = false;
            this.completed = false;
            this.time_remaining = -1; //
            this.show_version = false;
            this.show_ui = true;
            this.alerts_at_bottom = false;
            this.ignore_timer = false;
            this.always_available = false;
            this.language = 'en';
            this.hide_suggested = false;
        }
        return Config;
    }());
    Play.Config = Config;
})(Play || (Play = {}));
var Play;
(function (Play) {
    var Graphics = PIXI.Graphics;
    var Container = PIXI.Container;
    var Text = PIXI.Text;
    var Sprite = PIXI.Sprite;
    var Rectangle = PIXI.Rectangle;
    var EndScreen = /** @class */ (function (_super) {
        __extends(EndScreen, _super);
        function EndScreen(metrics, bob_pts, score, fade) {
            if (score === void 0) { score = 0; }
            if (fade === void 0) { fade = 0.5; }
            var _this = _super.call(this) || this;
            bob_pts = Math.min(bob_pts, 20);
            if (Play.Framework.config.is_teaser && Play.Framework.config.completed) {
                bob_pts = 0;
                metrics = [Play.game_text.teaser_complete[Play.Framework.config.language]];
            }
            Play.Framework.prep_score(bob_pts, score);
            var style = new Play.Styles();
            _this.bg = new Graphics();
            _this.bg.beginFill(0x000000, fade);
            _this.bg.drawRect(0, 0, 1, 1);
            _this.bg.scale.set(Play.Framework.gw.width, Play.Framework.gw.height);
            _this.title = new Text(Play.Framework.config.title, {
                fontFamily: style.main_font_demibold,
                fontSize: 36,
                align: 'left',
                fill: 0xFFFFFF
            });
            var metrics_text = '';
            for (var _i = 0, metrics_1 = metrics; _i < metrics_1.length; _i++) {
                var metric = metrics_1[_i];
                metrics_text += metric + '\n';
            }
            _this.metrics = new Text(metrics_text, {
                fontFamily: style.main_font_bold,
                fontSize: 18,
                lineHeight: 25,
                align: 'left',
                fill: 0xFFFFFF
            });
            var metrics_mask = new Graphics();
            metrics_mask.beginFill(0xFFFFFF);
            metrics_mask.drawRect(0, 0, Play.Framework.gw.width, 25);
            metrics_mask.endFill();
            _this.metrics.mask = metrics_mask;
            _this.bob_pts = new Text('Bob Points earned: ' + bob_pts, {
                fontFamily: style.main_font_bold,
                fontSize: 18,
                align: 'left',
                fill: 0xFFFFFF
            });
            _this.replay = new Graphics();
            _this.replay.beginFill(0xFFFFFF);
            _this.replay.drawRoundedRect(0, 0, 142, 48, 24);
            _this.replay.endFill();
            _this.replay.interactive = true;
            _this.replay.buttonMode = true;
            _this.replay.on('pointertap', function () {
                Play.Framework.destroy_game();
                Play.Framework.init_game();
                Play.Framework.intro_screen.load();
            });
            var replay_text = new Text(Play.game_text.replay[Play.Framework.config.language], {
                fontFamily: style.main_font_demibold,
                fontSize: 18,
                fill: 0x000000
            });
            replay_text.anchor.set(0.5);
            replay_text.position.set(71, 24);
            _this.replay.addChild(replay_text);
            _this.exit = new Graphics();
            _this.exit.beginFill(0xFF4040);
            _this.exit.drawRoundedRect(0, 0, 142, 48, 24);
            _this.exit.endFill();
            _this.exit.interactive = true;
            _this.exit.buttonMode = true;
            _this.exit.on('pointertap', function () {
                Play.Framework.destroy_game();
                Play.Framework.exit();
            });
            var exit_text = new Text(Play.game_text.exit[Play.Framework.config.language], {
                fontFamily: style.main_font_demibold,
                fontSize: 18,
                fill: 0xFFFFFF
            });
            exit_text.anchor.set(0.5);
            exit_text.position.set(71, 24);
            _this.exit.addChild(exit_text);
            _this.title.position.set(32, Play.Framework.gw.height - 547);
            _this.metrics.position.set(32, Play.Framework.gw.height - 480);
            metrics_mask.position.set(32, Play.Framework.gw.height - 480);
            _this.bob_pts.position.set(32, Play.Framework.gw.height - 455);
            _this.addChild(_this.bg);
            _this.addChild(_this.title);
            _this.addChild(_this.metrics);
            _this.addChild(_this.bob_pts);
            if (Play.Framework.config.is_teaser) {
                _this.exit.position.set(32, Play.Framework.gw.height - 414);
                _this.addChild(_this.exit);
            }
            else {
                _this.replay.position.set(32, Play.Framework.gw.height - 414);
                _this.exit.position.set(190, Play.Framework.gw.height - 414);
                _this.addChild(_this.replay);
                _this.addChild(_this.exit);
            }
            // Content Lane
            if (Play.Framework.config.board && Play.Framework.config.board.assets && Play.Framework.config.board.assets.length > 0 && !Play.Framework.config.hide_suggested) {
                _this.continue_text = new Text("".concat(Play.game_text.recommended[Play.Framework.config.language], ":"), {
                    fontFamily: style.main_font_demibold,
                    fontSize: 24,
                    align: 'left',
                    fill: 0xFFFFFF
                });
                var lane_contents = [];
                for (var _a = 0, _b = Play.Framework.config.board.assets; _a < _b.length; _a++) {
                    var asset = _b[_a];
                    lane_contents.push({
                        image: asset.image.url,
                        title: asset.title,
                        url: 'https://www3.blueoceanbrain.com/board/' + Play.Framework.config.board.id + '/article/' + asset.id
                    });
                }
                _this.continue_lane = new ContentLane(lane_contents);
                _this.continue_text.position.set(32, Play.Framework.gw.height - 334);
                _this.continue_lane.position.set(32, Play.Framework.gw.height - 288);
                _this.addChild(_this.continue_text);
                _this.addChild(_this.continue_lane);
            }
            // Animate
            var i = 0;
            for (var _c = 0, _d = _this.children; _c < _d.length; _c++) {
                var child = _d[_c];
                child.alpha = 0;
                Play.Tweeens.fade_to(child, 1, 0.2, i++ * 0.2);
            }
            _this.animate_metrics(metrics.length);
            return _this;
        }
        EndScreen.prototype.animate_metrics = function (amt) {
            var _this = this;
            Play.Tweeens.easy_to(this.metrics, 32, Play.Framework.gw.height - 480, 0.1);
            for (var i = 1; i < amt; i++)
                Play.Tweeens.easy_timer(i * 4, function () { return Play.Tweeens.easy_to(_this.metrics, 0, -25, 0.1, true); });
            Play.Tweeens.easy_timer(amt * 4, function () { return _this.animate_metrics(amt); });
        };
        return EndScreen;
    }(PIXI.Container));
    Play.EndScreen = EndScreen;
    var ContentLane = /** @class */ (function (_super) {
        __extends(ContentLane, _super);
        function ContentLane(lane_data) {
            var _this = _super.call(this) || this;
            _this.content_width = 0;
            _this.lane_padding = 16;
            _this.content_array = [];
            _this.user_initiated_scroll = false;
            _this.position.set(32, Play.Framework.gw.height - 288);
            for (var _i = 0, lane_data_1 = lane_data; _i < lane_data_1.length; _i++) {
                var content_data = lane_data_1[_i];
                _this.add_content_link(content_data);
            }
            if (_this.lane_padding < 32)
                _this.content_width += 32 - _this.lane_padding;
            _this.animate_lane(lane_data.length);
            return _this;
        }
        ContentLane.prototype.add_content_link = function (data) {
            var _this = this;
            var style = new Play.Styles();
            var content_container = new ContentContainer();
            content_container.data = data;
            content_container.beginFill(0xFFFFFF);
            content_container.drawRect(0, 0, 300, 256);
            content_container.endFill();
            var alpha_mask = new Graphics();
            alpha_mask.beginFill(0xFF0000);
            alpha_mask.drawRect(0, 0, 300, 180);
            alpha_mask.endFill();
            content_container.addChild(alpha_mask);
            PIXI.loader.reset();
            PIXI.loader.add({
                url: data.image,
                crossOrigin: true
            }).load(function () {
                var content_graphic = Sprite.fromImage(data.image, true);
                console.log(content_graphic.width);
                content_graphic.scale.set(300 / (content_graphic.width < 10 || !content_graphic.width ? 660 : content_graphic.width));
                content_graphic.mask = alpha_mask;
                content_graphic.alpha = 0;
                Play.Tweeens.fade_to(content_graphic, 1, 0.2);
                content_container.addChild(content_graphic);
            });
            var content_title = new Text(data.title, {
                fontFamily: style.main_font_demibold,
                fontSize: 16,
                fill: 0x000000,
                align: 'center',
                wordWrap: true,
                wordWrapWidth: 260,
            });
            content_title.anchor.set(0.5);
            content_title.position.set(150, 220);
            content_container.addChild(content_title);
            content_container.interactive = true;
            content_container.on('pointertap', function () { return _this.content_action(content_container); });
            content_container.position.set(this.content_width, 0);
            this.content_width += 300 + this.lane_padding;
            this.hitArea = new Rectangle(0, 0, this.content_width, 256 + this.lane_padding);
            this.content_array.push(content_container);
            this.addChild(content_container);
        };
        ContentLane.prototype.animate_lane = function (amt) {
            var _this = this;
            var timer_amt = 5;
            var i = 0;
            var _loop_1 = function (content) {
                Play.Tweeens.easy_timer(i++ * timer_amt, function () { if (!_this.user_initiated_scroll)
                    _this.focus_on_content(content); });
            };
            for (var _i = 0, _a = this.content_array; _i < _a.length; _i++) {
                var content = _a[_i];
                _loop_1(content);
            }
            Play.Tweeens.easy_timer(amt * timer_amt, function () { return _this.animate_lane(amt); });
        };
        ContentLane.prototype.focus_on_content = function (content) {
            var x = Math.min(Math.max(Play.Framework.gw.width / 2 - 150 - content.x, Play.Framework.gw.width - this.content_width), 32);
            var y = Play.Framework.gw.height - 288;
            Play.Tweeens.easy_to(this, x, y, 0.25);
            for (var _i = 0, _a = this.content_array; _i < _a.length; _i++) {
                var c = _a[_i];
                c.alpha = 0.5;
                c.buttonMode = false;
            }
            Play.Tweeens.fade_to(content, 1, 0.25);
            Play.Tweeens.easy_timer(0.25, function () { return content.buttonMode = true; });
        };
        ContentLane.prototype.content_action = function (content) {
            this.user_initiated_scroll = true;
            content.buttonMode ? window.top.location.href = content.data.url : this.focus_on_content(content);
        };
        return ContentLane;
    }(Container));
    var ContentContainer = /** @class */ (function (_super) {
        __extends(ContentContainer, _super);
        function ContentContainer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ContentContainer;
    }(Graphics));
})(Play || (Play = {}));
var Play;
(function (Play) {
    var Styles = /** @class */ (function () {
        function Styles() {
            // ~~~~~~~~~~~ GLOBAL PRESETS ~~~~~~~~~~~~~
            this.main_font = 'Avenir Next';
            this.main_font_medium = 'Avenir Next Medium';
            this.main_font_demibold = 'Avenir Next Demi';
            this.main_font_bold = 'Avenir Next Bold';
            this.colors = {
                white: 0xfffffe,
                black: 0x000001,
                grey: 0x666666,
                light_grey: 0xCCCED7,
                blue: 0x3CC3F6,
                light_blue: 0x72d0f1,
                dark_blue: 0x0277BF,
                red: 0xff4040,
                green: 0xa3ea3e,
                gold: 0xffd200,
                purple: 0xa046e5,
            };
            if (window['PlayTheme']) {
                var theme = window['PlayTheme'];
                for (var x in theme) {
                    this.colors[x] = theme[x];
                }
            }
        }
        Object.defineProperty(Styles.prototype, "text_game_prompt", {
            // ~~~~~~~~~~~ TEXT ~~~~~~~~~~~~~
            get: function () {
                return {
                    fontFamily: this.main_font_demibold,
                    fontSize: 20,
                    fill: this.colors.white,
                    align: 'center',
                    wordWrap: true,
                    wordWrapWidth: 600,
                    lineHeight: 56,
                    letterSpacing: 1,
                };
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Styles.prototype, "text_multi_choice", {
            get: function () {
                return {
                    fontFamily: this.main_font_medium,
                    fontSize: 16,
                    fill: this.colors.grey,
                    align: 'left',
                    lineHeight: 34,
                    letterSpacing: 1,
                };
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Styles.prototype, "text_title_header", {
            get: function () {
                return {
                    fontFamily: this.main_font_demibold,
                    fontSize: 28,
                    fill: this.colors.white,
                    align: 'center',
                };
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Styles.prototype, "text_title_subheader", {
            get: function () {
                return {
                    fontFamily: this.main_font_bold,
                    fontSize: 12,
                    fill: this.colors.white,
                    align: 'center',
                    letterSpacing: 4,
                };
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Styles.prototype, "text_title_p", {
            get: function () {
                return {
                    fontFamily: this.main_font_medium,
                    fontSize: 15,
                    fill: this.colors.white,
                    align: 'center',
                    wordWrap: true,
                    wordWrapWidth: 640,
                    lineHeight: 48,
                };
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Styles.prototype, "text_bob_points", {
            get: function () {
                return {
                    fontFamily: this.main_font_bold,
                    fontSize: 18,
                    fill: this.colors.white,
                    align: 'center',
                    wordWrap: true,
                    wordWrapWidth: 670,
                    lineHeight: 56,
                };
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Styles.prototype, "text_button_sm", {
            get: function () {
                return {
                    fontFamily: this.main_font_demibold,
                    fontSize: 14,
                    fill: this.colors.black,
                };
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Styles.prototype, "text_button_med", {
            get: function () {
                return {
                    fontFamily: this.main_font_demibold,
                    fontSize: 20,
                    fill: this.colors.black,
                };
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Styles.prototype, "text_button_lrg", {
            get: function () {
                return {
                    fontFamily: this.main_font_demibold,
                    fontSize: 40,
                    fill: this.colors.black,
                };
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Styles.prototype, "text_tile_sm", {
            get: function () {
                return {
                    fontFamily: this.main_font_demibold,
                    fontSize: 18,
                    fill: this.colors.black,
                };
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Styles.prototype, "text_tile_med", {
            get: function () {
                return {
                    fontFamily: this.main_font_demibold,
                    fontSize: 36,
                    fill: this.colors.black,
                };
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Styles.prototype, "text_tile_lrg", {
            get: function () {
                return {
                    fontFamily: this.main_font_demibold,
                    fontSize: 60,
                    fill: this.colors.black,
                };
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Styles.prototype, "text_ui_sm", {
            get: function () {
                return {
                    fontFamily: this.main_font_bold,
                    fontSize: 12,
                    fill: this.colors.white,
                    letterSpacing: 1,
                };
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Styles.prototype, "text_ui_lrg", {
            get: function () {
                return {
                    fontFamily: this.main_font_demibold,
                    fontSize: 40,
                    fill: this.colors.white,
                };
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Styles.prototype, "text_pause_btn", {
            get: function () {
                return {
                    fontFamily: this.main_font_medium,
                    fontSize: 20,
                    fill: this.colors.black,
                };
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Styles.prototype, "text_pause_btn_primary", {
            get: function () {
                return {
                    fontFamily: this.main_font_medium,
                    fontSize: 20,
                    fill: this.colors.white,
                };
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Styles.prototype, "card_image", {
            // ~~~~~~~~~~~ SHAPES ~~~~~~~~~~~~~
            get: function () {
                return {
                    color: this.colors.white,
                    edge: 8,
                };
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Styles.prototype, "tile_sm", {
            get: function () {
                return {
                    color_top: this.colors.white,
                    color_edge: this.colors.light_grey,
                    edge: 4,
                    text: this.text_tile_sm,
                    depth: 4,
                };
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Styles.prototype, "tile_med", {
            get: function () {
                return {
                    color_top: this.colors.white,
                    color_edge: this.colors.light_grey,
                    edge: 8,
                    text: this.text_tile_med,
                    depth: 6,
                };
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Styles.prototype, "tile_lrg", {
            get: function () {
                return {
                    color_top: this.colors.white,
                    color_edge: this.colors.light_grey,
                    edge: 16,
                    text: this.text_tile_lrg,
                    depth: 8,
                };
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Styles.prototype, "button_sm", {
            get: function () {
                return {
                    color: this.colors.white,
                    edge: 8,
                    text: this.text_button_sm,
                };
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Styles.prototype, "button_med", {
            get: function () {
                return {
                    color: this.colors.white,
                    edge: 12,
                    text: this.text_button_med,
                };
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Styles.prototype, "button_lrg", {
            get: function () {
                return {
                    color: this.colors.white,
                    edge: 16,
                    text: this.text_button_lrg,
                };
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Styles.prototype, "pause_btn", {
            get: function () {
                return {
                    color: this.colors.white,
                    edge: 8,
                    text: this.text_pause_btn,
                };
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Styles.prototype, "pause_btn_primary", {
            get: function () {
                return {
                    color: this.colors.dark_blue,
                    edge: 8,
                    text: this.text_pause_btn_primary,
                };
            },
            enumerable: false,
            configurable: true
        });
        return Styles;
    }());
    Play.Styles = Styles;
})(Play || (Play = {}));
///<reference path="./Styles.ts" />
var Play;
(function (Play) {
    var ObjectFactory = /** @class */ (function () {
        function ObjectFactory() {
            this.styles = new Play.Styles();
        }
        ObjectFactory.prototype.make_container = function (interactive, rect) {
            if (interactive === void 0) { interactive = false; }
            if (rect === void 0) { rect = null; }
            var gw = Play.Framework.gw;
            var container = new PIXI.Container();
            container.pivot.set(gw.width * 0.5, gw.height * 0.5);
            container.position.set(gw.width * 0.5, gw.height * 0.5);
            container.interactive = interactive;
            if (interactive)
                container.hitArea = rect || new PIXI.Rectangle(0, 0, gw.width, gw.height);
            return container;
        };
        ObjectFactory.prototype.make_text = function (x, y, text, style, anchor) {
            if (anchor === void 0) { anchor = null; }
            if (anchor == null)
                anchor = { x: 0.5, y: 0.5 };
            var t = new PIXI.Text(text, style);
            t.anchor.set(anchor.x, anchor.y);
            t.position.set(x, y);
            t.style.fontSize = parseInt(t.style.fontSize.toString(), 10) * 2;
            //t.style.fontSize = style.fontSize * 2;
            t.scale.set(0.5);
            t.style.padding = 10;
            return t;
        };
        ObjectFactory.prototype.make_alert = function (content, x, y, positive, time, text_col, bg_col) {
            if (positive === void 0) { positive = true; }
            if (time === void 0) { time = -1; }
            var text_color = text_col ? text_col : (positive ? new Play.Styles().colors.green : 0xff004d);
            var text = this.make_text(0, 0, content, {
                fontFamily: new Play.Styles().main_font_bold,
                fontSize: 16,
                wordWrap: true,
                wordWrapWidth: 600,
                fill: text_color,
                align: 'center'
            });
            var bg = this.make_rounded_rectangle({
                color: bg_col ? bg_col : new Play.Styles().colors.black,
                edge: (text.height + 32) * 0.5,
            }, x, y, text.width + 32, text.height + 32, false);
            bg.pivot.set(bg.width * 0.5, bg.height * 0.5);
            text.position.set(bg.width * 0.5, bg.height * 0.5);
            bg.addChild(text);
            Play.Tweeens.pop_in(bg);
            if (time != -1)
                Play.Tweeens.easy_timer(time, function () { Play.Tweeens.pop_out(bg); });
            return bg;
        };
        ObjectFactory.prototype.make_text_card = function (_card_style, x, y, w, h, _is_button, _text_style, _text_content) {
            var card = this.make_rounded_rectangle(_card_style, x, y, w, h, _is_button);
            card.pivot.set(w * 0.5, h * 0.5);
            card.text = this.make_text(w * 0.5, h * 0.5, _text_content, _text_style);
            card.addChild(card.text);
            return card;
        };
        ObjectFactory.prototype.make_image_card = function (_card_style, x, y, w, h, _is_button, _image) {
            var card = this.make_rounded_rectangle(_card_style, x, y, w, h, _is_button);
            card.pivot.set(w * 0.5, h * 0.5);
            card.image = PIXI.Sprite.fromImage(_image);
            card.image.position.set(w * 0.5, h * 0.5);
            card.image.anchor.set(0.5);
            card.addChild(card.image);
            return card;
        };
        ObjectFactory.prototype.make_polaroid = function (x, y, size, image, margin) {
            if (margin === 'undefined')
                margin = 10;
            var p = this.make_rounded_rectangle(this.styles.card_image, x, y, size + margin * 2, size + margin * 4);
            p.pivot.set((size + margin * 2) * 0.5, (size + margin * 2) * 0.5);
            var i = PIXI.Sprite.fromImage(image);
            var scale_img = function () {
                var i_size = i.width > i.height ? i.width : i.height;
                var i_scale = size / i_size;
                console.log(i_scale);
                i.scale.set(i_scale);
            };
            if (i.texture.baseTexture.hasLoaded)
                scale_img();
            else
                i.texture.baseTexture.addListener('loaded', function () {
                    scale_img();
                });
            i.anchor.set(0.5);
            i.position.set(size * 0.5 + margin, size * 0.5 + margin);
            p.addChild(i);
            return p;
        };
        ObjectFactory.prototype.make_flippable_card = function (x, y, w, h, front, color, flipped, style, back_style, back_bleed) {
            if (back_bleed === void 0) { back_bleed = 0.8; }
            if (flipped === undefined)
                flipped = true;
            if (style === undefined)
                style = this.styles.card_image;
            if (color === undefined)
                color = this.styles.colors.dark_blue;
            if (back_style === undefined)
                back_style = { color: color, edge: 4 };
            var graphic = this.make_rounded_rectangle(style, x, y, w, h);
            graphic.pivot.set(w * 0.5, h * 0.5);
            var back = this.make_rounded_rectangle(back_style, w * 0.5, h * 0.5, w * back_bleed, h * back_bleed);
            back.pivot.set(w * 0.5 * back_bleed, h * 0.5 * back_bleed);
            var card = new Play.Card(graphic, front, back, new Play.GamePosition(x, y, w, h));
            card.scale = flipped ? -1 : 1;
            return card;
        };
        ObjectFactory.prototype.make_text_button = function (x, y, w, h, content, on_click, style, ignore_pause, fake_button, zoom_on_hover) {
            if (style === void 0) { style = null; }
            if (ignore_pause === void 0) { ignore_pause = null; }
            if (fake_button === void 0) { fake_button = false; }
            if (zoom_on_hover === void 0) { zoom_on_hover = true; }
            if (style == null) {
                style = this.styles.button_sm;
                if (h > 120) {
                    style = this.styles.button_lrg;
                }
                else if (h > 80) {
                    style = this.styles.button_med;
                }
            }
            if (style.depth == undefined)
                style.depth = 8;
            if (style.color_edge == undefined)
                style.color_edge = new Play.Styles().colors.light_grey;
            var button;
            if (fake_button) {
                button = this.make_rounded_rectangle({ edge: style.edge, color: style.color_edge }, x, y, w, h + style.depth, true);
                button.pivot.set(w * 0.5, (h + style.depth) * 0.5);
                var button_top = this.make_rounded_rectangle(style, 0, 0, w, h, true);
                button.addChild(button_top);
            }
            else {
                button = this.make_rounded_rectangle(style, x, y, w, h, true);
                button.pivot.set(w * 0.5, h * 0.5);
            }
            var text = this.make_text(w * 0.5, h * 0.5, content, style.text);
            button.text = text;
            button.addChild(text);
            var g = Play.Framework.gw;
            button.on('pointerover', function () {
                if (g.paused && !ignore_pause)
                    return;
                if (zoom_on_hover)
                    Play.Tweeens.zoom(button, 1.04);
            });
            button.on('pointerout', function () {
                if (g.paused && !ignore_pause)
                    return;
                if (zoom_on_hover)
                    Play.Tweeens.zoom(button, 1);
            });
            button.on('pointertap', function () {
                if (g.paused && !ignore_pause)
                    return;
                if (on_click) {
                    on_click();
                }
            });
            return button;
        };
        ObjectFactory.prototype.make_text_tile = function (x, y, w, h, content, on_click, override_btn, shadow, size, top_color, edge_color, text_color) {
            if (on_click === void 0) { on_click = null; }
            if (override_btn === void 0) { override_btn = false; }
            if (shadow === void 0) { shadow = true; }
            if (size === void 0) { size = -1; }
            if (top_color === void 0) { top_color = null; }
            if (edge_color === void 0) { edge_color = null; }
            if (text_color === void 0) { text_color = null; }
            var is_btn = on_click != null;
            if (!is_btn)
                on_click = function () { };
            //let styles = this.styles;
            var styles = new Play.Styles();
            var style = styles.tile_sm;
            switch (size) {
                case -1:
                    if (h > 120)
                        style = styles.tile_lrg;
                    else if (h > 80)
                        style = styles.tile_med;
                    break;
                case 1:
                    style = styles.tile_sm;
                    break;
                case 2:
                    style = styles.tile_med;
                    break;
                case 3:
                    style = styles.tile_lrg;
                    break;
                default:
                    break;
            }
            if (top_color)
                style.color_top = top_color;
            if (edge_color)
                style.color_edge = edge_color;
            if (text_color)
                style.text.fill = text_color;
            var container = this.make_container(is_btn);
            var tile = new Play.Tile(container, new Play.GamePosition(x, y, w, h), shadow, content, style, on_click);
            return tile;
        };
        ObjectFactory.prototype.make_game_over_slate = function (y, title, training_area, metrics) {
            var styles = new Play.Styles();
            var bg = this.make_container();
            var c_o = 120;
            var title_text = this.make_text(Play.Framework.gw.width * 0.5, 0, title, styles.text_title_header, { x: 0.5, y: 0 });
            var subtitle_text = this.make_text(Play.Framework.gw.width * 0.5, 32, training_area.toUpperCase(), styles.text_title_subheader, { x: 0.5, y: 0 });
            var bottom = 0;
            var fade_time = 0;
            var no_points = metrics[metrics.length - 1].value == 0;
            var completed = Play.Framework.config.is_teaser && Play.Framework.config.completed;
            var i_v = completed ? metrics.length - 1 : 0;
            var i_t = 0;
            var _loop_2 = function (i) {
                var last = i === metrics.length - 1;
                var style = last ? styles.text_bob_points : styles.text_title_p;
                var metric_text = metrics[i].title;
                var x_align = 0;
                if (!last && metrics[i].value == 0)
                    return "continue";
                if (metrics[i].title == Play.game_text.rounds[Play.Framework.config.language] && metrics[i].value == 1)
                    return "continue";
                if (last && completed) {
                    metric_text = Play.game_text.teaser_complete[Play.Framework.config.language];
                    x_align = 0.5;
                    c_o = 0;
                }
                var metric_title = this_1.make_text(Play.Framework.gw.width * 0.5 - c_o, 64 + i_t * 24, metric_text, style, { x: x_align, y: 0 });
                var metric_value = this_1.make_text(Play.Framework.gw.width * 0.5 + c_o, 64 + i_t * 24, metrics[i].value, style, { x: 1, y: 0 });
                metric_title.alpha = 0;
                metric_value.alpha = 0;
                if (last) {
                    metric_title.y += 10;
                    metric_value.y += 10;
                }
                metric_title.y += 10;
                metric_value.y += 10;
                Play.Tweeens.fade_to(metric_title, 1, 0.5, 0.5 + i_t * 0.5);
                Play.Tweeens.fade_to(metric_value, 1, 0.5, 0.5 + i_t * 0.5);
                Play.Tweeens.easy_timer(0.5 + i_t * 0.5, function () {
                    Play.Tweeens.easy_to(metric_title, 0, -10, 0.5, true);
                    Play.Tweeens.easy_to(metric_value, 0, -10, 0.5, true);
                });
                bg.addChild(metric_title);
                if (!last || !completed)
                    bg.addChild(metric_value);
                bottom = metric_title.y + 64;
                fade_time = 1 + i_t * 0.5;
                i_t++;
            };
            var this_1 = this;
            for (var i = i_v; i < metrics.length; i++) {
                _loop_2(i);
            }
            bg.addChild(title_text);
            bg.addChild(subtitle_text);
            if (!Play.Framework.config.is_teaser) {
                var replay_button = this.make_text_button(Play.Framework.gw.width * 0.5 - 65, bottom, 110, 60, Play.game_text.replay[Play.Framework.config.language], function () {
                    Play.Framework.pause_state.exit();
                }, styles.button_med, true);
                var exit_btn_style = styles.button_med;
                exit_btn_style.color = styles.colors.red;
                exit_btn_style.text.fill = styles.colors.white;
                var exit_button = this.make_text_button(Play.Framework.gw.width * 0.5 + 65, bottom, 110, 60, Play.game_text.exit[Play.Framework.config.language], function () {
                    Play.Framework.pause_state.exit();
                }, exit_btn_style, true);
                Play.Tweeens.pop_in(replay_button, fade_time);
                Play.Tweeens.pop_in(exit_button, fade_time + 0.1);
                bg.addChild(replay_button);
                bg.addChild(exit_button);
            }
            bg.y += y;
            Play.Tweeens.appear(bg);
            return bg;
        };
        ObjectFactory.prototype.make_metric = function (_title, _value) {
            return {
                title: _title,
                value: _value,
            };
        };
        ObjectFactory.prototype.make_rounded_rectangle = function (_style, _x, _y, _width, _height, _is_button) {
            if (_x === void 0) { _x = 0; }
            if (_y === void 0) { _y = 0; }
            if (_width === void 0) { _width = 100; }
            if (_height === void 0) { _height = 100; }
            if (_is_button === void 0) { _is_button = false; }
            var g = new Play.TextGraphics();
            this.style_rounded_rectangle(g, _style, _width, _height);
            g.position.set(_x, _y);
            if (_is_button) {
                g.interactive = true;
                g.buttonMode = true;
            }
            return g;
        };
        ObjectFactory.prototype.style_rounded_rectangle = function (_graphic, _style, _width, _height) {
            if (_style.outline_color) {
                var outline_width = 1;
                if (_style.outline_width)
                    outline_width = _style.outline_width;
                _graphic.lineStyle(outline_width, _style.outline_color);
            }
            var color = typeof _style.color !== "undefined" ? _style.color : 0xffffff;
            if (!_style.transparent)
                _graphic.beginFill(color);
            var edge = _style.edge ? _style.edge : 0;
            _graphic.drawRoundedRect(0, 0, _width, _height, edge);
            if (!_style.transparent)
                _graphic.endFill();
        };
        ObjectFactory.prototype.make_circle = function (_style, _x, _y, _radius, _is_button) {
            if (_x === void 0) { _x = 0; }
            if (_y === void 0) { _y = 0; }
            if (_is_button === void 0) { _is_button = false; }
            var g = new PIXI.Graphics();
            this.style_circle(g, _style, _radius);
            g.position.set(_x, _y);
            if (_is_button) {
                g.interactive = true;
                g.buttonMode = true;
            }
            return g;
        };
        ObjectFactory.prototype.style_circle = function (_graphic, _style, _radius) {
            if (_style.outline_color) {
                var outline_width = _style.outline_width ? _style.outline_width : 1;
                _graphic.lineStyle(outline_width, _style.outline_color);
            }
            //var color = _style.color ? _style.color : 0xffffff;
            if (_style.color !== undefined)
                _graphic.beginFill(_style.color);
            _graphic.drawCircle(0, 0, _radius);
            _graphic.endFill();
        };
        ObjectFactory.prototype.make_reveal_button = function (x, y) {
            if (Play.Framework.gw.ended)
                return;
            var styles = new Play.Styles();
            var width = 64;
            var height = 64;
            var reveal_button = this.make_rounded_rectangle({
                color: styles.colors.red,
                edge: 8
            }, x, y, width, height, true);
            reveal_button.pivot.set(width * 0.5, height * 0.5);
            var txt = this.make_text(32, 32, Play.game_text.reveal[Play.Framework.config.language].toUpperCase(), {
                fontFamily: styles.main_font_bold,
                fontSize: 12,
                align: 'center',
                fill: styles.colors.white,
                wordWrap: true,
                wordWrapWidth: 128
            });
            reveal_button.addChild(txt);
            reveal_button.on('pointertap', function () {
                Play.Tweeens.pop_out(reveal_button);
                Play.Framework.teaser.onRevealAnswer();
            });
            reveal_button.rotation = -0.5;
            TweenMax.to(reveal_button, 0.3, { rotation: 0, ease: Back.easeOut });
            Play.Tweeens.pop_in(reveal_button);
            Play.Framework.ui_container.reveal_btn = reveal_button;
            Play.Framework.ui_container.addChild(Play.Framework.ui_container.reveal_btn);
            //MAKE REVEAL BUTTON
        };
        ObjectFactory.prototype.make_confetti_piece = function (color, size, lifespan, parent) {
            var up = true;
            // Make a circle with given color and size
            var confetti = new Confetti(); //this.make_circle({ color: color }, 0, 0, size * 0.5);
            confetti.beginFill(color);
            confetti.drawCircle(0, 0, size * 0.5);
            confetti.endFill();
            // experimenting with diamonds - would want to add in x scaling maybe
            //let confetti = this.make_rounded_rectangle({ color: color }, 0, 0, size, size);
            //confetti.rotation += Math.PI * 0.25;
            // Give the confetti a lifespan
            confetti.life = lifespan;
            // Define fire() method
            confetti.fire = function () {
                // if lifespan is 0, destroy confetti
                if (confetti.life < 0) {
                    confetti.destroy();
                    return;
                }
                // Otherwise...
                confetti.alpha = 0;
                // Set position to random point in game
                confetti.position.set(Play.Util.get_random(0, Play.Framework.gw.width), Play.Util.get_random(0, Play.Framework.gw.height));
                // Get random time for tweens
                var time = Play.Util.get_random(0.5, 1);
                // Tween position
                Play.Tweeens.easy_to(confetti, Play.Util.get_random(-20, 20), Play.Util.get_random(20, 40) * (up ? -10 : 1), time, true, (up ? Power3.easeOut : null));
                // Tween alpha
                Play.Tweeens.fade_to(confetti, 1, time * 0.5);
                Play.Tweeens.easy_timer(time * 0.5, function () { Play.Tweeens.fade_to(confetti, 0, time * 0.5); });
                // subtract time from lifespan
                confetti.life -= time;
                // call fire again
                Play.Tweeens.easy_timer(time, function () { confetti.fire(); });
                up = false;
            };
            // Add confetti to parent
            parent.addChild(confetti);
            // Initiate confetti fire() sequence
            confetti.fire();
        };
        return ObjectFactory;
    }());
    Play.ObjectFactory = ObjectFactory;
    var Confetti = /** @class */ (function (_super) {
        __extends(Confetti, _super);
        function Confetti() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Confetti;
    }(PIXI.Graphics));
})(Play || (Play = {}));
///<reference path="./ObjectFactory.ts" />
var Play;
(function (Play) {
    var Framework = /** @class */ (function () {
        function Framework() {
        }
        Framework.init = function (teaser) {
            var _this = this;
            this.assets_loaded = false;
            this.fonts_loaded = false;
            this.num_fonts_loaded = 0;
            this.sounds = new Play.AudioManager();
            teaser.config.language = Play.TranslationManager.validate_language_code(teaser.config.language);
            Framework.teaser = teaser;
            Framework.config = teaser.config;
            Framework.config.show_ui = Framework.config.show_ui == undefined ? true : Framework.config.show_ui;
            //Framework.config.total_time = Framework.config.total_time || 999999999999;
            //Framework.config.time_remaining = Framework.config.time_remaining || 999999999999;
            if (Framework.config.total_time == undefined)
                Framework.config.total_time = 9e9;
            if (Framework.config.time_remaining == undefined)
                Framework.config.time_remaining = 9e9;
            Framework.config.updated_timer = Framework.config.timer;
            if (Framework.config.is_teaser && Framework.config.completed)
                Framework.config.updated_timer = Math.max(0, Framework.config.timer - Math.max(0, Framework.config.total_time - Framework.config.time_remaining));
            if (Framework.config.time_remaining == 0 && !Framework.config.is_teaser)
                Framework.config.completed = true;
            if (!Framework.config.graphic)
                throw new Error('Graphic missing');
            var images = [Framework.config.graphic];
            if (this.config.preload && this.config.preload.length > 0)
                images = images.concat(this.config.preload);
            var existing_keys = Object.keys(PIXI.loader.resources);
            images = images.filter(function (img) { return existing_keys.indexOf(img) == -1; });
            this.load(['Avenir Next', 'Avenir Next Medium', 'Avenir Next Demi', 'Avenir Next Bold'], images, function () { return _this.create_container(); });
        };
        Framework.load = function (fonts, assets, next) {
            var _this = this;
            var validate = function () {
                if (!_this.assets_loaded || !_this.fonts_loaded)
                    return;
                next();
            };
            if (fonts.length == 0)
                this.fonts_loaded = true;
            else
                this.load_fonts(fonts, function () { return validate(); });
            if (assets.length == 0)
                this.assets_loaded = true;
            else
                this.load_assets(assets, function () { return validate(); });
            validate();
        };
        Framework.load_fonts = function (fonts, next) {
            var _this = this;
            if (fonts.length == 0) {
                next();
                return;
            }
            var expected_fonts = fonts.length;
            var _loop_3 = function (font) {
                var observer = new FontFaceObserver(font);
                observer.load().then(function () {
                    expected_fonts--;
                    if (expected_fonts == 0) {
                        _this.fonts_loaded = true;
                        next();
                    }
                }, function () {
                    expected_fonts--;
                    console.log('font ' + font + ' not loaded!');
                    if (expected_fonts == 0) {
                        _this.fonts_loaded = true;
                        next();
                    }
                });
            };
            for (var _i = 0, fonts_1 = fonts; _i < fonts_1.length; _i++) {
                var font = fonts_1[_i];
                _loop_3(font);
            }
        };
        Framework.load_assets = function (assets, next) {
            var _this = this;
            if (assets.length == 0) {
                next();
                return;
            }
            var safe_assets = [];
            for (var _i = 0, assets_1 = assets; _i < assets_1.length; _i++) {
                var asset = assets_1[_i];
                if (safe_assets.indexOf(asset) == -1)
                    safe_assets.push(asset);
            }
            for (var _a = 0, safe_assets_1 = safe_assets; _a < safe_assets_1.length; _a++) {
                var asset = safe_assets_1[_a];
                if (asset.includes('.wav'))
                    PIXI.loader.add(asset);
                else if (asset.includes('.mp3'))
                    PIXI.loader.add(asset);
                else if (asset.includes('.ogg'))
                    PIXI.loader.add(asset);
                else if (asset.includes('.mp4'))
                    PIXI.loader.add(asset);
                else if (asset.includes('.webm'))
                    PIXI.loader.add(asset);
                else if (asset.includes('.json'))
                    PIXI.loader.add(asset);
                else
                    PIXI.loader.add(asset, { loadType: 2 });
            }
            PIXI.loader.load(function (l, r) {
                _this.resources = r;
                _this.assets_loaded = true;
                next();
            });
        };
        Framework.create_container = function () {
            this.container = this.config.container || document.getElementById('game_container');
            var gw = new Play.GameWindow();
            if (this.container.offsetWidth < 375 || this.container.offsetHeight < 550) {
                var ratio = this.container.offsetWidth / this.container.offsetHeight;
                if (ratio > 0.57) {
                    this.scale = this.container.offsetHeight / 550;
                    gw.width = (550 / this.container.offsetHeight) * this.container.offsetWidth;
                    gw.height = Math.max(550, this.container.offsetHeight);
                }
                else {
                    this.scale = this.container.offsetWidth / 375;
                    gw.width = Math.max(375, this.container.offsetWidth);
                    gw.height = (375 / this.container.offsetWidth) * this.container.offsetHeight;
                }
            }
            else {
                this.scale = 1;
                gw.width = this.container.offsetWidth;
                gw.height = this.container.offsetHeight;
            }
            if (this.scale == 0)
                this.scale = 1;
            if (!this.config.alerts_position)
                this.config.alerts_position = gw.height - 172;
            gw.mobile = /Mobi/i.test(navigator.userAgent);
            gw.muted = true;
            Framework.gw = gw;
            this.init_app();
            this.init_game();
            this.update(0);
            this.intro_screen.load();
        };
        Framework.init_app = function () {
            this.app = new PIXI.Application(Math.min(Framework.gw.width * this.scale, this.container.offsetWidth), Math.min(Framework.gw.height * this.scale, this.container.offsetHeight), { antialias: true, transparent: true, resolution: 1 });
            Framework.gw.width = Math.min(Framework.gw.width, this.app.renderer.width / this.scale);
            Framework.gw.height = Math.min(Framework.gw.height, this.app.renderer.height / this.scale);
            this.container.appendChild(this.app.view);
            if (Framework.gw.width == 375) {
                Framework.gw.mobile = true;
            }
        };
        Framework.init_game = function () {
            if (this.teaser.onInitGame)
                this.teaser.onInitGame();
            this.exited = false;
            this.game_container = this.creation.make_container();
            this.play_state = this.creation.make_container();
            this.shadow_layer = this.creation.make_container();
            this.ui_container = new Play.UIScreen(this.config);
            this.pause_state = new Play.PauseScreen(this.config);
            this.intro_screen = new Play.IntroScreen(this.config);
            this.play_state.visible = false;
            this.app.stage.addChild(this.game_container);
            this.app.stage.addChild(this.pause_state);
            this.add_title();
            this.game_container.addChild(this.play_state);
            this.game_container.addChild(this.ui_container);
            this.play_state.addChild(this.shadow_layer);
            this.pause_state.load();
            this.game_container.alpha = 0;
            this.game_container.scale.set(this.scale);
            this.pause_state.scale.set(this.scale);
            this.pause_state.position.set(this.gw.width * 0.5 * this.scale, this.gw.height * 0.5 * this.scale);
            this.game_container.position.set(this.gw.width * 0.5 - (this.gw.width - this.gw.width * this.scale) * 0.5, this.gw.height * 0.5 - (this.gw.height - this.gw.height * this.scale) * 0.5);
            this.tween_game_container();
            /*window.onresize = (event) => {
                console.log('hi');

                var w = this.container.offsetWidth;
                var h = this.container.offsetHeight;	//this part resizes the canvas but keeps ratio the same
                //this.app.renderer.view.style.width = w + "px";
                //this.app.renderer.view.style.height = h + "px";	//this part adjusts the ratio:
                this.app.renderer.resize(w,h);
                //this.game_container.scale.set(w / this.game_container.width, h / this.game_container.height);
            }*/
        };
        Framework.add_title = function () {
            this.game_container.addChild(this.creation.make_rounded_rectangle({
                color: new Play.Styles().colors.blue
            }, 0, 0, this.gw.width, this.gw.height));
            this.game_container.addChild(this.intro_screen);
        };
        Framework.tween_game_container = function () {
            Play.Tweeens.fade_to(this.game_container, 1);
        };
        // #endregion
        // #region update
        Framework.update = function (timestamp) {
            if (!this.exited)
                window.requestAnimationFrame(Framework.update);
            if (!Framework.gw.begun)
                return;
            Framework.ui_container.timer.run(timestamp);
            if (Framework.config.use_score)
                Framework.ui_container.score.run();
            if (Framework.teaser.onGameUpdate != null) {
                Framework.teaser.onGameUpdate(timestamp);
            }
        };
        // #endregion
        // #region actions
        Framework.start_game = function () {
            var _this = this;
            key.deleteScope('all');
            this.serve_has_played();
            this.gw.ended = false;
            this.gw.begun = false;
            Play.Tweeens.easy_timer(0.5, function () {
                _this.ui_container.load();
            });
            Play.Tweeens.easy_timer(1.5, function () {
                Framework.play_state.visible = true;
                Framework.gw.begun = true;
                Framework.sounds.start();
                _this.teaser.onMakeGame();
            });
        };
        Framework.end_game = function (completed) {
            if (this.gw.ended)
                return;
            this.gw.ended = true;
            this.gw.completed = completed;
            this.ui_container.clear_pop_ups();
            this.teaser.onGameOver();
            if (this.config.is_teaser)
                Framework.serve_completed();
            if (!this.config.show_ui)
                return;
            if (this.config.use_score && !this.gw.keep_score) {
                Play.Tweeens.easy_to(this.ui_container.score, 0, -150, 0.3, true);
                Play.Tweeens.easy_to(this.ui_container.score.label, 0, -150, 0.3, true);
            }
            else if (this.config.is_teaser) {
                Play.Tweeens.easy_to(this.ui_container.audio_controls.mute_btn, 0, -150, 0.5, true);
                Play.Tweeens.easy_to(this.ui_container.audio_controls.unmute_btn, 0, -150, 0.5, true);
            }
            if (!this.config.is_teaser)
                Play.Tweeens.easy_to(this.ui_container.pause_btn, 0, -150, 0.4, true);
            Play.Tweeens.easy_to(this.ui_container.timer, 0, -150, 0.5, true);
            Play.Tweeens.easy_to(this.ui_container.timer.label, 0, -150, 0.5, true);
            if (this.ui_container.reveal_btn)
                Play.Tweeens.pop_out(this.ui_container.reveal_btn);
        };
        Framework.prep_score = function (daily_points, raw_score) {
            if (this.config.is_teaser && this.config.completed)
                return;
            this.serve_score(daily_points, raw_score);
        };
        Framework.destroy_game = function () {
            this.exited = true;
            gsap.globalTimeline.clear();
            this.game_container.destroy(true);
            if (this.sounds.sounds[Framework.config.audio_source])
                this.sounds.sounds[Framework.config.audio_source].stop();
            Framework.gw.begun = false;
            Framework.game_container = null;
            Framework.ui_container = null;
            Framework.intro_screen = null;
            Framework.play_state = null;
            Framework.pause_state = null;
        };
        Framework.serve_version = function () {
            return this.teaser.version;
        };
        Framework.on_modal_close = function () {
        };
        Framework.exit = function () {
            // NEED EXIT STUFF
        };
        Framework.serve_score = function (daily_points, raw_score) {
            // SERVE SCORE
        };
        Framework.serve_timer = function (current_time, elapsed_time) {
            // SERVE TIMER
        };
        Framework.serve_has_played = function () {
            // SERVE USER HAS PLAYED GAME
        };
        Framework.serve_completed = function () {
            // SERVE TEASER COMPLETED
        };
        Framework.image_path = '../../common/images/';
        Framework.audio_path = 'audio/';
        Framework.ui_element_offset = 0.20;
        Framework.exited = false;
        Framework.creation = new Play.ObjectFactory();
        return Framework;
    }());
    Play.Framework = Framework;
})(Play || (Play = {}));
var Play;
(function (Play) {
    var Game = /** @class */ (function () {
        function Game() {
            this.revealed_answer = false;
            this.version = 'unknown';
            PIXI.loader.reset();
        }
        return Game;
    }());
    Play.Game = Game;
})(Play || (Play = {}));
var Play;
(function (Play) {
    var GameConfig = /** @class */ (function (_super) {
        __extends(GameConfig, _super);
        function GameConfig() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return GameConfig;
    }(Play.Config));
    Play.GameConfig = GameConfig;
})(Play || (Play = {}));
var Play;
(function (Play) {
    var GamePosition = /** @class */ (function () {
        function GamePosition(x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }
        return GamePosition;
    }());
    Play.GamePosition = GamePosition;
})(Play || (Play = {}));
var Play;
(function (Play) {
    var GameScore = /** @class */ (function (_super) {
        __extends(GameScore, _super);
        function GameScore(_config, _y) {
            var _this = _super.call(this, '0', new Play.Styles().text_ui_lrg) || this;
            _this.pts = 0;
            _this.bonus_pts = 0;
            _this.bonus_lvl = 1;
            _this.bonus_pts_per_lvl = 5;
            _this.bonus_max_lvl = 5;
            _this.y_ref = 0;
            _this.temp_pts = 0;
            _this.config = _config;
            _this.anchor.set(0.5);
            _this.position.set(Play.Framework.gw.width - Play.Framework.gw.width * Play.Framework.ui_element_offset, _y);
            _this.y_ref = Play.Framework.config.alerts_at_bottom ? Play.Framework.gw.height - 64 : _y;
            _this.label = new Play.ObjectFactory().make_text(Play.Framework.gw.width - Play.Framework.gw.width * Play.Framework.ui_element_offset, _y + 32, "PTS", new Play.Styles().text_ui_sm);
            return _this;
        }
        GameScore.prototype.load = function () {
            this.y -= 150;
            this.label.y -= 150;
            Play.Tweeens.easy_to(this, 0, 150, 0.6, true);
            Play.Tweeens.easy_to(this.label, 0, 150, 0.6, true);
        };
        GameScore.prototype.run = function () {
            if (!Play.Framework.gw.begun || !this.config.use_score || Play.Framework.gw.paused || this.temp_pts == this.pts) {
                return;
            }
            this.temp_pts = Math.ceil(this.temp_pts + (this.pts - this.temp_pts) * 0.05);
            this.text = this.temp_pts.toString();
        };
        GameScore.prototype.give_pts = function (points) {
            if (!this.config.use_score) {
                return;
            }
            if (points == null)
                points = 1;
            this.pts += points;
        };
        GameScore.prototype.level_up = function () {
            if (this.bonus_lvl == this.bonus_max_lvl)
                return;
            this.bonus_pts += 1;
            if (this.bonus_pts < this.bonus_pts_per_lvl)
                return;
            // TODO:
            // pop_alert('BONUS UP!', true);
            this.bonus_pts = 0;
            this.bonus_lvl++;
            Play.Framework.sounds.alert_positive();
            Play.Framework.ui_container.make_pop_up(Play.game_text.level_up[Play.Framework.config.language], Play.Framework.gw.width * 0.5, (Play.Framework.config.alerts_position ? Play.Framework.config.alerts_position : this.y_ref), true, 1.5);
        };
        GameScore.prototype.level_down = function () {
            if (this.bonus_pts > 0) {
                this.bonus_pts = 0;
                return;
            }
            if (this.bonus_lvl == 1) {
                return;
            }
            // TODO:
            // pop_alert('BONUS DOWN!', false);
            this.bonus_lvl--;
            Play.Framework.ui_container.make_pop_up(Play.game_text.level_down[Play.Framework.config.language], Play.Framework.gw.width * 0.5, (Play.Framework.config.alerts_position ? Play.Framework.config.alerts_position : this.y_ref), false, 1.5);
        };
        return GameScore;
    }(PIXI.Text));
    Play.GameScore = GameScore;
})(Play || (Play = {}));
var Play;
(function (Play) {
    var GameScreen = /** @class */ (function (_super) {
        __extends(GameScreen, _super);
        function GameScreen() {
            var _this = _super.call(this) || this;
            _this.pivot.set(Play.Framework.gw.width * 0.5, Play.Framework.gw.height * 0.5);
            _this.position.set(Play.Framework.gw.width * 0.5, Play.Framework.gw.height * 0.5);
            return _this;
        }
        return GameScreen;
    }(PIXI.Container));
    Play.GameScreen = GameScreen;
})(Play || (Play = {}));
var Play;
(function (Play) {
    var GameWindow = /** @class */ (function () {
        function GameWindow() {
            this.width = 100;
            this.height = 100;
            this.mobile = false;
            this.muted = false;
            this.paused = false;
            this.begun = false;
            this.ended = false;
            this.wait = false;
            this.completed = false;
            this.keep_score = false;
            this.audio_buttons = [];
        }
        return GameWindow;
    }());
    Play.GameWindow = GameWindow;
})(Play || (Play = {}));
///<reference path="./GameScreen.ts" />
var Play;
(function (Play) {
    var IntroScreen = /** @class */ (function (_super) {
        __extends(IntroScreen, _super);
        function IntroScreen(config) {
            var _this = _super.call(this) || this;
            _this.config = config;
            _this.ignore = false;
            return _this;
        }
        IntroScreen.prototype.load = function () {
            var _this = this;
            this.ignore = false;
            var styles = new Play.Styles();
            var creation = new Play.ObjectFactory();
            this.bg = creation.make_rounded_rectangle({ color: styles.colors.blue }, 0, 0, Play.Framework.gw.width, Play.Framework.gw.height);
            this.graphic = PIXI.Sprite.fromImage(this.config.graphic);
            //this.graphic.x = -(667 - Framework.gw.width) * 0.5;
            var s = Math.min(1, Play.Framework.gw.height / 667 / 1.3);
            this.graphic.anchor.set(0.5, 0.5);
            this.graphic.scale.set(s, s);
            this.graphic.position.set(Play.Framework.gw.width * 0.5 + 64, Play.Framework.gw.height * 0.5 - 180);
            var exit_only = !this.config.is_teaser && this.config.completed && !this.config.always_available;
            var i_text = exit_only ? Play.game_text.next_time[Play.Framework.config.language] : this.config.instructions;
            this.title = creation.make_text(Play.Framework.gw.width * 0.5, Play.Framework.gw.height - 252, this.config.title, styles.text_title_header);
            this.subtitle = creation.make_text(Play.Framework.gw.width * 0.5, Play.Framework.gw.height - 224, this.config.subtitle.toUpperCase(), styles.text_title_subheader);
            this.instructions = creation.make_text(Play.Framework.gw.width * 0.5, Play.Framework.gw.height - 148, i_text, styles.text_title_p, { x: 0.5, y: 0.5 });
            while (this.instructions.height > 112) {
                this.instructions.scale.set(this.instructions.scale.x * 0.95);
            }
            this.circle = creation.make_circle({ color: styles.colors.blue }, Play.Framework.gw.width * 0.5, Play.Framework.gw.height - 50, Play.Framework.gw.height * 0.5);
            this.circle.scale.set(0, 0);
            var btn_style = styles.pause_btn;
            var play_text = Play.game_text.play[Play.Framework.config.language];
            if (exit_only) {
                btn_style.color = styles.colors.red;
                btn_style.text.fill = styles.colors.white;
                play_text = Play.game_text.exit[Play.Framework.config.language];
            }
            this.play_btn = creation.make_text_button(Play.Framework.gw.width * 0.5, Play.Framework.gw.height - 50, Math.min(335, Play.Framework.gw.width - 40), 60, play_text, function () {
                exit_only ? Play.Framework.exit() : _this.exit();
            }, btn_style);
            this.addChild(this.bg);
            this.addChild(this.graphic);
            this.addChild(this.title);
            this.addChild(this.subtitle);
            this.addChild(this.instructions);
            this.addChild(this.play_btn);
            this.addChild(this.circle);
            if (Play.Framework.config.show_version) {
                var v_text = creation.make_text(16, 16, Play.Framework.teaser.version, styles.text_title_subheader, { x: 0, y: 0 });
                this.addChild(v_text);
            }
            key('space', function () {
                exit_only ? Play.Framework.exit() : _this.exit();
            });
        };
        IntroScreen.prototype.exit = function () {
            var _this = this;
            if (this.ignore)
                return;
            Play.Framework.sounds.begin();
            Play.Framework.sounds.select();
            this.ignore = true;
            this.play_btn.interactive = false;
            if (this.graphic != null) {
                Play.Tweeens.fade_to(this.graphic, 0, 0.75);
            }
            Play.Tweeens.zoom(this.circle, 4, function () { _this.destroy(); }, 1.5);
            Play.Framework.start_game();
        };
        return IntroScreen;
    }(Play.GameScreen));
    Play.IntroScreen = IntroScreen;
})(Play || (Play = {}));
var Play;
(function (Play) {
    var PauseButton = /** @class */ (function () {
        function PauseButton(config, _y) {
            var _this = this;
            this.config = config;
            var styles = new Play.Styles();
            var creation = new Play.ObjectFactory();
            if (this.config.is_teaser)
                return;
            var x = this.config.use_score ? Play.Framework.gw.width * 0.5 : Play.Framework.gw.width - Play.Framework.gw.width * Play.Framework.ui_element_offset;
            this.pause_button = creation.make_rounded_rectangle({ color: styles.colors.white, edge: 0 }, x, _y, 8, 32, true);
            this.pause_button.hitArea = new PIXI.Rectangle(-4, 0, 32, 32);
            var r = creation.make_rounded_rectangle({ color: styles.colors.white, edge: 0 }, 16, 0, 8, 32);
            this.pause_button.addChild(r);
            this.pause_button.alpha = 0.5;
            this.pause_button.pivot.set(12, 16);
            this.pause_button.on('pointerover', function () {
                if (Play.Framework.gw.paused)
                    return;
                Play.Tweeens.fade_to(_this.pause_button, 1);
                Play.Tweeens.zoom(_this.pause_button, 1.1);
            });
            this.pause_button.on('pointerout', function () {
                if (Play.Framework.gw.paused)
                    return;
                Play.Tweeens.fade_to(_this.pause_button, 0.5);
                Play.Tweeens.zoom(_this.pause_button, 1);
            });
            this.pause_button.on('pointertap', function () {
                if (Play.Framework.gw.paused)
                    return;
                Play.Tweeens.fade_to(_this.pause_button, 0.5);
                Play.Tweeens.zoom(_this.pause_button, 1);
                Play.Framework.pause_state.pause();
            });
        }
        PauseButton.prototype.load = function () {
            this.pause_button.y -= 150;
            Play.Tweeens.easy_to(this.pause_button, 0, 150, 0.5, true);
        };
        return PauseButton;
    }());
    Play.PauseButton = PauseButton;
})(Play || (Play = {}));
var Play;
(function (Play) {
    var PauseScreen = /** @class */ (function (_super) {
        __extends(PauseScreen, _super);
        function PauseScreen(config) {
            var _this = _super.call(this) || this;
            _this.config = config;
            _this.last_time = 0;
            _this.pause_time = 0;
            _this.pause_callback = function () { };
            _this.unpause_callback = function () { };
            return _this;
        }
        PauseScreen.prototype.load = function () {
            var _this = this;
            if (this.config.is_teaser)
                return;
            var styles = new Play.Styles();
            var creation = new Play.ObjectFactory();
            var btn_spacing = 68;
            var btn_y = Play.Framework.gw.height - btn_spacing * 3;
            this.resume_button = creation.make_text_button(Play.Framework.gw.width * 0.5, btn_y, 311, 60, Play.game_text.resume[Play.Framework.config.language], function () {
                _this.unpause();
            }, styles.pause_btn_primary, true);
            this.restart_button = creation.make_text_button(Play.Framework.gw.width * 0.5, btn_y + btn_spacing, 311, 60, Play.game_text.restart[Play.Framework.config.language], function () {
                _this.restart();
            }, styles.pause_btn, true);
            this.exit_button = creation.make_text_button(Play.Framework.gw.width * 0.5, btn_y + btn_spacing * 2, 311, 60, Play.game_text.exit[Play.Framework.config.language], function () {
                _this.exit();
            }, styles.pause_btn, true);
            this.background = creation.make_rounded_rectangle({ color: styles.colors.blue, edge: 0, }, 0, 0, Play.Framework.gw.width, Play.Framework.gw.height);
            this.background.alpha = 0.5;
            this.audio_controls = new Play.AudioControls();
            this.audio_controls.load();
            this.addChild(this.background);
            this.addChild(this.resume_button);
            this.addChild(this.restart_button);
            this.addChild(this.exit_button);
            // this.addChild(this.audio_controls.mute_btn);
            // this.addChild(this.audio_controls.unmute_btn);
            var text = creation.make_text(0, 0, Play.Framework.config.instructions, {
                fontFamily: styles.main_font_demibold,
                fontSize: 18,
                fill: styles.colors.black,
                align: 'center',
                wordWrap: true,
                wordWrapWidth: 600,
                lineHeight: 48,
            }, { x: 0.5, y: 0.5 });
            this.instructions = creation.make_rounded_rectangle({ edge: 8, color: styles.colors.white }, Play.Framework.gw.width * 0.5, Play.Framework.pause_state.children[1].y - 64, text.width + 48, text.height + 48);
            text.position.set(this.instructions.width * 0.5, this.instructions.height * 0.5);
            this.instructions.pivot.set(this.instructions.width * 0.5, this.instructions.height);
            this.instructions.addChild(text);
            this.addChild(this.instructions);
            this.visible = false;
        };
        PauseScreen.prototype.pause = function () {
            this.last_time = 0;
            this.visible = true;
            this.instructions.alpha = 0;
            Play.Tweeens.fade_to(this.instructions, 1, 0.2, 0.25);
            Play.Framework.game_container.filters = [new PIXI.filters.BlurFilter(0, 11, 1)];
            TweenMax.to(Play.Framework.game_container.filters[0], 0.2, { blur: 32 });
            this.background.alpha = 0;
            var bg_alpha = Play.Framework.app.renderer.type == PIXI.RENDERER_TYPE.WEBGL ? 0.5 : 1;
            Play.Tweeens.fade_to(this.background, bg_alpha);
            Play.Framework.gw.paused = true;
            this.resume_button.x = -Play.Framework.gw.width * 0.5;
            this.restart_button.x = -Play.Framework.gw.width * 0.5;
            this.exit_button.x = -Play.Framework.gw.width * 0.5;
            Play.Tweeens.easy_to(this.resume_button, Play.Framework.gw.width * 0.5, this.resume_button.y, 0.2, false, null, 0.05);
            Play.Tweeens.easy_to(this.restart_button, Play.Framework.gw.width * 0.5, this.restart_button.y, 0.2, false, null, 0.1);
            Play.Tweeens.easy_to(this.exit_button, Play.Framework.gw.width * 0.5, this.exit_button.y, 0.2, false, null, 0.15);
            this.pause_callback();
        };
        PauseScreen.prototype.unpause = function () {
            this.visible = false;
            Play.Framework.game_container.filters = [];
            Play.Framework.gw.paused = false;
            this.unpause_callback();
        };
        PauseScreen.prototype.restart = function () {
            this.unpause();
            Play.Framework.destroy_game();
            Play.Framework.init_game();
            Play.Framework.start_game();
        };
        PauseScreen.prototype.exit = function () {
            this.unpause();
            Play.Framework.destroy_game();
            Play.Framework.init_game();
            Play.Framework.intro_screen.load();
        };
        return PauseScreen;
    }(Play.GameScreen));
    Play.PauseScreen = PauseScreen;
})(Play || (Play = {}));
var Play;
(function (Play) {
    var PlayScreen = /** @class */ (function (_super) {
        __extends(PlayScreen, _super);
        function PlayScreen(config) {
            var _this = _super.call(this) || this;
            _this.config = config;
            return _this;
        }
        PlayScreen.prototype.load = function () {
        };
        return PlayScreen;
    }(Play.GameScreen));
    Play.PlayScreen = PlayScreen;
})(Play || (Play = {}));
var Play;
(function (Play) {
    var ScrollContainer = /** @class */ (function (_super) {
        __extends(ScrollContainer, _super);
        function ScrollContainer(bounds) {
            var _this = _super.call(this) || this;
            _this.dragging = false;
            _this.bounds = bounds;
            _this.set_interactions();
            return _this;
        }
        ScrollContainer.prototype.set_bounds = function (min, max) {
            this.bounds = {
                min: min,
                max: max
            };
            if (this.scrollbar)
                this.scrollbar.set_parent_bounds(min, max);
            this.global_n = 99999;
            this.scroll(-99999, false);
        };
        ScrollContainer.prototype.set_interactions = function () {
            var _this = this;
            this.interactive = true;
            document.addEventListener('wheel', function (e) { _this.on_wheel(e); }, false);
            this.on('pointerdown', function (e) { _this.start_drag(e); });
            this.on('pointerup', function () {
                if (_this.scrollbar)
                    _this.scrollbar.end_drag();
                _this.end_drag();
            });
            //this.on('pointerout', () => { this.end_drag(); });
            this.on('pointermove', function (e) { _this.on_move(e); });
        };
        ScrollContainer.prototype.on_wheel = function (e) {
            this.global_n = -e.deltaY;
            this.scroll(-e.deltaY);
            this.last_diff = -e.deltaY;
            this.last_pos = this.last_pos + e.deltaY;
        };
        ScrollContainer.prototype.start_drag = function (e) {
            this.dragging = true;
            this.last_pos = e.data.global.y;
        };
        ScrollContainer.prototype.end_drag = function () {
            this.dragging = false;
            this.global_n = this.last_diff;
            this.scroll(this.last_diff, true);
        };
        ScrollContainer.prototype.on_move = function (e) {
            if (!this.dragging)
                return;
            if (e.data.buttons == 0)
                this.end_drag();
            this.last_diff = e.data.global.y - this.last_pos;
            this.global_n = this.last_diff;
            this.scroll(this.last_diff);
            this.last_pos = e.data.global.y;
        };
        ScrollContainer.prototype.scroll = function (n, continuous) {
            var _this = this;
            if (continuous === void 0) { continuous = false; }
            if (isNaN(this.global_n) || this.global_n === 0)
                return;
            this.y = Math.min(Math.max((this.y + this.global_n), this.bounds.min), this.bounds.max);
            if (this.scrollbar)
                this.scrollbar.scroll(this.global_n);
            if (!continuous)
                return;
            if (Math.abs(n *= 0.9) < 0.01)
                this.global_n = 0;
            requestAnimationFrame(function () { _this.scroll(n, true); });
        };
        ScrollContainer.prototype.add_scrollbar = function (parent) {
            this.scrollbar = new ScrollBar(this.bounds, 6, 6, 64);
            this.scrollbar.parent_scroll = this;
            parent.addChild(this.scrollbar);
        };
        return ScrollContainer;
    }(PIXI.Container));
    Play.ScrollContainer = ScrollContainer;
    var ScrollBar = /** @class */ (function (_super) {
        __extends(ScrollBar, _super);
        function ScrollBar(parent_bounds, padding, w, h) {
            var _this = _super.call(this, { min: padding, max: Play.Framework.gw.height - h - padding }) || this;
            _this.parent_bounds = parent_bounds;
            _this.h = h;
            _this.padding = padding;
            var scrollbar = new PIXI.Graphics();
            scrollbar.beginFill(0xFFFFFF, 0.5);
            scrollbar.drawRoundedRect(0, 0, w, h, 2);
            scrollbar.endFill();
            _this.addChild(scrollbar);
            _this.position.set(Play.Framework.gw.width - w - padding, padding);
            return _this;
        }
        ScrollBar.prototype.set_parent_bounds = function (min, max) {
            this.parent_bounds = {
                min: min,
                max: max
            };
        };
        ScrollBar.prototype.set_interactions = function () {
            var _this = this;
            this.interactive = true;
            this.buttonMode = true;
            this.on('pointerdown', function (e) { _this.start_drag(e); });
            this.on('pointerup', function (e) { _this.end_drag(); });
            this.on('pointermove', function (e) { _this.on_move(e); });
        };
        ScrollBar.prototype.on_move = function (e) {
            if (!this.dragging)
                return;
            if (e.data.buttons == 0)
                this.end_drag();
            //this.last_diff = e.data.global.y - this.last_pos;
            this.scroll_parent(e.data.global.y - this.last_pos);
            this.last_pos = e.data.global.y;
        };
        ScrollBar.prototype.end_drag = function () {
            this.dragging = false;
        };
        ScrollBar.prototype.scroll_parent = function (n) {
            this.parent_scroll.global_n = -n * (this.parent_bounds.max - this.parent_bounds.min) / (this.bounds.max - this.bounds.min);
            this.parent_scroll.scroll(-n * (this.parent_bounds.max - this.parent_bounds.min) / (this.bounds.max - this.bounds.min));
        };
        ScrollBar.prototype.scroll = function (n) {
            var v = -n * (this.bounds.max - this.bounds.min) / (this.parent_bounds.max - this.parent_bounds.min);
            this.global_n = v;
            _super.prototype.scroll.call(this, v);
        };
        return ScrollBar;
    }(ScrollContainer));
    Play.ScrollBar = ScrollBar;
})(Play || (Play = {}));
var Play;
(function (Play) {
    var TextGraphics = /** @class */ (function (_super) {
        __extends(TextGraphics, _super);
        function TextGraphics() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return TextGraphics;
    }(PIXI.Graphics));
    Play.TextGraphics = TextGraphics;
})(Play || (Play = {}));
var Play;
(function (Play) {
    var Theme = /** @class */ (function () {
        function Theme() {
            this.white = 0xfffffe;
            this.black = 0x000001;
            this.grey = 0x666666;
            this.light_grey = 0xCCCED7;
            this.blue = 0x3CC3F6;
            this.light_blue = 0x72d0f1;
            this.dark_blue = 0x0277BF;
            this.red = 0xff4040;
            this.green = 0xa3ea3e;
            this.gold = 0xffd200;
            this.purple = 0xa046e5;
        }
        return Theme;
    }());
    Play.Theme = Theme;
})(Play || (Play = {}));
var Play;
(function (Play) {
    var Tile = /** @class */ (function () {
        function Tile(g, pos, has_shadow, content, style, on_click) {
            this.g = g;
            this.has_shadow = has_shadow;
            this.content = content;
            this.style = style;
            this.on_click = on_click;
            this.width = 0;
            this.height = 0;
            this.swapped = false;
            this.played = false;
            this.dragging = false;
            this.update = function () { };
            this.leave = function (b) { };
            this.make_shadow(pos);
            this.make_sides(pos);
            this.make_top(pos);
            this.make_text(pos, content, style);
            this.x = pos.x;
            this.y = pos.y;
            this.width = pos.width;
            this.height = pos.height;
            this.shadow_sm_x = pos.width / 100;
            this.shadow_sm_y = pos.height / 100;
        }
        Tile.prototype.make_shadow = function (pos) {
            if (!this.has_shadow)
                return;
            this.shadow = PIXI.Sprite.fromImage('shadow_100_100.png');
            this.shadow.position.set(pos.x, pos.y + this.style.depth * 8);
            this.shadow.anchor.set(0.5);
            this.shadow.alpha = 0.25;
            Play.Framework.shadow_layer.addChild(this.shadow);
        };
        Tile.prototype.make_sides = function (pos) {
            var creation = new Play.ObjectFactory();
            this.sides = creation.make_rounded_rectangle({ color: this.style.color_edge, edge: this.style.edge }, pos.x, pos.y + this.style.depth, pos.width, pos.height);
            this.sides.pivot.set(pos.width * 0.5, pos.height * 0.5);
            this.g.addChild(this.sides);
        };
        Tile.prototype.make_top = function (pos) {
            var _this = this;
            var creation = new Play.ObjectFactory();
            this.top = creation.make_rounded_rectangle({ color: this.style.color_top, edge: this.style.edge }, pos.x, pos.y, pos.width, pos.height, this.g.interactive);
            this.top.pivot.set(pos.width * 0.5, pos.height * 0.5);
            this.top.on('pointertap', function () {
                if (Play.Framework.gw.paused)
                    return;
                _this.on_click();
            });
            this.g.addChild(this.top);
        };
        Tile.prototype.make_text = function (_pos, _text, _style) {
            var creation = new Play.ObjectFactory();
            this.text = creation.make_text(_pos.width * 0.5, _pos.height * 0.5, _text, _style.text, { x: 0.5, y: 0.5 });
            this.top.addChild(this.text);
        };
        Tile.prototype.scale = function (x, y) {
            this.scaleX = x;
            this.scaleY = y;
        };
        Object.defineProperty(Tile.prototype, "scaleX", {
            get: function () {
                return this.top.scale.x;
            },
            set: function (n) {
                if (this.has_shadow)
                    this.shadow.alpha = Math.min(1 / n / n / n * this.alpha * 0.5, 0.25);
                if (this.has_shadow)
                    this.shadow.scale.x = Math.max(n * this.shadow_sm_x * 1.5 - 0.5, 0);
                this.sides.scale.x = n;
                this.top.scale.x = n;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Tile.prototype, "scaleY", {
            get: function () {
                return this.top.scale.y;
            },
            set: function (n) {
                if (this.has_shadow)
                    this.shadow.scale.y = Math.max(n * this.shadow_sm_y * 1.5 - 0.5, 0);
                this.sides.scale.y = n;
                this.top.scale.y = n;
            },
            enumerable: false,
            configurable: true
        });
        Tile.prototype.set_position = function (x, y) {
            if (y === void 0) { y = null; }
            this.x = x;
            this.y = y;
        };
        Object.defineProperty(Tile.prototype, "alpha", {
            get: function () {
                return this.top.alpha;
            },
            set: function (n) {
                if (this.has_shadow) {
                    this.shadow.alpha = Math.min(1 / this.scaleX / this.scaleX / this.scaleX * n * 0.4, 0.25);
                }
                this.sides.alpha = n;
                this.top.alpha = n;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Tile.prototype, "rotation", {
            get: function () {
                return this.top.rotation;
            },
            set: function (n) {
                if (this.has_shadow) {
                    this.shadow.rotation = n;
                }
                this.sides.rotation = n;
                this.top.rotation = n;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Tile.prototype, "x", {
            get: function () {
                return this.top.x;
            },
            set: function (n) {
                if (this.has_shadow) {
                    this.shadow.x = n;
                }
                this.sides.x = n;
                this.top.x = n;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Tile.prototype, "y", {
            get: function () {
                return this.top.y;
            },
            set: function (n) {
                if (this.has_shadow) {
                    this.shadow.y = n + this.style.depth + 20;
                }
                this.sides.y = n + this.style.depth;
                this.top.y = n;
            },
            enumerable: false,
            configurable: true
        });
        Tile.prototype.destroy = function () {
            this.g.destroy();
            this.shadow.destroy();
        };
        Tile.prototype.pop_in = function (time, to, delay, on_complete) {
            if (time === void 0) { time = 0.2; }
            if (to === void 0) { to = 1; }
            if (delay === void 0) { delay = 0; }
            if (on_complete === void 0) { on_complete = null; }
            this.scale(0, 0);
            TweenMax.to(this, time, {
                scaleX: to,
                scaleY: to,
                ease: Back.easeOut,
                delay: delay,
                onComplete: on_complete
            });
        };
        Tile.prototype.pop_out = function (time, delay, on_complete) {
            if (time === void 0) { time = 0.2; }
            if (delay === void 0) { delay = 0; }
            if (on_complete === void 0) { on_complete = null; }
            TweenMax.to(this, time, {
                scaleX: 0,
                scaleY: 0,
                ease: Back.easeIn,
                delay: delay,
                onComplete: on_complete
            });
        };
        Tile.prototype.zoom = function (to, on_complete) {
            if (on_complete === void 0) { on_complete = null; }
            TweenMax.to(this, 0.3, {
                scaleX: to,
                scaleY: to,
                ease: Power3.easeOut,
                onComplete: on_complete
            });
        };
        Tile.prototype.pulse = function () {
            var _this = this;
            this.zoom(1.04, function () { _this.zoom(1); });
        };
        return Tile;
    }());
    Play.Tile = Tile;
})(Play || (Play = {}));
var Play;
(function (Play) {
    var Timer = /** @class */ (function (_super) {
        __extends(Timer, _super);
        function Timer(_config, _y) {
            var _this = _super.call(this, '' + Play.Util.format_time(_config.updated_timer), new Play.Styles().text_ui_lrg) || this;
            _this.complete = false;
            _this.hold = false;
            _this.callback = function (t) { };
            _this.revealed_reveal = false;
            _this.config = _config;
            _this.anchor.set(0.5);
            _this.position.set(Play.Framework.gw.width * Play.Framework.ui_element_offset, _y);
            _this.label = new Play.ObjectFactory().make_text(Play.Framework.gw.width * Play.Framework.ui_element_offset, _y + 32, "TIME", new Play.Styles().text_ui_sm);
            return _this;
        }
        Timer.prototype.load = function () {
            this.y -= 150;
            this.label.y -= 150;
            Play.Tweeens.easy_to(this, 0, 150, 0.4, true);
            Play.Tweeens.easy_to(this.label, 0, 150, 0.4, true);
        };
        Timer.prototype.run = function (timestamp) {
            var _this = this;
            if (Play.Framework.gw.paused) {
                if (Play.Framework.pause_state.last_time == 0) {
                    Play.Framework.pause_state.last_time = timestamp;
                }
                Play.Framework.pause_state.pause_time += timestamp - Play.Framework.pause_state.last_time;
                Play.Framework.pause_state.last_time = timestamp;
                return;
            }
            if (this.elapsed_time >= this.config.updated_timer && this.config.allow_reveal && !this.revealed_reveal) {
                this.revealed_reveal = true;
                Play.Tweeens.pop_out(this, 0.1);
                Play.Tweeens.pop_out(this.label);
                Play.Tweeens.easy_timer(0.3, function () {
                    new Play.ObjectFactory().make_reveal_button(_this.x, _this.y);
                });
            }
            if (!Play.Framework.gw.begun || Play.Framework.gw.ended || this.complete || this.hold) {
                return;
            }
            if (this.start_time == null) {
                this.start_time = timestamp;
            }
            var progress = timestamp - this.start_time - Play.Framework.pause_state.pause_time;
            this.elapsed_time = Math.floor(progress / 1000);
            if (this.elapsed_time > this.config.updated_timer) {
                this.elapsed_time = this.config.updated_timer;
                this.complete = true;
                if (this.config.timer_ends_game) {
                    Play.Framework.end_game(false);
                }
                /*if (this.config.is_teaser) {
                    // TODO:
                    // pop_alert('Lost out on time bonus!', false);
                }
                if (this.config.allow_reveal)
                {
                    // REVEAL
                    console.log('showing reveal button...')
                    Tweeens.pop_out(this, 0.1);
                    Tweeens.pop_out(this.label);
                    Tweeens.easy_timer(0.3, () => {
                        let reveal_button = new ObjectFactory().make_reveal_button(this.x, this.y);
                    });
                }*/
            }
            this.current_time = this.config.updated_timer - this.elapsed_time;
            if (this.last_time != this.current_time) {
                this.callback(this.current_time);
                if (!Play.Framework.config.ignore_timer && this.current_time < 10 && Play.Framework.config.timer_ends_game) {
                    Play.Framework.sounds.tick_down();
                }
                if (!Play.Framework.config.ignore_timer)
                    Play.Framework.serve_timer(this.current_time, this.config.updated_timer - this.current_time);
                this.text = Play.Util.format_time(this.current_time);
                if (!Play.Framework.config.completed && !Play.Framework.config.is_teaser && Play.Framework.config.time_remaining >= 0) {
                    if (Play.Framework.config.time_remaining > 0)
                        Play.Framework.config.time_remaining--;
                    if (Play.Framework.config.time_remaining == 0) {
                        Play.Framework.config.completed = true;
                        Play.Framework.serve_completed();
                    }
                }
            }
            this.last_time = this.current_time;
        };
        return Timer;
    }(PIXI.Text));
    Play.Timer = Timer;
})(Play || (Play = {}));
var Play;
(function (Play) {
    var TranslationManager = /** @class */ (function () {
        function TranslationManager() {
        }
        TranslationManager.validate_language_code = function (language_code) {
            if (!language_code)
                language_code = 'en';
            language_code = language_code.replace('-', '_');
            return Object.keys(Play.game_text.daily_points).indexOf(language_code) == -1 ? 'en' : language_code;
        };
        TranslationManager.get_text = function (text_id, language_code) {
            language_code = language_code.replace('-', '_');
            var out = Play.game_text[text_id][language_code];
            return out || '';
        };
        return TranslationManager;
    }());
    Play.TranslationManager = TranslationManager;
    Play.game_text = {
        daily_points: {
            en: "BOB Points",
            fr_ca: "Points BOB",
            es: "Puntos BOB",
            ja: "BOBポイント",
            zh: "鲍勃点",
            fr: "Points BOB",
            it: "Punti BOB",
            de: "BOB-Punkte",
            pl: "Punkty BOB",
            ko: "BOB 포인트",
            nl: "BOB-punten",
            tr: "BOB Puanları",
            ru: "Лучшие очки",
            th: "คะแนนบ๊อบ",
            hi: "बीओबी अंक",
            tl_ph: "Mga BOB Points",
            vi: "Điểm BOB",
            pt: "Pontos BOB",
            sv: "BIR-poäng",
        },
        speed_bonus: {
            en: "Speed Bonus",
            fr_ca: "Bonus de vitesse",
            es: "Bonificación de velocidad",
            ja: "スピードボーナス",
            zh: "速度奖励",
            fr: "Bonus de vitesse",
            it: "Bonus velocità",
            de: "Geschwindigkeitsbonus",
            pl: "Premia za prędkość",
            ko: "속도 보너스",
            nl: "Snelheidsbonus",
            tr: "Hız Bonusu",
            ru: "Бонус скорости",
            th: "โบนัสความเร็ว",
            hi: "स्पीड बोनस",
            tl_ph: "Bonus ng Bilis",
            vi: "Tiền thưởng tốc độ",
            pt: "Bônus de velocidade",
            sv: "Hastighetsbonus",
        },
        reveal_penalty: {
            en: "Answer Revealed",
            fr_ca: "Réponse révélée",
            es: "Respuesta revelada",
            ja: "答えが明らかになりました",
            zh: "答案揭晓",
            fr: "Réponse révélée",
            it: "Risposta rivelata",
            de: "Antwort enthüllt",
            pl: "Odpowiedź ujawniona",
            ko: "답변 공개",
            nl: "Antwoord onthuld",
            tr: "Cevap Açıklandı",
            ru: "Ответ раскрыт",
            th: "คำตอบเปิดเผยแล้ว",
            hi: "उत्तर प्रकट",
            tl_ph: "Ibinunyag ang Sagot",
            vi: "Câu trả lời được tiết lộ",
            pt: "Resposta revelada",
            sv: "Svar avslöjat",
        },
        hint_penalty: {
            en: "Hint",
            fr_ca: "Indice",
            es: "Pista",
            ja: "ヒント",
            zh: "暗示",
            fr: "Indice",
            it: "Suggerimento",
            de: "Hinweis",
            pl: "Wskazówka",
            ko: "힌트",
            nl: "Tip",
            tr: "İpucu",
            ru: "Намекать",
            th: "คำใบ้",
            hi: "संकेत देना",
            tl_ph: "Pahiwatig",
            vi: "Gợi ý",
            pt: "Dica",
            sv: "Antydan",
        },
        raw_score: {
            en: "Score",
            fr_ca: "Score",
            es: "Puntaje",
            ja: "スコア",
            zh: "分数",
            fr: "Score",
            it: "Punto",
            de: "Punktzahl",
            pl: "Wynik",
            ko: "점수",
            nl: "Scoren",
            tr: "Gol",
            ru: "Счет",
            th: "คะแนน",
            hi: "अंक",
            tl_ph: "Puntos",
            vi: "Điểm",
            pt: "Pontuação",
            sv: "Göra",
        },
        accuracy: {
            en: "Accuracy",
            fr_ca: "Précision",
            es: "Exactitud",
            ja: "正確さ",
            zh: "准确性",
            fr: "Précision",
            it: "Precisione",
            de: "Genauigkeit",
            pl: "Dokładność",
            ko: "정확성",
            nl: "Nauwkeurigheid",
            tr: "Kesinlik",
            ru: "Точность",
            th: "ความแม่นยำ",
            hi: "शुद्धता",
            tl_ph: "Katumpakan",
            vi: "Sự chính xác",
            pt: "Precisão",
            sv: "Noggrannhet",
        },
        hi_score_bonus: {
            en: "High Score Bonus",
            fr_ca: "Bonus de meilleur score",
            es: "Bonificación por puntuación alta",
            ja: "ハイスコ​​アボーナス",
            zh: "高分奖励",
            fr: "Bonus de meilleur score",
            it: "Bonus per il punteggio più alto",
            de: "Highscore-Bonus",
            pl: "Premia za wysoki wynik",
            ko: "높은 점수 보너스",
            nl: "Bonus voor hoge scores",
            tr: "Yüksek Skor Bonusu",
            ru: "Бонус за высокий балл",
            th: "โบนัสคะแนนสูง",
            hi: "उच्च स्कोर बोनस",
            tl_ph: "Mataas na Marka ng Bonus",
            vi: "Tiền thưởng điểm cao",
            pt: "Bônus de pontuação mais alta",
            sv: "Högpoäng bonus",
        },
        next_time: {
            en: "Time has run out for today!",
            fr_ca: "Le temps est écoulé pour aujourd'hui !",
            es: "¡Se acabó el tiempo por hoy!",
            ja: "今日は時間切れです！",
            zh: "今天的时间已经不多了！",
            fr: "Le temps est écoulé pour aujourd'hui !",
            it: "Il tempo è scaduto per oggi!",
            de: "Die Zeit für heute ist abgelaufen!",
            pl: "Czas na dzisiaj się skończył!",
            ko: "오늘 시간이 다 됐어요!",
            nl: "De tijd voor vandaag is om!",
            tr: "Bugünlük süre doldu!",
            ru: "Время на сегодня истекло!",
            th: "หมดเวลาแล้วสำหรับวันนี้!",
            hi: "आज के लिए समय ख़त्म हो गया है!",
            tl_ph: "Naubos na ang oras para sa araw na ito!",
            vi: "Thời gian đã hết cho ngày hôm nay!",
            pt: "O tempo acabou por hoje!",
            sv: "Tiden har gått ut för idag!",
        },
        teaser_complete: {
            en: "Already Completed!",
            fr_ca: "Déjà terminé !",
            es: "¡Ya completado!",
            ja: "すでに完成しています！",
            zh: "已经完成！",
            fr: "Déjà terminé !",
            it: "Già completato!",
            de: "Bereits abgeschlossen!",
            pl: "Już ukończone!",
            ko: "이미 완료되었습니다!",
            nl: "Al voltooid!",
            tr: "Zaten Tamamlandı!",
            ru: "Уже завершено!",
            th: "เสร็จสมบูรณ์แล้ว!",
            hi: "पहले ही पूरा हो चुका है!",
            tl_ph: "Nakumpleto na!",
            vi: "Đã hoàn thành!",
            pt: "Já concluído!",
            sv: "Redan klar!",
        },
        wrong_answers: {
            en: "Wrong Answers",
            fr_ca: "Mauvaises réponses",
            es: "Respuestas incorrectas",
            ja: "間違った答え",
            zh: "错误答案",
            fr: "Mauvaises réponses",
            it: "Risposte sbagliate",
            de: "Falsche Antworten",
            pl: "Błędne odpowiedzi",
            ko: "오답",
            nl: "Verkeerde antwoorden",
            tr: "Yanlış Cevaplar",
            ru: "Неправильные ответы",
            th: "คำตอบที่ผิด",
            hi: "ग़लत उत्तर",
            tl_ph: "Mga Maling Sagot",
            vi: "Câu trả lời sai",
            pt: "Respostas erradas",
            sv: "Fel svar",
        },
        rounds: {
            en: "Rounds Solved",
            fr_ca: "Tours résolus",
            es: "Rondas resueltas",
            ja: "解決されたラウンド",
            zh: "解决回合数",
            fr: "Tours résolus",
            it: "Turni risolti",
            de: "Runden gelöst",
            pl: "Rundy rozwiązane",
            ko: "라운드 해결",
            nl: "Rondes opgelost",
            tr: "Çözülen Turlar",
            ru: "Раунды решены",
            th: "แก้ไขรอบแล้ว",
            hi: "राउंड हल हो गए",
            tl_ph: "Nalutas ang mga Round",
            vi: "Vòng giải quyết",
            pt: "Rodadas resolvidas",
            sv: "Omgångar lösta",
        },
        round_pts: {
            en: "Points from Rounds",
            fr_ca: "Points des tours",
            es: "Puntos de rondas",
            ja: "ラウンドからのポイント",
            zh: "回合积分",
            fr: "Points des tours",
            it: "Punti dai round",
            de: "Punkte aus Runden",
            pl: "Punkty z rund",
            ko: "라운드 포인트",
            nl: "Punten uit rondes",
            tr: "Turlardan Alınan Puanlar",
            ru: "Очки за раунды",
            th: "คะแนนจากรอบ",
            hi: "राउंड से अंक",
            tl_ph: "Mga puntos mula sa Rounds",
            vi: "Điểm từ các vòng đấu",
            pt: "Pontos das rodadas",
            sv: "Poäng från omgångar",
        },
        perfect: {
            en: "Perfect Game",
            fr_ca: "Jeu parfait",
            es: "Juego perfecto",
            ja: "パーフェクトゲーム",
            zh: "完美游戏",
            fr: "Jeu parfait",
            it: "Gioco perfetto",
            de: "Perfektes Spiel",
            pl: "Doskonała gra",
            ko: "완벽한 게임",
            nl: "Perfect spel",
            tr: "Mükemmel Oyun",
            ru: "Идеальная игра",
            th: "เกมที่สมบูรณ์แบบ",
            hi: "उत्तम खेल",
            tl_ph: "Perpektong Laro",
            vi: "Trò chơi hoàn hảo",
            pt: "Jogo Perfeito",
            sv: "Perfekt spel",
        },
        play: {
            en: "Play",
            fr_ca: "Jouer",
            es: "Jugar",
            ja: "遊ぶ",
            zh: "玩",
            fr: "Jouer",
            it: "Giocare",
            de: "Spielen",
            pl: "Grać",
            ko: "놀다",
            nl: "Toneelstuk",
            tr: "Oynamak",
            ru: "Играть",
            th: "เล่น",
            hi: "खेल",
            tl_ph: "Maglaro",
            vi: "Chơi",
            pt: "Jogar",
            sv: "Spela",
        },
        begin: {
            en: "Begin",
            fr_ca: "Commencer",
            es: "Comenzar",
            ja: "始める",
            zh: "开始",
            fr: "Commencer",
            it: "Inizio",
            de: "Beginnen",
            pl: "Zaczynać",
            ko: "시작하다",
            nl: "Beginnen",
            tr: "Başlamak",
            ru: "Начинать",
            th: "เริ่ม",
            hi: "शुरू",
            tl_ph: "Magsimula",
            vi: "Bắt đầu",
            pt: "Começar",
            sv: "Börja",
        },
        exit: {
            en: "Exit",
            fr_ca: "Sortie",
            es: "Salida",
            ja: "出口",
            zh: "出口",
            fr: "Sortie",
            it: "Uscita",
            de: "Ausfahrt",
            pl: "Wyjście",
            ko: "출구",
            nl: "Uitgang",
            tr: "Çıkış",
            ru: "Выход",
            th: "ออก",
            hi: "बाहर निकलना",
            tl_ph: "Lumabas",
            vi: "Ra",
            pt: "Saída",
            sv: "Utgång",
        },
        replay: {
            en: "Replay",
            fr_ca: "Rejouer",
            es: "Repetición",
            ja: "リプレイ",
            zh: "重播",
            fr: "Rejouer",
            it: "Rigiocare",
            de: "Wiederholung",
            pl: "Powtórna rozgrywka",
            ko: "다시 하다",
            nl: "Opnieuw afspelen",
            tr: "Tekrar oynat",
            ru: "Повтор",
            th: "เล่นซ้ำ",
            hi: "REPLAY",
            tl_ph: "I-replay",
            vi: "Phát lại",
            pt: "Repetir",
            sv: "Spela om",
        },
        resume: {
            en: "Resume",
            fr_ca: "CV",
            es: "Reanudar",
            ja: "再開する",
            zh: "恢复",
            fr: "CV",
            it: "Riprendere",
            de: "Wieder aufnehmen",
            pl: "Wznawiać",
            ko: "재개하다",
            nl: "Cv",
            tr: "Sürdürmek",
            ru: "Резюме",
            th: "ประวัติย่อ",
            hi: "फिर शुरू करना",
            tl_ph: "Ipagpatuloy",
            vi: "Bản tóm tắt",
            pt: "Retomar",
            sv: "Resume",
        },
        restart: {
            en: "Restart",
            fr_ca: "Redémarrage",
            es: "Reanudar",
            ja: "再起動",
            zh: "重新启动",
            fr: "Redémarrage",
            it: "Ricomincia",
            de: "Neustart",
            pl: "Uruchom ponownie",
            ko: "다시 시작",
            nl: "Opnieuw opstarten",
            tr: "Tekrar başlat",
            ru: "Перезапуск",
            th: "รีสตาร์ท",
            hi: "पुनः आरंभ करें",
            tl_ph: "I-restart",
            vi: "Khởi động lại",
            pt: "Reiniciar",
            sv: "Starta om",
        },
        reveal: {
            en: "Reveal Answer",
            fr_ca: "Révéler la réponse",
            es: "Revelar respuesta",
            ja: "答えを明らかにする",
            zh: "揭晓答案",
            fr: "Révéler la réponse",
            it: "Rivela la risposta",
            de: "Antwort offenbaren",
            pl: "Ujawnij odpowiedź",
            ko: "답변 공개",
            nl: "Onthul antwoord",
            tr: "Cevabı Göster",
            ru: "Показать ответ",
            th: "เผยคำตอบ",
            hi: "उत्तर प्रकट करें",
            tl_ph: "Ibunyag ang Sagot",
            vi: "Tiết lộ câu trả lời",
            pt: "Revelar resposta",
            sv: "Avslöja svar",
        },
        level_up: {
            en: "Level Up!",
            fr_ca: "Montez de niveau !",
            es: "¡Elevar a mismo nivel!",
            ja: "レベルアップ！",
            zh: "升级！",
            fr: "Montez de niveau !",
            it: "Sali di livello!",
            de: "Steige auf!",
            pl: "Podnieść do właściwego poziomu!",
            ko: "레벨 업!",
            nl: "Niveau omhoog!",
            tr: "Seviye Atla!",
            ru: "Уровень выше!",
            th: "เลเวลอัพ!",
            hi: "ऊपर का स्तर!",
            tl_ph: "Level Up!",
            vi: "Lên cấp!",
            pt: "Suba de nível!",
            sv: "Upp i nivå!",
        },
        level_down: {
            en: "Level Down!",
            fr_ca: "Niveau inférieur !",
            es: "¡Nivelar por abajo!",
            ja: "レベルダウン！",
            zh: "等级下降！",
            fr: "Niveau inférieur !",
            it: "Livello giù!",
            de: "Level runter!",
            pl: "Obniżać do właściwego poziomu!",
            ko: "레벨 다운!",
            nl: "Niveau omlaag!",
            tr: "Seviye Düşürüldü!",
            ru: "Уровень вниз!",
            th: "เกลี่ย!",
            hi: "स्तर नीचे!",
            tl_ph: "Level Down!",
            vi: "Xuống cấp!",
            pt: "Nível abaixo!",
            sv: "Nivå ner!",
        },
        moves_remaining: {
            en: "Moves Remaining",
            fr_ca: "Mouvements restants",
            es: "Movimientos restantes",
            ja: "残りの手数",
            zh: "剩余移动次数",
            fr: "Mouvements restants",
            it: "Mosse rimanenti",
            de: "Verbleibende Züge",
            pl: "Pozostało ruchów",
            ko: "남은 이동수",
            nl: "Resterende bewegingen",
            tr: "Kalan Hareketler",
            ru: "Осталось ходов",
            th: "ย้ายที่เหลืออยู่",
            hi: "चालें शेष",
            tl_ph: "Mga Natitirang Paggalaw",
            vi: "di chuyển còn lại",
            pt: "Movimentos restantes",
            sv: "Återstående rörelser",
        },
        answer: {
            en: "Your Answer",
            fr_ca: "Votre Réponse",
            es: "Tu respuesta",
            ja: "あなたの答え",
            zh: "您的答案",
            fr: "Votre Réponse",
            it: "La tua risposta",
            de: "Ihre Antwort",
            pl: "Twoja odpowiedź",
            ko: "귀하의 답변",
            nl: "Jouw antwoord",
            tr: "Cevabınız",
            ru: "Ваш ответ",
            th: "คำตอบของคุณ",
            hi: "आपका उत्तर",
            tl_ph: "Iyong Sagot",
            vi: "Câu trả lời của bạn",
            pt: "sua Resposta",
            sv: "Ditt svar",
        },
        recommended: {
            en: "Recommended for You",
            fr_ca: "Recommandé pour vous",
            es: "Recomendado para ti",
            ja: "あなたにおすすめ",
            zh: "为您推荐",
            fr: "Recommandé pour vous",
            it: "Consigliato per te",
            de: "Für Sie empfohlen",
            pl: "Polecane dla Ciebie",
            ko: "당신에게 추천",
            nl: "Aanbevolen voor jou",
            tr: "Sizin için Önerilenler",
            ru: "Рекомендуется для вас",
            th: "แนะนำสำหรับคุณ",
            hi: "आप के लिए अनुशंसित",
            tl_ph: "Inirerekomenda para sa Iyo",
            vi: "Đề xuất cho bạn",
            pt: "Recomendado para você",
            sv: "Rekommenderas för dig",
        },
        earned: {
            en: "Points Earned",
            fr_ca: "Points gagnés",
            es: "Puntos ganados",
            ja: "獲得ポイント",
            zh: "获得积分",
            fr: "Points gagnés",
            it: "Punti guadagnati",
            de: "Erreichte Punkte",
            pl: "Zdobyte punkty",
            ko: "적립된 포인트",
            nl: "Verdiende punten",
            tr: "Kazanılan Puanlar",
            ru: "Заработанные очки",
            th: "คะแนนที่ได้รับ",
            hi: "अर्जित अंक",
            tl_ph: "Mga Nakuhang Puntos",
            vi: "Điểm kiếm được",
            pt: "Pontos ganhos",
            sv: "Intjänade poäng",
        },
        points: {
            en: "Points",
            fr_ca: "Points",
            es: "Agujas",
            ja: "ポイント",
            zh: "积分",
            fr: "Points",
            it: "Punti",
            de: "Punkte",
            pl: "Zwrotnica",
            ko: "전철기",
            nl: "Punten",
            tr: "Puanlar",
            ru: "Очки",
            th: "คะแนน",
            hi: "अंक",
            tl_ph: "Mga puntos",
            vi: "Điểm",
            pt: "Pontos",
            sv: "Poäng",
        },
    };
})(Play || (Play = {}));
var Play;
(function (Play) {
    var Tweeens = /** @class */ (function () {
        function Tweeens() {
        }
        Tweeens.appear = function (object, on_complete) {
            if (on_complete === void 0) { on_complete = null; }
            object.alpha = 0;
            object.scale.set(0.9, 0.9);
            TweenMax.to(object, 0.3, {
                alpha: 1,
            });
            TweenMax.to(object.scale, 0.3, {
                x: 1,
                y: 1,
                onComplete: on_complete,
            });
        };
        Tweeens.easy_timer = function (time, on_complete) {
            var obj = { v: 0 };
            TweenMax.to(obj, time, { v: 100, onComplete: on_complete });
        };
        Tweeens.easy_to = function (object, x, y, time, relative, ease, wait) {
            if (time === void 0) { time = 0.3; }
            if (relative === void 0) { relative = false; }
            if (ease === void 0) { ease = Power1.easeInOut; }
            if (wait === void 0) { wait = 0; }
            var target = relative ? { x: object.x + x, y: object.y + y } : { x: x, y: y };
            TweenMax.to(object, time, { x: target.x, y: target.y, ease: ease, delay: wait });
        };
        Tweeens.fade_to = function (object, to, time, delay) {
            if (time === void 0) { time = 0.2; }
            if (delay === void 0) { delay = 0; }
            TweenMax.to(object, time, {
                alpha: to,
                delay: delay,
            });
        };
        Tweeens.jump_to = function (object, x, y, on_complete, jump_height) {
            if (on_complete === void 0) { on_complete = null; }
            if (jump_height === void 0) { jump_height = null; }
            if (jump_height == null) {
                jump_height = (object.y - y) * 1.5;
            }
            TweenMax.to(object, 0.15, {
                y: object.y - jump_height,
                ease: Power2.easeOut,
                onComplete: function () {
                    TweenMax.to(object, 0.15, {
                        y: y,
                    });
                }
            });
            TweenMax.to(object, 0.3, {
                x: x,
                onComplete: on_complete,
            });
        };
        Tweeens.pop_in = function (object, delay, on_complete, time, to) {
            if (delay === void 0) { delay = 0; }
            if (on_complete === void 0) { on_complete = null; }
            if (time === void 0) { time = 0.2; }
            if (to === void 0) { to = 1; }
            object.scale.set(0, 0.01);
            TweenMax.to(object.scale, time, {
                x: to,
                y: to,
                ease: Back.easeOut,
                delay: delay,
                onComplete: on_complete,
            });
        };
        Tweeens.pop_out = function (object, delay, on_complete, time) {
            if (delay === void 0) { delay = 0; }
            if (on_complete === void 0) { on_complete = null; }
            if (time === void 0) { time = 0.2; }
            TweenMax.to(object.scale, time, {
                x: 0,
                y: 0,
                ease: Back.easeIn,
                delay: delay,
                onComplete: on_complete,
            });
        };
        Tweeens.pulse = function (object, from, to, time) {
            var _this = this;
            if (from === void 0) { from = 1; }
            if (to === void 0) { to = 1.04; }
            if (time === void 0) { time = 0.3; }
            this.zoom(object, to, function () {
                _this.zoom(object, from, null, time * 0.66);
            }, time * 0.33);
        };
        Tweeens.shake = function (object, amt, shakes, time) {
            if (amt === void 0) { amt = 16; }
            if (shakes === void 0) { shakes = 5; }
            if (time === void 0) { time = 0.3; }
            var ox = object.x;
            var i_time = time / shakes;
            var _loop_4 = function (i) {
                var tx = i == shakes - 1 ? ox : ox + amt;
                this_2.easy_timer(i_time * i, function () {
                    TweenMax.to(object, i_time, {
                        x: tx,
                    });
                    amt *= -1;
                });
            };
            var this_2 = this;
            for (var i = 0; i < shakes; i++) {
                _loop_4(i);
            }
        };
        Tweeens.slide_out = function (object, x, on_complete, time, ease) {
            if (on_complete === void 0) { on_complete = null; }
            if (time === void 0) { time = 0.5; }
            if (ease === void 0) { ease = true; }
            var e = ease ? Back.easeIn : null;
            var r = object.x > x ? object.rotation - 0.5 : object.rotation + 0.5;
            TweenMax.to(object, time, {
                x: x,
                rotation: r,
                ease: e,
                onComplete: on_complete,
            });
        };
        Tweeens.wiggle = function (object, time, wait) {
            if (time === void 0) { time = 0.3; }
            if (wait === void 0) { wait = 0; }
            TweenMax.to(object, time * 0.25, {
                rotation: -0.1,
                delay: wait,
                onComplete: function () {
                    TweenMax.to(object, time * 0.5, {
                        rotation: 0.1,
                        onComplete: function () {
                            TweenMax.to(object, time * 0.25, {
                                rotation: 0,
                                ease: Back.easeOut,
                            });
                        }
                    });
                }
            });
        };
        Tweeens.zoom = function (object, amt, on_complete, time, ease) {
            if (on_complete === void 0) { on_complete = null; }
            if (time === void 0) { time = 0.3; }
            if (ease === void 0) { ease = null; }
            if (ease === undefined)
                ease = Power3.easeOut;
            TweenMax.to(object.scale, time, {
                x: amt,
                y: amt,
                ease: ease,
                onComplete: on_complete,
            });
        };
        return Tweeens;
    }());
    Play.Tweeens = Tweeens;
})(Play || (Play = {}));
var Play;
(function (Play) {
    var UIScreen = /** @class */ (function (_super) {
        __extends(UIScreen, _super);
        function UIScreen(config) {
            var _this = _super.call(this) || this;
            _this.config = config;
            _this.pop_ups = [];
            _this.ry = Play.Framework.gw.mobile ? 60 : 50;
            return _this;
        }
        UIScreen.prototype.load = function () {
            this.make_timer();
            this.make_score();
            this.make_pause_button();
            this.make_audio_controls();
        };
        UIScreen.prototype.make_timer = function () {
            this.timer = new Play.Timer(this.config, this.ry);
            this.timer.load();
            if (Play.Framework.config.show_ui)
                this.addChild(this.timer);
            if (Play.Framework.config.show_ui)
                this.addChild(this.timer.label);
        };
        UIScreen.prototype.make_score = function () {
            if (!this.config.use_score)
                return;
            this.score = new Play.GameScore(this.config, this.ry);
            this.score.load();
            if (Play.Framework.config.show_ui)
                this.addChild(this.score);
            if (Play.Framework.config.show_ui)
                this.addChild(this.score.label);
        };
        UIScreen.prototype.make_pause_button = function () {
            if (this.config.is_teaser)
                return;
            var pb = new Play.PauseButton(this.config, this.ry);
            this.pause_btn = pb.pause_button;
            pb.load();
            if (Play.Framework.config.show_ui)
                this.addChild(this.pause_btn);
        };
        UIScreen.prototype.make_audio_controls = function () {
            if (!this.config.is_teaser)
                return;
            this.audio_controls = new Play.AudioControls();
            this.audio_controls.load();
            if (Play.Framework.config.show_ui)
                this.addChild(this.audio_controls.mute_btn);
            if (Play.Framework.config.show_ui)
                this.addChild(this.audio_controls.unmute_btn);
        };
        UIScreen.prototype.make_pop_up = function (content, x, y, positive, time, text_color, bg_color) {
            var alert = new Play.ObjectFactory().make_alert(content, x, y, positive, time, text_color, bg_color);
            this.addChild(alert);
            this.pop_ups.push(alert);
        };
        UIScreen.prototype.clear_pop_ups = function () {
            for (var i = 0; i < this.pop_ups.length; i++) {
                var pop_up = this.pop_ups[i];
                Play.Tweeens.pop_out(pop_up);
            }
        };
        UIScreen.prototype.shoot_confetti = function () {
            var colors = [0xa864fd, 0x29cdff, 0x78ff44, 0xff718d, 0xfdff6a, 0xffffff];
            for (var i = 0; i < 128; i++) {
                Play.Tweeens.easy_timer(Play.Util.get_random(0, 0.5), function () { new Play.ObjectFactory().make_confetti_piece(colors[Math.floor(Math.random() * colors.length)], Play.Util.get_random(3, 8), Play.Util.get_random(2, 3), Play.Framework.ui_container); });
            }
        };
        return UIScreen;
    }(Play.GameScreen));
    Play.UIScreen = UIScreen;
})(Play || (Play = {}));
var Play;
(function (Play) {
    var Util = /** @class */ (function () {
        function Util() {
        }
        Util.get_random = function (min, max) {
            return min + Math.random() * (max - min);
        };
        Util.format_time = function (sec) {
            var min = Math.floor(sec / 60);
            sec = sec % 60;
            var minutes = min === 0 ? '' : '' + min;
            var seconds = sec < 10 ? '0' + sec : '' + sec;
            return minutes + ':' + seconds;
        };
        Util.shuffle_array = function (a) {
            var _a;
            for (var i = a.length; i; i--) {
                var j = Math.floor(Math.random() * i);
                _a = [a[j], a[i - 1]], a[i - 1] = _a[0], a[j] = _a[1];
            }
        };
        Util.norm = function (n, min, max) {
            return (n - min) / (max - min);
        };
        Util.lerp = function (norm, min, max) {
            return (max - min) * norm + min;
        };
        Util.map = function (n, min1, max1, min2, max2) {
            return this.lerp(this.norm(n, min1, max1), min2, max2);
        };
        Util.clamp = function (n, min, max) {
            return Math.min(Math.max(n, min), max);
        };
        Util.sign_of = function (n) {
            if (n == 0)
                return 0;
            return n < 0 ? -1 : 1;
        };
        Util.vec_from_a = function (a, len) {
            return {
                x: len * Math.cos(a * Math.PI / 180),
                y: len * Math.sin(a * Math.PI / 180)
            };
        };
        Util.hsl_to_hex = function (h, s, l) {
            h /= 360;
            s /= 100;
            l /= 100;
            var r, g, b;
            if (s === 0) {
                r = g = b = l;
            }
            else {
                var hue2rgb = function (p, q, t) {
                    if (t < 0)
                        t += 1;
                    if (t > 1)
                        t -= 1;
                    if (t < 1 / 6)
                        return p + (q - p) * 6 * t;
                    if (t < 1 / 2)
                        return q;
                    if (t < 2 / 3)
                        return p + (q - p) * (2 / 3 - t) * 6;
                    return p;
                };
                var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                var p = 2 * l - q;
                r = hue2rgb(p, q, h + 1 / 3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1 / 3);
            }
            var toHex = function (x) {
                var hex = Math.round(x * 255).toString(16);
                return hex.length === 1 ? '0' + hex : hex;
            };
            return parseInt("0x".concat(toHex(r)).concat(toHex(g)).concat(toHex(b)));
        };
        Util.gaussian_random = function (iterations) {
            if (iterations === void 0) { iterations = 6; }
            var r = 0;
            for (var i = 0; i < iterations; i += 1)
                r += Math.random();
            return r / iterations;
        };
        Util.normalize = function (n, places) {
            return (Math.round(n * Math.pow(10, places))) / Math.pow(10, places);
        };
        Util.radians_to_degrees = function (radians) {
            return radians * (180 / Math.PI);
        };
        Util.degrees_to_radians = function (degrees) {
            return degrees * (Math.PI / 180);
        };
        Util.get_degrees_between = function (p0, p1) {
            return this.radians_to_degrees(Math.atan2(p1.y - p0.y, p1.x - p0.x));
        };
        Util.distance = function (p0, p1) {
            return Math.sqrt(Math.pow(p1.x - p0.x, 2) + Math.pow(p1.y - p0.y, 2));
        };
        Util.vector_length = function (v) {
            return Math.sqrt(Math.pow(v.x, 2) + Math.pow(v.y, 2));
        };
        Util.vector_angle = function (v) {
            return this.radians_to_degrees(Math.atan2(v.y, v.x));
        };
        Util.vector_from_degrees = function (degrees, length) {
            return {
                x: Math.cos(this.degrees_to_radians(degrees)) * length,
                y: Math.sin(this.degrees_to_radians(degrees)) * length
            };
        };
        return Util;
    }());
    Play.Util = Util;
})(Play || (Play = {}));
var Play;
(function (Play) {
    var Vector = /** @class */ (function () {
        function Vector(x, y) {
            this.set(x, y);
        }
        Vector.zero = function (n) { return Math.abs(n) <= this.epsilon ? 0 : n; };
        Vector.get = function (x, y) {
            if (x === void 0) { x = 0; }
            if (y == undefined)
                y = x;
            if (this.pool.length > 0) {
                var out = this.pool.shift();
                out.set(x, y);
                return out;
            }
            return new Vector(x, y);
        };
        Vector.from_point = function (p) {
            return Vector.get(p.x, p.y);
        };
        Vector.prototype.put = function () {
            Vector.pool.push(this);
        };
        Vector.prototype.set = function (x, y) {
            if (x === void 0) { x = 0; }
            if (y == undefined)
                y = x;
            this.x = x;
            this.y = y;
            return this;
        };
        Object.defineProperty(Vector.prototype, "length", {
            get: function () {
                return Math.sqrt(this.x * this.x + this.y * this.y);
            },
            set: function (n) {
                this.normalize();
                this.scale(n);
                length = n;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Vector.prototype, "rotation", {
            get: function () {
                return Math.atan2(this.y, this.x);
            },
            set: function (n) {
                var len = this.length;
                this.set(len * Math.cos(n), len * Math.sin(n));
            },
            enumerable: false,
            configurable: true
        });
        Vector.prototype.normalize = function () {
            this.set(this.x / this.length, this.y / this.length);
            return this;
        };
        Vector.prototype.scale = function (n) {
            this.set(this.x * n, this.y * n);
            return this;
        };
        Vector.prototype.distance = function (v) {
            var dv = Vector.get(this.x - v.x, this.y - v.y);
            var distance = dv.length;
            dv.put();
            return distance;
        };
        Vector.prototype.in_circle = function (c, r) {
            return this.distance(c) <= r;
        };
        Vector.prototype.dot = function (v) {
            return Vector.zero(this.x * v.x + this.y * v.y);
        };
        Vector.prototype.cross = function (v) {
            return Vector.zero(this.x * v.y - this.y * v.x);
        };
        Vector.prototype.rotation_between = function (v) {
            return Math.atan2(v.y - this.y, v.x - this.x);
        };
        Vector.prototype.difference = function (v) {
            return Vector.get(v.x - this.x, v.y - this.y);
        };
        Vector.prototype.equals = function (v) {
            return this.x == v.x && this.y == v.y;
        };
        Vector.prototype.add = function (v) {
            this.x += v.x;
            this.y += v.y;
        };
        Vector.prototype.copy = function () {
            return Vector.get(this.x, this.y);
        };
        Vector.epsilon = 1e-8;
        Vector.pool = [];
        Vector.UP = Vector.get(0, -1);
        Vector.DOWN = Vector.get(0, 1);
        Vector.LEFT = Vector.get(-1, 0);
        Vector.RIGHT = Vector.get(1, 0);
        Vector.ZERO = Vector.get();
        return Vector;
    }());
    Play.Vector = Vector;
})(Play || (Play = {}));
//# sourceMappingURL=Framework.js.map