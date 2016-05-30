const GenderPresenter = gender => {
  const humanReadable = () => {
    if (gender == 'M') return 'Male';
    if (gender == 'F') return 'Female';
    if (gender == 'X') return 'X';
    return 'Gender unknown';
  };

  return {
    'humanReadable': humanReadable()
  };
};

export default GenderPresenter;
