module.exports = {
    HTML: (title, list, body, control) => {
        return `<!doctype html>
                    <html>
                    <head>
                        <title>WEB2 - ${title}</title>
                        <meta charset="utf-8">
                    </head>
                    <body>
                        <h1><a href="/">WEB</a></h1>
                        ${list}
                        ${control}
                        ${body}
                    </body>
                    </html>
                    `;
    },
    list: (list_type, filelist) => {
        var list = `<${list_type}>`;
        for (var i = 0; i < filelist.length; ++i) {
            list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
        }
        list += `</${list_type}>`;

        return list;
    }
}
