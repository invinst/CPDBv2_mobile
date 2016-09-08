import moment from 'moment';
import u from 'utils/HelperUtil';


const OfficerPagePresenter = pageData => {
  const getComplaints = () => {
    const complaints = u.fetch(pageData, 'complaints', []);
    return complaints.sort((a, b) => {
      const dateA = u.fetch(a, 'incident_date', 0);
      const dateB = u.fetch(b, 'incident_date', 0);

      return moment(dateB).valueOf() - moment(dateA).valueOf();
    });
  };

  return {
    'complaints': getComplaints(),
    'officerDetail': u.fetch(pageData, 'detail', {}),
    'coAccused': u.fetch(pageData, 'co_accused', []),
    'distribution': u.fetch(pageData, 'distribution', [])
  };
};

export default OfficerPagePresenter;
