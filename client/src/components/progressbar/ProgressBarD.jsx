import ProgressBar from 'react-bootstrap/ProgressBar';

const ProgressBarD = (props) => {
  return (
    <ProgressBar
      variant={props.variant}
      now={props.now}
      label={`${props.now}%`}
    />
  );
};

export default ProgressBarD;
