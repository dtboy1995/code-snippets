<template>
  <div class="editor-box">
    <div class="editor" ref="editor" :style="{ height: height }"></div>
  </div>
</template>

<script>
import * as monaco from "monaco-editor";

import es2020 from "!!raw-loader!./lib.es2020.full.d.ts";
import mongo from "!!raw-loader!./mongo-shell.d.ts";

monaco.languages.registerCompletionItemProvider("javascript", {
  provideCompletionItems() {
    return {
      suggestions: [
        {
          label: "$weight",
          kind: monaco.languages.CompletionItemKind["Variable"],
          insertText: "$weight",
          detail: "重量",
        },
        {
          label: "$length",
          kind: monaco.languages.CompletionItemKind["Variable"],
          insertText: "$length",
          detail: "长度",
        },
        {
          label: "$width",
          kind: monaco.languages.CompletionItemKind["Variable"],
          insertText: "$width",
          detail: "宽度",
        },
        {
          label: "$height",
          kind: monaco.languages.CompletionItemKind["Variable"],
          insertText: "$height",
          detail: "高度",
        },
      ],
    };
  },
  triggerCharacters: ["$"],
});

monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
  allowNonTsExtensions: true,
  noLib: true,
});

monaco.languages.typescript.javascriptDefaults.addExtraLib(
  es2020,
  "./lib.es2020.full.d.ts"
);

monaco.languages.typescript.javascriptDefaults.addExtraLib(
  mongo,
  "./mongo-shell.d.ts"
);

monaco.languages.registerCompletionItemProvider("javascript", {
  triggerCharacters: [".", "$", "'", '"'],
  provideCompletionItems: function (model, position) {
    var textUntilPosition = model.getValueInRange({
      startLineNumber: 1,
      startColumn: 1,
      endLineNumber: position.lineNumber,
      endColumn: position.column,
    });
    let word = model.getWordUntilPosition(position);
    let range = {
      startLineNumber: position.lineNumber,
      endLineNumber: position.lineNumber,
      startColumn: word.startColumn,
      endColumn: word.endColumn,
    };
    return {
      suggestions: [
        {
          label: {
            label: "users",
            detail: "",
            description: "集合",
          },
          kind: monaco.languages.CompletionItemKind.Snippet,
          documentation: {
            value: `用户表`,
          },
          insertText: `getCollection('users')`,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range: range,
        },
        {
          label: {
            label: "created_at",
            detail: "",
            description: "字段",
          },
          kind: monaco.languages.CompletionItemKind.Field,
          documentation: {
            value: `created_at`,
          },
          insertText: `created_at: \${1:}`,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range: range,
        },
        {
          label: {
            label: "$created_at",
            detail: "",
            description: "字段",
          },
          kind: monaco.languages.CompletionItemKind.Variable,
          insertText: "$created_at",
        },
        {
          label: {
            label: "$dateToString",
            detail: "",
            description: "字段",
          },
          kind: monaco.languages.CompletionItemKind.Snippet,
          documentation: {
            value: `$dateToString`,
          },
          insertText: `\\$dateToString: { 
            format: "\${1:%Y-%m-%d}", 
            date: "\${2:$date}" ,
            //timezone: "+08:00",
            //onNull:"unspecified",
          }`,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range: range,
        },
        {
          label: {
            label: "group",
            detail: "",
            description: "代码片段",
          },
          kind: monaco.languages.CompletionItemKind.Snippet,
          documentation: {
            value: `group`,
          },
          insertText: `group({
      _id: \${1:}
})`,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range: range,
        },
      ],
    };
  },
});

monaco.editor.defineTheme("myCustomTheme", {
	base: "vs",
	inherit: true,
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
	],
	colors: {
		"editor.foreground": "#4D4D4C",
		"editor.background": "#FFFFFF",
		"editor.selectionBackground": "#D6D6D6",
		"editor.lineHighlightBackground": "#EFEFEF",
		"editorCursor.foreground": "#AEAFAD",
		"editorWhitespace.foreground": "#D1D1D1",
	},
});
export default {
  props: {
    height: {
      type: String,
      default: "400",
    },
    code: {
      type: String,
      default: "",
    },
    language: {
      type: String,
      default: "javascript", //'json'
    },
  },
  data() {
    return {
      editor: null,
    };
  },
  mounted() {
    this.initEditor();
  },
  created() {},
  beforeDestory() {},
  methods: {
    initEditor() {
      this.editor = monaco.editor.create(
        this.$refs.editor,
        {
          fontSize: 16,
          language: this.language,
          contextmenu: false,
          value: this.code,
          theme: "myCustomTheme",
          fontFamily:
            'Consolas, Monaco, 微软雅黑, Menlo, "Ubuntu Mono", source-code-pro, monospace',
          folding: true,
          foldingStrategy: "indentation", // 代码可分小段折叠
          automaticLayout: true, // 自适应布局
          overviewRulerBorder: false, // 不要滚动条的边框
          scrollBeyondLastLine: false, // 取消代码后面一大段空白
          minimap: {
            enabled: false,
          },
        },
        {
          storageService: {
            get() {},
            remove() {},
            getBoolean(key) {
              if (key === "expandSuggestionDocs") {
                return true;
              }
              return false;
            },
            store() {},
            onWillSaveState() {},
            onDidChangeStorage() {},
          },
        }
      );
      this.editor.onDidChangeModelContent((e) => {
        this.$nextTick(() => {
          this.$emit("update:code", this.editor.getValue());
        });
      });

      if (this.language === "javascript") {
      }
    },
    getCode() {
      this.editor.getValue();
    },
    setCode(code) {
      this.editor.setValue(code);
    },
    dispose() {
      this.editor.dispose();
    },
  },
};
</script>

<style lang="scss" scoped>
.editor-box {
  background: #1e1e1e;
  color: #fff;
  border-radius: 4px;
  overflow: hidden;
  padding-top: 15px;
  padding-bottom: 15px;
}
.editor {
  width: 100%;
  height: 400px;
}
</style>
