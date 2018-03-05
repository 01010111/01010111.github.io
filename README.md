# 01010111 - the website

## the website for 01010111 - the person.

This is my personal website. I want it to accomplish several goals:

- Push people to other places like my itch site, etc.
- Be very accessible
- Be easy to update

Where's all them games dude? You might ask. They are on my [itch page](http://01010111.itch.io). That's where they live.

This website is stupid! You might say. No, you're stupid. Let me tell you how cool this website is.

- All of the pages live in the `pages` directory. That's where they live. The root `index.html` just immediately redirects to `pages/index.html`.
- All pages have an associated markdown file. They're all in the `md` directory. That's where they live. All of this site's content is in markdown. That means I can update it without feeling like I have to update a _website_.
- In addition to a markdown parsing file and a code highlighting file (see dependencies), This site uses `site.js` to build all of the pages from scratch.

Just look at how stupid this is, this is the markup for `pages/index.html`:

```html
<!doctype html>

<html>

    <head>
		<script src='../js/site.js'></script>
		<script>Site.get_head();</script>
	</head>
	
    <body>
		<script>Site.get_content('index')</script>
	</body>
	
</html>
```

Look how stupid that is.

In fact, if I'm feeling so stupid that I don't want to have to remember all of that when creating new pages, I can just run `Util.generate_html()` and it'll poop out some text I can copy. Like ok, say I want to make a page for my vacation pics. I have a markdown file that has all the images listed in it called `vacation_pics`, so I just create `vacation_pics.html`, then on any page of my site I just run `Util.generate_html('My Vacation Pics', 'vacation_pics', 'index')` and out pops:

```html
<!doctype html>

<html>

	<head>
		<script src='../js/site.js'></script>
		<script>Site.get_head('My Vacation Pics');</script>
	</head>
	
	<body>
		<script>Site.get_nav('< ', 'index');</script>
		<script>Site.get_content('vacation_pics')</script>
	</body>
	
</html>
```

wow.

You might still be thinking "Wow this is stupid." Yeah, this site could be made with any number of crazy technologies like React or Angular or whatever, but I don't want to deal with that. I'm already dealing with:

## Dependencies

- [marked.js](https://github.com/markedjs/marked) for parsing markdown into html
- [highlight.js](https://highlightjs.org/) for styling code snippets

## Browser compatibility

Hi I am a human living in 2018. My website is compatible with **THE NEWEST CHROME AND NOTHING ELSE**. Please respect my time as a creator and don't complain that this website doesn't work in some weird browser you found on the darknet that won't run javascript because you're _so cool_. If you're using some funny old browser like IE9, please tell your boss to upgrade your computer because ✨you deserve it✨