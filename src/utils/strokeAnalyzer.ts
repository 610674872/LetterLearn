// 汉字整字书写笔顺与方向后置诊断算法

export interface Point {
  x: number;
  y: number;
  time?: number;
}

export type RawStroke = Point[];

export interface StrokeDetailDiagnosis {
  drawnIndex: number; // 孩子实际书写的顺位 (0, 1, 2...)
  matchedStandardIndex: number; // 匹配到的标准笔顺顺位 (0, 1, 2...)
  strokeName: string; // 笔画名称 (如 "横", "竖")
  isOrderCorrect: boolean; // 书写顺位是否正确
  isDirectionReversed: boolean; // 是否倒笔逆向运笔
  feedback: string;
}

export interface StrokeDiagnosisResult {
  totalExpectedStrokes: number;
  totalActualStrokes: number;
  isCountCorrect: boolean;
  isCharacterCorrect: boolean; // 字本身是否写对
  isOrderCorrect: boolean; // 笔顺是否正确
  isDirectionCorrect: boolean; // 笔画方向是否正确
  score: number; // 0 ~ 100
  stars: number; // 0 ~ 3
  details: StrokeDetailDiagnosis[];
  summaryMessage: string;
  adviceList: string[];
}

// 欧式距离
function distance(p1: [number, number], p2: [number, number]): number {
  return Math.hypot(p1[0] - p2[0], p1[1] - p2[1]);
}

/**
 * 将 Canvas 视口坐标转换为 HanziWriter 1024x1024 标准空间坐标
 * HanziWriter 坐标系: X: 0..1024 (左到右), Y: 0..900 (底部到顶部)
 */
export function normalizeCanvasPoints(
  points: Point[],
  canvasWidth: number,
  canvasHeight: number,
  padding: number = 18
): [number, number][] {
  const contentWidth = canvasWidth - padding * 2;
  const contentHeight = canvasHeight - padding * 2;

  return points.map((p) => {
    // 约束在 padding 区域内
    const clampedX = Math.max(padding, Math.min(canvasWidth - padding, p.x));
    const clampedY = Math.max(padding, Math.min(canvasHeight - padding, p.y));

    // 缩放到 0 ~ 1024 空间
    const normX = ((clampedX - padding) / contentWidth) * 1024;
    // Y轴反转: 屏幕顶部是 y=0，HanziWriter 内部顶部约为 900
    const normY = 900 - ((clampedY - padding) / contentHeight) * 900;

    return [normX, normY];
  });
}

/**
 * 单条手写笔迹与标准骨架匹配
 */
function matchSingleStroke(
  drawnPoints: [number, number][],
  medians: number[][][]
): { matchedIdx: number; score: number; isReversed: boolean } {
  if (drawnPoints.length === 0) {
    return { matchedIdx: 0, score: Infinity, isReversed: false };
  }

  const dStart = drawnPoints[0];
  const dMid = drawnPoints[Math.floor(drawnPoints.length / 2)];
  const dEnd = drawnPoints[drawnPoints.length - 1];

  let bestIdx = 0;
  let bestScore = Infinity;
  let isReversed = false;

  medians.forEach((median, idx) => {
    if (!median || median.length === 0) return;

    const mStart: [number, number] = [median[0][0], median[0][1]];
    const mMid: [number, number] = [
      median[Math.floor(median.length / 2)][0],
      median[Math.floor(median.length / 2)][1],
    ];
    const mEnd: [number, number] = [
      median[median.length - 1][0],
      median[median.length - 1][1],
    ];

    // 正向匹配距离 (起、中、终)
    const forwardDist =
      distance(dStart, mStart) * 1.2 +
      distance(dMid, mMid) * 0.8 +
      distance(dEnd, mEnd) * 1.0;

    // 反向匹配距离 (起、终倒置)
    const backwardDist =
      distance(dStart, mEnd) * 1.2 +
      distance(dMid, mMid) * 0.8 +
      distance(dEnd, mStart) * 1.0;

    const minScore = Math.min(forwardDist, backwardDist);

    if (minScore < bestScore) {
      bestScore = minScore;
      bestIdx = idx;
      isReversed = backwardDist < forwardDist;
    }
  });

  return { matchedIdx: bestIdx, score: bestScore, isReversed };
}

/**
 * 核心分析器：对比整字实际书写轨迹与标准骨架数据
 */
export function analyzeCharacterStrokes(
  drawnStrokes: RawStroke[],
  canvasWidth: number,
  canvasHeight: number,
  standardMedians: number[][][],
  standardStrokeNames: string[] = []
): StrokeDiagnosisResult {
  const totalExpected = standardMedians.length;
  const totalActual = drawnStrokes.length;

  // 1. 规范化所有笔迹坐标
  const normalizedStrokes = drawnStrokes.map((s) =>
    normalizeCanvasPoints(s, canvasWidth, canvasHeight)
  );

  // 2. 贪心为每笔匹配最吻合的标准笔画
  const matchedList = normalizedStrokes.map((stroke) =>
    matchSingleStroke(stroke, standardMedians)
  );

  const details: StrokeDetailDiagnosis[] = [];
  const usedStandardIndices = new Set<number>();
  const adviceList: string[] = [];
  let orderErrorCount = 0;
  let directionErrorCount = 0;

  matchedList.forEach((match, drawnIdx) => {
    let matchedStandard = match.matchedIdx;

    // 冲突消解：如果当前匹配的笔画已经被前面的笔迹占领，且还有更适合的候选，尝试分配
    if (usedStandardIndices.has(matchedStandard)) {
      for (let sIdx = 0; sIdx < totalExpected; sIdx++) {
        if (!usedStandardIndices.has(sIdx)) {
          matchedStandard = sIdx;
          break;
        }
      }
    }
    usedStandardIndices.add(matchedStandard);

    const strokeName =
      standardStrokeNames[matchedStandard] || `第 ${matchedStandard + 1} 笔`;

    // 顺位是否正确：标准笔顺期望第 drawnIdx 步书写的也是第 drawnIdx 笔
    const isOrderCorrect = matchedStandard === drawnIdx;
    if (!isOrderCorrect) {
      orderErrorCount++;
    }

    // 方向是否正确
    const isReversed = match.isReversed;
    if (isReversed) {
      directionErrorCount++;
    }

    let feedback = '写得真规范！';
    if (!isOrderCorrect && isReversed) {
      feedback = `应该在第 ${matchedStandard + 1} 笔写，起笔反啦`;
      adviceList.push(
        `第 ${drawnIdx + 1} 笔「${strokeName}」：应该在第 ${
          matchedStandard + 1
        } 笔写，且起笔方向反了哦。`
      );
    } else if (!isOrderCorrect) {
      feedback = `应该在第 ${matchedStandard + 1} 笔写（顺序倒了）`;
      adviceList.push(
        `第 ${drawnIdx + 1} 笔「${strokeName}」：顺序颠倒了，应该第 ${
          matchedStandard + 1
        } 笔写（别倒插笔哦）。`
      );
    } else if (isReversed) {
      feedback = '落笔方向反啦';
      adviceList.push(`「${strokeName}」的起笔方向反了，试试从另一端起笔。`);
    }

    details.push({
      drawnIndex: drawnIdx,
      matchedStandardIndex: matchedStandard,
      strokeName,
      isOrderCorrect,
      isDirectionReversed: isReversed,
      feedback,
    });
  });

  // 3. 统计笔画数与笔画几何匹配度，判断字是否正确
  const countDiff = Math.abs(totalActual - totalExpected);
  const isCountCorrect = totalActual === totalExpected;

  const totalDistance = matchedList.reduce((acc, m) => acc + (isFinite(m.score) ? m.score : 600), 0);
  const avgDistance = totalActual > 0 ? totalDistance / totalActual : 999;
  const poorlyMatchedStrokes = matchedList.filter((m) => m.score > 480).length;

  // 判断字对不对 (Is the character correct?)
  // 笔画数差异在 1 笔以内，且平均加权距离 < 460，且严重不匹配笔画数不超过一半
  const isCharacterCorrect =
    totalActual > 0 &&
    countDiff <= 1 &&
    avgDistance < 460 &&
    poorlyMatchedStrokes <= Math.ceil(totalExpected / 2);

  if (!isCountCorrect) {
    if (totalActual < totalExpected) {
      adviceList.unshift(
        `少写了 ${totalExpected - totalActual} 笔哦！这个字一共有 ${totalExpected} 笔。`
      );
    } else {
      adviceList.unshift(
        `多写了 ${totalActual - totalExpected} 笔哦！仔细数数一共有 ${totalExpected} 笔。`
      );
    }
  }

  // 4. 综合评分与星级
  let score = 100;
  let stars = 1;
  let summaryMessage = '';

  if (!isCharacterCorrect) {
    score = Math.max(10, Math.min(45, 60 - countDiff * 20));
    stars = 0;
    summaryMessage = '这个字好像写错啦或漏画了，来看看标准写法吧！❌';
    adviceList.unshift('字形或笔画不太对哦，注意观察田字格中标准字的每一笔。');
  } else {
    if (!isCountCorrect) {
      score -= countDiff * 20;
    }
    score -= orderErrorCount * 15;
    score -= directionErrorCount * 10;
    score = Math.max(20, Math.min(100, score));

    if (isCountCorrect && orderErrorCount === 0 && directionErrorCount === 0) {
      stars = 3;
      score = 100;
      summaryMessage = '太棒啦！字写对了，笔顺完全正确！🌟';
    } else if (orderErrorCount <= 1 && directionErrorCount <= 1) {
      stars = 2;
      summaryMessage = '字写对啦！不过注意有 1 处倒插笔，看提示纠正更棒！✨';
    } else {
      stars = 1;
      summaryMessage = '字写出来了，但笔顺有较多倒插笔哦，点慢放看看吧！✏️';
    }
  }

  return {
    totalExpectedStrokes: totalExpected,
    totalActualStrokes: totalActual,
    isCountCorrect,
    isCharacterCorrect,
    isOrderCorrect: isCharacterCorrect && orderErrorCount === 0,
    isDirectionCorrect: isCharacterCorrect && directionErrorCount === 0,
    score,
    stars,
    details,
    summaryMessage,
    adviceList,
  };
}
