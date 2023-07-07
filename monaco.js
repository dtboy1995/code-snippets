monaco.editor.defineTheme("myCustomTheme", {
	base: "vs", // can also be vs-dark or hc-black
	inherit: true, // can also be false to completely replace the builtin rules
	rules: [
		{
			foreground: "8959a8",
			token: "",
		},
		{
			foreground: "8959a8",
			token: "keyword",
		},
		{
			token: "identifier",
		},
		{
			foreground: "8e908c",
			token: "comment",
		},
		{
			token: 'comment.doc',
			foreground: '4271ae'
		},
		{
			foreground: "718c00",
			token: "string",
		},
		{
			foreground: "3e999f",
			token: "string.escape",
		},
		{
			foreground: "666969",
			token: "class",
		},
		{
			foreground: "f5871f",
			token: "number",
		},
		{
			token: 'number.hex',
			foreground: 'f5871f',
		},
		{
			foreground: "c82829",
			token: "regexp",
		},
		{
			foreground: "3e999f",
			token: "regexp.escape",
		},
		{
			token: 'type',
			foreground: 'c82829'
		},
		{
			token: 'delimiter',
			foreground: '3e999f'
		},
		{
			token: "delimiter.parenthesis",
			foreground: "606266"
		},
		{
			token: "delimiter.square",
			foreground: "606266"
		},
		{
			token: "delimiter.bracket",
			foreground: "4271ae"
		},
		{
			token: 'function.call',
			foreground: '4271ae'
		},
		{
			token: 'class.constructor',
			foreground: '3e999f'
		},
	],
	colors: {
		"editor.foreground": "#000000",
	},
});

let customTokenizer = {
	keywords: [

	],
	tokenizer: {
		root: [
			{ include: 'mongodb' }
		],
		mongodb: [
			[/\b(find|sort)\s*(?=\()/, 'function.call'],
			[/\b(constructor)\s*(?=\()/, 'class.constructor'],
		]
	},
}

let languages = monaco.languages.getLanguages();
languages.find(({ id }) => id === 'javascript')
	.loader()
	.then(({ language: jsLang }) => {
		for (let key in customTokenizer) {
			const value = customTokenizer[key];
			if (key === 'tokenizer') {
				for (let category in value) {
					const tokenDefs = value[category];
					if (!jsLang.tokenizer.hasOwnProperty(category)) {
						jsLang.tokenizer[category] = [];
					}
					if (Array.isArray(tokenDefs)) {
						jsLang.tokenizer[category].unshift.apply(jsLang.tokenizer[category], tokenDefs)
					}
				}
			} else if (Array.isArray(value)) {
				if (!jsLang.hasOwnProperty(key)) {
					jsLang[key] = [];
				}
				jsLang[key].unshift.apply(jsLang[key], value)
			}
		}
	})

function init() {
	monaco.editor.create(document.getElementById("container"), {
		value: getCode(),
		language: "javascript",
		theme: "myCustomTheme",
		fontFamily: 'Hack',
		fontSize: 14,
	});
}

init()

function getCode() {
	return `db.values.find({})
    .projection({})
    .sort({ _id: -1 })
    .limit(100)

let a = 'string'
let b = 01000
let c = 0x11
let d = function() {
    return a + b
}
// comment 
/**
 * 
 * 
*/
let e = () => {
    return /regex\s+100/
}
class A {
    constructor(a, b) {
        this.a = a
        this.b = b
    }
}
`;
}
