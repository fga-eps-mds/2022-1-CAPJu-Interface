import PropTypes from 'prop-types';
import React from 'react';
import { Container } from './styles';
import ReactFlow from 'react-flow-renderer';

function FlowViewer(props) {
  const nodes = props.stages
    .filter((stage) => {
      return props.stages.includes(stage);
    })
    .map((stage, idx) => {
      return {
        id: idx.toString(),
        data: { label: stage.name },
        position: { x: (idx % 2) * 100, y: 80 * idx }
      };
    });

  const edges =
    props.flow.sequences.map((sequence) => {
      let indexSource = props.stages
        .findIndex((stage) => {
          return stage._id == sequence.from;
        })
        .toString();

      let indexTarget = props.stages
        .findIndex((stage) => {
          return stage._id == sequence.to;
        })
        .toString();
      return {
        id: 'e' + indexSource + '-' + indexTarget,
        source: indexSource,
        target: indexTarget,
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
  stages: PropTypes.array
};

export default FlowViewer;
