// Test script to calculate proper word positioning
// This helps us understand how to fix the word overlap issue

const MAIN_TEXT_4 = "YOU TEXT HERE";
const MAIN_TEXT_5 = "YOU TEXT HERE";

// Text-animation-4 constants
const FONT_SIZE_MAIN_4 = 120;
const RECT_PADDING_X_4 = 40;

// Text-animation-5 constants
const FONT_SIZE_MAIN_5 = 100;
const PADDING_X_5 = 50;

// Gap between word boxes
const WORD_GAP = 25;

function calculateWordPositions(text, fontSize, paddingX, gap) {
  const words = text.split(" ");
  const charWidth = fontSize * 0.6; // For text-animation-4

  // Calculate each word's box width
  const wordBoxes = words.map(word => {
    const textWidth = word.length * charWidth;
    const boxWidth = textWidth + paddingX * 2;
    return { word, boxWidth };
  });

  // Calculate total width including gaps
  const totalBoxWidth = wordBoxes.reduce((sum, box) => sum + box.boxWidth, 0);
  const totalGapWidth = (words.length - 1) * gap;
  const totalWidth = totalBoxWidth + totalGapWidth;

  // Calculate x position for each word (center-based)
  const positions = [];
  let currentX = -totalWidth / 2; // Start from left edge

  wordBoxes.forEach((box, idx) => {
    const xCenter = currentX + box.boxWidth / 2;
    positions.push({
      word: box.word,
      boxWidth: box.boxWidth,
      xPosition: xCenter,
    });
    currentX += box.boxWidth + gap;
  });

  return { positions, totalWidth };
}

console.log("=== TEXT-ANIMATION-4 ===");
const result4 = calculateWordPositions(MAIN_TEXT_4, FONT_SIZE_MAIN_4, RECT_PADDING_X_4, WORD_GAP);
console.log("Total width:", result4.totalWidth);
console.log("Word positions:");
result4.positions.forEach((pos, idx) => {
  console.log(`  ${idx}: "${pos.word}" - width: ${pos.boxWidth.toFixed(0)}px, xPosition: ${pos.xPosition.toFixed(0)}px`);
});

console.log("\n=== TEXT-ANIMATION-5 ===");
const charWidth5 = FONT_SIZE_MAIN_5 * 0.58; // For text-animation-5
function calculateWordPositions5(text, fontSize, paddingX, gap) {
  const words = text.split(" ");
  const charWidth = fontSize * 0.58;

  const wordBoxes = words.map(word => {
    const textWidth = word.length * charWidth;
    const boxWidth = textWidth + paddingX * 2;
    return { word, boxWidth };
  });

  const totalBoxWidth = wordBoxes.reduce((sum, box) => sum + box.boxWidth, 0);
  const totalGapWidth = (words.length - 1) * gap;
  const totalWidth = totalBoxWidth + totalGapWidth;

  const positions = [];
  let currentX = -totalWidth / 2;

  wordBoxes.forEach((box, idx) => {
    const xCenter = currentX + box.boxWidth / 2;
    positions.push({
      word: box.word,
      boxWidth: box.boxWidth,
      xPosition: xCenter,
    });
    currentX += box.boxWidth + gap;
  });

  return { positions, totalWidth };
}

const result5 = calculateWordPositions5(MAIN_TEXT_5, FONT_SIZE_MAIN_5, PADDING_X_5, WORD_GAP);
console.log("Total width:", result5.totalWidth);
console.log("Word positions:");
result5.positions.forEach((pos, idx) => {
  console.log(`  ${idx}: "${pos.word}" - width: ${pos.boxWidth.toFixed(0)}px, xPosition: ${pos.xPosition.toFixed(0)}px`);
});
