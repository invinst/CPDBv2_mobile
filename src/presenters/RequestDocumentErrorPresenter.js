const RequestDocumentErrorPresenter = errors => {
  let errorMessage;

  errors = errors || {};

  errorMessage = () => {
    if ('email' in errors) {
      return 'Please provide a valid email address.';
    }
    return 'An issue has occurred while processing your request.';
  };

  return {
    'errorMessage': errorMessage()
  };
};

export default RequestDocumentErrorPresenter;
