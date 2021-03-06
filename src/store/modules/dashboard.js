import {SET_AVAILABLE_YEARS, SET_END_YEAR, SET_SELECTED_INSTITUTES, SET_START_YEAR} from "../actions";

const state = {
  selectedInstitutes: [],
  endYear: 2018,
  availableYears: [2013, 2014, 2015, 2016, 2017, 2018],
};

const mutations = {

  [SET_SELECTED_INSTITUTES] (state, institutes) {
    state.selectedInstitutes = institutes;
  },

  [SET_START_YEAR] (state, year) {
    state.startYear = year;
  },

  [SET_END_YEAR] (state, year) {
    state.endYear = year;
  },

  [SET_AVAILABLE_YEARS] ({state, commit}, years) {
    state.availableYears = years;
    commit(SET_START_YEAR, Math.min(years));
    commit(SET_END_YEAR, Math.max(years));
  }

};

const getters = {
  selectedYears: state => {
    return state.availableYears.slice(state.availableYears.indexOf(state.startYear), state.availableYears.indexOf(state.endYear) + 1);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
