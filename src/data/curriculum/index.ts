import type { TextbookCurriculum } from '../../types';
import { GRADE_1_CURRICULUM } from './grade1';
import { GRADE_2_CURRICULUM } from './grade2';
import { GRADE_3_CURRICULUM } from './grade3';
import { GRADE_4_CURRICULUM } from './grade4';
import { GRADE_5_CURRICULUM } from './grade5';
import { GRADE_6_CURRICULUM } from './grade6';

export const PEP_CURRICULUM_DATA: TextbookCurriculum[] = [
  ...GRADE_1_CURRICULUM,
  ...GRADE_2_CURRICULUM,
  ...GRADE_3_CURRICULUM,
  ...GRADE_4_CURRICULUM,
  ...GRADE_5_CURRICULUM,
  ...GRADE_6_CURRICULUM,
];

export {
  GRADE_1_CURRICULUM,
  GRADE_2_CURRICULUM,
  GRADE_3_CURRICULUM,
  GRADE_4_CURRICULUM,
  GRADE_5_CURRICULUM,
  GRADE_6_CURRICULUM,
};
