src = src/main.js
out_js = out/decalendar.js
out_min_js = out/decalendar.min.js

.PHONY: all browserify watch uglify clean

all: browserify uglify

browserify:
	browserify $(src) -o $(out_js)

watch:
	watchify $(src) -o $(out_js)

uglify:
	uglify -s $(out_js) -o $(out_min_js)

clean:
	rm out/*.js
