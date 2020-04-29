import { createAction } from 'redux-actions';

export const VISIT_PIN_BUTTON_INTRODUCTION = 'VISIT_PIN_BUTTON_INTRODUCTION';
export const VISIT_PINBOARD_BUTTON_INTRODUCTION = 'VISIT_PINBOARD_BUTTON_INTRODUCTION';
export const VISIT_PINBOARD_INTRODUCTION = 'VISIT_PINBOARD_INTRODUCTION';

export const visitPinButtonIntroduction = createAction(VISIT_PIN_BUTTON_INTRODUCTION);
export const visitPinboardButtonIntroduction = createAction(VISIT_PINBOARD_BUTTON_INTRODUCTION);
export const visitPinboardIntroduction = createAction(VISIT_PINBOARD_INTRODUCTION);
