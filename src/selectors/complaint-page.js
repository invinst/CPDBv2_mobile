import constants from 'constants';
import { createSelector } from 'reselect';
import moment from 'moment';

const getComplaint = (state, props) => state.complaintPage.complaints[props.params.complaintId];

const formatDate = date => moment(date).format(constants.SIMPLE_DATE_FORMAT);

export const complaintSelector = createSelector(
  [getComplaint],
  complaint => {
    if (!complaint) {
      return null;
    }

    const involvements = complaint.involvements || [];

    return {
      address: complaint.address,
      beat: complaint.beat,
      complainants: complaint.complainants, //TODO
      crid: complaint.crid,
      incidentDate: formatDate(complaint.incident_date),
      location: complaint.location,
      point: complaint.point,
      coaccused: complaint.coaccused.map(
        (ca) => ({
          category: ca.category,
          subcategory: ca.subcategory,
          startDate: formatDate(ca.start_date),
          endDate: formatDate(ca.end_date),
          finalFinding: ca.final_finding,
          finalOutcome: ca.final_outcome,
          fullName: ca.full_name,
          gender: ca.gender.toLowerCase(),
          id: ca.id,
          race: ca.race.toLowerCase(),
          reccOutcome: ca.recc_outcome
        })
      ),
      involvements: involvements.map(
        (inv) => ({
          involvedType: inv.involved_type,
          officers: inv.officers.map(
            (off) => ({
              abbrName: off.abbr_name,
              extraInfo: off.extra_info,
              id: off.id
            })
          )
        })
      )
    };
  }
);
