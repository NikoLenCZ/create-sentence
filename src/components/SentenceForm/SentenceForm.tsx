import { useEffect, useState } from 'react'
import { Box, Button, TextField } from '@mui/material'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { addSentence } from '../../redux/sentenceService';
import { Sentence } from '../../types/Sentence';
import { labels, SentenceStep, steps } from '../../types/Steps';
import { StepperWithButtons } from './Stepper/StepperWithButtons';
import { DescriptionText } from './DescriptionText/DescriptionText';
import SendIcon from '@mui/icons-material/Send';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const SentenceForm = () => {
  const [activeStep, setActiveStep] = useState<SentenceStep>('who');
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [formData, setFormData] = useState<Sentence>({ who: '', what: '', when: '', where: '' });
  const stepsCompletion = Object.entries(formData).reduce<Record<SentenceStep, boolean>>((acc, [key, value]) => {
    acc[key as SentenceStep] = value.trim() !== '';
    return acc;
  }, {} as Record<SentenceStep, boolean>);


  const dispatch = useDispatch();
  const notifyError = (text: string) => toast.error(text);

  const sentences = useSelector((state: RootState) => state.sentences);
  const editIndex = useSelector((state: RootState) => state.sentences.editIndex);


  useEffect(() => {
    if (editIndex !== null) {
      const sentenceToEdit = sentences.sentences[editIndex];
      setFormData(sentenceToEdit);
    }
  }, [editIndex, sentences]);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevFormData => ({ ...prevFormData, [activeStep]: event.target.value }));
  };

  const handleStepChange = (step: SentenceStep) => {
    setActiveStep(step);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => steps[steps.indexOf(prevActiveStep) + 1]);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => steps[steps.indexOf(prevActiveStep) - 1]);
  };

  const handleSubmit = () => {
    if (Object.values(stepsCompletion).every(Boolean)) {
      const sentence: Sentence = {
        who: formData.who,
        what: formData.what,
        when: formData.when,
        where: formData.where
      };
      dispatch(addSentence(sentence));
      setFormData({ who: '', what: '', when: '', where: '' });
      setActiveStep('who');
      setSubmitAttempted(false);
    } else {
      notifyError('Všechna pole musí být vyplněna.');
      setSubmitAttempted(true);
    }
  };

  return (
    <>
      <StepperWithButtons
        activeStep={ activeStep }
        handleStepChange={ handleStepChange }
        stepsCompletion={ stepsCompletion }
        submitAttempted={ submitAttempted }
      />
      <DescriptionText activeStep={ activeStep } />
      <TextField
        required
        sx={ { width: '100%' } }
        id='standard-basic'
        variant='standard'
        label={ labels[activeStep] }
        value={ formData[activeStep] }
        onChange={ handleChange }
      />
      <Box sx={ {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: '1rem',
        marginBlock: '2rem'
      } }>
        <Button
          disabled={ activeStep === 'who' }
          onClick={ handleBack }
          variant="outlined"
          color='secondary'>
          <ArrowBackIcon sx={ { marginRight: '0.5rem' } } fontSize='small' /> O krok zpět
        </Button>
        <Button
          disabled={ activeStep === 'where' }
          onClick={ handleNext }
          variant="outlined"
          color='secondary'>
          Další krok <ArrowForwardIcon sx={ { marginLeft: '0.5rem' } } fontSize='small' />
        </Button>
      </Box>
      <Box sx={ { display: 'flex', justifyContent: 'center' } }>
        <Button
          sx={ { maxWidth: '100%', marginInline: 'auto' } }
          onClick={ handleSubmit }
          variant="contained"
          color='secondary'>
          { editIndex !== null ? 'Upravit větu' : 'Vytvořit větu' } <SendIcon sx={ { marginLeft: '0.5rem' } } fontSize='small' />
        </Button>
      </Box>
      <ToastContainer />
    </>
  )
}