# PDFy

This is the source code for [PDFy](https://pdf.yt/).

## Setup

1. Use nvm to install node 14
2. ./setup.sh
3. npm install knex@0.7.6 coffee-script --global
4. npx knex migrate:latest
5. npx tsc
6. node bin/www.js
7. curl -F 'file=@/path/to/a/pdf' -F 'visibility=public' http://localhost:3000/upload
8. ??? (I'm trying, I really am, but this might not be the whole story)
9. PROFIT!

## License

[WTFPL](http://www.wtfpl.net/txt/copying/) or [CC0](https://creativecommons.org/publicdomain/zero/1.0/), whichever you prefer.

Note: lib/connect-busboy/connect-busboy.js is from an external project, and is MIT licensed.