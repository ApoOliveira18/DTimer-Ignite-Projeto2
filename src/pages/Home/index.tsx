import { HandPalm, Play } from 'phosphor-react';
import { HomeContainer, StartCountdownButton, StopCountdownButton  } from './styles';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from  'zod';
import { NewCycleForm } from './components/NewCycleForm';
import { Cowntdown } from './components/Countdown';
import { useContext } from 'react';
import { CyclesContext } from '../../contexts/CyclesContext';

  const newCicleFormValidationSchme = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    owner: zod.string().optional(),
    minutesAmount: zod.number().min(5, 'O ciclo precisa ser no mínimo de 5 minutos.').max(60, 'O ciclo precisa ser no máximo de 60 minutos.') });
  
  type NewCycleFormData = zod.infer<typeof newCicleFormValidationSchme>;

  export function Home() {  

  const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(CyclesContext);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCicleFormValidationSchme),
    defaultValues: {
     task: '',
     minutesAmount: 0,
    }
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  const task = watch('task');
  const isSubmitDisable = !task;

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data);
    reset();
  }

  return (
   <HomeContainer>
    <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
    
    <FormProvider {...newCycleForm}>
      <NewCycleForm />
    </FormProvider >    
    <Cowntdown /> 
     

    { activeCycle ? (
      <StopCountdownButton onClick={interruptCurrentCycle} type="button">
      <HandPalm size={24} />
      Interromper</StopCountdownButton>  
    ): (
      <StartCountdownButton disabled={isSubmitDisable} type="submit">
      <Play size={24} />
      Começar</StartCountdownButton>  
    ) } 

    
   </form>
   </HomeContainer>
  );
}