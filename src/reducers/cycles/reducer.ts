import { produce } from "immer";
import { ActionTypes } from "./action";


export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number,
  startDate: Date,
  interruptDate?: Date,
  finishedDate?: Date,
}

interface CyclesState {
  cycles: Cycle[];
  activeCycledId: string | null;
}



// eslint-disable-next-line @typescript-eslint/no-explicit-any    
export function cyclesReducer (state:  CyclesState, action:any ) {
switch(action.type) {
  case ActionTypes.ADD_NEW_CYCLE:
    return produce(state, draft => {
      draft.cycles.push(action.payload.newCycle);
      draft.activeCycledId = action.payload.newCycle.id;
    })

  case ActionTypes.INTERRUPT_CURRENT_CYCLE: {

    const currentCycleIndex = state.cycles.findIndex( (cycle) => {
      return cycle.id === state.activeCycledId
     })

     if (currentCycleIndex < 0) {
      return state;
     }

    return produce(state, (draft) => {
      draft.activeCycledId = null;
      draft.cycles[currentCycleIndex].interruptDate = new Date();
    })
  }

  case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {

      const currentCycleIndex = state.cycles.findIndex( (cycle) => {
        return cycle.id === state.activeCycledId
       })
  
       if (currentCycleIndex < 0) {
        return state;
       }
  
      return produce(state, (draft) => {
        draft.activeCycledId = null;
        draft.cycles[currentCycleIndex].finishedDate = new Date();
      })
    }
    default:
       return state;
}
} 