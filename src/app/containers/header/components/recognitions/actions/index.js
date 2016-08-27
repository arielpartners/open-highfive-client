export const RECOGNITIONS_ERROR = 'RECOGNITIONS_ERROR';
export const LOAD_RECOGNITIONS = 'LOAD_RECOGNITIONS';

//
// action creators / action factories
//
export const recognitionsLoaded = payload => ({type: LOAD_RECOGNITIONS, payload});
