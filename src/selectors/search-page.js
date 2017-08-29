import { createSelector } from 'reselect';
import moment from 'moment';
import constants from 'constants';


export const officersSelector = createSelector(
  (state) => state.suggestionApp.suggestions.OFFICER,
  (officers) => {
    if (!officers) {
      return { data: [] };
    }

    return {
      isShowingAll: officers.isShowingAll,
      data: officers.data.map((officer) => ({
        id: officer.id,
        name: officer.name,
        extraInfo: officer.extra_info,
        url: `${constants.OFFICER_PATH}${officer.id}/`
      }))
    };
  }
);

export const faqsSelector = createSelector(
  (state) => state.suggestionApp.suggestions.FAQ,
  (faqs) => {
    if (!faqs) {
      return { data: [] };
    }

    return {
      isShowingAll: faqs.isShowingAll,
      data: faqs.data
    };
  }
);

export const unitsSelector = createSelector(
  (state) => state.suggestionApp.suggestions.UNIT,
  (units) => {
    if (!units) {
      return { data: [] };
    }

    return {
      isShowingAll: units.isShowingAll,
      data: units.data.map((unit) => ({
        id: unit.id,
        text: unit.text,
        url: unit.url,
        memberCount: unit.member_count,
        activeMemberCount: unit.active_member_count,
      }))
    };
  }
);

export const reportsSelector = createSelector(
  (state) => state.suggestionApp.suggestions.REPORT,
  (reports) => {
    if (!reports) {
      return { data: [] };
    }

    return {
      isShowingAll: reports.isShowingAll,
      data: reports.data.map((report) => ({
        id: report.id,
        title: report.title,
        publication: report.publication,
        publishDate: moment(report.publish_date).format('MMM D, YYYY')
      }))
    };
  }
);

export const suggestedSelector = createSelector(
  (state) => state.suggestionApp.initialSuggestions.suggested,
  (suggested) => suggested
);


export const recentSelector = createSelector(
  (state) => state.suggestionApp.initialSuggestions.recent,
  (recent) => recent
);
