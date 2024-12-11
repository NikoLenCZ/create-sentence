import { Stepper, Step, StepButton, StepLabel, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import './StepperWithButtons.module.css';
import { SentenceStep, labels, steps } from '../../../types/Steps';

export interface StepperWithButtonsProps {
  activeStep: SentenceStep;
  stepsCompletion: Record<SentenceStep, boolean>;
  submitAttempted: boolean;
  handleStepChange: (step: SentenceStep) => void;
}

export const StepperWithButtons: React.FC<StepperWithButtonsProps> = ({ activeStep, stepsCompletion, submitAttempted, handleStepChange }) => {

  const handleStep = (step: SentenceStep) => () => {
    handleStepChange(step);
  };

  const activeIndex = steps.indexOf(activeStep);

  return (
    <Box sx={ { width: '100%', marginBlock: '2rem' } }>
      <Stepper nonLinear activeStep={ activeIndex }>
        { Object.entries(labels).map(([key, label], index) => (
          <Step key={ key } completed={ stepsCompletion[key as SentenceStep] }>
            <StepButton onClick={ handleStep(key as SentenceStep) }>
              <StepLabel
                icon={ stepsCompletion[key as SentenceStep] ? <CheckCircleIcon data-testid="CheckCircleIcon" /> : index + 1 }
                error={ !stepsCompletion[key as SentenceStep] && submitAttempted }
              >
                { label }
              </StepLabel>
            </StepButton>
          </Step>
        )) }
      </Stepper>
    </Box>
  );
};
