import assert from "assert";
import * as clipboard from "../../../../boilerplate/types/base/src/js/modules/ui/clipboard.js";
import jsdom from "jsdom";

const getWindow = () => (new jsdom.JSDOM("<!doctype html><html><head></head><body></body></html>")).window;

const getClipboardDataMock = () => {

  const store = {};

  return {
    getData: (format) => (typeof store[format] !== "undefined" ? store[format] : ""),
    setData: (format, data) => { store[format] = data; }
  };
};

const getExecCommandMock = (window) => (cmd) => {

  const { Event, document } = window;

  if (cmd === "copy")
  {
    const e = new Event("copy");

    e.clipboardData = getClipboardDataMock();
    document.dispatchEvent(e);
  }
};

describe("Modules > UI > Clipboard", function() {

  describe("copyData()", function() {

    it("should copy some text to the clipboard", function(done) {

      const window = getWindow();

      window.document.execCommand = getExecCommandMock(window);
      clipboard.copyData(window, "foobar", { mimeType: "text/plain" }, (e) => {

        assert.strictEqual(e.clipboardData.getData("text/plain"), "foobar");
        done();
      });
    });

    it("should copy some data with text/html mime type to the clipboard", function(done) {

      const window = getWindow();

      window.document.execCommand = getExecCommandMock(window);
      clipboard.copyData(window, "hello", { mimeType: "text/html" }, (e) => {

        assert.strictEqual(e.clipboardData.getData("text/html"), "hello");
        done();
      });
    });

    it("should copy some data even without callback function", function(done) {

      const window = getWindow();
      const { document } = window;

      document.execCommand = getExecCommandMock(window);
      document.addEventListener("copy", (e) => {

        assert.strictEqual(e.type, "copy");
        done();
      });
      clipboard.copyData(window, "test");
    });
  });
});
