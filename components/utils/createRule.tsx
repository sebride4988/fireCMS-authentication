import { Rule } from 'antd/lib/form';
import josa from 'josa-js';

export function createRule(type: 'required', label: string): Rule;
export function createRule(type: 'email', label: string): Rule;
export function createRule(type: 'min', label: string, min: number): Rule;
export function createRule(
  type: 'required' | 'email' | 'min',
  label: string,
  min?: number,
): Rule {
  switch (type) {
    case 'required':
      return {
        required: true,
        message: josa.r(label, '을/를') + ' 입력해주세요',
      };
    case 'email':
      return {
        type: 'email',
        message: josa.r(label, '은/는') + ' abc@def.ghi 형식이어야 합니다',
      };
    case 'min':
      return {
        min,
        message:
          josa.r(label, '은/는') + ' 적어도 ' + min + '글자 이상이어야 합니다',
      };
    default:
      throw new Error('unknown rule type');
  }
}
