<template>
  <div class="editor-box">
    <div class="editor" ref="editor" :style="{ height: height }"></div>
  </div>
</template>

<script>
import * as monaco from "monaco-editor";
import mongo from "!!raw-loader!./mongo-shell.d.ts";

monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
  allowNonTsExtensions: true,
  noLib: true,
});

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
      suggestions:
        model.__data__.uri == "localhost1"
          ? [
              {
                label: {
                  label: "users",
                  detail: "",
                  description: "集合",
                },
                kind: monaco.languages.CompletionItemKind.Field,
                documentation: {
                  value: `用户表`,
                },
                insertText: `users`,
                range: range,
              },
            ]
          : [
              {
                label: {
                  label: "apperrors",
                  detail: "",
                  description: "集合",
                },
                kind: monaco.languages.CompletionItemKind.Field,
                documentation: {
                  value: `应用错误`,
                },
                insertText: `apperrors`,
                range: range,
              },
            ],
    };
  },
});

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
      this.editor = monaco.editor.create(this.$refs.editor, {
        fontSize: 16,
        language: this.language,
        contextmenu: false,
        value: this.code,
        theme: "vs-dark",
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
      });
      this.editor._modelData.model.__data__ = {};
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
