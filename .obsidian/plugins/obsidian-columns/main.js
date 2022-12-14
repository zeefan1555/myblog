/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// main.ts
__export(exports, {
  default: () => ObsidianColumns
});
var import_obsidian = __toModule(require("obsidian"));
var COLUMNNAME = "col";
var COLUMNMD = COLUMNNAME + "-md";
var TOKEN = "!!!";
var ObsidianColumns = class extends import_obsidian.Plugin {
  onload() {
    return __async(this, null, function* () {
      this.registerMarkdownCodeBlockProcessor(COLUMNMD, (source, el, ctx) => {
        const sourcePath = ctx.sourcePath;
        let child = el.createDiv();
        import_obsidian.MarkdownRenderer.renderMarkdown(source, child, sourcePath, null);
      });
      this.registerMarkdownCodeBlockProcessor(COLUMNNAME, (source, el, ctx) => {
        const sourcePath = ctx.sourcePath;
        let rows = source.split("\n");
        let child = createDiv();
        import_obsidian.MarkdownRenderer.renderMarkdown(source, child, sourcePath, null);
        let parent = el.createEl("div", { cls: "columnParent" });
        Array.from(child.children).forEach((c) => {
          let cc = parent.createEl("div", { cls: "columnChild" });
          cc.appendChild(c);
        });
      });
      let processList = (element) => {
        for (let child of Array.from(element.children)) {
          if (child == null) {
            continue;
          }
          if (child.nodeName != "UL" && child.nodeName != "OL") {
            continue;
          }
          for (let listItem of Array.from(child.children)) {
            if (listItem == null) {
              continue;
            }
            if (!listItem.textContent.trim().startsWith(TOKEN + COLUMNNAME)) {
              processList(listItem);
              continue;
            }
            child.removeChild(listItem);
            let colParent = element.createEl("div", { cls: "columnParent" });
            let itemList = listItem.querySelector("ul, ol");
            if (itemList == null) {
              continue;
            }
            for (let itemListItem of Array.from(itemList.children)) {
              let childDiv = colParent.createEl("div", { cls: "columnChild" });
              let span = parseFloat(itemListItem.textContent.split("\n")[0].split(" ")[0]);
              if (!isNaN(span)) {
                childDiv.setAttribute("style", "flex-grow:" + span.toString());
              }
              let afterText = false;
              processList(itemListItem);
              for (let itemListItemChild of Array.from(itemListItem.childNodes)) {
                if (afterText) {
                  childDiv.appendChild(itemListItemChild);
                }
                if (itemListItemChild.nodeName == "#text") {
                  afterText = true;
                }
              }
            }
          }
        }
      };
      this.registerMarkdownPostProcessor((element, context) => {
        processList(element);
      });
    });
  }
  onunload() {
  }
};
