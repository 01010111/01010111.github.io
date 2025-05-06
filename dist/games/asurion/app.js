var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/// <reference path="pixi.js.d.ts" />
var basics;
(function (basics) {
    var Basics = /** @class */ (function () {
        function Basics() {
            var _this = this;
            this.app = new PIXI.Application(800, 600, {
                backgroundColor: 0x1099bb
            });
            document.body.appendChild(this.app.view);
            this.bunny = PIXI.Sprite.fromImage("required/assets/basics/bunny.png");
            this.bunny.anchor.set(0.5);
            this.bunny.x = this.app.renderer.width / 2;
            this.bunny.y = this.app.renderer.height / 2;
            this.app.stage.addChild(this.bunny);
            this.app.ticker.add(function (delta) {
                _this.bunny.rotation += 0.1 / delta;
            });
        }
        return Basics;
    }());
    basics.Basics = Basics;
    var Click = /** @class */ (function () {
        function Click() {
            var _this = this;
            this.app = new PIXI.Application(800, 600, {
                backgroundColor: 0x1099bb
            });
            document.body.appendChild(this.app.view);
            this.sprite = PIXI.Sprite.fromImage("../../_assets/basics/bunny.png");
            this.sprite.texture.baseTexture.scaleMode =
                PIXI.SCALE_MODES.NEAREST;
            this.sprite.anchor.set(0.5);
            this.sprite.x = this.app.renderer.width / 2;
            this.sprite.y = this.app.renderer.height / 2;
            this.sprite.interactive = true;
            this.sprite.buttonMode = true;
            this.sprite.on("pointerdown", function () {
                _this.sprite.scale.x *= 1.25;
                _this.sprite.scale.y *= 1.25;
            });
            this.app.stage.addChild(this.sprite);
        }
        return Click;
    }());
    basics.Click = Click;
    var ContainerPivot = /** @class */ (function () {
        function ContainerPivot() {
            var _this = this;
            this.app = new PIXI.Application(800, 600, {
                backgroundColor: 0x1099bb
            });
            document.body.appendChild(this.app.view);
            this.container = new PIXI.Container();
            this.app.stage.addChild(this.container);
            var texture = PIXI.Texture.fromImage("../../_assets/basics/bunny.png");
            for (var i = 0; i < 25; i++) {
                var bunny = new PIXI.Sprite(texture);
                bunny.anchor.set(0.5);
                bunny.x = (i % 5) * 40;
                bunny.y = Math.floor(i / 5) * 40;
                this.container.addChild(bunny);
            }
            this.container.x = this.app.renderer.width / 2;
            this.container.y = this.app.renderer.height / 2;
            this.container.pivot.x = this.container.width / 2;
            this.container.pivot.y = this.container.height / 2;
            this.app.ticker.add(function (delta) {
                _this.container.rotation -= 0.01 / delta;
            });
        }
        return ContainerPivot;
    }());
    basics.ContainerPivot = ContainerPivot;
    var Container = /** @class */ (function () {
        function Container() {
            this.app = new PIXI.Application(800, 600, {
                backgroundColor: 0x1099bb
            });
            document.body.appendChild(this.app.view);
            this.container = new PIXI.Container();
            this.app.stage.addChild(this.container);
            var texture = PIXI.Texture.fromImage("../../_assets/basics/bunny.png");
            for (var i = 0; i < 25; i++) {
                var bunny = new PIXI.Sprite(texture);
                bunny.anchor.set(0.5);
                bunny.x = (i % 5) * 40;
                bunny.y = Math.floor(i / 5) * 40;
                this.container.addChild(bunny);
            }
            this.container.x = this.app.renderer.width / 2;
            this.container.y = this.app.renderer.height / 2;
        }
        return Container;
    }());
    basics.Container = Container;
    var CustomizedFilter = /** @class */ (function (_super) {
        __extends(CustomizedFilter, _super);
        function CustomizedFilter(fragmentSource) {
            return _super.call(this, null, fragmentSource, {
                customUniform: {
                    type: "1f",
                    value: 0
                }
            }) || this;
        }
        return CustomizedFilter;
    }(PIXI.Filter));
    basics.CustomizedFilter = CustomizedFilter;
    var CustomFilter = /** @class */ (function () {
        function CustomFilter() {
            var _this = this;
            this.app = new PIXI.Application(800, 600, {
                backgroundColor: 0x1099bb
            });
            document.body.appendChild(this.app.view);
            this.background = PIXI.Sprite.fromImage("required/assets/bkg-grass.jpg");
            this.background.width = this.app.renderer.width;
            this.background.height = this.app.renderer.height;
            this.app.stage.addChild(this.background);
            this.app.stop();
            PIXI.loader
                .add("shader", "_assets/basics/shader.frag")
                .load(function (loader, resource) {
                _this.filter = new PIXI.Filter(null, resource.shader.data);
                _this.background.filters = [_this.filter];
                _this.app.start();
                _this.app.ticker.add(function (delta) {
                    _this.filter.uniforms.customUniform += 0.04 / delta;
                });
            });
        }
        return CustomFilter;
    }());
    basics.CustomFilter = CustomFilter;
    var Graphics = /** @class */ (function () {
        function Graphics() {
            this.app = new PIXI.Application(800, 600, { antialias: true });
            document.body.appendChild(this.app.view);
            var graphics = new PIXI.Graphics();
            // set a fill and line style
            graphics.beginFill(0xff3300);
            graphics.lineStyle(4, 0xffd900, 1);
            // draw a shape
            graphics.moveTo(50, 50);
            graphics.lineTo(250, 50);
            graphics.lineTo(100, 100);
            graphics.lineTo(50, 50);
            graphics.endFill();
            // set a fill and a line style again and draw a rectangle
            graphics.lineStyle(2, 0x0000ff, 1);
            graphics.beginFill(0xff700b, 1);
            graphics.drawRect(50, 250, 120, 120);
            // draw a rounded rectangle
            graphics.lineStyle(2, 0xff00ff, 1);
            graphics.beginFill(0xff00bb, 0.25);
            graphics.drawRoundedRect(150, 450, 300, 100, 15);
            graphics.endFill();
            // draw a circle, set the lineStyle to zero so the circle doesn"t have an outline
            graphics.lineStyle(0);
            graphics.beginFill(0xffff0b, 0.5);
            graphics.drawCircle(470, 90, 60);
            graphics.endFill();
            this.graphics = graphics;
            this.app.stage.addChild(this.graphics);
        }
        return Graphics;
    }());
    basics.Graphics = Graphics;
    var RenderTexture = /** @class */ (function () {
        function RenderTexture() {
            var _this = this;
            this.app = new PIXI.Application(800, 600, {
                backgroundColor: 0x1099bb
            });
            document.body.appendChild(this.app.view);
            this.container = new PIXI.Container();
            this.app.stage.addChild(this.container);
            var texture = PIXI.Texture.fromImage("required/assets/basics/bunny.png");
            for (var i = 0; i < 25; i++) {
                var bunny = new PIXI.Sprite(texture);
                bunny.x = (i % 5) * 30;
                bunny.y = Math.floor(i / 5) * 30;
                bunny.rotation = Math.random() * (Math.PI * 2);
                this.container.addChild(bunny);
            }
            var brt = new PIXI.BaseRenderTexture(300, 300, PIXI.SCALE_MODES.LINEAR, 1);
            var rt = new PIXI.RenderTexture(brt);
            this.sprite = new PIXI.Sprite(rt);
            this.sprite.x = 450;
            this.sprite.y = 60;
            this.app.stage.addChild(this.sprite);
            this.container.x = 100;
            this.container.y = 60;
            this.app.ticker.add(function (delta) {
                _this.app.renderer.render(_this.container, rt);
            });
        }
        return RenderTexture;
    }());
    basics.RenderTexture = RenderTexture;
    var SpriteSheet = /** @class */ (function () {
        function SpriteSheet() {
            var _this = this;
            PIXI.loader
                .add("required/assets/basics/fighter.json")
                .load(function (loader, resource) {
                var frames = [];
                for (var i = 0; i < 30; i++) {
                    var val = i < 10 ? "0" + i : i;
                    frames.push(PIXI.Texture.fromFrame("rollSequence00" + val + ".png"));
                }
                _this.anim = new PIXI.extras.AnimatedSprite(frames);
                _this.anim.x = _this.app.renderer.width / 2;
                _this.anim.y = _this.app.renderer.height / 2;
                _this.anim.anchor.set(0.5);
                _this.anim.animationSpeed = 0.5;
                _this.anim.play();
                _this.app.stage.addChild(_this.anim);
                _this.app.ticker.add(function (deltaTime) {
                    _this.anim.rotation += 0.01;
                });
            });
        }
        return SpriteSheet;
    }());
    basics.SpriteSheet = SpriteSheet;
    var Text = /** @class */ (function () {
        function Text() {
            this.app = new PIXI.Application(800, 600, {
                backgroundColor: 0x1099bb
            });
            document.body.appendChild(this.app.view);
            this.basicText = new PIXI.Text("Basic text in pixi");
            this.basicText.x = 30;
            this.basicText.y = 90;
            this.app.stage.addChild(this.basicText);
            var style = new PIXI.TextStyle({
                fontFamily: "Arial",
                fontSize: 36,
                fontStyle: "italic",
                fontWeight: "bold",
                fill: ["#ffffff", "#fff0b5"],
                stroke: "#4a1850",
                strokeThickness: 5,
                dropShadow: true,
                dropShadowColor: "#000000",
                dropShadowBlur: 4,
                dropShadowAngle: Math.PI / 6,
                dropShadowDistance: 6,
                wordWrap: true,
                wordWrapWidth: 440
            });
            this.richText = new PIXI.Text("Rich text with a lot of options and across multiple lines", style);
            this.richText.x = 30;
            this.richText.y = 180;
            this.app.stage.addChild(this.richText);
        }
        return Text;
    }());
    basics.Text = Text;
    var TexturedMesh = /** @class */ (function () {
        function TexturedMesh() {
            var _this = this;
            var ropeLength = 918 / 20;
            for (var i = 0; i < 25; i++) {
                this.points.push(new PIXI.Point(i * ropeLength, 0));
            }
            this.strip = new PIXI.mesh.Rope(PIXI.Texture.fromImage("required/assets/snake.png"), this.points);
            this.strip.x = -40;
            this.strip.y = 300;
            this.app.stage.addChild(this.strip);
            this.graphics = new PIXI.Graphics();
            this.graphics.x = this.strip.x;
            this.graphics.y = this.strip.y;
            this.app.stage.addChild(this.graphics);
            // start animating
            this.app.ticker.add(function (deltaTime) {
                _this.count += 0.1;
                // make the snake
                for (var i = 0; i < _this.points.length; i++) {
                    _this.points[i].y = Math.sin(i * 0.5 + _this.count) * 30;
                    _this.points[i].x =
                        i * ropeLength + Math.cos(i * 0.3 + _this.count) * 20;
                }
                _this.renderPoints();
            });
        }
        TexturedMesh.prototype.renderPoints = function () {
            this.graphics.clear();
            this.graphics.lineStyle(2, 0xffc2c2);
            this.graphics.moveTo(this.points[0].x, this.points[0].y);
            for (var i = 1; i < this.points.length; i++) {
                this.graphics.lineTo(this.points[i].x, this.points[i].y);
            }
            for (var i = 1; i < this.points.length; i++) {
                this.graphics.beginFill(0xff0022);
                this.graphics.drawCircle(this.points[i].x, this.points[i].y, 10);
                this.graphics.endFill();
            }
        };
        return TexturedMesh;
    }());
    basics.TexturedMesh = TexturedMesh;
    var TilingSprite = /** @class */ (function () {
        function TilingSprite() {
            var _this = this;
            this.app = new PIXI.Application();
            document.body.appendChild(this.app.view);
            var texture = PIXI.Texture.fromImage("required/assets/p2.jpeg");
            this.tilingSprite = new PIXI.extras.TilingSprite(texture, this.app.renderer.width, this.app.renderer.height);
            this.app.stage.addChild(this.tilingSprite);
            this.count = 0;
            this.app.ticker.add(function (deltaTime) {
                _this.count += 0.005;
                _this.tilingSprite.tileScale.x = 2 + Math.sin(_this.count);
                _this.tilingSprite.tileScale.y = 2 + Math.cos(_this.count);
                _this.tilingSprite.tilePosition.x += 1;
                _this.tilingSprite.tilePosition.y += 1;
            });
        }
        return TilingSprite;
    }());
    basics.TilingSprite = TilingSprite;
    var Video = /** @class */ (function () {
        function Video() {
            var _this = this;
            this.app = new PIXI.Application(800, 600, { transparent: true });
            document.body.appendChild(this.app.view);
            this.button = new PIXI.Graphics()
                .beginFill(0x0, 0.5)
                .drawRoundedRect(0, 0, 100, 100, 10)
                .endFill()
                .beginFill(0xffffff)
                .moveTo(36, 30)
                .lineTo(36, 70)
                .lineTo(70, 50);
            // Position the button
            this.button.x = (this.app.renderer.width - this.button.width) / 2;
            this.button.y = (this.app.renderer.height - this.button.height) / 2;
            // Enable interactivity on the button
            this.button.interactive = true;
            this.button.buttonMode = true;
            // Add to the stage
            this.app.stage.addChild(this.button);
            this.button.on("pointertap", function () {
                _this.button.destroy();
                var texture = PIXI.Texture.fromVideo("required/assets/testVideo.mp4");
                _this.videoSprite = new PIXI.Sprite(texture);
                _this.videoSprite.width = _this.app.renderer.width;
                _this.videoSprite.height = _this.app.renderer.height;
                _this.app.stage.addChild(_this.videoSprite);
            });
        }
        return Video;
    }());
    basics.Video = Video;
})(basics || (basics = {}));
var demos;
(function (demos) {
    var AlphaMask = /** @class */ (function () {
        function AlphaMask() {
            var _this = this;
            this.app = new PIXI.Application();
            this.app.stage.interactive = true;
            document.body.appendChild(this.app.view);
            this.bg = PIXI.Sprite.fromImage("required/assets/bkg.jpg");
            this.app.stage.addChild(this.bg);
            this.cells = PIXI.Sprite.fromImage("required/assets/cells.png");
            this.cells.scale.set(1.5);
            this.mask = PIXI.Sprite.fromImage("required/assets/flowerTop.png");
            this.mask.anchor.set(0.5);
            this.mask.x = 310;
            this.mask.y = 190;
            this.cells.mask = this.mask;
            this.app.stage.addChild(this.mask, this.cells);
            this.target = new PIXI.Point();
            this.reset();
            this.app.ticker.add(function (deltaTime) {
                _this.mask.position.x += (_this.target.x - _this.mask.x) * 0.1;
                _this.mask.position.y += (_this.target.y - _this.mask.y) * 0.1;
                if (Math.abs(_this.mask.x - _this.target.x) < 1) {
                    _this.reset();
                }
            });
        }
        AlphaMask.prototype.reset = function () {
            this.target.x = Math.floor(Math.random() * 550);
            this.target.y = Math.floor(Math.random() * 300);
        };
        return AlphaMask;
    }());
    demos.AlphaMask = AlphaMask;
    var AnimatedSpriteDemo = /** @class */ (function () {
        function AnimatedSpriteDemo() {
            var _this = this;
            this.app = new PIXI.Application();
            this.app.stop();
            document.body.appendChild(this.app.view);
            PIXI.loader.add("spritesheet", "required/assets/mc.json").load(function () {
                var explosionTextures = [];
                var i;
                for (i = 0; i < 26; i++) {
                    var texture = PIXI.Texture.fromFrame("Explosion_Sequence_A " + (i + 1) + ".png");
                    explosionTextures.push(texture);
                }
                for (i = 0; i < 50; i++) {
                    var explosion = new PIXI.extras.AnimatedSprite(explosionTextures);
                    explosion.x = Math.random() * _this.app.renderer.width;
                    explosion.y = Math.random() * _this.app.renderer.height;
                    explosion.anchor.set(0.5);
                    explosion.rotation = Math.random() * Math.PI;
                    explosion.scale.set(0.75 + Math.random() * 0.5);
                    explosion.gotoAndPlay(Math.random() * 27);
                    _this.app.stage.addChild(explosion);
                }
                _this.app.start();
            });
        }
        return AnimatedSpriteDemo;
    }());
    demos.AnimatedSpriteDemo = AnimatedSpriteDemo;
    var Batch = /** @class */ (function () {
        function Batch() {
            var _this = this;
            this.app = new PIXI.Application();
            document.body.appendChild(this.app.view);
            this.sprites = new PIXI.particles.ParticleContainer(10000, {
                scale: true,
                position: true,
                rotation: true,
                uvs: true,
                tint: true
            });
            this.app.stage.addChild(this.sprites);
            this.maggots = [];
            var totalSprites = this.app.renderer instanceof PIXI.WebGLRenderer ? 10000 : 100;
            var dudeTexture = PIXI.Texture.fromImage("required/assets/tinyMaggot.png");
            for (var i = 0; i < totalSprites; i++) {
                var dude = new Dude(dudeTexture);
                dude.tint = Math.random() * 0xe8d4cd;
                dude.anchor.set(0.5);
                dude.scale.set(0.8 + Math.random() * 0.3);
                dude.x = Math.random() * this.app.renderer.width;
                dude.y = Math.random() * this.app.renderer.height;
                dude.direction = Math.random() * Math.PI * 2;
                dude.turningSpeed = Math.random() - 0.8;
                dude.speed = (2 + Math.random() * 2) * 0.2;
                dude.offset = Math.random() * 100;
                this.maggots.push(dude);
                this.sprites.addChild(dude);
            }
            var dudeBoundsPadding = 100;
            this.dudeBounds = new PIXI.Rectangle(-dudeBoundsPadding, -dudeBoundsPadding, this.app.renderer.width + dudeBoundsPadding * 2, this.app.renderer.height + dudeBoundsPadding * 2);
            this.tick = 0;
            this.app.ticker.add(function () {
                for (var i = 0; i < _this.maggots.length; i++) {
                    var dude = _this.maggots[i];
                    dude.scale.y =
                        0.95 + Math.sin(_this.tick + dude.offset) * 0.05;
                    dude.direction += dude.turningSpeed * 0.01;
                    dude.x +=
                        Math.sin(dude.direction) *
                            (dude.speed * dude.scale.y);
                    dude.y +=
                        Math.cos(dude.direction) *
                            (dude.speed * dude.scale.y);
                    dude.rotation = -dude.direction + Math.PI;
                    // wrap the maggots
                    if (dude.x < _this.dudeBounds.x) {
                        dude.x += _this.dudeBounds.width;
                    }
                    else if (dude.x >
                        _this.dudeBounds.x + _this.dudeBounds.width) {
                        dude.x -= _this.dudeBounds.width;
                    }
                    if (dude.y < _this.dudeBounds.y) {
                        dude.y += _this.dudeBounds.height;
                    }
                    else if (dude.y >
                        _this.dudeBounds.y + _this.dudeBounds.height) {
                        dude.y -= _this.dudeBounds.height;
                    }
                }
                _this.tick += 0.1;
            });
        }
        return Batch;
    }());
    demos.Batch = Batch;
    var Dude = /** @class */ (function (_super) {
        __extends(Dude, _super);
        function Dude(texture) {
            var _this = _super.call(this, texture) || this;
            _this.direction = 0;
            _this.speed = 0;
            _this.turningSpeed = 0;
            _this.offset = 0;
            return _this;
        }
        return Dude;
    }(PIXI.Sprite));
    demos.Dude = Dude;
    var BlendModes = /** @class */ (function () {
        function BlendModes() {
            var _this = this;
            this.app = new PIXI.Application();
            document.body.appendChild(this.app.view);
            this.background = PIXI.Sprite.fromImage("required/assets/BGrotate.jpg");
            this.app.stage.addChild(this.background);
            this.dudeArray = [];
            var totalDudes = 20;
            var dudeTexture = PIXI.Texture.fromImage("required/assets/flowerTop.png");
            for (var i = 0; i < totalDudes; i++) {
                var dude = new Dude(dudeTexture);
                dude.anchor.set(0.5);
                dude.scale.set(0.8 + Math.random() * 0.3);
                dude.x = Math.floor(Math.random() * this.app.renderer.width);
                dude.y = Math.floor(Math.random() * this.app.renderer.height);
                dude.blendMode = PIXI.BLEND_MODES.ADD;
                dude.direction = Math.random() * Math.PI * 2;
                dude.turningSpeed = Math.random() - 0.8;
                dude.speed = 2 + Math.random() * 2;
                this.dudeArray.push(dude);
                this.app.stage.addChild(dude);
            }
            var dudeBoundsPadding = 100;
            this.dudeBounds = new PIXI.Rectangle(-dudeBoundsPadding, -dudeBoundsPadding, this.app.renderer.width + dudeBoundsPadding * 2, this.app.renderer.height + dudeBoundsPadding * 2);
            this.app.ticker.add(function () {
                for (var i = 0; i < _this.dudeArray.length; i++) {
                    var dude = _this.dudeArray[i];
                    dude.direction += dude.turningSpeed * 0.01;
                    dude.x += Math.sin(dude.direction) * dude.speed;
                    dude.y += Math.cos(dude.direction) * dude.speed;
                    dude.rotation = -dude.direction - Math.PI / 2;
                    // wrap the dudes by testing their bounds...
                    if (dude.x < _this.dudeBounds.x) {
                        dude.x += _this.dudeBounds.width;
                    }
                    else if (dude.x >
                        _this.dudeBounds.x + _this.dudeBounds.width) {
                        dude.x -= _this.dudeBounds.width;
                    }
                    if (dude.y < _this.dudeBounds.y) {
                        dude.y += _this.dudeBounds.height;
                    }
                    else if (dude.y >
                        _this.dudeBounds.y + _this.dudeBounds.height) {
                        dude.y -= _this.dudeBounds.height;
                    }
                }
            });
        }
        return BlendModes;
    }());
    demos.BlendModes = BlendModes;
    var CacheAsBitmap = /** @class */ (function () {
        function CacheAsBitmap() {
            var _this = this;
            this.app = new PIXI.Application();
            this.app.stage.interactive = true;
            document.body.appendChild(this.app.view);
            this.app.stop();
            this.aliens = [];
            var alienFrames = [
                "eggHead.png",
                "flowerTop.png",
                "helmlok.png",
                "skully.png"
            ];
            this.count = 0;
            this.alienContainer = new PIXI.Container();
            this.alienContainer.x = 400;
            this.alienContainer.y = 300;
            this.app.stage.addChild(this.alienContainer);
            PIXI.loader
                .add("spritesheet", "required/assets/monsters.json")
                .load(function () {
                for (var i = 0; i < 100; i++) {
                    var frameName = alienFrames[i % 4];
                    var alien = PIXI.Sprite.fromFrame(frameName);
                    alien.tint = Math.random() * 0xffffff;
                    alien.x = Math.random() * 800 - 400;
                    alien.y = Math.random() * 600 - 300;
                    alien.anchor.x = 0.5;
                    alien.anchor.y = 0.5;
                    _this.aliens.push(alien);
                    _this.alienContainer.addChild(alien);
                }
                _this.app.start();
                _this.app.stage.on("pointerTap", function (event) {
                    _this.alienContainer.cacheAsBitmap = !_this
                        .alienContainer.cacheAsBitmap;
                });
                _this.app.ticker.add(function () {
                    // let"s rotate the aliens a little bit
                    for (var i = 0; i < 100; i++) {
                        var alien = _this.aliens[i];
                        alien.rotation += 0.1;
                    }
                    _this.count += 0.01;
                    _this.alienContainer.scale.x = Math.sin(_this.count);
                    _this.alienContainer.scale.y = Math.sin(_this.count);
                    _this.alienContainer.rotation += 0.01;
                });
            });
        }
        return CacheAsBitmap;
    }());
    demos.CacheAsBitmap = CacheAsBitmap;
    var Dragging = /** @class */ (function () {
        function Dragging() {
            this.app = new PIXI.Application(800, 600, {
                backgroundColor: 0x1099bb
            });
            document.body.appendChild(this.app.view);
            var texture = PIXI.Texture.fromImage("required/assets/bunny.png");
            texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
            for (var i = 0; i < 10; i++) {
                this.createBunny(texture, Math.floor(Math.random() * this.app.renderer.width), Math.floor(Math.random() * this.app.renderer.height));
            }
        }
        Dragging.prototype.createBunny = function (texture, x, y) {
            var _this = this;
            var bunny = new PIXI.Sprite(texture);
            bunny.interactive = true;
            bunny.buttonMode = true;
            bunny.anchor.set(0.5);
            bunny.scale.set(3);
            bunny
                .on("pointerdown", function (event) {
                _this.data = event.data;
                bunny.alpha = 0.5;
                _this.dragging = true;
            })
                .on("pointerup", function (event) {
                _this.data = null;
                bunny.alpha = 0.5;
                _this.dragging = false;
            })
                .on("pointerupoutside", function (event) {
                _this.data = null;
                bunny.alpha = 0.5;
                _this.dragging = false;
            })
                .on("pointermove", function (event) {
                if (_this.dragging) {
                    var newPosition = _this.data.getLocalPosition(bunny);
                    bunny.x = newPosition.x;
                    bunny.y = newPosition.y;
                }
            });
            bunny.x = x;
            bunny.y = y;
            this.app.stage.addChild(bunny);
        };
        return Dragging;
    }());
    demos.Dragging = Dragging;
    var GraphicsDemo = /** @class */ (function () {
        function GraphicsDemo() {
            var _this = this;
            this.app = new PIXI.Application(800, 600, { antialias: true });
            this.app.stage.interactive = true;
            document.body.appendChild(this.app.view);
            var graphics = new PIXI.Graphics();
            graphics.beginFill(0xff3300);
            graphics.lineStyle(10, 0xffd900, 1);
            graphics.moveTo(50, 50);
            graphics.lineTo(250, 50);
            graphics.lineTo(100, 100);
            graphics.lineTo(250, 220);
            graphics.lineTo(50, 220);
            graphics.lineTo(50, 50);
            graphics.endFill();
            graphics.lineStyle(10, 0xff0000, 0.8);
            graphics.beginFill(0xff700b, 1);
            graphics.moveTo(210, 300);
            graphics.lineTo(450, 320);
            graphics.lineTo(570, 350);
            graphics.quadraticCurveTo(600, 0, 480, 100);
            graphics.lineTo(330, 120);
            graphics.lineTo(410, 200);
            graphics.lineTo(210, 300);
            graphics.endFill();
            graphics.lineStyle(2, 0x0000ff, 1);
            graphics.drawRect(50, 250, 100, 100);
            graphics.lineStyle(0);
            graphics.beginFill(0xffff0b, 0.5);
            graphics.drawCircle(470, 200, 100);
            graphics.endFill();
            graphics.lineStyle(20, 0x33ff00);
            graphics.moveTo(30, 30);
            graphics.lineTo(600, 300);
            this.graphics = graphics;
            this.app.stage.addChild(this.graphics);
            this.thing = new PIXI.Graphics();
            this.thing.x = 800 / 2;
            this.thing.y = 600 / 2;
            this.app.stage.addChild(this.thing);
            this.count = 0;
            this.app.stage.on("pointertap", function () {
                _this.graphics.lineStyle(Math.random() * 30, Math.random() * 0xffffff, 1);
                _this.graphics.moveTo(Math.random() * 800, Math.random() * 600);
                _this.graphics.bezierCurveTo(Math.random() * 800, Math.random() * 600, Math.random() * 800, Math.random() * 600, Math.random() * 800, Math.random() * 600);
            });
            this.app.ticker.add(function () {
                _this.count += 0.1;
                _this.thing.clear();
                _this.thing.lineStyle(10, 0xff0000, 1);
                _this.thing.beginFill(0xffff00, 0.5);
                _this.thing.moveTo(-120 + Math.sin(_this.count) * 20, -100 + Math.cos(_this.count) * 20);
                _this.thing.lineTo(120 + Math.cos(_this.count) * 20, -100 + Math.sin(_this.count) * 20);
                _this.thing.lineTo(120 + Math.sin(_this.count) * 20, 100 + Math.cos(_this.count) * 20);
                _this.thing.lineTo(-120 + Math.cos(_this.count) * 20, 100 + Math.sin(_this.count) * 20);
                _this.thing.lineTo(-120 + Math.sin(_this.count) * 20, -100 + Math.cos(_this.count) * 20);
                _this.thing.rotation = _this.count * 0.1;
            });
        }
        return GraphicsDemo;
    }());
    demos.GraphicsDemo = GraphicsDemo;
    var Interactivity = /** @class */ (function () {
        function Interactivity() {
            this.app = new PIXI.Application();
            document.body.appendChild(this.app.view);
            var background = PIXI.Sprite.fromImage("required/assets/button_test_BG.jpg");
            background.width = this.app.renderer.width;
            background.height = this.app.renderer.height;
            this.background = background;
            this.app.stage.addChild(this.background);
            this.buttons = [];
            var buttonPositions = [
                175,
                75,
                655,
                75,
                410,
                325,
                150,
                465,
                685,
                445
            ];
            var textureButton = PIXI.Texture.fromImage("../../_assets/button.png");
            var textureButtonDown = PIXI.Texture.fromImage("../../_assets/buttonDown.png");
            var textureButtonOver = PIXI.Texture.fromImage("../../_assets/buttonOver.png");
            for (var i = 0; i < 5; i++) {
                var button = new PIXI.Sprite(textureButton);
                button.anchor.set(0.5);
                button.x = buttonPositions[i * 2];
                button.y = buttonPositions[i * 2 + 1];
                button.interactive = true;
                button.buttonMode = true;
                button
                    .on("pointerdown", function () {
                    // blah
                })
                    .on("pointerup", function () {
                    // blah
                })
                    .on("pointerupoutside", function () {
                    // blah
                })
                    .on("pointerover", function () {
                    // blah
                })
                    .on("pointerout", function () {
                    // blah
                });
                this.app.stage.addChild(button);
                this.buttons.push(button);
            }
            this.buttons[0].scale.set(1.2);
            this.buttons[2].rotation = Math.PI / 10;
            this.buttons[3].scale.set(0.8);
            this.buttons[4].scale.set(0.8, 1.2);
            this.buttons[4].rotation = Math.PI;
        }
        return Interactivity;
    }());
    demos.Interactivity = Interactivity;
    var Masking = /** @class */ (function () {
        function Masking() {
            var _this = this;
            this.app = new PIXI.Application(800, 600, { antialias: true });
            this.app.stage.interactive = true;
            document.body.appendChild(this.app.view);
            this.bg = PIXI.Sprite.fromImage("required/assets/BGrotate.jpg");
            this.bg.anchor.set(0.5);
            this.bg.x = this.app.renderer.width / 2;
            this.bg.y = this.app.renderer.height / 2;
            this.app.stage.addChild(this.bg);
            this.container = new PIXI.Container();
            this.container.x = this.app.renderer.width / 2;
            this.container.y = this.app.renderer.height / 2;
            this.app.stage.addChild(this.container);
            this.bgFront = PIXI.Sprite.fromImage("required/assets/SceneRotate.jpg");
            this.bgFront.anchor.set(0.5);
            this.light2 = PIXI.Sprite.fromImage("required/assets/LightRotate2.png");
            this.light2.anchor.set(0.5);
            this.light1 = PIXI.Sprite.fromImage("required/assets/LightRotate1.png");
            this.light1.anchor.set(0.5);
            this.panda = PIXI.Sprite.fromImage("required/assets/panda.png");
            this.panda.anchor.set(0.5);
            this.container.addChild(this.bgFront, this.light2, this.light1, this.panda);
            this.app.stage.addChild(this.container);
            this.thing = new PIXI.Graphics();
            this.app.stage.addChild(this.thing);
            this.thing.x = this.app.renderer.width / 2;
            this.thing.y = this.app.renderer.height / 2;
            this.thing.lineStyle(0);
            this.container.mask = this.thing;
            this.count = 0;
            this.app.stage.on("pointertap", function () {
                if (!_this.container.mask) {
                    _this.container.mask = _this.thing;
                }
                else {
                    _this.container.mask = null;
                }
            });
            this.app.ticker.add(function () {
                _this.bg.rotation += 0.01;
                _this.bgFront.rotation -= 0.01;
                _this.light1.rotation += 0.02;
                _this.light2.rotation += 0.01;
                _this.panda.scale.x = 1 + Math.sin(_this.count) * 0.04;
                _this.panda.scale.y = 1 + Math.cos(_this.count) * 0.04;
                _this.count += 0.1;
                _this.thing.clear();
                _this.thing.beginFill(0x8bc5ff, 0.4);
                _this.thing.moveTo(-120 + Math.sin(_this.count) * 20, -100 + Math.cos(_this.count) * 20);
                _this.thing.lineTo(-320 + Math.cos(_this.count) * 20, 100 + Math.sin(_this.count) * 20);
                _this.thing.lineTo(120 + Math.cos(_this.count) * 20, -100 + Math.sin(_this.count) * 20);
                _this.thing.lineTo(120 + Math.sin(_this.count) * 20, 100 + Math.cos(_this.count) * 20);
                _this.thing.lineTo(-120 + Math.cos(_this.count) * 20, 100 + Math.sin(_this.count) * 20);
                _this.thing.lineTo(-120 + Math.sin(_this.count) * 20, -300 + Math.cos(_this.count) * 20);
                _this.thing.lineTo(-320 + Math.sin(_this.count) * 20, -100 + Math.cos(_this.count) * 20);
                _this.thing.rotation = _this.count * 0.1;
            });
        }
        return Masking;
    }());
    demos.Masking = Masking;
    var RenderTextureDemo = /** @class */ (function () {
        function RenderTextureDemo() {
            var _this = this;
            this.app = new PIXI.Application();
            document.body.appendChild(this.app.view);
            this.renderTexture = PIXI.RenderTexture.create(this.app.renderer.width, this.app.renderer.height);
            this.renderTexture2 = PIXI.RenderTexture.create(this.app.renderer.width, this.app.renderer.height);
            this.currentTexture = this.renderTexture;
            this.outputSprite = new PIXI.Sprite(this.currentTexture);
            this.outputSprite.x = 400;
            this.outputSprite.y = 300;
            this.outputSprite.anchor.set(0.5);
            this.app.stage.addChild(this.outputSprite);
            this.stuffContainer = new PIXI.Container();
            this.stuffContainer.x = 400;
            this.stuffContainer.y = 300;
            this.app.stage.addChild(this.stuffContainer);
            var fruits = [
                "required/assets/spinObj_01.png",
                "required/assets/spinObj_02.png",
                "required/assets/spinObj_03.png",
                "required/assets/spinObj_04.png",
                "required/assets/spinObj_05.png",
                "required/assets/spinObj_06.png",
                "required/assets/spinObj_07.png",
                "required/assets/spinObj_08.png"
            ];
            this.items = [];
            for (var i = 0; i < 20; i++) {
                var item = PIXI.Sprite.fromImage(fruits[i % fruits.length]);
                item.x = Math.random() * 400 - 200;
                item.y = Math.random() * 400 - 200;
                item.anchor.set(0.5);
                this.stuffContainer.addChild(item);
                this.items.push(item);
            }
            this.count = 0;
            this.app.ticker.add(function () {
                for (var i = 0; i < _this.items.length; i++) {
                    var item = _this.items[i];
                    item.rotation += 0.1;
                }
                _this.count += 0.01;
                var temp = _this.renderTexture;
                _this.renderTexture = _this.renderTexture2;
                _this.renderTexture2 = temp;
                _this.outputSprite.texture = _this.renderTexture;
                _this.stuffContainer.rotation -= 0.01;
                _this.outputSprite.scale.set(1 + Math.sin(_this.count) * 0.2);
                _this.app.renderer.render(_this.app.stage, _this.renderTexture2, false);
            });
        }
        return RenderTextureDemo;
    }());
    demos.RenderTextureDemo = RenderTextureDemo;
    var StripDemo = /** @class */ (function () {
        function StripDemo() {
            var _this = this;
            this.app = new PIXI.Application();
            document.body.appendChild(this.app.view);
            this.count = 0;
            var ropeLength = 918 / 20;
            this.points = [];
            for (var i = 0; i < 20; i++) {
                this.points.push(new PIXI.Point(i * ropeLength, 0));
            }
            this.strip = new PIXI.mesh.Rope(PIXI.Texture.fromImage("required/assets/snake.png"), this.points);
            this.strip.x = -459;
            this.snakeContainer = new PIXI.Container();
            this.snakeContainer.position.x = 400;
            this.snakeContainer.position.y = 300;
            this.snakeContainer.scale.set(800 / 1100);
            this.snakeContainer.addChild(this.strip);
            this.app.stage.addChild(this.snakeContainer);
            this.app.ticker.add(function () {
                _this.count += 0.1;
                for (var i = 0; i < _this.points.length; i++) {
                    _this.points[i].y = Math.sin(i * 0.5 + _this.count) * 30;
                    _this.points[i].x =
                        i * ropeLength +
                            Math.cos(i * 0.3 + _this.count) * 20;
                }
            });
        }
        return StripDemo;
    }());
    demos.StripDemo = StripDemo;
    var TextDemo = /** @class */ (function () {
        function TextDemo() {
            var _this = this;
            this.app = new PIXI.Application();
            document.body.appendChild(this.app.view);
            PIXI.loader.add("desyrel", "required/assets/desyrel.xml").load(function () {
                _this.bitmapFontText = new PIXI.extras.BitmapText("bitmap fonts are\n now supported!", { font: "35px Desyrel", align: "right" });
                _this.bitmapFontText.x =
                    _this.app.renderer.width -
                        _this.bitmapFontText.textWidth -
                        20;
                _this.bitmapFontText.y = 20;
                _this.app.stage.addChild(_this.bitmapFontText);
            });
            this.background = PIXI.Sprite.fromImage("required/assets/textDemoBG.jpg");
            this.background.width = this.app.renderer.width;
            this.background.height = this.app.renderer.height;
            this.app.stage.addChild(this.background);
            this.textSample = new PIXI.Text("Pixi.js can has\n multiline text!", {
                fontFamily: "Snippet",
                fontSize: 35,
                fill: "white",
                align: "left"
            });
            this.textSample.position.set(20);
            this.spinningText = new PIXI.Text('I"m fun!', {
                fontWeight: "bold",
                fontSize: 60,
                fontFamily: "Arial",
                fill: "#cc00ff",
                align: "center",
                stroke: "#FFFFFF",
                strokeThickness: 6
            });
            this.spinningText.anchor.set(0.5);
            this.spinningText.x = this.app.renderer.width / 2;
            this.spinningText.y = this.app.renderer.height / 2;
            this.countingText = new PIXI.Text("COUNT 4Elet: 0", {
                fontWeight: "bold",
                fontStyle: "italic",
                fontSize: 60,
                fontFamily: "Arvo",
                fill: "#3e1707",
                align: "center",
                stroke: "#a4410e",
                strokeThickness: 7
            });
            this.countingText.x = this.app.renderer.width / 2;
            this.countingText.y = 500;
            this.countingText.anchor.x = 0.5;
            this.app.stage.addChild(this.textSample, this.spinningText, this.countingText);
            this.count = 0;
            this.app.ticker.add(function () {
                _this.count += 0.05;
                _this.countingText.text =
                    "COUNT 4Elet: " + Math.floor(_this.count);
                _this.spinningText.rotation += 0.03;
            });
        }
        return TextDemo;
    }());
    demos.TextDemo = TextDemo;
    var TextureRotate = /** @class */ (function () {
        function TextureRotate() {
            var _this = this;
            this.app = new PIXI.Application();
            document.body.appendChild(this.app.view);
            this.bol = false;
            PIXI.loader.add("flowerTop", "required/assets/flowerTop.png");
            PIXI.loader.load(function (loader, resources) {
                _this.texture = resources.flowerTop.texture;
                _this.init();
            });
        }
        TextureRotate.prototype.init = function () {
            var textures = [this.texture];
            var D8 = PIXI.GroupD8;
            for (var rotate = 1; rotate < 16; rotate++) {
                var h = D8.isVertical(rotate)
                    ? this.texture.frame.width
                    : this.texture.frame.height;
                var w = D8.isVertical(rotate)
                    ? this.texture.frame.height
                    : this.texture.frame.width;
                var frame = this.texture.frame;
                var crop = new PIXI.Rectangle(this.texture.frame.x, this.texture.frame.y, w, h);
                var trim = crop;
                var rotatedTexture = void 0;
                if (rotate % 2 === 0) {
                    rotatedTexture = new PIXI.Texture(this.texture.baseTexture, frame, crop, trim, rotate);
                }
                else {
                    rotatedTexture = new PIXI.Texture(this.texture.baseTexture, frame, crop, trim, rotate - 1);
                    rotatedTexture.rotate++;
                }
                textures.push(rotatedTexture);
            }
            var offsetX = (this.app.renderer.width / 16) | 0;
            var offsetY = (this.app.renderer.height / 8) | 0;
            var gridW = (this.app.renderer.width / 4) | 0;
            var gridH = (this.app.renderer.height / 5) | 0;
            for (var i = 0; i < 16; i++) {
                var dude = new PIXI.Sprite(textures[i < 8 ? i * 2 : (i - 8) * 2 + 1]);
                dude.scale.x = 0.5;
                dude.scale.y = 0.5;
                dude.x = offsetX + gridW * (i % 4);
                dude.y = offsetY + gridH * ((i / 4) | 0);
                this.app.stage.addChild(dude);
                var text = new PIXI.Text("rotate = " + dude.texture.rotate, {
                    fontFamily: "Courier New",
                    fontSize: "12px",
                    fill: "white",
                    align: "left"
                });
                text.x = dude.x;
                text.y = dude.y - 20;
                this.app.stage.addChild(text);
            }
        };
        return TextureRotate;
    }());
    demos.TextureRotate = TextureRotate;
    var TextureSwap = /** @class */ (function () {
        function TextureSwap() {
            var _this = this;
            this.app = new PIXI.Application();
            document.body.appendChild(this.app.view);
            this.bol = false;
            this.texture = PIXI.Texture.fromImage("required/assets/flowerTop.png");
            this.secondTexture = PIXI.Texture.fromImage("required/assets/eggHead.png");
            this.dude = new PIXI.Sprite(this.texture);
            this.dude.anchor.set(0.5);
            this.dude.x = this.app.renderer.width / 2;
            this.dude.y = this.app.renderer.height / 2;
            this.dude.interactive = true;
            this.dude.buttonMode = true;
            this.app.stage.addChild(this.dude);
            this.dude.on("pointertap", function () {
                _this.bol = !_this.bol;
                if (_this.bol) {
                    _this.dude.texture = _this.secondTexture;
                }
                else {
                    _this.dude.texture = _this.texture;
                }
            });
            this.app.ticker.add(function () {
                _this.dude.rotation += 0.1;
            });
        }
        return TextureSwap;
    }());
    demos.TextureSwap = TextureSwap;
    var Tinting = /** @class */ (function () {
        function Tinting() {
            var _this = this;
            this.app = new PIXI.Application();
            document.body.appendChild(this.app.view);
            this.aliens = [];
            var totalDudes = 20;
            var dudeTexture = PIXI.Texture.fromImage("required/assets/eggHead.png");
            for (var i = 0; i < totalDudes; i++) {
                var dude = new Dude(dudeTexture);
                dude.anchor.set(0.5);
                dude.scale.set(0.8 + Math.random() * 0.3);
                dude.x = Math.random() * this.app.renderer.width;
                dude.y = Math.random() * this.app.renderer.height;
                dude.tint = Math.random() * 0xffffff;
                dude.direction = Math.random() * Math.PI * 2;
                dude.turningSpeed = Math.random() - 0.8;
                dude.speed = 2 + Math.random() * 2;
                this.aliens.push(dude);
                this.app.stage.addChild(dude);
            }
            var dudeBoundsPadding = 100;
            var dudeBounds = new PIXI.Rectangle(-dudeBoundsPadding, -dudeBoundsPadding, this.app.renderer.width + dudeBoundsPadding * 2, this.app.renderer.height + dudeBoundsPadding * 2);
            this.app.ticker.add(function () {
                for (var i = 0; i < _this.aliens.length; i++) {
                    var dude = _this.aliens[i];
                    dude.direction += dude.turningSpeed * 0.01;
                    dude.x += Math.sin(dude.direction) * dude.speed;
                    dude.y += Math.cos(dude.direction) * dude.speed;
                    dude.rotation = -dude.direction - Math.PI / 2;
                    if (dude.x < dudeBounds.x) {
                        dude.x += dudeBounds.width;
                    }
                    else if (dude.x > dudeBounds.x + dudeBounds.width) {
                        dude.x -= dudeBounds.width;
                    }
                    if (dude.y < dudeBounds.y) {
                        dude.y += dudeBounds.height;
                    }
                    else if (dude.y > dudeBounds.y + dudeBounds.height) {
                        dude.y -= dudeBounds.height;
                    }
                }
            });
        }
        return Tinting;
    }());
    demos.Tinting = Tinting;
    var TransparentBackground = /** @class */ (function () {
        function TransparentBackground() {
            var _this = this;
            this.app = new PIXI.Application(800, 600, { transparent: true });
            document.body.appendChild(this.app.view);
            this.bunny = PIXI.Sprite.fromImage("required/assets/bunny.png");
            this.bunny.anchor.set(0.5);
            this.bunny.x = this.app.renderer.width / 2;
            this.bunny.y = this.app.renderer.height / 2;
            this.app.stage.addChild(this.bunny);
            this.app.ticker.add(function () {
                _this.bunny.rotation += 0.1;
            });
        }
        return TransparentBackground;
    }());
    demos.TransparentBackground = TransparentBackground;
})(demos || (demos = {}));
var filters;
(function (filters) {
    var BlurFilter = /** @class */ (function () {
        function BlurFilter() {
            var _this = this;
            this.app = new PIXI.Application(800, 600);
            document.body.appendChild(this.app.view);
            this.bg = PIXI.Sprite.fromImage("required/assets/depth_blur_BG.jpg");
            this.bg.width = this.app.renderer.width;
            this.bg.height = this.app.renderer.height;
            this.app.stage.addChild(this.bg);
            this.littleDudes = PIXI.Sprite.fromImage("required/assets/depth_blur_dudes.jpg");
            this.littleDudes.x = this.app.renderer.width / 2 - 315;
            this.littleDudes.y = 200;
            this.app.stage.addChild(this.littleDudes);
            this.littleRobot = PIXI.Sprite.fromImage("required/assets/depth_blur_moby.jpg");
            this.littleRobot.x = this.app.renderer.width / 2 - 200;
            this.littleRobot.y = 100;
            this.app.stage.addChild(this.littleRobot);
            this.blurFilter1 = new PIXI.filters.BlurFilter();
            this.blurFilter2 = new PIXI.filters.BlurFilter();
            this.littleDudes.filters = [this.blurFilter1];
            this.littleRobot.filters = [this.blurFilter2];
            this.count = 0;
            this.app.ticker.add(function () {
                _this.count += 0.005;
                var blurAmount = Math.cos(_this.count);
                var blurAmount2 = Math.sin(_this.count);
                _this.blurFilter1.blur = 20 * blurAmount;
                _this.blurFilter2.blur = 20 * blurAmount2;
            });
        }
        return BlurFilter;
    }());
    filters.BlurFilter = BlurFilter;
    var DisplacementMap = /** @class */ (function () {
        function DisplacementMap() {
            var _this = this;
            this.onPointerMove = function (eventData) {
                _this.ring.visible = true;
                _this.displacementSprite.x = eventData.data.global.x - 100;
                _this.displacementSprite.y =
                    eventData.data.global.y - _this.displacementSprite.height / 2;
                _this.ring.x = eventData.data.global.x - 25;
                _this.ring.y = eventData.data.global.y;
            };
            this.app = new PIXI.Application(800, 600);
            this.app.stage.interactive = true;
            document.body.appendChild(this.app.view);
            this.container = new PIXI.Container();
            this.app.stage.addChild(this.container);
            var padding = 100;
            var bounds = new PIXI.Rectangle(-padding, -padding, this.app.renderer.width + padding * 2, this.app.renderer.height + padding * 2);
            this.maggots = [];
            for (var i = 0; i < 20; i++) {
                var maggot = new DisplacementMapDude();
                maggot.anchor.set(0.5);
                this.container.addChild(maggot);
                maggot.direction = Math.random() * Math.PI * 2;
                maggot.speed = 1;
                maggot.turnSpeed = Math.random() - 0.8;
                maggot.position.x = Math.random() * bounds.width;
                maggot.position.y = Math.random() * bounds.height;
                maggot.scale.set(1 + Math.random() * 0.3);
                maggot.original = maggot.scale.clone();
                this.maggots.push(maggot);
            }
            this.displacementSprite = PIXI.Sprite.fromImage("required/assets/displace.png");
            var displacementFilter = new PIXI.filters.DisplacementFilter(this.displacementSprite);
            this.app.stage.addChild(this.displacementSprite);
            this.container.filters = [displacementFilter];
            displacementFilter.scale.x = 110;
            displacementFilter.scale.y = 110;
            this.ring = PIXI.Sprite.fromImage("required/assets/ring.png");
            this.ring.anchor.set(0.5);
            this.ring.visible = false;
            this.app.stage.addChild(this.ring);
            this.bg = PIXI.Sprite.fromImage("required/assets/bkg-grass.jpg");
            this.bg.width = this.app.renderer.width;
            this.bg.height = this.app.renderer.height;
            this.bg.alpha = 0.4;
            this.container.addChild(this.bg);
            this.count = 0;
            this.app.stage
                .on("mousemove", this.onPointerMove)
                .on("touchmove", this.onPointerMove);
            this.app.ticker.add(function () {
                _this.count += 0.05;
                for (var i = 0; i < _this.maggots.length; i++) {
                    var maggot = _this.maggots[i];
                    maggot.direction += maggot.turnSpeed * 0.01;
                    maggot.x += Math.sin(maggot.direction) * maggot.speed;
                    maggot.y += Math.cos(maggot.direction) * maggot.speed;
                    maggot.rotation = -maggot.direction - Math.PI / 2;
                    maggot.scale.x =
                        maggot.original.x + Math.sin(_this.count) * 0.2;
                    if (maggot.x < bounds.x) {
                        maggot.x += bounds.width;
                    }
                    else if (maggot.x > bounds.x + bounds.width) {
                        maggot.x -= bounds.width;
                    }
                    if (maggot.y < bounds.y) {
                        maggot.y += bounds.height;
                    }
                    else if (maggot.y > bounds.y + bounds.height) {
                        maggot.y -= bounds.height;
                    }
                }
            });
        }
        return DisplacementMap;
    }());
    filters.DisplacementMap = DisplacementMap;
    var DisplacementMapDude = /** @class */ (function (_super) {
        __extends(DisplacementMapDude, _super);
        function DisplacementMapDude() {
            var _this = _super.call(this, PIXI.Texture.fromImage("../../_assets/maggot.png")) || this;
            _this.direction = 0;
            _this.speed = 0;
            _this.turnSpeed = 0;
            _this.original = new PIXI.Point();
            return _this;
        }
        return DisplacementMapDude;
    }(PIXI.Sprite));
    filters.DisplacementMapDude = DisplacementMapDude;
    var Filter = /** @class */ (function () {
        function Filter() {
            var _this = this;
            this.app = new PIXI.Application();
            this.app.stage.interactive = true;
            document.body.appendChild(this.app.view);
            this.bg = PIXI.Sprite.fromImage("required/assets/BGrotate.jpg");
            this.bg.anchor.set(0.5);
            this.bg.x = this.app.renderer.width / 2;
            this.bg.y = this.app.renderer.height / 2;
            this.filter = new PIXI.filters.ColorMatrixFilter();
            this.container = new PIXI.Container();
            this.container.position.x = this.app.renderer.width / 2;
            this.container.position.y = this.app.renderer.height / 2;
            this.app.stage.addChild(this.container);
            this.bgFront = PIXI.Sprite.fromImage("required/assets/SceneRotate.jpg");
            this.bgFront.anchor.set(0.5);
            this.container.addChild(this.bgFront);
            this.light2 = PIXI.Sprite.fromImage("required/assets/LightRotate2.png");
            this.light2.anchor.set(0.5);
            this.container.addChild(this.light2);
            this.light1 = PIXI.Sprite.fromImage("../../_assets/LightRotate1.png");
            this.light1.anchor.set(0.5);
            this.container.addChild(this.light1);
            this.panda = PIXI.Sprite.fromImage("required/assets/panda.png");
            this.panda.anchor.set(0.5);
            this.container.addChild(this.panda);
            this.app.stage.filters = [this.filter];
            this.count = 0;
            this.enabled = true;
            this.app.stage.on("pointertap", function () {
                _this.enabled = !_this.enabled;
                _this.app.stage.filters = _this.enabled
                    ? [_this.filter]
                    : null;
            });
            this.help = new PIXI.Text("Click or tap to turn filters on / off.", {
                fontFamily: "Arial",
                fontSize: 12,
                fontWeight: "bold",
                fill: "white"
            });
            this.help.y = this.app.renderer.height - 25;
            this.help.x = 10;
            this.app.stage.addChild(this.help);
            this.app.ticker.add(function (delta) {
                _this.bg.rotation += 0.01;
                _this.bgFront.rotation -= 0.01;
                _this.light1.rotation += 0.02;
                _this.light2.rotation += 0.01;
                _this.panda.scale.x = 1 + Math.sin(_this.count) * 0.04;
                _this.panda.scale.y = 1 + Math.cos(_this.count) * 0.04;
                _this.count += 0.1;
                var matrix = _this.filter.matrix;
                matrix[1] = Math.sin(_this.count) * 3;
                matrix[2] = Math.cos(_this.count);
                matrix[3] = Math.cos(_this.count) * 1.5;
                matrix[4] = Math.sin(_this.count / 3) * 2;
                matrix[5] = Math.sin(_this.count / 2);
                matrix[6] = Math.sin(_this.count / 4);
            });
        }
        return Filter;
    }());
    filters.Filter = Filter;
})(filters || (filters = {}));
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(questions) {
        var _this = this;
        var res = 2;
        PIXI.settings.PRECISION_FRAGMENT = 'highp';
        _this = _super.call(this, {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            antialias: false,
            backgroundColor: Palette.White,
            resolution: res,
            roundPixels: true,
            clearBeforeRender: true,
            forceFXAA: true,
            powerPreference: "high-performance",
        }) || this;
        App.width = document.documentElement.clientWidth;
        App.height = document.documentElement.clientHeight;
        App.questions = questions;
        App.stage = _this.stage;
        App.orientation = App.width > App.height ? EOrientation.LANDSCAPE : EOrientation.PORTRAIT;
        App.stage.scale.set(1 / res);
        document.body.appendChild(_this.view);
        window.addEventListener('resize', _this.on_resize);
        App.stage.addChild(new IntroContainer());
        return _this;
    }
    App.init = function () {
        var _this = this;
        var font = new Font();
        font.onload = function () { return PIXI.loader.add(_this.illustrations).load(function () { return fetch('include/questions.json').then(function (response) { return response.json(); }).then(function (json) { return App.app = new App(json); }); }); };
        font.onerror = function () {
            console.log('error loading font Apercu, falling back to Arial...');
            Style.main_font = 'Arial';
            PIXI.loader.add(_this.illustrations).load(function () { return fetch('include/questions.json').then(function (response) { return response.json(); }).then(function (json) { return App.app = new App(json); }); });
        };
        font.fontFamily = 'Apercu';
        font.src = 'include/ApercuPro-Regular.otf';
    };
    App.prototype.on_resize = function () {
        App.width = document.documentElement.clientWidth;
        App.height = document.documentElement.clientHeight;
        App.app.renderer.resize(App.width, App.height);
        App.orientation = App.width > App.height ? EOrientation.LANDSCAPE : EOrientation.PORTRAIT;
        for (var _i = 0, _a = App.responsives; _i < _a.length; _i++) {
            var e = _a[_i];
            e.resize(App.orientation);
        }
    };
    App.responsives = [];
    App.illustrations = [
        'images/illustrations/1.png',
        'images/illustrations/2.png',
        'images/illustrations/3.png',
        'images/illustrations/4.png',
        'images/illustrations/5.png',
        'images/illustrations/6.png',
        'images/illustrations/7.png',
        'images/illustrations/8.png',
        'images/illustrations/9.png',
        'images/illustrations/10.png',
        'images/illustrations/11.png',
        'images/illustrations/12.png',
        'images/illustrations/13.png',
        'images/illustrations/14.png',
        'images/illustrations/15.png',
        'images/illustrations/16.png',
        'images/illustrations/17.png',
        'images/illustrations/18.png',
        'images/illustrations/19.png',
        'images/illustrations/20.png',
        'images/illustrations/21.png',
        'images/illustrations/22.png',
        'images/illustrations/23.png',
        'images/illustrations/24.png',
        'images/illustrations/25.png',
        'images/illustrations/26.png',
        'images/illustrations/27.png',
        'images/illustrations/28.png',
        'images/illustrations/29.png',
        'images/illustrations/30.png',
        'images/illustrations/31.png',
        'images/illustrations/32.png',
        'images/illustrations/33.png',
        'images/illustrations/50.png',
        'images/illustrations/51.png',
        'images/illustrations/52.png',
        'images/star_filled.png',
        'images/star_empty.png',
    ];
    return App;
}(PIXI.Application));
var EOrientation;
(function (EOrientation) {
    EOrientation[EOrientation["PORTRAIT"] = 0] = "PORTRAIT";
    EOrientation[EOrientation["LANDSCAPE"] = 1] = "LANDSCAPE";
})(EOrientation || (EOrientation = {}));
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button(bg_color, text_color, position, text) {
        var _this = _super.call(this) || this;
        _this.beginFill(bg_color);
        _this.drawRoundedRect(0, 0, Style.Button.width, Style.Button.height, Style.Button.height / 2);
        _this.endFill();
        var text_style = Style.ButtonText;
        text_style.fill = text_color;
        _this.text = new PIXI.Text('', Style.ButtonText);
        _this.text.anchor.set(0.5);
        _this.text.position.set(Style.Button.width / 2, Style.Button.height / 2);
        _this.addChild(_this.text);
        if (position)
            _this.position.set(position.x, position.y);
        if (text)
            _this.set_text(text);
        return _this;
    }
    Button.prototype.set_text = function (text) {
        this.text.text = text;
    };
    return Button;
}(PIXI.Graphics));
var EndContainer = /** @class */ (function (_super) {
    __extends(EndContainer, _super);
    function EndContainer() {
        var _this = _super.call(this) || this;
        _this.illustration = AnimationUtil.sprite_from_name('outro');
        _this.illustration.anchor.set(0.5, 1);
        _this.illustration.alpha = 0;
        _this.left_block = new PIXI.Graphics();
        _this.left_block.beginFill(Palette.Purple);
        _this.left_block.drawRect(0, 0, 1, 1);
        _this.left_block.endFill();
        _this.left_block.pivot.x = 1;
        _this.bottom_block = new PIXI.Graphics();
        _this.bottom_block.beginFill(Palette.Black);
        _this.bottom_block.drawRect(0, 0, 1, 1);
        _this.bottom_block.endFill();
        _this.bottom_block.pivot.y = -1;
        /*this.start_button = new Button(Palette.White, Palette.Black, new Vector(App.width * 0.75 - Style.Button.width/2, App.height - 64 - Style.Button.height), 'Let’s get started.');
        this.start_button.buttonMode = true;
        this.start_button.on('pointertap', () => this.on_exit());
        this.start_button.alpha = 0;*/
        _this.title = new PIXI.Text('Asurion. Ace.\nThat’s what you are.', Style.TitleText);
        _this.title.style.fill = Palette.White;
        _this.title.alpha = 0;
        var ratio = ScoreManager.get_ratio();
        _this.instructions = new PIXI.Text('Your score is: ' + ratio.correct + '/' + ratio.total + '.', Style.InstructionsText);
        _this.instructions.style.fill = Palette.White;
        _this.instructions.alpha = 0;
        _this.continue_text = new PIXI.Text('Remember, learning about the Asurion Story never stops. As you live our commitment to customers moving forward, you’ll have plenty of opportunities to put your knowledge to work every day.', Style.InstructionsText);
        _this.continue_text.style.fill = Palette.White;
        _this.continue_text.alpha = 0;
        _this.addChild(_this.illustration);
        _this.addChild(_this.left_block);
        _this.addChild(_this.bottom_block);
        _this.addChild(_this.title);
        _this.addChild(_this.instructions);
        _this.addChild(_this.continue_text);
        //this.addChild(this.start_button);
        _this.add_stars();
        Timer.start(0.2, function () { return TweenMax.to(_this.bottom_block.pivot, 0.5, { y: 0, ease: Expo.easeOut }); });
        Timer.start(0.5, function () { return TweenMax.to(_this.left_block.pivot, 0.5, { x: 0, ease: Expo.easeOut }); });
        Timer.start(1, function () { return TweenMax.to(_this.title, 0.2, { alpha: 1 }); });
        Timer.start(1.2, function () { return TweenMax.to(_this.instructions, 0.2, { alpha: 1 }); });
        Timer.start(1.2, function () { return TweenMax.to(_this.continue_text, 0.2, { alpha: 1 }); });
        Timer.start(1.5, function () { return TweenMax.to(_this.illustration, 0.2, { alpha: 1 }); });
        App.responsives.push(_this);
        _this.resize(App.orientation);
        return _this;
    }
    EndContainer.prototype.add_stars = function () {
        var _this = this;
        this.stars = new PIXI.Container;
        this.stars.interactive = true;
        var _loop_1 = function (i) {
            Timer.start(i * 0.1, function () {
                var texture = GameManager.round_container.stars.counter <= i ? 'images/star_empty.png' : 'images/star_filled.png';
                var star = PIXI.Sprite.fromImage(texture);
                star.position.set(i * 80 + 32, 32);
                star.rotation = -Math.PI * 0.25;
                star.alpha = 0;
                star.anchor.set(0.5);
                star.scale.set(0.4);
                Timer.start(1.5, function () { return TweenMax.to(star, 0.4, { rotation: 0, y: star.y -= 20, alpha: 1, ease: Back.easeOut }); });
                _this.stars.addChild(star);
            });
        };
        for (var i = 0; i < 3; i++) {
            _loop_1(i);
        }
        this.addChild(this.stars);
        var tooltip_msg = GameManager.round_container.stars.counter == 3 ? 'You’re a star because you made it through with all three. Nicely done!' : 'You may have lost a star or two, but you’ve learned so much more. Nice work!';
        this.tooltip = new Tooltip(tooltip_msg, new Vector());
        this.tooltip.alpha = 0;
        this.tooltip.scale.set(1);
        this.addChild(this.tooltip);
        this.stars.on('pointerover', function () { return _this.tooltip.alpha = 1; });
        this.stars.on('pointerout', function () { return _this.tooltip.alpha = 0; });
        this.stars.on('pointertap', function () {
            _this.tooltip.alpha = 1;
            Timer.start(4, function () { return _this.tooltip.alpha = 0; });
        });
    };
    EndContainer.prototype.resize = function (o) {
        var small_screen = App.width * App.height < 360000 || App.height < 640 || App.width < 900;
        var padding = small_screen ? 32 : 64;
        this.title.style.fontSize = small_screen ? 40 : 64;
        this.instructions.style.fontSize = small_screen ? 16 : 24;
        this.continue_text.style.fontSize = small_screen ? 16 : 24;
        if (o == EOrientation.LANDSCAPE && !small_screen) {
            this.left_block.scale.set(App.width / 2, App.height);
            this.bottom_block.scale.set(App.width, 80);
            this.bottom_block.position.set(0, App.height - 80);
            var illustration_scale = Math.min(Math.min(1, (App.width / 3) / 500), Math.min(1, (App.height) / 300));
            this.illustration.position.set(App.width * 0.75, App.height - 80);
            this.illustration.scale.set(illustration_scale);
            this.title.position.set(padding, padding + 16);
            this.title.style.wordWrapWidth = small_screen ? App.width / 2 - padding * 2 : 400;
            this.instructions.position.set(padding, this.title.position.y + this.title.height + padding * 0.5);
            this.instructions.style.wordWrapWidth = App.width / 2 - padding * 2;
            this.continue_text.anchor.set(0, 1);
            this.continue_text.position.set(padding, App.height - 64 - 80);
            this.continue_text.style.wordWrapWidth = App.width / 2 - padding * 2;
            this.stars.position.set(padding, this.instructions.y + this.instructions.height + padding / 2 + 20);
            this.stars.scale.set(1);
        }
        else {
            this.left_block.scale.set(App.width, App.height);
            this.bottom_block.scale.set(App.width, 80);
            this.bottom_block.position.set(0, App.height - 80);
            this.title.position.set(padding, padding);
            this.title.style.wordWrapWidth = small_screen ? App.width - padding * 2 : 400;
            this.instructions.position.set(padding, this.title.position.y + this.title.height + padding * 0.5);
            this.instructions.style.wordWrapWidth = App.width - padding * 2;
            if (App.height > 512) {
                this.continue_text.anchor.set(0, 1);
                this.continue_text.position.set(padding, App.height - 80 - padding);
            }
            else {
                this.continue_text.anchor.set(0, 0.5);
                this.continue_text.position.set(padding, App.height - 40);
            }
            this.continue_text.style.wordWrapWidth = App.width - padding * 2;
            this.stars.position.set(padding, this.instructions.y + this.instructions.height + padding / 2 + 20);
            this.stars.scale.set(0.5);
        }
        this.tooltip.position.set(padding, this.stars.y + padding);
    };
    return EndContainer;
}(PIXI.Container));
var GameManager = /** @class */ (function () {
    function GameManager() {
    }
    GameManager.start_game = function () {
        ScoreManager.init();
        GameManager.rounds = App.questions.slice();
        GameManager.round_container = new RoundContainer();
        GameManager.illustration_container = new IllustrationContainer();
        GameManager.question_box_colors = [Palette.Purple, Palette.Blue, Palette.Black];
        GameManager.response_container = new ResponseContainer();
        App.stage.addChild(GameManager.round_container);
        App.stage.addChild(GameManager.response_container);
        App.stage.addChild(GameManager.illustration_container);
        GameManager.next_round();
    };
    GameManager.correct = function (answer, response) {
        ScoreManager.answered_questions.push(GameManager.current_status_correct);
        GameManager.illustration_container.set_text(GameManager.round.question, answer, response);
        GameManager.illustration_container.set_sprite(GameManager.current_illo);
        for (var _i = 0, _a = GameManager.round_container.answers; _i < _a.length; _i++) {
            var answer_1 = _a[_i];
            answer_1.interactive = false;
        }
        GameManager.round_container.tracker.advance();
        TweenMax.to(GameManager.response_container, 0.25, { alpha: 0 });
        Timer.start(0.25, function () { return GameManager.round_container.transition_out(); });
        Timer.start(3, function () { return GameManager.illustration_container.transition_in(); });
    };
    GameManager.incorrect = function (response) {
        GameManager.current_status_correct = false;
        GameManager.round_container.stars.lose();
        GameManager.response_container.set_text(response);
        GameManager.response_container.alpha = 0;
        Timer.start(0.25, function () { return TweenMax.to(GameManager.response_container, 0.25, { alpha: 1 }); });
    };
    GameManager.get_question_color = function () {
        var color = GameManager.question_box_colors.shift();
        GameManager.question_box_colors.push(color);
        return color;
    };
    GameManager.next_round = function () {
        if (GameManager.rounds.length == 0) {
            GameManager.end_game();
            return;
        }
        App.app.on_resize();
        GameManager.current_status_correct = true;
        GameManager.round = GameManager.get_round();
        GameManager.round_container.set_question_text(GameManager.round.question);
        GameManager.round_container.set_answers(GameManager.round.answers);
        GameManager.current_illo = GameManager.round.illustration;
        GameManager.round_container.transition_in();
    };
    GameManager.get_round = function () {
        var round = GameManager.rounds.shift();
        var i = round.answers.length;
        while (round.answers.length > 4) {
            i--;
            if (!round.answers[i].correct)
                round.answers.splice(i, 1);
        }
        ArrayUtil.shuffle(round.answers);
        return round;
    };
    GameManager.end_game = function () {
        App.stage.addChild(new EndContainer());
    };
    return GameManager;
}());
var IllustrationContainer = /** @class */ (function (_super) {
    __extends(IllustrationContainer, _super);
    function IllustrationContainer() {
        var _this = _super.call(this) || this;
        _this.padding = 48;
        //this.sprite = PIXI.Sprite.fromImage(ArrayUtil.get_random(App.illustrations));
        _this.sprite = AnimationUtil.sprite_from_name('girl_jumping');
        _this.sprite.anchor.set(0.5);
        _this.sprite.alpha = 0;
        _this.question_text = new PIXI.Text('', Style.RefresherText);
        _this.question_text.alpha = 0;
        _this.answer_text = new PIXI.Text('', Style.RefresherText);
        _this.answer_text.style.fontWeight = 'bold';
        _this.answer_text.alpha = 0;
        _this.response_text = new PIXI.Text('', Style.ResponseText);
        _this.response_text.alpha = 0;
        _this.next_button = new Button(Palette.White, Palette.Black, new Vector(), 'Next >');
        _this.next_button.buttonMode = true;
        _this.next_button.on('pointertap', function () { return _this.transition_out(); });
        _this.next_button.alpha = 0;
        _this.black_bg = new PIXI.Graphics();
        _this.black_bg.beginFill(Palette.Black);
        _this.black_bg.drawRect(0, 0, 1, 1);
        _this.black_bg.endFill();
        _this.black_bg.pivot.set(1, 0);
        _this.blue_bg = new PIXI.Graphics();
        _this.blue_bg.beginFill(Palette.Blue);
        _this.blue_bg.drawRect(0, 0, 1, 1);
        _this.blue_bg.endFill();
        _this.blue_bg.pivot.set(1, 0);
        _this.addChild(_this.sprite);
        _this.addChild(_this.black_bg);
        _this.addChild(_this.question_text);
        _this.addChild(_this.answer_text);
        _this.addChild(_this.blue_bg);
        _this.addChild(_this.response_text);
        _this.addChild(_this.next_button);
        App.responsives.push(_this, _this, _this);
        _this.resize(App.orientation);
        return _this;
    }
    IllustrationContainer.prototype.transition_in = function () {
        var _this = this;
        TweenMax.to(this.black_bg.pivot, 0.5, { x: 0, ease: Expo.easeOut });
        TweenMax.to(this.blue_bg.pivot, 0.5, { x: 0, ease: Expo.easeOut });
        Timer.start(0.5, function () { return TweenMax.to(_this.blue_bg.pivot, 0.5, { y: 1, ease: Expo.easeOut }); });
        Timer.start(0.5, function () { return TweenMax.to(_this.question_text, 0.25, { alpha: 1 }); });
        Timer.start(0.5, function () { return TweenMax.to(_this.answer_text, 0.25, { alpha: 1 }); });
        Timer.start(0.75, function () { return TweenMax.to(_this.response_text, 0.25, { alpha: 1 }); });
        Timer.start(0.75, function () { return TweenMax.to(_this.sprite, 0.25, { alpha: 1 }); });
        Timer.start(1, function () { return TweenMax.to(_this.next_button, 0.25, { alpha: 1, onComplete: function () { return _this.next_button.interactive = true; } }); });
    };
    IllustrationContainer.prototype.transition_out = function () {
        var _this = this;
        this.next_button.interactive = false;
        Timer.start(0, function () { return TweenMax.to(_this.next_button, 0.25, { alpha: 0 }); });
        Timer.start(0.1, function () { return TweenMax.to(_this.sprite, 0.25, { alpha: 0 }); });
        Timer.start(0.2, function () { return TweenMax.to(_this.response_text, 0.25, { alpha: 0 }); });
        Timer.start(0.3, function () { return TweenMax.to(_this.answer_text, 0.25, { alpha: 0 }); });
        Timer.start(0.4, function () { return TweenMax.to(_this.question_text, 0.25, { alpha: 0 }); });
        Timer.start(0.5, function () { return TweenMax.to(_this.blue_bg.pivot, 0.5, { y: 0, ease: Expo.easeOut }); });
        Timer.start(1, function () { return TweenMax.to(_this.black_bg.pivot, 0.5, { x: 1, ease: Expo.easeOut }); });
        Timer.start(1, function () { return TweenMax.to(_this.blue_bg.pivot, 0.5, { x: 1, ease: Expo.easeOut }); });
        Timer.start(1.5, function () { return GameManager.next_round(); });
    };
    IllustrationContainer.prototype.set_text = function (question, answer, response) {
        this.question_text.text = this.get_question_number() + '\n' + question;
        this.answer_text.text = 'Answer: ' + answer;
        this.response_text.text = response;
        this.resize(App.orientation);
    };
    IllustrationContainer.prototype.get_question_number = function () {
        return ScoreManager.answered_questions.length < 10 ? '0' + ScoreManager.answered_questions.length : '' + ScoreManager.answered_questions.length;
    };
    IllustrationContainer.prototype.set_sprite = function (name) {
        //this.sprite.texture = PIXI.Texture.fromImage(path);
        this.sprite.textures = AnimationUtil.get_frames(AnimationUtil.frames_from_name(name));
        this.sprite.play();
        this.resize(App.orientation);
    };
    IllustrationContainer.prototype.resize = function (o) {
        var small_screen = App.width * App.height < 360000 || App.height < 640 || App.width < 900;
        this.response_text.style.fontSize = small_screen ? 24 : 36;
        this.black_bg.alpha = small_screen ? 0 : 1;
        if (o == EOrientation.LANDSCAPE && !small_screen) {
            this.black_bg.position.set(0, 0);
            this.black_bg.scale.set(App.width * 0.55, App.height);
            this.blue_bg.position.set(0, App.height);
            this.blue_bg.scale.set(App.width * 0.55, App.height - 240);
            this.question_text.position.set(this.padding, this.padding * 2);
            this.question_text.style.wordWrapWidth = App.width * 0.55 - this.padding * 2;
            this.answer_text.position.set(this.padding, this.question_text.position.y + this.question_text.height + 4);
            this.answer_text.style.wordWrapWidth = App.width * 0.55 - this.padding * 2;
            this.response_text.position.set(this.padding, 240 + this.padding * 2);
            this.response_text.style.wordWrapWidth = App.width * 0.55 - this.padding * 2;
            this.next_button.position.set(this.response_text.x, Math.min(this.response_text.y + this.response_text.height + this.padding * 2, App.height - this.padding * 2));
            var illustration_scale = Math.min(Math.min(1, (App.width * 0.45) / 600), Math.min(1, (App.height / 2) / 600));
            this.sprite.position.set(App.width * 0.45 * 0.5 + App.width * 0.55, App.height / 2);
            this.sprite.scale.set(illustration_scale);
        }
        else {
            this.blue_bg.position.set(0, App.height);
            this.blue_bg.scale.set(App.width, App.height);
            this.response_text.position.set(this.padding, this.padding);
            this.response_text.style.wordWrapWidth = App.width - this.padding * 2;
            this.next_button.position.set(this.response_text.x, App.height - this.padding - this.next_button.height / 2);
            this.sprite.scale.set();
        }
    };
    return IllustrationContainer;
}(PIXI.Container));
var IntroContainer = /** @class */ (function (_super) {
    __extends(IntroContainer, _super);
    function IntroContainer() {
        var _this = _super.call(this) || this;
        _this.illustration = AnimationUtil.sprite_from_name('intro');
        _this.illustration.animationSpeed = 0.2;
        _this.illustration.anchor.set(0.5, 1);
        _this.illustration.alpha = 0;
        _this.left_block = new PIXI.Graphics();
        _this.left_block.beginFill(Palette.Green);
        _this.left_block.drawRect(0, 0, 1, 1);
        _this.left_block.endFill();
        _this.left_block.pivot.x = 1;
        _this.bottom_block = new PIXI.Graphics();
        _this.bottom_block.beginFill(Palette.Black);
        _this.bottom_block.drawRect(0, 0, 1, 1);
        _this.bottom_block.endFill();
        _this.bottom_block.pivot.y = -1;
        _this.start_button = new Button(Palette.White, Palette.Black, new Vector(App.width * 0.75 - Style.Button.width / 2, App.height - 64 - Style.Button.height), 'Let’s get started.');
        _this.start_button.buttonMode = true;
        _this.start_button.on('pointertap', function () { return _this.on_exit(); });
        _this.start_button.alpha = 0;
        _this.start_button.pivot.y = _this.start_button.height;
        _this.title = new PIXI.Text('Ace the Asurion Story', Style.TitleText);
        _this.title.alpha = 0;
        _this.instructions = new PIXI.Text('', Style.InstructionsText);
        _this.instructions.alpha = 0;
        _this.addChild(_this.illustration);
        _this.addChild(_this.left_block);
        _this.addChild(_this.bottom_block);
        _this.addChild(_this.title);
        _this.addChild(_this.instructions);
        _this.addChild(_this.start_button);
        Timer.start(0.2, function () { return TweenMax.to(_this.bottom_block.pivot, 0.5, { y: 0, ease: Expo.easeOut }); });
        Timer.start(0.5, function () { return TweenMax.to(_this.left_block.pivot, 0.5, { x: 0, ease: Expo.easeOut }); });
        Timer.start(1, function () { return TweenMax.to(_this.title, 0.2, { alpha: 1 }); });
        Timer.start(1.2, function () { return TweenMax.to(_this.instructions, 0.2, { alpha: 1 }); });
        Timer.start(1.5, function () { return TweenMax.to(_this.illustration, 0.2, { alpha: 1 }); });
        Timer.start(2, function () { return TweenMax.to(_this.start_button, 0.2, { alpha: 1, onComplete: function () { return _this.start_button.interactive = true; } }); });
        App.responsives.push(_this);
        _this.resize(App.orientation);
        return _this;
    }
    IntroContainer.prototype.resize = function (o) {
        var small_screen = App.height < 640 || App.width < 900;
        var padding = small_screen ? 32 : 64;
        this.title.style.fontSize = small_screen ? 40 : 64;
        this.instructions.style.fontSize = small_screen ? 16 : 24;
        this.start_button.position.set(padding, small_screen ? App.height - (80 - this.start_button.height) / 2 : App.height - padding - 80);
        this.instructions.text = small_screen ?
            'We have made a commitment to our customers: We help make your life easier by unlocking the potential of technology. And it comes to life through our Experience Principles, which guide how we act and the decisions we make.\n\nTake this quick quiz to learn more about our Story and see how well you know our brand and business.' :
            'This is about our commitment to customers: We help make your life easier by unlocking the potential of technology.\n\nThis commitment comes to life through our three Experience Principles: Remarkably Human, Delightfully Simple and Actually Helpful. They guide how we act and the decisions we make to ensure our commitment rings true in every customer interaction.\n\nTake this quick quiz to learn more about the Asurion Story and see how well you know our brand and business.';
        if (o == EOrientation.LANDSCAPE && !small_screen) {
            this.left_block.scale.set(App.width / 2, App.height);
            this.bottom_block.scale.set(App.width, 80);
            this.bottom_block.position.set(0, App.height - 80);
            var illustration_scale = Math.min(Math.min(1, (App.width / 2) / 450), Math.min(1, (App.height - 80) / 700));
            this.illustration.position.set(App.width * 0.75, App.height - 80);
            this.illustration.scale.set(illustration_scale);
            this.title.position.set(padding, padding + 16);
            this.title.style.wordWrapWidth = small_screen ? App.width / 2 - padding * 2 : 400;
            this.instructions.position.set(padding, this.title.position.y + this.title.height + 32);
            this.instructions.style.wordWrapWidth = App.width / 2 - padding * 2;
            if (App.height - (this.instructions.y + this.instructions.height) < 200)
                this.start_button.position.y = App.height - (80 - this.start_button.height) / 2;
            if (App.height - 80 - this.instructions.y - this.instructions.height < padding)
                this.instructions.text = 'We have made a commitment to our customers: We help make your life easier by unlocking the potential of technology. And it comes to life through our Experience Principles, which guide how we act and the decisions we make.\n\nTake this quick quiz to learn more about our Story and see how well you know our brand and business.';
        }
        else {
            this.left_block.scale.set(App.width, App.height);
            this.bottom_block.scale.set(App.width, 80);
            this.bottom_block.position.set(0, App.height - 80);
            this.title.position.set(padding, padding);
            this.title.style.wordWrapWidth = small_screen ? App.width - padding * 2 : 400;
            this.instructions.position.set(padding, this.title.position.y + this.title.height + padding / 2);
            this.instructions.style.wordWrapWidth = App.width - padding * 2;
        }
    };
    IntroContainer.prototype.on_exit = function () {
        var _this = this;
        this.start_button.interactive = false;
        Timer.start(0, function () { return TweenMax.to(_this.title, 0.2, { alpha: 0 }); });
        Timer.start(0.1, function () { return TweenMax.to(_this.instructions, 0.2, { alpha: 0 }); });
        Timer.start(0.2, function () { return TweenMax.to(_this.start_button, 0.2, { alpha: 0 }); });
        Timer.start(0.25, function () { return TweenMax.to(_this.left_block.pivot, 0.2, { x: 1, ease: Expo.easeIn }); });
        Timer.start(0.5, function () { return TweenMax.to(_this.bottom_block.pivot, 0.2, { y: -1, ease: Expo.easeIn }); });
        Timer.start(1, function () { return TweenMax.to(_this.illustration, 0.5, { alpha: 0 }); });
        Timer.start(2, this.destroy);
    };
    IntroContainer.prototype.destroy = function () {
        GameManager.start_game();
        App.responsives.splice(App.responsives.indexOf(this), 1);
        //super.destroy();
    };
    return IntroContainer;
}(PIXI.Container));
var QuestionContainer = /** @class */ (function (_super) {
    __extends(QuestionContainer, _super);
    function QuestionContainer() {
        var _this = _super.call(this) || this;
        _this.make_bg();
        _this.make_text();
        App.responsives.push(_this);
        return _this;
    }
    QuestionContainer.prototype.make_bg = function () {
        this.bg = new PIXI.Graphics();
        this.addChild(this.bg);
        this.set_color(Palette.Blue);
    };
    QuestionContainer.prototype.make_text = function () {
        this.text = new PIXI.Text('', Style.QuestionText);
        this.text.anchor.set(0.5, 0);
        this.addChild(this.text);
        this.question_number = new PIXI.Text('', Style.RefresherText);
        this.question_number.style.fontSize = 14;
        this.question_number.anchor.set(0.5, 1);
        this.addChild(this.question_number);
    };
    QuestionContainer.prototype.set_color = function (color) {
        this.bg_color = color;
        this.bg.beginFill(color);
        this.bg.drawRect(0, 0, 1, 1);
        this.bg.endFill();
    };
    QuestionContainer.prototype.set_text = function (text) {
        this.text.text = text;
        this.question_number.text = this.get_question_number_text();
    };
    QuestionContainer.prototype.get_question_number_text = function () {
        var number = ScoreManager.answered_questions.length + 1;
        var zero = number < 10 ? '0' : '';
        return 'QUESTION ' + zero + number;
    };
    QuestionContainer.prototype.resize = function (o) {
        var small_screen = App.width * App.height < 360000 || App.height < 640 || App.width < 900;
        this.question_number.alpha = small_screen ? 0 : 1;
        this.bg.scale.set(App.width, Style.QuestionHeight);
        this.text.style.wordWrapWidth = App.width * 0.75;
        this.text.position.set(App.width / 2, Style.QuestionHeight * 0.6);
        this.question_number.position.set(App.width / 2, Style.QuestionHeight * 0.5);
    };
    return QuestionContainer;
}(PIXI.Container));
var QuestionText = /** @class */ (function (_super) {
    __extends(QuestionText, _super);
    function QuestionText(text) {
        var _this = _super.call(this, '', Style.QuestionText) || this;
        _this.position.set(App.width / 2, Style.QuestionHeight / 2);
        _this.anchor.set(0.5, 0.5);
        if (text)
            _this.set_text(text);
        App.responsives.push(_this);
        return _this;
    }
    QuestionText.prototype.set_text = function (text) {
        this.text = text;
    };
    QuestionText.prototype.resize = function (o) {
        this.style.wordWrapWidth = App.width * 0.75;
        this.position.set(App.width / 2, Style.QuestionHeight / 2);
    };
    return QuestionText;
}(PIXI.Text));
var ResponseContainer = /** @class */ (function (_super) {
    __extends(ResponseContainer, _super);
    function ResponseContainer() {
        var _this = _super.call(this) || this;
        _this.text = new PIXI.Text('', Style.ResponseBoxText);
        _this.text.anchor.set(0.5, 0);
        _this.text.position.set(256, 16);
        _this.addChild(_this.text);
        _this.pivot.x = 256;
        _this.alpha = 0;
        App.responsives.push(_this);
        _this.resize(App.orientation);
        return _this;
    }
    ResponseContainer.prototype.set_text = function (msg) {
        this.text.text = msg;
        this.clear();
        this.lineStyle(3, GameManager.round_container.background.tint);
        this.beginFill(Palette.White);
        this.drawRoundedRect(0, 0, 512, this.text.height + 32, 12);
        this.endFill();
        this.lineStyle();
        this.text.position.set(256, 16);
        this.resize(App.orientation);
    };
    ResponseContainer.prototype.resize = function (o) {
        this.pivot.y = this.height;
        this.scale_amt = GameManager.round_container.answers[0].width / 512;
        this.position.set(App.width / 2, GameManager.round_container.background.scale.y - 24 * this.scale_amt);
        this.scale.set(this.scale_amt);
    };
    return ResponseContainer;
}(PIXI.Graphics));
var RoundContainer = /** @class */ (function (_super) {
    __extends(RoundContainer, _super);
    function RoundContainer() {
        var _this = _super.call(this) || this;
        _this.answers = [];
        _this.padding = 16;
        _this.background = new PIXI.Graphics();
        _this.tracker = new Tracker();
        _this.stars = new StarContainer();
        _this.question_number = new PIXI.Text('', Style.QuestionNumberText);
        _this.question_number.anchor.set(0.5, 1);
        _this.question = new PIXI.Text('', Style.QuestionText);
        _this.question.anchor.set(0.5, 1);
        for (var i = 0; i < 4; i++)
            _this.answers.push(new Answer());
        _this.background.beginFill(0xFFFFFF);
        _this.background.drawRect(0, 0, 1, 1);
        _this.background.endFill();
        _this.background.pivot.y = 1;
        _this.addChild(_this.background);
        _this.addChild(_this.tracker);
        _this.addChild(_this.stars);
        _this.addChild(_this.question_number);
        _this.addChild(_this.question);
        for (var i = 0; i < 4; i++)
            _this.addChild(_this.answers[i]);
        App.responsives.push(_this);
        _this.resize(App.orientation);
        return _this;
    }
    RoundContainer.prototype.set_bg_color = function (color) {
        this.background.tint = color;
    };
    RoundContainer.prototype.set_question_text = function (text) {
        this.question.text = text;
        var question_number = ScoreManager.answered_questions.length + 1;
        var question_number_string = question_number >= 10 ? '' + question_number : '0' + question_number;
        this.question_number.text = 'QUESTION ' + question_number_string;
        this.resize(App.orientation);
    };
    RoundContainer.prototype.set_answers = function (options) {
        for (var i = 0; i < 4; i++) {
            var answer = this.answers[i];
            answer.text.text = options[i].text;
            answer.response = options[i].response;
            answer.correct = options[i].correct;
        }
    };
    RoundContainer.prototype.transition_in = function () {
        var _this = this;
        this.background.tint = GameManager.get_question_color();
        TweenMax.to(this.background.pivot, 0.4, { y: 0, ease: Expo.easeOut });
        var _loop_2 = function (i) {
            Timer.start(1 + (4 - i) * 0.1, function () { return _this.answers[i].transition_in(); });
        };
        for (var i = 0; i < 4; i++) {
            _loop_2(i);
        }
    };
    RoundContainer.prototype.transition_out = function () {
        var _this = this;
        Timer.start(1, function () { return TweenMax.to(_this.background.pivot, 0.4, { y: 1, ease: Expo.easeIn }); });
        var _loop_3 = function (i) {
            Timer.start(this_1.answers[i].correct ? 2 : 1.25 + i * 0.1, function () { return _this.answers[i].transition_out(); });
        };
        var this_1 = this;
        for (var i = 0; i < 4; i++) {
            _loop_3(i);
        }
    };
    RoundContainer.prototype.resize = function (o) {
        var small_screen = App.width * App.height < 360000 || App.height < 640 || App.width < 960;
        this.position_answers(small_screen);
        var bg_height = App.height - (Math.floor(4 / this.answers_per_row)) * (this.answers[0].height + this.padding) - this.padding;
        this.background.scale.set(App.width, bg_height);
        this.question.style.fontSize = small_screen ? 18 : 40;
        this.question.style.wordWrapWidth = App.width * 0.8;
        this.question.position.set(App.width / 2, this.stars.stars[0].y + (bg_height - this.stars.stars[0].y) / 2 + this.question.height / 2);
        this.question_number.position.set(App.width / 2, this.question.y - this.question.height - this.padding);
        this.question_number.scale.set(small_screen ? 0 : 1);
    };
    RoundContainer.prototype.position_answers = function (mobile) {
        for (var i = 0; i < 4; i++) {
            var answer = this.answers[i];
            mobile ? answer.scale.set(0.5) : answer.scale.set(0.75);
            if (App.height < answer.height * 4 + this.padding * 5)
                answer.scale.set(0.42);
            if (App.width > answer.width * 4 + this.padding * 7)
                this.answers_per_row = 4;
            else if (App.width > answer.width * 2 + this.padding * 5)
                this.answers_per_row = 2;
            else
                this.answers_per_row = 1;
            var row = Math.floor(i / this.answers_per_row);
            var column = i % this.answers_per_row;
            var pos = this.get_answer_pos(row, column, this.answers_per_row);
            answer.position.set(pos.x, pos.y);
        }
    };
    RoundContainer.prototype.get_answer_pos = function (row, col, apr) {
        var out = { x: 0, y: 0 };
        var refa = this.answers[0];
        var start_x = 0;
        var start_y = App.height - refa.height - this.padding;
        if (apr == 1)
            start_x = App.width / 2 - refa.width / 2;
        else if (apr == 2)
            start_x = App.width / 2 - refa.width - this.padding / 2;
        else if (apr == 4)
            start_x = App.width / 2 - refa.width * 2 - this.padding * 1.5;
        out.x = start_x + col * (refa.width + this.padding) + refa.width / 2;
        out.y = start_y - row * (refa.height + this.padding) + refa.height / 2;
        return out;
    };
    return RoundContainer;
}(PIXI.Container));
var Answer = /** @class */ (function (_super) {
    __extends(Answer, _super);
    function Answer() {
        var _this = _super.call(this) || this;
        /*this.lineStyle(2, Palette.DarkGrey);
        this.beginFill(0xFFFFFF);
        this.drawRoundedRect(0, 0, 576, 128, 32);
        this.endFill();
        this.lineStyle();*/
        _this.bg = new PIXI.Graphics();
        _this.bg.beginFill(Palette.Green);
        _this.bg.drawRect(4, 4, 568, 120);
        _this.bg.endFill();
        _this.box = PIXI.Sprite.fromImage('images/answer_box_base_576_128.png');
        _this.crack = PIXI.Sprite.fromImage('images/answer_box_crack_576_128.png');
        _this.crack.anchor.set(0.5);
        _this.crack.position.set(288, 64);
        _this.crack.alpha = 0;
        _this.text = new PIXI.Text('', Style.AnswerText);
        _this.text.anchor.set(0.5);
        _this.text.position.set(288, 60);
        _this.buttonMode = true;
        _this.on('pointertap', function () { return _this.on_click(); });
        _this.alpha = 0;
        _this.bg.alpha = 0;
        _this.pivot.set(288, 64);
        _this.addChild(_this.bg);
        _this.addChild(_this.text);
        _this.addChild(_this.crack);
        _this.addChild(_this.box);
        return _this;
    }
    Answer.prototype.reset = function () {
        this.interactive = true;
        this.rotation = 0;
        this.bg.alpha = 0;
        this.crack.alpha = 0;
        this.text.alpha = 1;
    };
    Answer.prototype.on_click = function () {
        this.interactive = false;
        this.correct ? this.correct_input() : this.incorrect_input();
    };
    Answer.prototype.correct_input = function () {
        TweenMax.to(this.bg, 0.2, { alpha: 1 });
        GameManager.correct(this.text.text, this.response);
    };
    Answer.prototype.incorrect_input = function () {
        this.crack.scale.set(Math.random() > 0.5 ? -1 : 1, Math.random() > 0.5 ? -1 : 1);
        this.crack.alpha = 1;
        this.text.alpha = 0.3;
        this.rotation = Math.random() * 0.1 - 0.05;
        GameManager.incorrect(this.response);
    };
    Answer.prototype.transition_in = function () {
        this.reset();
        TweenMax.to(this.pivot, 0.4, { y: 64, ease: Expo.easeOut });
        TweenMax.to(this, 0.4, { alpha: 1 });
    };
    Answer.prototype.transition_out = function () {
        TweenMax.to(this.pivot, 0.4, { y: -this.height * 2, ease: Expo.easeIn });
        TweenMax.to(this, 0.4, { alpha: 0 });
    };
    return Answer;
}(PIXI.Container));
var ScoreManager = /** @class */ (function () {
    function ScoreManager() {
    }
    ScoreManager.init = function () {
        ScoreManager.answered_questions = [];
    };
    ScoreManager.get_ratio = function () {
        var out = {
            correct: 0,
            total: 0
        };
        for (var _i = 0, _a = this.answered_questions; _i < _a.length; _i++) {
            var q = _a[_i];
            out.total++;
            if (q)
                out.correct++;
        }
        return out;
    };
    return ScoreManager;
}());
var StarContainer = /** @class */ (function (_super) {
    __extends(StarContainer, _super);
    function StarContainer() {
        var _this = _super.call(this) || this;
        _this.stars = [];
        for (var i = 0; i < 3; i++) {
            var star = new Star();
            star.anchor.set(0.5);
            star.star_position = i;
            star.add_tooltip();
            _this.stars.push(star);
            _this.addChild(star);
            App.responsives.push(star);
        }
        _this.init();
        for (var _i = 0, _a = _this.stars; _i < _a.length; _i++) {
            var star = _a[_i];
            star.resize(0);
        }
        return _this;
    }
    StarContainer.prototype.init = function () {
        this.counter = 3;
        this.star_filled = PIXI.Texture.fromImage('images/star_filled.png');
        this.star_empty = PIXI.Texture.fromImage('images/star_empty.png');
        for (var i = 0; i < 3; i++)
            this.stars[i].texture = this.star_filled;
    };
    StarContainer.prototype.lose = function () {
        if (this.counter == 0)
            return false;
        this.counter--;
        this.stars[this.counter].texture = this.star_empty;
        var star = new Star(PIXI.Texture.fromImage('images/star_filled.png'));
        star.anchor.set(0.5);
        star.star_position = this.stars[this.counter].star_position;
        star.resize(App.orientation);
        this.addChild(star);
        TweenMax.to(star.scale, 0.5, { x: 1.25, y: 1.25, ease: Expo.easeOut });
        TweenMax.to(star, 0.5, { alpha: 0 });
        Timer.start(0.6, function () { return star.destroy(); });
        return true;
    };
    return StarContainer;
}(PIXI.Container));
var Star = /** @class */ (function (_super) {
    __extends(Star, _super);
    function Star() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Star.prototype.add_tooltip = function () {
        var tooltip = new Tooltip('See if you can get through this quiz without losing the three stars.', new Vector(this.star_position * 160 - 480, 100));
        this.interactive = true;
        this.addChild(tooltip);
        this.on('pointerover', function () { return tooltip.alpha = 1; });
        this.on('pointertap', function () {
            tooltip.alpha = 1;
            Timer.start(4, function () { return tooltip.alpha = 0; });
        });
        this.on('pointerout', function () { return tooltip.alpha = 0; });
    };
    Star.prototype.resize = function (o) {
        var small_screen = App.width * App.height < 360000 || App.height < 640 || App.width < 960;
        var scale = small_screen ? 0.2 : 0.4;
        var padding = small_screen ? 32 : 64;
        this.scale.set(scale);
        this.position.set(App.width / 2 + padding - this.star_position * padding, this.height * 0.5 + 64);
    };
    return Star;
}(PIXI.Sprite));
var Tooltip = /** @class */ (function (_super) {
    __extends(Tooltip, _super);
    function Tooltip(msg, offset) {
        var _this = _super.call(this) || this;
        var text = new PIXI.Text(msg, Style.TooltipText);
        text.position.set(16, 16);
        _this.beginFill(0xFFFFFF);
        _this.drawRect(0, 0, text.width + 32, text.height + 32);
        _this.endFill();
        _this.addChild(text);
        _this.alpha = 0;
        _this.scale.set(2);
        _this.position.set(offset.x, offset.y);
        return _this;
    }
    return Tooltip;
}(PIXI.Graphics));
var Tracker = /** @class */ (function (_super) {
    __extends(Tracker, _super);
    function Tracker() {
        var _this = _super.call(this) || this;
        _this.h = 8;
        _this.padding = 64;
        _this.beginFill(0xFFFFFF, 0.25);
        _this.drawRect(0, 0, 1, _this.h);
        _this.endFill();
        _this.progress_bar = new PIXI.Graphics();
        _this.progress_bar.beginFill(0xFFFFFF);
        _this.progress_bar.drawRect(0, 0, 1, _this.h);
        _this.progress_bar.scale.x = 0;
        _this.addChild(_this.progress_bar);
        _this.position.set(0, 64);
        _this.advance_amt = 1 / App.questions.length;
        _this.pivot.set(0.5, 0);
        _this.resize(App.orientation);
        App.responsives.push(_this);
        return _this;
    }
    Tracker.prototype.advance = function () {
        TweenMax.to(this.progress_bar.scale, 0.25, { x: this.progress_bar.scale.x + this.advance_amt });
    };
    Tracker.prototype.resize = function (o) {
        this.position.set(App.width / 2, 32);
        this.scale.x = App.width - this.padding * 2;
    };
    return Tracker;
}(PIXI.Graphics));
var AnimationUtil = /** @class */ (function () {
    function AnimationUtil() {
    }
    AnimationUtil.get_sprite = function (frames) {
        var f = this.get_frames(frames);
        var sprite = new PIXI.extras.AnimatedSprite(f);
        sprite.animationSpeed = 0.08;
        sprite.play();
        return sprite;
    };
    AnimationUtil.get_frames = function (frames) {
        var f = [];
        for (var i = 0; i < frames.length; i++)
            f.push(PIXI.Texture.fromImage('images/illustrations/' + frames[i] + '.png'));
        return f;
    };
    AnimationUtil.sprite_from_name = function (name) {
        return this.get_sprite(this.frames_from_name(name));
    };
    AnimationUtil.frames_from_name = function (name) {
        switch (name) {
            case 'intro': return [31, 31, 31, 31, 31, 31, 31, 32, 33, 33, 33, 34, 35, 35, 35, 35, 35, 35, 35, 34, 33, 33, 33, 32];
            case 'outro': return [50, 51, 52];
            case 'army_knife': return [14, 13, 15, 13];
            case 'expert_puzzle': return [28, 29, 30, 29];
            case 'girl_jumping': return [7, 8, 9, 8];
            case 'heart': return [4, 5, 6, 6, 5];
            case 'helpful_expert': return [19, 20, 21, 20];
            case 'people_celebrate': return [1, 2, 3];
            case 'stairs': return [22, 23, 24];
            case 'light_bulb': return [16, 17, 18];
            case 'tech_heart': return [1, 2, 3];
            case 'tech_pit_crew': return [25, 26, 27, 26];
            case 'zen': return [10, 11, 12, 11];
            default: return [1, 2, 3];
        }
    };
    return AnimationUtil;
}());
var ArrayUtil = /** @class */ (function () {
    function ArrayUtil() {
    }
    ArrayUtil.shuffle = function (arr) {
        var currentIndex = arr.length;
        var temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = arr[currentIndex];
            arr[currentIndex] = arr[randomIndex];
            arr[randomIndex] = temporaryValue;
        }
        return arr;
    };
    ArrayUtil.get_random = function (arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    };
    return ArrayUtil;
}());
var Palette = /** @class */ (function () {
    function Palette() {
    }
    Palette.White = 0xFFFFFF;
    Palette.Black = 0x000000;
    Palette.Purple = 0x8223D2;
    Palette.Blue = 0x647DE1;
    Palette.Green = 0x6EFAC3;
    Palette.Yellow = 0xD2FA46;
    Palette.DarkGrey = 0x333F48;
    Palette.MediumGrey = 0xA5AAAF;
    Palette.LightGrey = 0xE6E6EB;
    return Palette;
}());
var Style = /** @class */ (function () {
    function Style() {
    }
    Style.main_font = 'Apercu';
    Style.Answer = {
        width: 400,
        height: 200,
        pad: 32
    };
    Style.Button = {
        width: 200,
        height: 48
    };
    Style.TitleText = {
        fontFamily: Style.main_font,
        fontSize: 64,
        fill: Palette.Black,
        wordWrap: true
    };
    Style.InstructionsText = {
        fontFamily: Style.main_font,
        fontSize: 24,
        fill: Palette.Black,
        wordWrap: true
    };
    Style.ResponseText = {
        fontFamily: Style.main_font,
        fontSize: 36,
        fill: Palette.White,
        wordWrap: true
    };
    Style.RefresherText = {
        fontFamily: Style.main_font,
        fontSize: 18,
        fill: Palette.White,
        wordWrap: true
    };
    Style.AnswerText = {
        fontFamily: Style.main_font,
        fontSize: 28,
        align: 'center',
        fill: Palette.Black,
        wordWrap: true,
        wordWrapWidth: 512
    };
    Style.TooltipText = {
        fontFamily: Style.main_font,
        fontSize: 18,
        align: 'left',
        fill: Palette.Black,
        wordWrap: true,
        wordWrapWidth: 300
    };
    Style.ResponseBoxText = {
        fontFamily: Style.main_font,
        fontSize: 20,
        align: 'left',
        fill: Palette.Black,
        wordWrap: true,
        wordWrapWidth: 480
    };
    Style.QuestionText = {
        align: 'center',
        fontFamily: Style.main_font,
        fontSize: 40,
        fill: Palette.White,
        wordWrap: true
    };
    Style.QuestionNumberText = {
        align: 'center',
        fontFamily: Style.main_font,
        fontSize: 16,
        fill: Palette.White,
        wordWrap: true
    };
    Style.ButtonText = {
        align: 'center',
        fontFamily: Style.main_font,
        fontSize: 20,
        fill: Palette.Black,
    };
    return Style;
}());
var Timer = /** @class */ (function () {
    function Timer() {
    }
    Timer.start = function (time, callback) {
        TweenMax.to({ n: 0 }, time, { n: 0, onComplete: function () { return callback(); } });
    };
    return Timer;
}());
var Vector = /** @class */ (function () {
    function Vector(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.set(x, y);
    }
    Vector.prototype.set = function (x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
        return this;
    };
    Vector.prototype.copy = function (v) {
        return this.set(v.x, v.y);
    };
    Vector.prototype.clone = function () {
        return new Vector(this.x, this.y);
    };
    Vector.prototype.add = function (v) {
        return this.set(this.x + v.x, this.y + v.y);
    };
    Vector.prototype.subtract = function (v) {
        return this.set(this.x - v.x, this.y - v.y);
    };
    Vector.prototype.multiply = function (v) {
        return this.set(this.x * v.x, this.y * v.y);
    };
    Vector.prototype.divide = function (v) {
        return this.set(this.x / v.x, this.y / v.y);
    };
    Vector.prototype.scale = function (s) {
        return this.set(this.x * s, this.y * s);
    };
    Vector.prototype.normalize = function () {
        var len = this.length;
        if (len <= 0)
            return this;
        this.x /= len;
        this.y /= len;
        return this;
    };
    Vector.prototype.to_string = function () {
        return "{ " + this.x + ", " + this.y + " }";
    };
    Vector.prototype.equals = function (v) {
        return this.x == v.x && this.y == v.y;
    };
    Object.defineProperty(Vector.prototype, "xx", {
        get: function () {
            return new Vector(this.x, this.x);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "yy", {
        get: function () {
            return new Vector(this.y, this.y);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "length", {
        get: function () {
            return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
        },
        set: function (len) {
            this.set(Math.cos(this.angle) * len, Math.sin(this.angle) * len);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "angle", {
        get: function () {
            return Math.atan2(this.y, this.x);
        },
        set: function (ang) {
            this.set(Math.cos(ang) * this.length, Math.sin(ang) * this.length);
        },
        enumerable: true,
        configurable: true
    });
    Vector.distance = function (a, b) {
        return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
    };
    Vector.dot = function (a, b) {
        return a.x * b.x + a.y * b.y;
    };
    Vector.cross = function (a, b) {
        return a.x * b.y - a.y * b.x;
    };
    return Vector;
}());
