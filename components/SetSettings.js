import { useContext, useEffect } from 'react';
import { SettingsContext } from 'utils/settings';
import { OPERATORS, pluralize } from 'utils/format';
import { getFuckYouLengths, getOperandLengths } from 'utils/utils';
import { MAX_OPERAND_LENGTH, MAX_PROBLEMS_PER_SET } from 'utils/config';
import Listbox from 'components/Listbox';
import NumberInput from 'components/NumberInput';

export default function SetSettings() {
  const { settings, setSetting } = useContext(SettingsContext);
  const { operation, operandLengths, fuckYouLengths, setProblemCount } = settings;

  useEffect(() => {
    if (
      ['SUBTRACTION', 'DIVISION'].includes(operation) &&
      operandLengths[1] > operandLengths[0]
    ) {
      setSetting('operandLengths', [operandLengths[0], operandLengths[0]]);
    }
  }, [operation, operandLengths, setSetting]);

  const getDefaultChangeHandler = (settingKey) => (value) => {
    setSetting(settingKey, value);
  };

  return (
    <div className='mx-auto flex select-none flex-col gap-4'>
      <div className='flex flex-col gap-1'>
        <div className='text-lg'>Fuck You</div>
        <div className='grid grid-cols-[7rem_4.5rem_7rem] gap-3'>
          <Listbox
            value={fuckYouLengths[0]}
            onChange={(value) => {
              setSetting('fuckYouLengths', [value, fuckYouLengths[1]]);
            }}
            optionValues={getFuckYouLengths()}
            optionNames={getFuckYouLengths().map((length) =>
              pluralize('digit', length)
            )}
          />
        </div>
        <div className='text-lg'>Problem type</div>
        <div className='grid grid-cols-[7rem_4.5rem_7rem] gap-3'>
          <Listbox
            value={operandLengths[0]}
            onChange={(value) => {
              setSetting('operandLengths', [value, operandLengths[1]]);
            }}
            optionValues={getOperandLengths()}
            optionNames={getOperandLengths().map((length) =>
              pluralize('digit', length)
            )}
          />
          <Listbox
            value={operation}
            onChange={getDefaultChangeHandler('operation')}
            optionValues={Object.keys(OPERATORS)}
            optionNames={Object.values(OPERATORS)}
          />
          <Listbox
            value={operandLengths[1]}
            onChange={(value) => {
              setSetting('operandLengths', [operandLengths[0], value]);
            }}
            optionValues={getOperandLengths()}
            optionNames={getOperandLengths().map((length) =>
              pluralize('digit', length)
            )}
            disabled={
              ['SUBTRACTION', 'DIVISION'].includes(operation)
                ? Array(operandLengths[0])
                    .fill(false)
                    .concat(
                      Array(MAX_OPERAND_LENGTH - operandLengths[0]).fill(true)
                    )
                : Array(MAX_OPERAND_LENGTH).fill(false)
            }
          />
        </div>
      </div>
      <div className='flex flex-col gap-1'>
        <div className='text-lg'>Number of problems</div>
        <NumberInput
          value={setProblemCount}
          onChange={getDefaultChangeHandler('setProblemCount')}
          min={1}
          max={MAX_PROBLEMS_PER_SET}
        />
      </div>
    </div>
  );
}
