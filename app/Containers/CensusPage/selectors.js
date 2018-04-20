import { createSelector } from "reselect";

const selectCensusPageDomain = () => state => state.get("CensusPage");

const makeSelectCensusPage = () =>
  createSelector(selectCensusPageDomain(), substate => substate.toJS());

export default makeSelectCensusPage;
export { selectCensusPageDomain };
