import PropTypes from 'prop-types';
import React from 'react';
import { Container } from './styles';
import ReactFlow from 'react-flow-renderer';

function FlowViewer(props) {
  console.log(
    props.stages.filter((stage) => {
      return props.flow.stages.includes(stage._id);
    })
  );

  const nodes = props.stages
    .filter((stage) => {
      return props.flow.stages.includes(stage._id);
    })
    .map((stage, idx) => {
      return {
        id: stage._id,
        data: { label: stage.name },
        position: { x: (idx % 2) * 100, y: 80 * idx },
        style: props.highlight == stage._id ? { backgroundColor:  '#1b9454', color: '#f1f1f1'} : {}
      };
    });

  const edges =
    props.flow.sequences.map((sequence) => {
      return {
        id: 'e' + sequence.from + '-' + sequence.to,
        source: sequence.from,
        target: sequence.to,
        animated: true
      };
    }) || [];

  return (
    <Container onClick={props.onClick}>
      <ReactFlow nodes={nodes} edges={edges} fitView></ReactFlow>
    </Container>
  );
}

FlowViewer.propTypes = {
  onClick: PropTypes.func,
  flow: PropTypes.any,
  stages: PropTypes.array,
  highlight: PropTypes.string
};

export default FlowViewer;
