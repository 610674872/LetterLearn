import React, { useState } from 'react';
import { X, Search, Check, AlertCircle } from 'lucide-react';
import type { CharacterItem, UserLearningStats } from '../types';
import { PEP_CURRICULUM_DATA } from '../data/pepCurriculum';
import { speechService } from '../utils/speech';

interface CharacterDictionaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: UserLearningStats;
  onSelectCharacterToPractice: (charItem: CharacterItem) => void;
}

type FilterTab = 'all' | 'written' | 'mistake' | 'unlearned';

export const CharacterDictionaryModal: React.FC<CharacterDictionaryModalProps> = ({
  isOpen,
  onClose,
  stats,
  onSelectCharacterToPractice,
}) => {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [searchKeyword, setSearchKeyword] = useState('');

  if (!isOpen) return null;

  // 汇总所有教材中的生字列表（去重）
  const allCharactersMap = new Map<string, CharacterItem>();
  PEP_CURRICULUM_DATA.forEach((curr) => {
    curr.units.forEach((unit) => {
      unit.lessons.forEach((lesson) => {
        lesson.characters.forEach((char) => {
          if (!allCharactersMap.has(char.char)) {
            allCharactersMap.set(char.char, char);
          }
        });
      });
    });
  });

  const allCharacters = Array.from(allCharactersMap.values());

  // 统计数据
  const totalCount = allCharacters.length;
  const writtenCount = stats.writtenCorrectChars.length;
  const mistakeCount = Object.keys(stats.mistakes).length;

  // 过滤列表
  const filteredList = allCharacters.filter((item) => {
    if (searchKeyword.trim()) {
      const kw = searchKeyword.trim().toLowerCase();
      const matchChar = item.char.includes(kw);
      const matchPinyin = item.pinyin.toLowerCase().includes(kw);
      if (!matchChar && !matchPinyin) return false;
    }

    const isWritten = stats.writtenCorrectChars.includes(item.char);
    const isMistake = !!stats.mistakes[item.char];

    if (activeTab === 'written') return isWritten;
    if (activeTab === 'mistake') return isMistake;
    if (activeTab === 'unlearned') return !isWritten && !isMistake;

    return true;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#fff8f6] rounded-[28px] p-6 max-w-4xl w-full shadow-2xl border border-[#d8c2be]/60 flex flex-col max-h-[90vh] animate-in fade-in duration-200">
        {/* 顶部标题与关闭 */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#d8c2be]/40 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-[#ffdad6] text-[#410002] flex items-center justify-center text-xl shadow-xs">
              📚
            </div>
            <div>
              <h3 className="font-extrabold text-[#231918] text-lg flex items-center gap-2">
                生字大厅 · 我的生字档案 📚
              </h3>
              <p className="text-xs text-[#775651]">
                记录写对掌握的生字与待复习错字，看自己的字写得越来越棒！
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#fdf1ee] hover:bg-white text-[#775651] flex items-center justify-center transition m3-press-active cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 学习总览指标看板 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-3.5 shrink-0">
          <div className="bg-[#e8f5e9]/70 p-3 rounded-[20px] border border-[#a5d6a7] flex items-center gap-3">
            <div className="text-2xl">✍️</div>
            <div>
              <div className="text-[11px] text-[#1b5e20] font-bold">已掌握生字</div>
              <div className="text-lg font-black text-[#1b5e20]">
                {writtenCount} <span className="text-xs font-normal text-[#2e7d32]">/ {totalCount}</span>
              </div>
            </div>
          </div>

          <div className="bg-[#ffdad6]/60 p-3 rounded-[20px] border border-[#ba1a1a]/40 flex items-center gap-3">
            <div className="text-2xl">⚠️</div>
            <div>
              <div className="text-[11px] text-[#410002] font-bold">还要再练的字</div>
              <div className="text-lg font-black text-[#ba1a1a]">
                {mistakeCount} <span className="text-xs font-normal text-[#775651]">个</span>
              </div>
            </div>
          </div>

          <div className="bg-[#e0f2fe]/80 p-3 rounded-[20px] border border-[#7dd3fc] flex items-center gap-3">
            <div className="text-2xl">🛡️</div>
            <div>
              <div className="text-[11px] text-[#0369a1] font-bold">消灭错别字</div>
              <div className="text-lg font-black text-[#0369a1]">
                {stats.clearedMistakesCount} <span className="text-xs font-normal text-[#0284c7]">次</span>
              </div>
            </div>
          </div>

          <div className="bg-[#fef3c7]/80 p-3 rounded-[20px] border border-[#fcd34d] flex items-center gap-3">
            <div className="text-2xl">🎧</div>
            <div>
              <div className="text-[11px] text-[#b45309] font-bold">听写写对词语</div>
              <div className="text-lg font-black text-[#b45309]">
                {stats.totalDictationWordsPassed} <span className="text-xs font-normal text-[#d97706]">个</span>
              </div>
            </div>
          </div>
        </div>

        {/* 搜索与分类栏 */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-[#d8c2be]/40 shrink-0">
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition m3-press-active cursor-pointer shrink-0 ${
                activeTab === 'all'
                  ? 'bg-[#ba1a1a] text-white shadow-xs'
                  : 'bg-[#fdf1ee] text-[#534341] hover:bg-white'
              }`}
            >
              全部生字 ({totalCount})
            </button>
            <button
              onClick={() => setActiveTab('written')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition m3-press-active cursor-pointer shrink-0 ${
                activeTab === 'written'
                  ? 'bg-[#2e7d32] text-white shadow-xs'
                  : 'bg-[#fdf1ee] text-[#534341] hover:bg-white'
              }`}
            >
              ✍️ 已掌握 ({writtenCount})
            </button>
            <button
              onClick={() => setActiveTab('mistake')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition m3-press-active cursor-pointer shrink-0 ${
                activeTab === 'mistake'
                  ? 'bg-[#ba1a1a] text-white shadow-xs'
                  : 'bg-[#fdf1ee] text-[#534341] hover:bg-white'
              }`}
            >
              ⚠️ 待巩固 ({mistakeCount})
            </button>
            <button
              onClick={() => setActiveTab('unlearned')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition m3-press-active cursor-pointer shrink-0 ${
                activeTab === 'unlearned'
                  ? 'bg-[#775651] text-white shadow-xs'
                  : 'bg-[#fdf1ee] text-[#534341] hover:bg-white'
              }`}
            >
              ⏳ 还没练习
            </button>
          </div>

          {/* 搜索框 */}
          <div className="relative min-w-[160px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#775651]" />
            <input
              type="text"
              placeholder="搜搜看汉字或拼音..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full bg-[#fdf1ee] border border-[#d8c2be] rounded-full pl-8 pr-3 py-1 text-xs text-[#231918] focus:outline-none focus:ring-2 focus:ring-[#ba1a1a]"
            />
          </div>
        </div>

        {/* 生字网格列表 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 overflow-y-auto py-3 px-1 flex-1 scrollbar-none">
          {filteredList.map((item) => {
            const isWritten = stats.writtenCorrectChars.includes(item.char);
            const mistakeRecord = stats.mistakes[item.char];

            return (
              <div
                key={item.char}
                onClick={() => {
                  onSelectCharacterToPractice(item);
                  onClose();
                }}
                className={`p-3 rounded-[20px] border flex flex-col justify-between transition hover:shadow-xs cursor-pointer relative group m3-press-active ${
                  mistakeRecord
                    ? 'bg-[#ffdad6]/40 border-[#ba1a1a]/50 hover:border-[#ba1a1a]'
                    : isWritten
                    ? 'bg-[#e8f5e9]/50 border-[#a5d6a7] hover:border-[#2e7d32]'
                    : 'bg-white border-[#d8c2be]/60 hover:border-[#ba1a1a]'
                }`}
              >
                {/* 顶部拼音与发音 */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#ba1a1a] font-pinyin">
                    {item.pinyin}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speechService.speak(item.char);
                    }}
                    className="text-[#775651] hover:text-[#ba1a1a] cursor-pointer"
                    title="读音"
                  >
                    🔊
                  </button>
                </div>

                {/* 汉字大字 */}
                <div className="my-1.5 text-center">
                  <span className="text-3xl font-black text-[#231918] font-kaiti group-hover:scale-110 transition inline-block">
                    {item.char}
                  </span>
                </div>

                {/* 状态徽标与快捷按钮 */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-center">
                    {mistakeRecord ? (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#410002] font-bold flex items-center gap-0.5">
                        <AlertCircle className="w-2.5 h-2.5" /> 练了错 {mistakeRecord.count} 次
                      </span>
                    ) : isWritten ? (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#e8f5e9] text-[#2e7d32] font-bold flex items-center gap-0.5">
                        <Check className="w-2.5 h-2.5" /> 已掌握 ✨
                      </span>
                    ) : (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#fdf1ee] text-[#775651]">
                        还没练习
                      </span>
                    )}
                  </div>

                  <button
                    className="w-full py-1.5 rounded-full bg-[#ba1a1a] hover:bg-[#9c1515] text-white text-[11px] font-bold text-center cursor-pointer transition shadow-2xs m3-press-active"
                  >
                    写一写 ✍️
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 底部信息说明 */}
        <div className="pt-3.5 border-t border-[#d8c2be]/40 flex items-center justify-between shrink-0 text-xs text-[#775651]">
          <span>💡 点一下汉字，就能马上去田字格写一写哦！</span>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-[#fdf1ee] hover:bg-white text-[#231918] font-bold cursor-pointer transition m3-press-active border border-[#d8c2be]/60"
          >
            回教室练字
          </button>
        </div>
      </div>
    </div>
  );
};
