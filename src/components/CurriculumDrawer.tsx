import React from 'react';
import { X, BookOpen, ChevronRight, Check } from 'lucide-react';
import type { GradeLevel, SemesterLevel, Lesson } from '../types';
import { PEP_CURRICULUM_DATA } from '../data/pepCurriculum';

interface CurriculumDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentGrade: GradeLevel;
  currentSemester: SemesterLevel;
  currentLessonId: string;
  onSelectCurriculum: (grade: GradeLevel, semester: SemesterLevel) => void;
  onSelectLesson: (lesson: Lesson) => void;
  charProgress: { [char: string]: number };
}

export const CurriculumDrawer: React.FC<CurriculumDrawerProps> = ({
  isOpen,
  onClose,
  currentGrade,
  currentSemester,
  currentLessonId,
  onSelectCurriculum,
  onSelectLesson,
  charProgress,
}) => {
  if (!isOpen) return null;

  const currentCurriculum = PEP_CURRICULUM_DATA.find(
    (c) => c.grade === currentGrade && c.semester === currentSemester
  ) || PEP_CURRICULUM_DATA[0];

  const gradeSemesterOptions: { grade: GradeLevel; semester: SemesterLevel; label: string }[] = [
    { grade: 1, semester: 1, label: '一年级上' },
    { grade: 1, semester: 2, label: '一年级下' },
    { grade: 2, semester: 1, label: '二年级上' },
    { grade: 2, semester: 2, label: '二年级下' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center items-center bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      {/* 遮罩背景点击关闭 */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* M3 Modal Bottom Sheet: rounded-t-[28px] on mobile, rounded-[28px] on desktop */}
      <div 
        className="relative z-10 w-full max-w-lg bg-[#fff8f6] rounded-t-[28px] sm:rounded-[28px] shadow-2xl flex flex-col max-h-[85vh] sm:max-h-[80vh] overflow-hidden animate-in slide-in-from-bottom-8 duration-200 border-t sm:border border-[#d8c2be]/50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* M3 Standard Drag Handle: 32px x 4px */}
        <div className="w-8 h-1 bg-[#857370]/30 rounded-full mx-auto mt-3 mb-1 shrink-0" />

        {/* M3 Sheet Header */}
        <div className="px-5 py-3 flex items-center justify-between border-b border-[#d8c2be]/40">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#ffdad6] text-[#410002] flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#231918]">
                选择教材课文
              </h3>
              <p className="text-[11px] text-[#775651]">
                部编小学语文《写字表》全量同步
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full hover:bg-[#f7ebe8] text-[#534341] flex items-center justify-center transition cursor-pointer m3-press-active"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* M3 Connected Segmented Button (分段单选按钮) */}
        <div className="px-4 py-2.5 bg-[#fdf1ee] border-b border-[#d8c2be]/40 shrink-0">
          <div className="flex border border-[#857370]/40 rounded-full overflow-hidden p-0.5 bg-[#fff8f6]">
            {gradeSemesterOptions.map((opt) => {
              const isSelected = opt.grade === currentGrade && opt.semester === currentSemester;
              return (
                <button
                  key={`${opt.grade}-${opt.semester}`}
                  onClick={() => onSelectCurriculum(opt.grade, opt.semester)}
                  className={`flex-1 py-2 px-1 text-xs font-bold transition-all cursor-pointer rounded-full flex items-center justify-center gap-1 m3-press-active ${
                    isSelected
                      ? 'bg-[#ffdad6] text-[#410002] shadow-xs'
                      : 'text-[#534341] hover:bg-[#f7ebe8]'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#410002]" />}
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 单元与课文列表 (M3 Outlined/Elevated Cards) */}
        <div className="p-4 overflow-y-auto space-y-4 overscroll-contain flex-1">
          {currentCurriculum.units.map((unit) => (
            <div key={unit.unitNumber} className="space-y-2">
              <div className="flex items-center gap-2 px-1">
                <span className="w-1.5 h-3.5 rounded-full bg-[#ba1a1a]" />
                <h4 className="text-xs font-bold text-[#775651] tracking-wider uppercase">
                  {unit.title}
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {unit.lessons.map((lesson) => {
                  const isSelected = lesson.id === currentLessonId;
                  const lessonChars = lesson.characters;
                  const masteredCount = lessonChars.filter(
                    (c) => (charProgress[c.char] || 0) >= 2
                  ).length;
                  const isAllMastered = lessonChars.length > 0 && masteredCount === lessonChars.length;

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => {
                        onSelectLesson(lesson);
                        onClose();
                      }}
                      className={`p-3.5 rounded-[18px] text-left transition-all cursor-pointer flex items-center justify-between gap-2 m3-press-active ${
                        isSelected
                          ? 'bg-[#ffdad6] border-2 border-[#ba1a1a] text-[#410002] shadow-xs'
                          : 'bg-[#fdf1ee] border border-[#d8c2be]/60 hover:bg-[#f7ebe8] text-[#231918]'
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-xs font-bold truncate ${isSelected ? 'text-[#410002]' : 'text-[#231918]'}`}>
                            {lesson.title}
                          </span>
                          {isAllMastered && (
                            <span className="text-[10px] bg-[#2e7d32] text-white px-1.5 py-0.2 rounded-full font-bold">
                              已通关
                            </span>
                          )}
                        </div>

                        {/* 生字预览标签 */}
                        <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                          {lesson.characters.slice(0, 5).map((c) => (
                            <span
                              key={c.char}
                              className={`text-[11px] font-kaiti font-bold px-1.5 py-0.5 rounded-md ${
                                isSelected
                                  ? 'bg-[#ba1a1a] text-white'
                                  : 'bg-white text-[#231918] border border-[#d8c2be]/60'
                              }`}
                            >
                              {c.char}
                            </span>
                          ))}
                          {lesson.characters.length > 5 && (
                            <span className={`text-[10px] ${isSelected ? 'text-[#410002]' : 'text-[#775651]'}`}>
                              +{lesson.characters.length - 5}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-1">
                        <span className={`text-[11px] font-bold ${isSelected ? 'text-[#410002]' : 'text-[#775651]'}`}>
                          {masteredCount}/{lessonChars.length}
                        </span>
                        <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-[#410002]' : 'text-[#857370]'}`} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
