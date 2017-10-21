src = src/main.js
out_js = out/decalendar.js
out_min_js = out/decalendar.min.js
out_css = out/decalendar.css
out_min_css = out/decalendar.min.css

.PHONY: all browserify watch uglify clean

all: browserify uglify

browserify:
	browserify $(src) -o $(out_js)

watch:
	watchify $(src) -o $(out_js)

uglify:
	uglify -s $(out_js) -o $(out_min_js)
	uglifycss $(out_css) > $(out_min_css)

clean:
	rm out/*.js
