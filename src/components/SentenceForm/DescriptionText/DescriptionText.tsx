import { SentenceStep } from '../../../types/Steps';

export const DescriptionText = ({ activeStep }: { activeStep: SentenceStep }) => {

  const descriptionText = {
    'who': 'Napište ideálně podstatné jméno, kterým bude věta začínat.',
    'what': 'Napište činnost (sloveso), kterou bude osoba provádět.',
    'when': 'Napište čas nebo rozmezí, kdy bude činnost probíhat.',
    'where': 'Napište místo, kde bude činnost probíhat.'
  };

  const currentDescription = descriptionText[activeStep];

  return (
    <p style={ { color: 'gray', marginBlock: '1rem' } }>{ currentDescription }</p>
  )
}