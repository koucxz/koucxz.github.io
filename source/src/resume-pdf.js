const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const PX_TO_PT = 0.75;

const rgb = (red, green, blue) => ({ type: "RGB", red, green, blue });

function cssColorToRgb(color) {
  if (color.startsWith("#")) {
    const hex = color.slice(1);
    const fullHex = hex.length === 3
      ? hex.split("").map((char) => char + char).join("")
      : hex;
    if (fullHex.length !== 6) return rgb(0, 0, 0);

    const value = Number.parseInt(fullHex, 16);
    if (Number.isNaN(value)) return rgb(0, 0, 0);

    return rgb(
      ((value >> 16) & 0xff) / 255,
      ((value >> 8) & 0xff) / 255,
      (value & 0xff) / 255,
    );
  }

  const match = color.match(/rgba?\(([^)]+)\)/i);
  if (!match) return rgb(0, 0, 0);

  const parts = match[1].split(",").map((part) => Number.parseFloat(part.trim()));
  const [r, g, b, a = 1] = parts;
  if ([r, g, b, a].some((value) => Number.isNaN(value))) return rgb(0, 0, 0);

  return rgb(r / 255, g / 255, b / 255);
}

function fontWeightToFont(style) {
  const weight = Number.parseInt(style.fontWeight, 10);
  return Number.isFinite(weight) && weight >= 600 ? "bold" : "regular";
}

function createTextCharacters(node, sheetRect) {
  const parent = node.parentElement;
  if (!parent) return [];

  if (parent.closest(".resume-visually-hidden, .resume-project-link")) return [];

  const style = window.getComputedStyle(parent);
  if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0") {
    return [];
  }

  const text = node.nodeValue;
  if (!text.trim()) return [];

  const fontSize = Number.parseFloat(style.fontSize);
  if (!Number.isFinite(fontSize)) return [];

  const fontWeight = fontWeightToFont(style);
  const color = cssColorToRgb(style.color);
  const range = document.createRange();
  const characters = [];

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];

    if (char === " ") continue;

    range.setStart(node, index);
    range.setEnd(node, index + 1);
    const rect = range.getBoundingClientRect();
    if (!rect.width && !rect.height) continue;

    const top = rect.top - sheetRect.top;
    const left = rect.left - sheetRect.left;

    const baseline = top + (rect.height - fontSize) / 2 + fontSize * 0.8;
    characters.push({
      char,
      x: left,
      baseline,
      fontSize,
      fontWeight,
      color,
    });
  }

  return characters;
}

function collectSheetText(sheet) {
  const sheetRect = sheet.getBoundingClientRect();
  const walker = document.createTreeWalker(sheet, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (parent.closest(".resume-visually-hidden, .resume-project-link")) {
        return NodeFilter.FILTER_REJECT;
      }
      const style = window.getComputedStyle(parent);
      if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0") {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const characters = [];
  while (walker.nextNode()) {
    characters.push(...createTextCharacters(walker.currentNode, sheetRect));
  }
  return characters;
}

function drawLine(page, sheetRect, rect, color, thickness = 1) {
  const x = (rect.left - sheetRect.left) * PX_TO_PT;
  const y = PAGE_HEIGHT - (rect.bottom - sheetRect.top) * PX_TO_PT;
  const width = rect.width * PX_TO_PT;

  page.drawLine({
    start: { x, y },
    end: { x: x + width, y },
    thickness: thickness * PX_TO_PT,
    color,
  });
}

function drawSheetDecorations(page, sheet, sheetRect) {
  const accent = cssColorToRgb("#285d99");
  const borderColor = cssColorToRgb("#d6deea");
  const lineColor = cssColorToRgb("#cdd8e7");
  const separatorColor = cssColorToRgb("#edf1f6");

  page.drawRectangle({
    x: 0,
    y: 0,
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
    color: rgb(1, 1, 1),
    borderColor,
    borderWidth: 1,
  });

  page.drawRectangle({
    x: 0,
    y: PAGE_HEIGHT - 3 * PX_TO_PT,
    width: PAGE_WIDTH,
    height: 3 * PX_TO_PT,
    color: accent,
  });

  const header = sheet.querySelector(".resume-document-header");
  if (header) {
    drawLine(page, sheetRect, header.getBoundingClientRect(), cssColorToRgb("#8ca2be"), 1);
  }

  sheet.querySelectorAll(".resume-section-heading > span").forEach((element) => {
    drawLine(page, sheetRect, element.getBoundingClientRect(), lineColor, 1);
  });

  sheet.querySelectorAll(".resume-work-item + .resume-work-item, .resume-project + .resume-project").forEach((element) => {
    const rect = element.getBoundingClientRect();
    drawLine(page, sheetRect, rect, separatorColor, 1);
  });
}

function drawListMarkers(page, sheet, sheetRect, font) {
  const markerColor = cssColorToRgb("#57769b");

  sheet.querySelectorAll("ol").forEach((list) => {
    list.querySelectorAll(":scope > li").forEach((item, index) => {
      const style = window.getComputedStyle(item);
      const fontSize = Number.parseFloat(style.fontSize);
      if (!Number.isFinite(fontSize)) return;

      const size = fontSize * PX_TO_PT;
      const marker = `${index + 1}.`;
      const markerWidth = font.widthOfTextAtSize(marker, size);
      const rect = item.getBoundingClientRect();
      const x = (rect.left - sheetRect.left) * PX_TO_PT - markerWidth - 3;
      const baseline = (rect.top - sheetRect.top + fontSize * 0.8) * PX_TO_PT;

      page.drawText(marker, {
        x,
        y: PAGE_HEIGHT - baseline,
        size,
        font,
        color: markerColor,
      });
    });
  });
}

async function loadFont(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`无法加载字体：${url}`);
  return new Uint8Array(await response.arrayBuffer());
}

async function createExportRoot() {
  const sourceSheets = [...document.querySelectorAll(".resume-preview-main > .resume-sheet")];
  if (sourceSheets.length === 0) return null;

  const exportRoot = document.createElement("div");
  exportRoot.className = "resume-preview-page resume-export-root";

  const exportMain = document.createElement("main");
  exportMain.className = "resume-preview-main";
  exportRoot.appendChild(exportMain);

  sourceSheets.forEach((sheet) => {
    const clonedSheet = sheet.cloneNode(true);
    clonedSheet.classList.add("resume-export-sheet");
    clonedSheet.removeAttribute("id");
    exportMain.appendChild(clonedSheet);
  });

  document.body.appendChild(exportRoot);

  if (document.fonts?.ready) {
    await document.fonts.ready;
  }

  await new Promise((resolve) => {
    window.requestAnimationFrame(() => window.requestAnimationFrame(resolve));
  });

  return {
    root: exportRoot,
    sheets: [...exportMain.querySelectorAll(":scope > .resume-sheet")],
  };
}

export async function downloadResumePdf() {
  const [{ PDFDocument }, { default: fontkit }] = await Promise.all([
    import("pdf-lib"),
    import("@pdf-lib/fontkit"),
  ]);

  if (document.fonts?.ready) {
    await document.fonts.ready;
  }

  const exportContext = await createExportRoot();
  if (!exportContext) return;

  try {
    const [regularBytes, boldBytes] = await Promise.all([
      loadFont("/fonts/resume-400-v6.ttf"),
      loadFont("/fonts/resume-700-v6.ttf"),
    ]);

    const pdf = await PDFDocument.create();
    pdf.registerFontkit(fontkit);

    // 字体文件已经裁剪过字集，再次做子集会丢失部分粗体字形。
    const regularFont = await pdf.embedFont(regularBytes);
    const boldFont = await pdf.embedFont(boldBytes);
    pdf.setTitle("寇晨迪 · 全栈开发工程师简历");
    pdf.setAuthor("寇晨迪");

    for (const sheet of exportContext.sheets) {
      const page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
      const sheetRect = sheet.getBoundingClientRect();

      drawSheetDecorations(page, sheet, sheetRect);
      drawListMarkers(page, sheet, sheetRect, regularFont);

      const characters = collectSheetText(sheet);
      for (const character of characters) {
        const font = character.fontWeight === "bold" ? boldFont : regularFont;
        const size = character.fontSize * PX_TO_PT;

        page.drawText(character.char, {
          x: character.x * PX_TO_PT,
          y: PAGE_HEIGHT - character.baseline * PX_TO_PT,
          size,
          font,
          color: character.color,
        });
      }
    }

    const bytes = await pdf.save();
    const blob = new Blob([bytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "寇晨迪_全栈开发工程师_郑州大学.pdf";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 60000);
  } finally {
    exportContext.root.remove();
  }
}
